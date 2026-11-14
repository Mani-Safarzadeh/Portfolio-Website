/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL the browser uses for API calls. "/api" works with the dev proxy. */
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
