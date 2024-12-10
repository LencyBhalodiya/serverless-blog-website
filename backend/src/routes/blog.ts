import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'

type Bindings = {
  DATABASE_URL: string,
  JWT_SECRET: string
}

const blogRouter = new Hono<{ Bindings: Bindings, Variables: { userId: string } }>()

blogRouter.use(async (c, next) => {
  const jwt = c.req.header('Authorization');
  if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  const token = jwt.split(' ')[1];
  const payload = await verify(token, c.env.JWT_SECRET);
  if (!payload) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  c.set('userId', payload.id as string);
  await next()
});

blogRouter.post('/', async (c) => {
  try {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      }
    })
    return c.json({ id: blog.id })
  } catch (error) {
    c.status(500);
    return c.json({ message: 'Internal Server Error' })
  }
})

blogRouter.put('/', async (c) => {
  const userId = c.get('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const blog = await prisma.post.update({
      where: {
        id: body.id
      },
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      }
    })
    return c.json({ id: blog.id })
  } catch (error) {
    c.status(500);
    return c.json({ message: 'Internal Server Error' })
  }
})

blogRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const post = await prisma.post.findUnique({
      where: {
        id
      }
    });

    if (!post) {
      c.status(404)
      return c.json({ message: 'Post not found' });
    }
    return c.json(post);
  } catch (error) {
    c.status(500)
    return c.json({ message: 'Internal server error' })
  }

})

export { blogRouter } 