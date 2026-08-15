/**
 * The single gate to the in-memory access token, backed by an injected session store. Every read /
 * write / clear of the token goes through here — no component or request payload touches the store
 * directly.
 *
 * It is a plain class, so it never calls the `useSessionStore()` composable itself (a composable may
 * only run in the Nuxt context). The store — its reactive refs — is injected via `create({ sessionStore })`;
 * a composable reads the store and injects it.
 */
export default class SessionStoreClerk {
  /**
   * Constructor.
   *
   * @param {SessionStoreClerkParams} params - Parameters.
   */
  constructor ({
    sessionStore,
  }) {
    this.sessionStore = sessionStore
  }

  /**
   * Factory method. `sessionStore` is required — a plain class must not call `useSessionStore()`, so
   * the caller (a composable) injects the store.
   *
   * @param {SessionStoreClerkParams} params - Parameters.
   * @returns {SessionStoreClerk} - Instance of this class.
   */
  static create ({
    sessionStore,
  }) {
    return new this({
      sessionStore,
    })
  }

  /**
   * Save the access token. An empty token clears it instead of storing.
   *
   * @param {{
   *   token: string | null
   * }} params - Parameters.
   * @returns {boolean} - true: the access token was stored, false: it was cleared.
   */
  saveToken ({
    token,
  }) {
    if (!token) {
      this.clearToken()

      return false
    }

    this.recordToken({
      token,
    })

    return true
  }

  /**
   * Clear the access token.
   *
   * @returns {SessionStoreClerk} - For method chaining.
   */
  clearToken () {
    this.sessionStore.accessToken.value = null

    return this
  }

  /**
   * Record the access token into the store.
   *
   * @param {{
   *   token: string
   * }} params - Parameters.
   * @returns {SessionStoreClerk} - For method chaining.
   */
  recordToken ({
    token,
  }) {
    this.sessionStore.accessToken.value = token

    return this
  }

  /**
   * Retrieve the access token.
   *
   * @returns {string | null} - The access token, or null when none is held.
   */
  retrieveToken () {
    return this.sessionStore.accessToken.value
  }

  /**
   * Check whether an access token is currently held.
   *
   * @returns {boolean} - true when a token is held.
   */
  existsToken () {
    return this.retrieveToken() !== null
  }
}

/**
 * @typedef {{
 *   sessionStore: import('./useSessionStore.js').SessionStore
 * }} SessionStoreClerkParams
 */
