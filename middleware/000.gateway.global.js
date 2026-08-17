import {
  navigateTo,
} from 'nuxt/app'

import {
  defineNuxtRouteMiddleware,
} from '#app'

import {
  AccessTokenClerk,
  FuroMeta,
} from '@openreachtech/furo-nuxt'

// TODO: should be moved to configuration
const SIGN_IN_PATH = '/sign-in'

/**
 * Gateway middleware (global)
 *
 * @param {import('nuxt/app').RouteMiddleware} context - The context
 * @returns {Promise<import('nuxt/app').RouteMiddleware>}
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  const accessTokenClerk = AccessTokenClerk.create()

  if (accessTokenClerk.existsToken()) {
    return goNextAsIs()
  }

  // should skip if sign-in page -----------------------------------------------
  if (to.path === SIGN_IN_PATH) {
    return goNextAsIs()
  }

  // should skip to confirm authentication -------------------------------------
  const furoMeta = FuroMeta.create({
    routeTo: to,
  })

  if (furoMeta.skipFilter) {
    return goNextAsIs()
  }

  return navigateTo(`${SIGN_IN_PATH}?redirect=${to.fullPath}`)
})

/**
 * Go next as is.
 *
 * @returns {Promise<void>}
 */
async function goNextAsIs () {
  return Promise.resolve()
}
