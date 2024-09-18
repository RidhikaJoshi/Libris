import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import jwtVerify from '../utils/jwtVerify'

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

// Adding admin route
// Admin Signup Route
router.post('/signup',async(c)=>
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
 router.post('/signin',async(c)=>
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
    router.post('/books',async(c)=>
    {
    
    });
    
    // Admin updating book details route
    router.put('/books/:id',async(c)=>
    {
    
    });
    
    // Admin deleting book route
    router.delete('/books/:id',async(c)=>
    {
    
    });
    
    // Admin getting all books route
    router.get('/books',jwtVerify,async(c)=>
    {
      return c.json({
        status:200,
        message:"Books fetched successfully",
        data:null
      });
    });
    
    // Admin getting books based on category route
    router.get('/books?category=category',async(c)=>
    {
    
    });

export default router;