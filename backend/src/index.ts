import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
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





app.route('/api/v1/admin',adminRouter);
app.route('/api/v1/users',userRouter);

export default app
