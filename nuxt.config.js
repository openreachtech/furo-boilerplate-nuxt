import {
  defineNuxtConfig,
} from 'nuxt/config'

import furoEnv from './app/globals/furo-env'

// Reference: https://nuxt.com/docs/api/nuxt-config.
export default defineNuxtConfig({
  // Nuxt App configuration: https://nuxt.com/docs/api/nuxt-config#app.
  app: {
    head: {
      title: '⋯', // Loading title, can not be empty.
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
  //
  // Only furo-nuxt's structural stylesheets are loaded: the cascade layer declaration,
  // the z-index layers and the reset.
  //
  // Three of furo-nuxt's stylesheets are deliberately left out, because what they decide
  // is the application's to decide, not the boilerplate's:
  //
  //   `0010.variables-palette-color-scale.css` - a palette of named colour scales
  //   `0200.base.css`                          - a design for bare <button>, <h1>~<h3>,
  //                                              <input>, <p> and <section>
  //   `0300.gimmick.css`                       - the `.-trigger-unlock-*` / `.-aim-unlock`
  //                                              classes, and locking <body> behind an
  //                                              open <dialog>
  //
  // Define your own in a stylesheet of your own and add it below, after furo-nuxt's three
  // and before `main.css`. These are the custom properties furo-nuxt reads but never
  // declares, so the application has to:
  //
  //   `0100.reset.css`              --value-golden-ratio
  //   <FuroButtonDialog>            --size-thinnest
  //   <FuroDialog>                  --color-background-highlight, --color-text-highlight
  //   <FuroOffCanvasMenuLayout>     --color-background-header, --color-background-nav,
  //                                 --size-header-height, --size-nav-width,
  //                                 --size-screen-height
  //   <FuroPagination>              --color-background-highlight, --color-text-highlight,
  //                                 --color-background-hover, --color-text-hover,
  //                                 --color-disabled
  //   <FuroTabLayout>               --color-background-highlight, --color-text-highlight
  css: [
    '~/node_modules/@openreachtech/furo-nuxt/lib/assets/css/0000.furo.css',
    '~/node_modules/@openreachtech/furo-nuxt/lib/assets/css/0020.variables-z-index.css',
    '~/node_modules/@openreachtech/furo-nuxt/lib/assets/css/0100.reset.css',

    '~/assets/css/main.css',
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
    '@nuxt/icon',
  ],

  // Shared build configuration: https://nuxt.com/docs/api/nuxt-config#build.
  build: {
    transpile: [
    ],
  },

  hooks: {
    'pages:extend' (pages) {
      kickOutJsFilesFromPages({
        pages,
      })
    },
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

  // To enable Server-Side Rendering or not: https://nuxt.com/docs/api/nuxt-config#ssr
  ssr: false,

  // Vite: https://nuxt.com/docs/api/nuxt-config#vite
  vite: {
    build: {
      // 'esnext' is chosen as the build target to leverage the latest JavaScript features
      // and ensure compatibility with modern browsers. This helps optimize performance
      // and reduce polyfill usage in the final build.
      target: 'esnext',
    },
  },

  // Restart dev server when changed: https://nuxt.com/docs/api/nuxt-config#watch
  watch: [
    '.furo-env.development',
  ],
})

/**
 * Kick out `.js` files from `/pages`.
 *
 * @param {{
 *   pages: Array<import('@nuxt/schema').NuxtPage>
 * }} params - Parameters.
 * @returns {void}
 */
function kickOutJsFilesFromPages ({
  pages,
}) {
  pages.splice(
    0,
    pages.length,
    ...filterJsPages({
      pages,
    })
  )
}

/**
 * Filter js pages.
 *
 * @param {{
 *   pages: Array<import('@nuxt/schema').NuxtPage>
 * }} params - Parameters.
 * @returns {Array<import('@nuxt/schema').NuxtPage>}
 */
function filterJsPages ({
  pages,
}) {
  return pages
    .filter(page => !page.file?.endsWith('.js'))
    .map(page => ({
      ...page,
      children: Array.isArray(page.children)
        ? filterJsPages({
          pages: page.children,
        })
        : page.children,
    }))
}
