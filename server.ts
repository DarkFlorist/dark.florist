import { Hono } from 'hono'

type Env = {
  Bindings: {
    ASSETS: Fetcher
  }
}

const app = new Hono<Env>()

app.get('*', (c) => c.env.ASSETS.fetch(c.req.url))

export default app
