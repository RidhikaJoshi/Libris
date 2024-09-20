import { Hono } from 'hono'
import { PrismaClient, Category } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import jwtVerify from '../utils/jwtVerify'
import passwordHashing from '../utils/passwordHashing'
import uploadImage from '../utils/cloudinary'

// defining the type of environment variables whenever you initialize the the app using hono
const router = new Hono<{
	Bindings: {
		DATABASE_URL: string
    JWT_SECRET:string
    CLOUDINARY_CLOUD_NAME:string
    UPLOAD_PRESET_NAME:string

	};
  Variables: {
    userId: string
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
      const hashedPassword=await passwordHashing(body.password);
    
      // checking if admin already exists in the database
      const adminAlreadyExists=await prisma.admin.findUnique({
        where:{
          email:body.email
        }
      });
      if(adminAlreadyExists)
      {
        return c.text("Admin already exists in the database");
      }

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
     const hashedPassword=await passwordHashing(body.password);
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
router.post('/books',jwtVerify,async(c)=>
{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body=await c.req.formData();
  const bookImage=body.get('image') as File;
  const imageUrl=await uploadImage(c.env.CLOUDINARY_CLOUD_NAME,c.env.UPLOAD_PRESET_NAME,bookImage);


  const response=await prisma.books.create({
    data:
    {
      title:body.get('title') as string || '',
      author: body.get('author') as string || '',
      description: body.get('description') as string || '',
      category: (body.get('category') as Category) || 'OTHER',
      totalCopies: parseInt(body.get('totalCopies') as string) || 0,
      available: parseInt(body.get('available') as string) || 0,
      publication: new Date(body.get('publication') as string),
      image: imageUrl
    }
  })

 if(!response)
 {
  return c.text("Internal server error occured while adding book");
 }
 return c.json({
  status:200,
  message:"Book added successfully",
  data:response
 });
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
router.get('/books',async(c)=>
{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const response=await prisma.books.findMany();
  if(!response)
  {
    return c.text("Internal server error occured while getting books");
  }
  return c.json({
    status:200,
    message:"Books fetched successfully",
    data:response
  });
});
    
    // Admin getting books based on category route
router.get('/books?category=category',async(c)=>
{
    
});

export default router;