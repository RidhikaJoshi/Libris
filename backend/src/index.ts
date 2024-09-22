import { Hono } from 'hono'
import { cors } from 'hono/cors'
import adminRouter from './routes/admin.route'
import userRouter from './routes/user.route';

// defining the type of environment variables whenever you initialize the the app using hono
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
    JWT_SECRET:string
	};
  Variables: {
    userId: string
    imageUrl:string
  };
}>();

// Configure CORS options
const corsOptions = {
  origin: ['http://localhost:5173'], // Add your frontend domains
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length', 'X-Requested-With'],
  maxAge: 600, // Cache preflight request results for 10 minutes (600 seconds)
  credentials: true, // Allow cookies and authentication headers
};

app.use(cors(corsOptions));

app.route('/api/v1/admin',adminRouter);
app.route('/api/v1/users',userRouter);

export default app
