import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { sign } from 'hono/jwt'

type Bindings = {
  DATABASE_URL: string,
  JWT_SECRET: string
}
const userRouter = new Hono<{ Bindings: Bindings }>()

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const body = await c.req.json();
    const { email, password } = body;

    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    })

    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({ jwt: token });
  } catch (error) {
    c.status(500);
    return c.json({ message: 'Internal Server Error' })
  }
})

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const body = await c.req.json();
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password
      }
    })
    if (!user) {
      return c.json({
        message: 'User not found'
      }, 404)
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({ jwt: token });
  } catch (error) {
    c.status(500);
    return c.json({ message: 'Internal Server Error' })
  }
})

export { userRouter }
