import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from 'hono/adapter'

// const prisma = new PrismaClient({
//     datasources: env.DATABASE_URL,
// }).$extends(withAccelerate())

const app = new Hono()

app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)



export default app
