import { verify } from 'hono/jwt'
// middleware to verify the jwt token
import { Context, Next } from 'hono'

// middleware to verify the jwt token
async function jwtVerify(c: Context, next: Next)
{
    // get the header from Context
    // verify the header using jwt verify
    // if valid process to the next middleware
    // if not valid return 401 status
    const header=c.req.header("authorization") || "";
       // Ensure the token is in the correct format: "Bearer <token>"
       if (!header.startsWith('Bearer ')) {
        return c.json({
          status: 401,
          message: 'Authorization header format is invalid',
          data: null,
        });
      }
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
};

export default jwtVerify;