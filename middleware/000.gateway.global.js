import {
  navigateTo,
} from 'nuxt/app'

import {
  defineNuxtRouteMiddleware,
} from '#app'

import {
  FuroMeta,
} from '@openreachtech/furo-nuxt'

import {
  ROUTE_PATH,
} from '~/app/constants.js'

import {
  useSessionStore,
} from '~/app/session/useSessionStore.js'

import SessionStoreClerk from '~/app/session/SessionStoreClerk.js'
import SessionRenewer from '~/app/session/SessionRenewer.js'
import SessionGatekeeper from '~/app/session/SessionGatekeeper.js'

/**
 * Gateway middleware (global).
 *
 * Ensures a usable session on every guarded navigation: a public route passes through untouched; a
 * guarded route proceeds when `SessionGatekeeper` can establish a session (a token is held, or one is
 * renewed from the refresh cookie), otherwise it redirects to sign-in with a `redirect` back-link.
 *
 * @type {import('nuxt/app').RouteMiddleware}
 */
export default defineNuxtRouteMiddleware(async to => {
  if (
    isPublicRoute({
      routeTo: to,
    })
  ) {
    return goNextAsIs()
  }

  const gatekeeper = createSessionGatekeeper()

  const hasSession = await gatekeeper.establishesSession()

  if (hasSession) {
    return goNextAsIs()
  }

  return navigateTo(`${ROUTE_PATH.SIGN_IN}?redirect=${to.fullPath}`)
})

/**
 * Check whether a route is public (requires no session).
 *
 * @param {{
 *   routeTo: import('vue-router').RouteLocationNormalized
 * }} params - Parameters.
 * @returns {boolean} - true when the route needs no session.
 */
function isPublicRoute ({
  routeTo,
}) {
  if (routeTo.path === ROUTE_PATH.SIGN_IN) {
    return true
  }

  const furoMeta = FuroMeta.create({
    routeTo,
  })

  return furoMeta.skipFilter
}

/**
 * Create the session gatekeeper, wiring the store through the clerk and the renewer.
 *
 * @returns {SessionGatekeeper} - The gatekeeper.
 */
function createSessionGatekeeper () {
  const sessionStore = useSessionStore()

  const sessionClerk = SessionStoreClerk.create({
    sessionStore,
  })

  const sessionRenewer = SessionRenewer.create({
    sessionStore,
    sessionClerk,
  })

  return SessionGatekeeper.create({
    sessionClerk,
    sessionRenewer,
  })
}

/**
 * Go next as is.
 *
 * @returns {Promise<void>}
 */
async function goNextAsIs () {
  return Promise.resolve()
}
