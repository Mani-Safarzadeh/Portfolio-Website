import cors from 'cors'
import express from 'express'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'
import { env } from './config/env.js'
import { errorHandler } from './middleware/errorHandler.js'
import { notFound } from './middleware/notFound.js'
import { apiRouter } from './routes/index.js'

export function createApp() {
  const app = express()

  app.disable('x-powered-by')
  app.use(helmet())
  app.use(cors({ origin: env.clientOrigin }))
  // Small limit: this API only receives short text.
  app.use(express.json({ limit: '10kb' }))

  app.use(
    '/api',
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 300,
      standardHeaders: 'draft-8',
      legacyHeaders: false,
      message: { status: 'error', code: 'RATE_LIMITED', message: 'Too many requests, try again later' },
    }),
    apiRouter,
  )

  // Order matters: unknown routes first, then the error handler last.
  app.use(notFound)
  app.use(errorHandler)

  return app
}
