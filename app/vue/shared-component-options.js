import {
  useRuntimeConfig,
} from '#app'

import {
  onMounted,
} from 'vue'

import {
  useFuroSetup,
} from '@openreachtech/furo-nuxt'

import {
  STORAGE_KEY,
} from '../constants.js'

const {
  setupFuroEnv,
} = useFuroSetup({
  STORAGE_KEY,
})

/** @type {import('vue').ComponentOptions} */
export default {
  setup (
    props,
    context
  ) {
    onMounted(() => {
      setupFuroEnv({
        runtimeConfig: useRuntimeConfig(),
      })
    })

    return {}
  },
}
