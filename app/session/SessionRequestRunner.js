/**
 * Runs a GraphQL request through the session lifecycle and self-heals on an auth failure.
 *
 * Given a `launchRequest` thunk (which runs the request and returns its capsule), it inspects the
 * capsule: a refresh-token-reuse response revokes the session (no retry); an unauthenticated response
 * renews once (deduped) and retries the request a single time, or revokes when the renew fails.
 *
 * A plain class — `SessionRenewer` and `SessionRevoker` are injected (built by the composable that has
 * the Nuxt session store). Both call their launchers directly, so a renew / sign-out request never
 * re-enters this runner: no recursion, one bounded retry.
 */
export default class SessionRequestRunner {
  /**
   * Constructor.
   *
   * @param {SessionRequestRunnerParams} params - Parameters.
   */
  constructor ({
    sessionRenewer,
    sessionRevoker,
  }) {
    this.sessionRenewer = sessionRenewer
    this.sessionRevoker = sessionRevoker
  }

  /**
   * Factory method. Both collaborators are injected by the composable (they need the Nuxt session
   * store, so they cannot be defaulted here).
   *
   * @param {SessionRequestRunnerParams} params - Parameters.
   * @returns {SessionRequestRunner} - Instance of this class.
   */
  static create ({
    sessionRenewer,
    sessionRevoker,
  }) {
    return new this({
      sessionRenewer,
      sessionRevoker,
    })
  }

  /**
   * Run the request thunk, then heal from an auth failure.
   *
   * @param {{
   *   launchRequest: () => Promise<import('~/app/graphql/client/BaseAppGraphqlCapsule').default>
   * }} params - Parameters.
   * @returns {Promise<import('~/app/graphql/client/BaseAppGraphqlCapsule').default>} - The capsule.
   */
  async runRequest ({
    launchRequest,
  }) {
    const capsule = await launchRequest()

    if (capsule.isRefreshTokenReused()) {
      await this.sessionRevoker.revokeSession()

      return capsule
    }

    if (!capsule.isUnauthenticated()) {
      return capsule
    }

    return this.recoverUnauthenticatedRequest({
      launchRequest,
      capsule,
    })
  }

  /**
   * Recover an unauthenticated request: renew once, then retry the request a single time on a fresh
   * token, otherwise revoke the session and return the original capsule.
   *
   * @param {{
   *   launchRequest: () => Promise<import('~/app/graphql/client/BaseAppGraphqlCapsule').default>
   *   capsule: import('~/app/graphql/client/BaseAppGraphqlCapsule').default
   * }} params - Parameters.
   * @returns {Promise<import('~/app/graphql/client/BaseAppGraphqlCapsule').default>} - The capsule.
   */
  async recoverUnauthenticatedRequest ({
    launchRequest,
    capsule,
  }) {
    const renewedToken = await this.sessionRenewer.renewSession()

    if (!renewedToken) {
      await this.sessionRevoker.revokeSession()

      return capsule
    }

    return launchRequest()
  }
}

/**
 * @typedef {{
 *   sessionRenewer: import('./SessionRenewer.js').default
 *   sessionRevoker: import('./SessionRevoker.js').default
 * }} SessionRequestRunnerParams
 */
