import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import passwordHashing from '../utils/passwordHashing'

// defining the type of environment variables whenever you initialize the the app using hono
const router = new Hono<{
	Bindings: {
		DATABASE_URL: string
    JWT_SECRET:string
	};
  Variables: {
    userId: string
    imageUrl:string
  };
}>();


// here c stand for context
// here env stand for environment variables
router.post('/signup', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
    const body=await c.req.json();
    // c.req.json() returns a promise so we have to await it
    const hashedPassword=await passwordHashing(body.password);
    const response=await prisma.user.create({
      data:{
        email:body.email,
        fullName:body.fullName,
        password:hashedPassword
      }
    });
    if(!response){
      return c.text('Internal Server error occured while signup');
    }
  
    const payload={
     id:response.id,
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
  router.post('/signin',async(c)=>
  {
        const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
  
      const body=await c.req.json();
      const hashedPassword=await passwordHashing(body.password);
      const response=await prisma.user.findUnique({
        where:{
          email:body.email,
          password:hashedPassword
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
  

  export default router;