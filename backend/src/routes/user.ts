import { Hono } from 'hono'

const userRouter = new Hono()

userRouter.get('/signup', (c) => {
  return c.json({
    message: 'Get all users'
  })
})
// postgresql://postsql_owner:dG4jCzEestD3@ep-quiet-dew-a70f2ah1.ap-southeast-2.aws.neon.tech/postsql?sslmode=require

// DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiYmNkOGQyMDctNWI0MC00Njg2LWFlNGQtNWU4MDIwMTNhZDRlIiwidGVuYW50X2lkIjoiM2UzOTVkZDNmYTRkODE1YjMwNzllYmZkMzFkZTkxZTBlY2NiNDdiOGIzMDE3NmIxYjhkY2E0MTkyNTE1MDFlZiIsImludGVybmFsX3NlY3JldCI6IjQ5ZThmZmYwLTE5NTMtNDUyMS04MGIyLTRhMzBjMTliMjZiZCJ9.Jm6UN90djbeSBfMFkSyrcQx6SpVZu16d_NFdYSV_VMg"
// DIRECT_URL="<YOUR_DATABASE_CONNECTION_STRING>"
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiYmNkOGQyMDctNWI0MC00Njg2LWFlNGQtNWU4MDIwMTNhZDRlIiwidGVuYW50X2lkIjoiM2UzOTVkZDNmYTRkODE1YjMwNzllYmZkMzFkZTkxZTBlY2NiNDdiOGIzMDE3NmIxYjhkY2E0MTkyNTE1MDFlZiIsImludGVybmFsX3NlY3JldCI6IjQ5ZThmZmYwLTE5NTMtNDUyMS04MGIyLTRhMzBjMTliMjZiZCJ9.Jm6UN90djbeSBfMFkSyrcQx6SpVZu16d_NFdYSV_VMg
userRouter.post('/signin', (c) => {
  return c.json({
    message: 'Create new user'
  })
})

export { userRouter } 