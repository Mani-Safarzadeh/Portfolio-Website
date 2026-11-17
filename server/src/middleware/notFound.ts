import type { RequestHandler } from 'express'
import { NotFoundError } from '../lib/AppError.js'

/** Runs after all routes: anything that reached here matched nothing. */
export const notFound: RequestHandler = (req, _res, next) => {
  next(new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`))
}
