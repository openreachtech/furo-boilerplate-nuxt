import {
  defineNuxtPlugin,
  useRuntimeConfig,
} from '#app'

import graphqlConfig from '~/app/graphql/graphql.config.js'

/**
 * Setup graphql config.
 */
export default defineNuxtPlugin(async nuxtApp => {
  setupGraphqlConfig()
})

/**
 * Setup graphql config.
 */
function setupGraphqlConfig () {
  if (graphqlConfig.ENDPOINT_URL) {
    return
  }

  const runtimeConfig = useRuntimeConfig()

  graphqlConfig.ENDPOINT_URL = runtimeConfig.public
    .ENDPOINT_URL
}
