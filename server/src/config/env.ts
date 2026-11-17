import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { z } from 'zod'

// src/config -> src -> server (also true for dist/config -> dist -> server).
const serverRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  CLIENT_ORIGIN: z.url().default('http://localhost:5173'),
  DATA_DIR: z.string().min(1).default('data'),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  // Stop at start-up with a clear message instead of failing later in a strange place.
  console.error('Invalid environment variables:')
  console.error(z.prettifyError(parsed.error))
  process.exit(1)
}

const { NODE_ENV, PORT, CLIENT_ORIGIN, DATA_DIR } = parsed.data

export const env = {
  nodeEnv: NODE_ENV,
  isProduction: NODE_ENV === 'production',
  port: PORT,
  clientOrigin: CLIENT_ORIGIN,
  dataDir: path.resolve(serverRoot, DATA_DIR),
} as const
