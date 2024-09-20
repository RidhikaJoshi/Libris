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
router.put('/books/editDetails/:id',jwtVerify,async(c)=>
{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const bookId=c.req.param('id');
  const bookFound=await prisma.books.findUnique({
    where:
    {
      id:bookId
    }
  });
  if(!bookFound)
  {
    return c.text("Book not found in the database or Invalid book Id");
  }
 const body=await c.req.formData();
const editDetails=await prisma.books.update({
  where:{
    id:bookId
  },
  data:{
    title:body.get('title') as string || bookFound.title,
    author: body.get('author') as string || bookFound.author,
    description: body.get('description') as string || bookFound.description,
    category: (body.get('category') as Category) || bookFound.category,
    totalCopies: parseInt(body.get('totalCopies') as string) || bookFound.totalCopies,
    available: parseInt(body.get('available') as string) || bookFound.available,
    publication: new Date(body.get('publication') as string) || bookFound.publication,
    image:bookFound.image
    
  }
});
  if(!editDetails)
  {
    return c.text("Internal server error occured while updating book details");
  }
  return c.json({
    status:200,
    message:"Book details updated successfully",
    data:editDetails
  });
});

router.put('/books/editImage/:id',jwtVerify,async(c)=>
{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const bookId=c.req.param('id');
  const bookFound=await prisma.books.findUnique({
    where:{
      id:bookId
    }
  });
  if(!bookFound)
  {
    return c.text("Book not found in the database or Invalid book Id");
  }
  const body=await c.req.formData();
  const bookImage=body.get('image') as File;
  const imageUrl=await uploadImage(c.env.CLOUDINARY_CLOUD_NAME,c.env.UPLOAD_PRESET_NAME,bookImage);
  
  const editImage=await prisma.books.update({
    where:{
      id:bookId
    },
    data:{
      image:imageUrl
    }
  });
  if(!editImage)
    {
      return c.text("Internal server error occured while updating book image");
    }
    return c.json({
      status:200,
      message:"Book image updated successfully",
      data:editImage
    })
  
});
    
    // Admin deleting book route
router.delete('/books/delete/:id',jwtVerify,async(c)=>
{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const bookId=c.req.param('id');
  const bookFound=await prisma.books.findUnique({
    where:{
      id:bookId
    }});
    if(!bookFound)
    {
      return c.text("Invalid book Id or book does not exists in the databse");
    }
    // if book is found then delete the book
    const deleteBook=await prisma.books.delete({
      where:
      {
        id:bookId
      }
    });
    if(!deleteBook)
    {
      return c.text("Internal server error occured while deleting book");
    }
    return c.json({
      status:200,
      message:"Book deleted successfully",
      data:deleteBook
    });
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
router.get('/findbooks', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const findCategory = c.req.query('category') as Category;
  //console.log(findCategory);

  if (!findCategory) {
    return c.json({
      status: 400,
      message: "Category parameter is missing",
    }, 400);
  }

  const response = await prisma.books.findMany({
    where: {
      category: findCategory
    }
  });

  if (response.length === 0) {
    return c.json({
      status: 404,
      message: "No books found for the specified category",
    }, 404);
  }

  return c.json({
    status: 200,
    message: "Books fetched successfully based on category",
    data: response
  });
});

export default router;