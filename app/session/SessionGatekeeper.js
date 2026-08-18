/**
 * Decides whether a guarded route has a usable session.
 *
 * Replaces the old "renew on every navigation" gateway: a session is established when a token is
 * already held; otherwise it renews once from the refresh cookie (via `SessionRenewer`) and reports
 * whether that produced a token. The in-memory token is lost on reload, so renewing here re-establishes
 * the session across reload / direct-URL open. Mid-session expiry is handled by the request runner's
 * 401 retry, not here — so renew happens only when no token is held.
 *
 * A plain class — `SessionStoreClerk` and `SessionRenewer` are injected by the middleware (which has
 * the Nuxt session store); a plain class must never call a composable itself.
 */
export default class SessionGatekeeper {
  /**
   * Constructor.
   *
   * @param {SessionGatekeeperParams} params - Parameters.
   */
  constructor ({
    sessionClerk,
    sessionRenewer,
  }) {
    this.sessionClerk = sessionClerk
    this.sessionRenewer = sessionRenewer
  }

  /**
   * Factory method. Both collaborators are injected by the middleware (they need the Nuxt session
   * store, so they cannot be defaulted here).
   *
   * @param {SessionGatekeeperParams} params - Parameters.
   * @returns {SessionGatekeeper} - Instance of this class.
   */
  static create ({
    sessionClerk,
    sessionRenewer,
  }) {
    return new this({
      sessionClerk,
      sessionRenewer,
    })
  }

  /**
   * Establish a session for a guarded route: true when a token is already held, otherwise renew once
   * from the refresh cookie and report whether that produced a token.
   *
   * @returns {Promise<boolean>} - true when a usable session exists.
   */
  async establishesSession () {
    if (this.sessionClerk.existsToken()) {
      return true
    }

    const renewedToken = await this.sessionRenewer.renewSession()

    return Boolean(renewedToken)
  }
}

/**
 * @typedef {{
 *   sessionClerk: import('./SessionStoreClerk.js').default
 *   sessionRenewer: import('./SessionRenewer.js').default
 * }} SessionGatekeeperParams
 */
