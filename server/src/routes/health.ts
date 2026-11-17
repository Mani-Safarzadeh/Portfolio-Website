import { Router } from 'express'

export const healthRouter = Router()

// GET /api/health: used to check that the server is up.
healthRouter.get('/', (_req, res) => {
  res.json({ status: 'ok', uptime: Math.round(process.uptime()) })
})
