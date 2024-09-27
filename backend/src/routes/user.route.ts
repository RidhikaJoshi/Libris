import { Hono } from 'hono'
import { PrismaClient, Category,TransactionStatus } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import passwordHashing from '../utils/passwordHashing'
import jwtVerify from '../utils/jwtVerify'
import {userSignupSchema,userSigninSchema} from '@ridhikajoshi/libris-common'

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
    const {success} =userSignupSchema.safeParse(body);
    if(!success)
    {
      c.status(400);
      return c.json({
        status: 400,
        message: "Invalid user details",
        data: null
      });
    }
    const hashedPassword=await passwordHashing(body.password);
    const response=await prisma.user.create({

      data:{
        email:body.email,
        fullName:body.fullName,
        password:hashedPassword
      }
    });
    if(!response){
      c.status(500);
      return c.json({
        status:500,
        message:"Internal server error occured while signup",
        data:null
      });
    }
  
    const payload={
     id:response.id,
    };
    const secret=c.env.JWT_SECRET;
    const token=await sign(payload,secret);
  
    if(!token){
      c.status(500);
      return c.json({
        status:500,
        message:"Internal server error occured while login",
        data:null
      });
    }
    c.status(200);
    return c.json({
      status:200,
      message:'User created successfully',
      data:token
    });
  });
  
  // Signin Route
router.post('/signin',async(c) =>
  {
      const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
  
      const body=await c.req.json();
      const {success} =userSigninSchema.safeParse(body);
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
      const response=await prisma.user.findUnique({

        where:{
          email:body.email,
          password:hashedPassword
        }
      });
      if(!response)
      {
        c.status(400);
        return c.json({
          status: 400,
          message: "Invalid email or password",
          data: null
        });
      }
      const payload={
        id:response.id
      };
      const secret=c.env.JWT_SECRET;
      const token=await sign(payload,secret);
      if(!token)
      {
        c.status(500);
        return c.json({
          status:500,
          message:"Internal server error occured while login",
          data:null
        });
      }
    c.status(200);
      return c.json({
        status:200,
        message:"User login successfully",
        data:token
      });
  
});
  
//  # Get all available books
router.get('/books',async(c) =>
{
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const response=await prisma.books.findMany({});
  if(!response)
  {
    c.status(500);
      return c.json({
      status:500,
      message:"Internal server error occurred while fetching books",
      data:null
    });
  }
  c.status(200);
  return c.json({
    status:200,
    message:"Books fetched successfully",
    data:response
    })
});

//  # Get details of a specific book by ID
router.get('/books/:id',async(c)=>
{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const bookId=c.req.param('id');
    const response=await prisma.books.findUnique({
      where:{
        id:bookId
      }
    });
    if(!response)
    {
        c.status(400);
          return c.json({
            status:400,
            message:"Book not found",
            data:null
        });
    }
    c.status(200);
    return c.json({
      status:200,
      message:"Book details fetched successfully",
      data:response
    })
})

// # Get books by category
router.get('/books/category/:category',async(c)=>
{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const findByCategory=c.req.param('category') as Category;
  const response=await prisma.books.findMany({
    where:{
      category:findByCategory
    }
  });
  if(!response)
  {
    c.status(400);
      return c.json({
      status:400,
      message:"No books found in this category",
      data:null
    });
  }
  c.status(200);
  return c.json({
    status:200,
    message:"Books fetched successfully",
    data:response
  });

});

// # Issue a book (generate a transaction)
router.post('/issue/:id', jwtVerify, async (c) => {       
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const bookId=c.req.param('id');
  const userId = c.get('userId');

  try {
    // Start a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Find the book by id
      const book = await tx.books.findUnique({
        where: {
          id: bookId,
        },
      });

      if (!book) {
        throw new Error('Book not found'); // Throwing error to roll back the transaction
      }

      if (book.available <= 0) {
        throw new Error('Book is out of stock');
      }
      // checking if user has more than 3 books issued
      const userBooks=await tx.transactions.count({
        where:{
          userId:userId,
          status: {
            in: [TransactionStatus.ISSUED, TransactionStatus.TAKEN, TransactionStatus.LOST], // Correct status check
          },
        }
      });
      if(userBooks>=3)
      {
        throw new Error("User has already issued 3 books");
      }

      // Issue the book (create a transaction record)
      const transaction = await tx.transactions.create({
        data: {
          bookId: bookId,
          userId: userId,
          bookName: book.title,
          bookAuthor: book.author,
          Issue_date: new Date(),
          Return_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Return date set to 7 days later
          status: TransactionStatus.ISSUED,
        },
      });

      // Reduce the number of available books
      await tx.books.update({
        where: {
          id: bookId,
        },
        data: {
          available: book.available - 1,
        },
      });

      // Return the transaction details if successful
      return transaction;
    });
    //console.log(result);
    // Return a success response if the transaction succeeds
    c.status(200);
    return c.json({
      status: 200,
      message: 'Book issued successfully',
      data: result,
    });
  } catch (error) {   
    c.status(500);
    // Handle any error by returning a proper message
    return c.json({
      status: 500,
      message: error instanceof Error ? error.message : 'Internal server error occurred while issuing the book',
      data: null,
    });
  }
});

// # Get all transactions of a user
router.get('/transactions',jwtVerify,async(c)=>
{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId=c.get('userId');
    const response=await prisma.transactions.findMany({
      where:{
        userId:userId

      }
    });
    if(!response)
    {   
      c.status(400);
      return c.json({
        status:400,
        message:"No transactions found",
        data:null
      });
    }
    c.status(200);
    return c.json({
      status:200,
      message:"Transactions fetched successfully",
      data:response
        });
});

export default router;