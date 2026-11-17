/** An error we expect and can explain to the client. Anything else becomes a plain 500. */
export class AppError extends Error {
  readonly statusCode: number
  readonly code: string
  readonly details: unknown

  constructor(statusCode: number, code: string, message: string, details?: unknown) {
    super(message)
    this.name = 'AppError'
    this.statusCode = statusCode
    this.code = code
    this.details = details
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Not found') {
    super(404, 'NOT_FOUND', message)
    this.name = 'NotFoundError'
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Bad request', details?: unknown) {
    super(400, 'BAD_REQUEST', message, details)
    this.name = 'BadRequestError'
  }
}
