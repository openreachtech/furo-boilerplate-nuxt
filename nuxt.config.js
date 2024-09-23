import {
  defineNuxtConfig,
} from 'nuxt/config'

import {
  NuxtFuroEnvLoader,
} from '@openreachtech/furo-nuxt'

const furoEnv = NuxtFuroEnvLoader.create()
  .loadEnv()

// Reference: https://nuxt.com/docs/api/nuxt-config.
export default defineNuxtConfig({
  // Nuxt App configuration: https://nuxt.com/docs/api/nuxt-config#app.
  app: {
    head: {
      title: 'furo-boilerplate',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  // Global CSS: https://nuxt.com/docs/api/nuxt-config#css.
  css: [
    '~/assets/css/variables.css',
    '~/assets/css/reset.css',
  ],

  // Plugins to run before rendering page: https://nuxt.com/docs/api/nuxt-config#plugins-1.
  // NOTE: Plugins at the top level of `~/plugins/` directory are auto-registered. You will only need
  // to use this if you have nested files. E.g. `~/plugins/bar/foo.ts` <- This won't be auto-registered.
  plugins: [
  ],

  // Configure Nuxt component auto-registration: https://nuxt.com/docs/api/nuxt-config#components.
  components: {
    dirs: [],
  },

  // Disable auto-import: https://nuxt.com/docs/guide/concepts/auto-imports#disabling-auto-imports.
  imports: {
    autoImport: false,
  },

  // Modules: https://nuxt.com/docs/api/nuxt-config#modules-1.
  modules: [
  ],

  // Shared build configuration: https://nuxt.com/docs/api/nuxt-config#build.
  build: {
    transpile: [
    ],
  },

  // Runtime configuration: https://nuxt.com/docs/api/nuxt-config#runtimeconfig
  runtimeConfig: {
    // on server
    ...furoEnv,

    // on client
    public: {
      ...furoEnv,
    },
  },
})
