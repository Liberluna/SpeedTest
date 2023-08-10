import { Hono } from 'hono'
import { serveStatic } from 'hono/middleware.ts'
import * as path from 'std/path/mod.ts'
import * as esbuild from 'esbuild/wasm.js'

const app = new Hono()

const speedHeaderHead = 'GET　/testyourspeed.deno.dev/speed HTTP/1.1\n'
app.get('/speed', c => {
  
  const header = speedHeaderHead + [...c.req.headers.entries()].map(h => `${h[0]}:${h[1]}`).join('\n') + "\n"
  
  return c.text((new Blob([header], { type: "text/plain" })).size)
})
app.get('/*', async c => {
  const filepath = path.join('public', c.req.path)
  let file: Uint8Array = new Uint8Array()
  try {
    file = await Deno.readFile(filepath)
  } catch {
    try {
      file = await Deno.readFile(path.join(filepath, 'index.html'))
    } catch {
      return c.notFound()
    }   
  }
  if (c.req.path.slice(-3) === ".ts") {
    return c.text('ts')
  }
  return c.body(file)
})
Deno.serve(app.fetch)
