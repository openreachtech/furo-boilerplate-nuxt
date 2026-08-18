import {
  onMounted,
} from 'vue'

import {
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'

import {
  useSessionStore,
} from '~/app/session/useSessionStore.js'

import SessionStoreClerk from '~/app/session/SessionStoreClerk.js'
import SessionRenewer from '~/app/session/SessionRenewer.js'
import SessionRevoker from '~/app/session/SessionRevoker.js'
import SessionRequestRunner from '~/app/session/SessionRequestRunner.js'
import SessionRequestAuthorizer from '~/app/session/SessionRequestAuthorizer.js'

/**
 * App GraphQL client.
 *
 * Wraps furo's `useGraphqlClient(Launcher)` with the cookie-auth session lifecycle:
 * every request carries the in-memory access token (read per request, so a retry gets the fresh one),
 * and each request is routed through `SessionRequestRunner` — which renews + retries once on a
 * `102 Unauthenticated` response and revokes the session on a `205 RefreshTokenReused` one.
 *
 * A composable, so it runs in the Nuxt context: it reads the session store here and injects it into
 * the plain session classes (which must never call a composable themselves).
 *
 * @param {import('@openreachtech/furo-nuxt').GraphqlLauncherHooksArgs['GraphqlLauncher']} Launcher - GraphQL launcher class.
 * @returns {AppGraphqlClient} - The wrapped client.
 */
export default function useAppGraphqlClient (Launcher) {
  const sessionStore = useSessionStore()

  const sessionClerk = SessionStoreClerk.create({
    sessionStore,
  })

  const sessionAuthorizer = SessionRequestAuthorizer.create({
    sessionClerk,
  })

  const sessionRenewer = SessionRenewer.create({
    sessionStore,
    sessionClerk,
  })

  const sessionRevoker = SessionRevoker.create({
    sessionClerk,
  })

  const runner = SessionRequestRunner.create({
    sessionRenewer,
    sessionRevoker,
  })

  const client = useGraphqlClient(Launcher)

  return {
    ...client,

    invokeRequestOnEvent,
    invokeRequestOnMounted,
    invokeRequestWithFormValueHash,
  }

  /**
   * Invoke the request on an event, healed by the session runner.
   *
   * @param {furo.GraphqlRequestArgs} [requestArguments] - Request arguments.
   * @returns {Promise<furo.Capsule<*>>} - The capsule.
   */
  async function invokeRequestOnEvent (requestArguments = {}) {
    return runThroughRunner({
      invokeRequest: client.invokeRequestOnEvent,
      requestArguments,
    })
  }

  /**
   * Invoke the request on mounted, healed by the session runner.
   *
   * @param {furo.GraphqlRequestArgs} [requestArguments] - Request arguments.
   */
  function invokeRequestOnMounted (requestArguments = {}) {
    onMounted(async () => {
      await runThroughRunner({
        invokeRequest: client.invokeRequestOnEvent,
        requestArguments,
      })
    })
  }

  /**
   * Invoke the request with a form value hash, healed by the session runner.
   *
   * @param {furo.GraphqlRequestArgs} [requestArguments] - Request arguments.
   * @returns {Promise<furo.Capsule<*>>} - The capsule.
   */
  async function invokeRequestWithFormValueHash (requestArguments = {}) {
    return runThroughRunner({
      invokeRequest: client.invokeRequestWithFormValueHash,
      requestArguments,
    })
  }

  /**
   * Run a furo request sender through the session runner.
   *
   * @param {{
   *   invokeRequest: (requestArguments: furo.GraphqlRequestArgs) => Promise<void>
   *   requestArguments: furo.GraphqlRequestArgs
   * }} params - Parameters.
   * @returns {Promise<furo.Capsule<*>>} - The capsule.
   */
  async function runThroughRunner ({
    invokeRequest,
    requestArguments,
  }) {
    const launchRequest = buildLaunchRequest({
      invokeRequest,
      requestArguments,
    })

    return runner.runRequest({
      launchRequest,
    })
  }

  /**
   * Build the request thunk the runner calls. The token is read at call time, so the retry after a
   * renew automatically carries the fresh one.
   *
   * @param {{
   *   invokeRequest: (requestArguments: furo.GraphqlRequestArgs) => Promise<void>
   *   requestArguments: furo.GraphqlRequestArgs
   * }} params - Parameters.
   * @returns {() => Promise<furo.Capsule<*>>} - The request thunk.
   */
  function buildLaunchRequest ({
    invokeRequest,
    requestArguments,
  }) {
    return async () => {
      const authenticatedRequestArguments = sessionAuthorizer.buildAuthenticatedRequestArguments({
        requestArguments,
      })

      await invokeRequest(authenticatedRequestArguments)

      return client.capsuleRef.value
    }
  }
}

/**
 * @typedef {{
 *   capsuleRef: import('vue').Ref<furo.Capsule<*>>
 *   invokeRequestOnEvent: (requestArguments?: furo.GraphqlRequestArgs) => Promise<furo.Capsule<*>>
 *   invokeRequestOnMounted: (requestArguments?: furo.GraphqlRequestArgs) => void
 *   invokeRequestWithFormValueHash: (requestArguments?: furo.GraphqlRequestArgs) => Promise<furo.Capsule<*>>
 * }} AppGraphqlClient
 */
