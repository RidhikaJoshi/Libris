import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'

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

// middleware to verify the jwt token
app.use('/api/v1/post/*', async(c,next) => {
    // get the header from Context
    // verify the header using jwt verify
    // if valid process to the next middleware
    // if not valid return 401 status
    const header=c.req.header("authorization") || "";
    const token=header.split(" ")[1];
    const verifiedHeader=await verify(token,c.env.JWT_SECRET);
    if(!verifiedHeader?.id)
    {
      return c.json({
        status:401,
        message:"Unauthorized Access to the application",
        data:null
      });
    }
    // adding the userId (payload) to the context
    c.set('userId',verifiedHeader.id as string);
    await next();
});

// here c stand for context
// here env stand for environment variables
app.post('/api/v1/users/auth/signup', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());

  const body=await c.req.json();
  // c.req.json() returns a promise so we have to await it
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(body.password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', passwordBuffer);
  const hashedPassword = Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
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
app.post('/api/v1/users/auth/signin',async(c)=>
{
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body=await c.req.json();
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(body.password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', passwordBuffer);
    const hashedPassword = Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
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




// Adding admin route
// Admin Signup Route
app.post('/api/v1/admin/signup',async(c)=>
{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  // This code is hashing the password for security:
  // 1. It converts the password into a special format computers can process.
  // 2. It then uses a method called SHA-256 to scramble the password.
  // 3. Finally, it turns the scrambled password into a string of letters and numbers.
  // This way, even if someone sees the stored password, they can't figure out the original.
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(body.password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', passwordBuffer);
  const hashedPassword = Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  const response = await prisma.admin.create({
    data: {
      email: body.email,
      fullName: body.fullName,
      password: hashedPassword
    }
  });
  if(!response)
  {
    return c.text("Internal server error occured while signup");
  }

  const payload={
    id:response.id
  };
  const secret=c.env.JWT_SECRET;
  const token=await sign(payload,secret);
  if(!token)
  {
    return c.text("Internal server error occured while signup");
  }
  
  return c.json({
    status:200,
    message:"Admin signup successfully",
    data:token
  });






});

// Admin Signin Route
app.post('/api/v1/admin/signin',async(c)=>
{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body=await c.req.json();
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(body.password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', passwordBuffer);
  const hashedPassword = Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  const response=await prisma.admin.findUnique({
    where:{
      email:body.email,
      password:hashedPassword
    }
  });
  // if no record found
  if(!response)
  {
    return c.text("Admin not found in the database");
  }
  // if found
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
    message:"Admin login successfully",
    data:token
  });
  
  
});

// Admin adding new book route
app.post('/api/v1/admin/books',async(c)=>
{

});

// Admin updating book details route
app.put('/api/v1/admin/books/:id',async(c)=>
{

});

// Admin deleting book route
app.delete('/api/v1/admin/books/:id',async(c)=>
{

});

// Admin getting all books route
app.get('/api/v1/admin/books',async(c)=>
{

});

// Admin getting books based on category route
app.get('/api/v1/admin/books?category=category',async(c)=>
{

});
  
export default app
