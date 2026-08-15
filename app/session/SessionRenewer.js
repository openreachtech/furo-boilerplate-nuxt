import RenewAccessTokenMutationGraphqlLauncher from '~/app/graphql/client/mutations/renewAccessToken/RenewAccessTokenMutationGraphqlLauncher'

/**
 * Renews the access token using the refresh-token cookie, deduplicating concurrent renewals.
 *
 * A plain class — it never calls a composable. The session store and the token clerk are injected.
 * When several requests find the token expired at once, only the first triggers a network renew; the
 * others await the same in-flight promise held in `sessionStore.renewingPromise`.
 */
export default class SessionRenewer {
  /**
   * Constructor.
   *
   * @param {SessionRenewerParams} params - Parameters.
   */
  constructor ({
    sessionStore,
    sessionClerk,
    renewLauncherFactory,
  }) {
    this.sessionStore = sessionStore
    this.sessionClerk = sessionClerk
    this.renewLauncherFactory = renewLauncherFactory
  }

  /**
   * Factory method. `sessionStore` and `sessionClerk` are injected by a composable; the renew
   * launcher defaults to the concrete one.
   *
   * @param {SessionRenewerFactoryParams} params - Parameters.
   * @returns {SessionRenewer} - Instance of this class.
   */
  static create ({
    sessionStore,
    sessionClerk,
    renewLauncherFactory = RenewAccessTokenMutationGraphqlLauncher,
  }) {
    return new this({
      sessionStore,
      sessionClerk,
      renewLauncherFactory,
    })
  }

  /**
   * Renew the access token, deduplicating concurrent calls.
   *
   * Returns the in-flight promise when a renewal is already running, so parallel callers share one
   * network round-trip. Resolves to the new access token, or null when renewal fails.
   *
   * @returns {Promise<string | null>} - The new access token, or null.
   */
  async renewSession () {
    const runningPromise = this.sessionStore.renewingPromise.value

    if (runningPromise) {
      return runningPromise
    }

    const renewingPromise = this.renewToken()

    this.sessionStore.renewingPromise.value = renewingPromise

    const accessToken = await renewingPromise

    this.sessionStore.renewingPromise.value = null

    return accessToken
  }

  /**
   * Renew the access token: fetch a fresh one from the server, then store it.
   *
   * @returns {Promise<string | null>} - The new access token, or null when renewal fails.
   */
  async renewToken () {
    const accessToken = await this.fetchRenewedToken()

    this.sessionClerk.saveToken({
      token: accessToken,
    })

    return accessToken
  }

  /**
   * Fetch a fresh access token from the server. `credentials: 'include'` sends the refresh-token
   * cookie so the server can rotate the pair.
   *
   * @returns {Promise<string | null>} - The fetched access token, or null when the request fails.
   */
  async fetchRenewedToken () {
    const payload = this.buildRenewPayload()

    const launcher = this.createRenewLauncher()

    const capsule = await launcher.launchRequest({
      payload,
    })

    return capsule.accessToken
  }

  /**
   * Build the renew-access-token request payload.
   *
   * @returns {ReturnType<typeof RenewAccessTokenMutationGraphqlLauncher.createPayload>} - Payload.
   */
  buildRenewPayload () {
    return this.renewLauncherFactory.createPayload({
      variables: {},
      options: {
        credentials: 'include',
      },
    })
  }

  /**
   * Create the renew-access-token launcher.
   *
   * @returns {InstanceType<typeof RenewAccessTokenMutationGraphqlLauncher>} - Launcher.
   */
  createRenewLauncher () {
    return this.renewLauncherFactory.create()
  }
}

/**
 * @typedef {{
 *   sessionStore: import('./useSessionStore.js').SessionStore
 *   sessionClerk: import('./SessionStoreClerk.js').default
 *   renewLauncherFactory: typeof import('~/app/graphql/client/mutations/renewAccessToken/RenewAccessTokenMutationGraphqlLauncher').default
 * }} SessionRenewerParams
 */

/**
 * @typedef {{
 *   sessionStore: import('./useSessionStore.js').SessionStore
 *   sessionClerk: import('./SessionStoreClerk.js').default
 *   renewLauncherFactory?: typeof import('~/app/graphql/client/mutations/renewAccessToken/RenewAccessTokenMutationGraphqlLauncher').default
 * }} SessionRenewerFactoryParams
 */
