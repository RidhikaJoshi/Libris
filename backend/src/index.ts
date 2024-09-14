import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

// defining the type of environment variables whenever you initialize the the app using hono
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
    JWT_SECRET:string
	};
  Variables: {
    userId: string
  };
}>();

app.use('/api/v1/post/*', async(c,next) => {
    // get the header from Context
    // verify the header using jwt verify
    // if valid process to the next middleware
    // if not valid return 401 status
    const header=c.req.header("authorization") || "";
    const token=header.split(" ")[1];
    const verifiedHeader=await verify(token,c.env.JWT_SECRET);
    if(!verifiedHeader.id)
    {
      c.status(401);
      return c.json({
        status:401,
        message:"Unauthorized Access to the application"
      });
    }
    // adding the userId (payload) to the context
    c.set('userId',verifiedHeader.id as string);
    await next();
});

// here c stand for context
// here env stand for environment variables
app.post('/api/v1/signup', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());

  const body=await c.req.json();
  // c.req.json() returns a promise so we have to await it
  const reponse=await prisma.user.create({
    data:{
      email:body.email,
      fullName:body.fullName,
      password:body.password
    }
  });
  if(!reponse){
    return c.text('Internal Server error occured while signup');
  }

  const payload={
   id:reponse.id,
  };
  const secret=c.env.JWT_SECRET;
  const token=await sign(payload,secret);

  if(!token){
    return c.text('Internal Server error occured while signup');
  }
  return c.json({
    status:200,
    message:'User created successfully',
    data:token
  });
});

// Signin Route
app.post('/api/v1/signin',async(c)=>
{
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body=await c.req.json();
    const response=await prisma.user.findUnique({
      where:{
        email:body.email,
        password:body.password
      }
    });
    if(!response)
    {
      return c.text("User not found in the database");
    }
    const payload={
      id:response.id
    };
    const secret=c.env.JWT_SECRET;
    const token=await sign(payload,secret);
    if(!token)
    {
      return c.text("Internal server error occured while login");
    }

    return c.json({
      status:200,
      message:"User login successfully",
      data:token
    });

});
  

export default app
