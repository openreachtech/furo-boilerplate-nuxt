import '@openreachtech/furo-nuxt/types/furo-nuxt'

declare module 'nuxt/schema' {
  interface RuntimeConfig {
    ENDPOINT_URL: string
  }

  interface PublicRuntimeConfig {
    ENDPOINT_URL: string
  }
}
