import { Hono } from 'hono'

const app = new Hono()

const speedHeaderHead = 'GET　/testyourspeed.deno.dev/speed HTTP/1.1\n'
app.get('/speed', c => {
  
  const header = speedHeaderHead + [...c.req.headers.entries()].map(h => `${h[0]}:${h[1]}`).join('\n') + "\n"

  return c.text((new Blob([header], { type: "text/plain" })).size)
})

Deno.serve(app.fetch)
