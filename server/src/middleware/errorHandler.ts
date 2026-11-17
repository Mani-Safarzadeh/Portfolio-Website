import type { ErrorRequestHandler } from 'express'
import { z } from 'zod'
import { env } from '../config/env.js'
import { AppError } from '../lib/AppError.js'

type ErrorBody = {
  status: 'error'
  code: string
  message: string
  details?: unknown
}

/** One place that turns every error into the same JSON shape. Must be the last middleware. */
export const errorHandler: ErrorRequestHandler = (error: unknown, _req, res, next) => {
  if (res.headersSent) {
    next(error)
    return
  }

  if (error instanceof AppError) {
    const body: ErrorBody = { status: 'error', code: error.code, message: error.message }
    if (error.details !== undefined) body.details = error.details
    res.status(error.statusCode).json(body)
    return
  }

  // Failed input validation (the API will use Zod schemas).
  if (error instanceof z.ZodError) {
    res.status(400).json({
      status: 'error',
      code: 'VALIDATION_ERROR',
      message: 'The data you sent is not valid',
      details: z.flattenError(error).fieldErrors,
    } satisfies ErrorBody)
    return
  }

  // Broken JSON or a too-big body (thrown by express.json()).
  if (isBodyParserError(error)) {
    res.status(error.status).json({
      status: 'error',
      code: 'BAD_REQUEST',
      message: 'The request body could not be read',
    } satisfies ErrorBody)
    return
  }

  // Unexpected: log everything here, tell the client as little as possible.
  console.error(error)
  res.status(500).json({
    status: 'error',
    code: 'INTERNAL_ERROR',
    message: env.isProduction || !(error instanceof Error) ? 'Something went wrong' : error.message,
  } satisfies ErrorBody)
}

function isBodyParserError(error: unknown): error is { status: number; type: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    typeof error.type === 'string' &&
    error.type.startsWith('entity.') &&
    'status' in error &&
    typeof error.status === 'number'
  )
}
