import {
  NuxtFuroEnvLoader,
} from '@openreachtech/furo-nuxt'

const furoEnv = NuxtFuroEnvLoader.create()
  .loadEnv()

export default furoEnv
