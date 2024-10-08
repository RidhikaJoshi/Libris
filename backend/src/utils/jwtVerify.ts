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
    try {
      const header = c.req.header("authorization") || "";
      // Ensure the token is in the correct format: "Bearer <token>"
      if (!header.startsWith('Bearer ')) {
        c.status(401);
        return c.json({
          status: 401,
          message: 'Authorization header format is invalid',
          data: null,
        });
      }
      const token = header.split(" ")[1];
      const verifiedHeader = await verify(token, c.env.JWT_SECRET);
      if (!verifiedHeader?.id) {
        c.status(401);
        return c.json({
          status: 401,
          message: "Unauthorized access to the application",
          data: null
        });
      }
      // adding the userId (payload) to the context
      c.set('userId', verifiedHeader.id as string);
      await next();
    } catch (error) {
      console.error("JWT verification error:", error);
      c.status(401);
      return c.json({
        status: 401,
        message: "Error verifying authentication token",
        data: null
      });
    }
};

export default jwtVerify;