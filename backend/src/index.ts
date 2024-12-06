import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { verify } from 'hono/jwt'
type Bindings = {
    DATABASE_URL: string,
    JWT_SECRET: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/api/v1/blog/*', async (c, next) => {
    const header = c.req.header('Authorization') || '';
    const token = header.split(" ")[1];
    const response = await verify(token, c.env.JWT_SECRET)
    if (response.id) {
        next()
    } else {
        return c.json({ message: 'Unauthorized' }, 401);
    }
})

app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)



export default app
