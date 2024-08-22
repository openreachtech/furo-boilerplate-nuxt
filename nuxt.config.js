import {
  defineNuxtConfig,
} from 'nuxt/config'

// Reference: https://nuxt.com/docs/api/nuxt-config.
export default defineNuxtConfig({
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

  css: [
    '~/assets/css/variables.css',
    '~/assets/css/reset.css',
  ],

  plugins: [
  ],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  buildModules: [
  ],

  modules: [
  ],

  build: {
    transpile: [
    ],
  },
})
