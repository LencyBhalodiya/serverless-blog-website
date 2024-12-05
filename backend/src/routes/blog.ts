import { Hono } from 'hono'

const blogRouter = new Hono()

blogRouter.get('/', (c) => {
  return c.json({
    message: 'Get all blog posts'
  })
})

blogRouter.post('/', (c) => {
  return c.json({
    message: 'Create new blog post'
  })
})

export { blogRouter } 