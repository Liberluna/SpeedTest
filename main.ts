import { Hono } from 'hono'

const app = new Hono()

app.get('/speed', c => {
  
})

Deno.serve(app.fetch)
