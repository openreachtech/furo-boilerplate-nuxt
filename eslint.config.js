import openreachtechConfig from '@openreachtech/eslint-config'
import vuePluginConfig from './eslint/plugin-vue.js'

export default [
  ...openreachtechConfig,

  {
    ignores: [
      '**/.nuxt/**',
      '**/.output/**',
      '**/dist/**',
      '**/node_modules/**',
    ],
  },

  {
    files: [
      'tests/**/*.js',
    ],
    rules: {
      'jsdoc/require-jsdoc': 'off',
    },
  },

  // Turn off the rules temporarily.
  {
    rules: {
      '@stylistic/lines-around-comment': 'off',
    },
  },

  ...vuePluginConfig,
]
