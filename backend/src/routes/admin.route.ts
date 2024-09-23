import { Hono } from 'hono'
import { PrismaClient, Category,TransactionStatus } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import jwtVerify from '../utils/jwtVerify'
import passwordHashing from '../utils/passwordHashing'
import uploadImage from '../utils/cloudinary'
import {adminSigninSchema,adminSignupSchema,bookSchema,bookUpdateSchema} from '@ridhikajoshi/libris-common'

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
      const {success} =adminSignupSchema.safeParse(body);
      if(!success)
      {
        c.status(400);
        return c.json({
            status:400, 
            message:"Invalid email or password",
            data:null
        });
      }
      const hashedPassword=await passwordHashing(body.password);

    
      // checking if admin already exists in the database
      const adminAlreadyExists=await prisma.admin.findUnique({
        where:{
          email:body.email
        }
      });
      if(adminAlreadyExists)
      { 
        c.status(400);
        return c.json({
          status:400,
          message:"Admin already exists in the database",
          data:null
         });
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
        c.status(400);
        return c.json({
          status:400,
          message:"Internal server error occured while signup",
          data:null
         });
      }
    
      const payload={
        id:response.id
      };
      const secret=c.env.JWT_SECRET;
      const token=await sign(payload,secret);
      if(!token)
      {
        c.status(400);
       return c.json({
        status:400,
        message:"Internal server error occured while signup",
        data:null
       });
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
      const {success} =adminSigninSchema.safeParse(body);
      if(!success)
      {
        c.status(400);
        return c.json({
          status:400,
          message:"Invalid email or password",
          data:null
        });
      }
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
        c.status(400);
        return c.json({
          status:400,
          message:"Admin not found in the database",
          data:null
         });
      }
      // if found
      const payload={
        id:response.id
      };
      const secret=c.env.JWT_SECRET;
      const token=await sign(payload,secret);
      if(!token)
      {
        c.status(400);
        return c.json({
          status:400,
          message:"Internal server error occured while login",
          data:null
         });
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
  try{
    const body = await c.req.parseBody();
      const imageUrl=await uploadImage(c.env.CLOUDINARY_CLOUD_NAME,c.env.UPLOAD_PRESET_NAME,body.image);
    if(!imageUrl)
    {
      c.status(400);
      return c.json({
        status:400,
        message:"Internal server error occured while uploading image",
        data:null
       });
    }
   // console.log(body);
    //console.log(imageUrl);
    const { success,error,data } =bookSchema.safeParse({
      ...body,
      image: imageUrl,
    });
    if (!success) {
      c.status(400);
      return c.json({
        status:400,
        message:"Invalid data provided",
        data:null
       });
    }
     
      const response=await prisma.books.create({
        data:
        {
          title: body.title as string,
          author: body.author as string,
          description: body.description as string,
          category: body.category as Category,
          totalCopies: parseInt(body.totalCopies as string),
          available: parseInt(body.available as string),
          publication: parseInt(body.publication as string), 
          image: imageUrl
      }});


    if(!response)
    {
      c.status(400);
      return c.json({
        status:400,
        message:"Internal server error occured while adding book",
        data:null
       });
    }
    return c.json({
      status:200,
      message:"Book added successfully",
      data:response
    });
  }catch(error)
  {
    console.log(error);
    c.status(500);
    return c.json({
      status:500,
      message:"Internal server error occured while adding book",
      data:null
    });
  }
});

    
    // Admin updating book details route
router.put('/books/editDetails/:id',jwtVerify,async(c)=>
{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const bookId=c.req.param('id');
  const body=await c.req.parseBody();
  const {success} =bookUpdateSchema.safeParse(body);
  if(!success)
  {
    c.status(400);
    return c.json({
      status:400,
      message:"Invalid book details",
      data:null
    });
  }
  const bookFound=await prisma.books.findUnique({
    where:

    {
      id:bookId
    }
  });
  if(!bookFound)
  {
    c.status(400);
    return c.json({
      status:400,
      message:"Book not found in the database or Invalid book Id",
      data:null
    });
  }

const editDetails=await prisma.books.update({
  where:{
    id:bookId
  },
  data:{
    title:body.title as string || bookFound.title,
    author: body.author as string || bookFound.author,
    description: body.description as string || bookFound.description,
    category: (body.category as Category) || bookFound.category,
    totalCopies: parseInt(body.totalCopies as string) || bookFound.totalCopies,
    available: parseInt(body.available as string) || bookFound.available,
    publication: typeof body.publication === 'number' ? body.publication : bookFound.publication,
    image:bookFound.image
    
  }
});
  if(!editDetails)
  {
    c.status(400);
    return c.json({
      status:400,
      message:"Internal server error occured while updating book details",
      data:null
    });
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
    c.status(400);
    return c.json({
      status:400,
      message:"Book not found in the database or Invalid book Id",
      data:null
    });
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
      c.status(400);
      return c.json({
        status:400,
        message:"Internal server error occured while updating book image",
        data:null
      });
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
        c.status(400);
        return c.json({
          status:400,
          message:"Invalid book Id or book does not exists in the databse",
          data:null
        });
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
      c.status(400);
      return c.json({
        status:400,
        message:"Internal server error occured while deleting book",
        data:null
      });
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
    c.status(400);
    return c.json({
      status:400,
      message:"Internal server error occured while getting books",
      data:null
    });
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
    c.status(400);
    return c.json({
      status: 400,
      message: "Category parameter is missing",
      data:null
    });
  }

  const response = await prisma.books.findMany({
    where: {
      category: findCategory
    }
  });

  if (response.length === 0) {
    c.status(400);
    return c.json({
      status: 400,
      message: "No books found in the database for the given category",
      data: null
    });
  }

  return c.json({
    status: 200,
    message: "Books fetched successfully based on category",
    data: response
  });
});

// # Get all transactions
router.get('/transactions',jwtVerify,async(c)=>
{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const response=await prisma.transactions.findMany();
  if(!response)
  {
    c.status(400);
    return c.json({
      status:400,
      message:"Internal server error occured while fetching transactions",
      data:null
    });
  }
  return c.json({
    status:200,
    message:"Transactions fetched successfully",
    data:response
  });
});

router.put('/return/:transactionId', jwtVerify, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const transactionId = c.req.param('transactionId');
  const { status } = await c.req.json(); // Expecting the new status from the request body

  const FINE_PER_DAY = 10; // Example fine amount per day

  // Ensure the status provided is one of the valid options
  const validStatuses = [TransactionStatus.TAKEN, TransactionStatus.RETURNED, TransactionStatus.LOST];
  if (!validStatuses.includes(status)) {  
    c.status(400);  
    return c.json({
      status: 400,
      message: 'Invalid status. Status must be TAKEN, RETURNED, or LOST.',
      data: null,
        });
  }

  try {
    // Start a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Find the transaction by id
      const transaction = await tx.transactions.findUnique({
        where: {
          id: transactionId,
        },
      });

      if (!transaction) {
        throw new Error('Transaction not found');
      }

      // Find the associated book by bookId
      const book = await tx.books.findUnique({
        where: {
          id: transaction.bookId,
        },
      });

      if (!book) {
        throw new Error('Associated book not found');
      }

      // Initialize fine to 0
      let fine = 0;

      // If the status is RETURNED, calculate the fine if it's past the due date
      if (status === TransactionStatus.RETURNED) {
        const currentDate = new Date();
        const returnDate = new Date(transaction.Return_date);

        if (currentDate > returnDate) {
          const daysLate = Math.ceil(
            (currentDate.getTime() - returnDate.getTime()) / (1000 * 60 * 60 * 24)
          );
          fine = daysLate * FINE_PER_DAY; // Calculate fine based on the number of late days
        }

        // Increment the available count since the book is returned
        await tx.books.update({
          where: {
            id: transaction.bookId,
          },
          data: {
            available: {
              increment: 1,
            },
          },
        });
      } else if (status === TransactionStatus.LOST) {
        // If the book is lost, decrement the total copies and available copies
        await tx.books.update({
          where: {
            id: transaction.bookId,
          },
          data: {
            totalCopies: {
              decrement: 1,
            },
          },
        });
        fine=1000;
      }

      // Update the transaction with the new status and fine if applicable
      const updatedTransaction = await tx.transactions.update({
        where: {
          id: transactionId,
        },
        data: {
          status: status,
          Fine: fine, // Add the calculated fine to the transaction
          Return_date: status === TransactionStatus.RETURNED ? new Date() : transaction.Return_date,
        },
      });

      return updatedTransaction;
    });

    // Return success response
    return c.json({
      status:200,
      message:"Transaction updated successfully",
      data:result
    });
  } catch (error) {
    c.status(500);
    return c.json({
      status:500,
      message:"Internal server error occured while updating transaction",
      data:null
    }); 
  }
});



export default router;