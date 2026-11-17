import { createApp } from './app.js'
import { env } from './config/env.js'

const server = createApp().listen(env.port, () => {
  console.log(`API ready on http://localhost:${env.port} (${env.nodeEnv})`)
})

// Stop taking new requests, let running ones finish, then exit.
function shutdown(signal: string) {
  console.log(`${signal} received, shutting down`)
  server.close(() => process.exit(0))
  // If something hangs, do not wait forever.
  setTimeout(() => process.exit(1), 10_000).unref()
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))
