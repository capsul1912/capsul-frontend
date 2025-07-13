/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_BASE_HOST: string
  readonly VITE_GIPHY_API_KEY: string
  readonly VITE_CLERK_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
