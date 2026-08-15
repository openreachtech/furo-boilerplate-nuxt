import sessionConfig from '~/app/session/session.config.js'

/**
 * The single gate to the in-memory access token, backed by the `sessionConfig` singleton. Every read
 * / write / clear of the token goes through here — no component or request payload touches the store
 * directly.
 */
export default class SessionClerk {
  /**
   * Constructor.
   *
   * @param {SessionClerkParams} params - Parameters.
   */
  constructor ({
    store,
  }) {
    this.store = store
  }

  /**
   * Factory method.
   *
   * @param {SessionClerkFactoryParams} [params] - Parameters.
   * @returns {SessionClerk} - Instance of this class.
   */
  static create ({
    store = sessionConfig,
  } = {}) {
    return new this({
      store,
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
   * @returns {SessionClerk} - For method chaining.
   */
  clearToken () {
    this.store.accessToken = null

    return this
  }

  /**
   * Record the access token into the store.
   *
   * @param {{
   *   token: string
   * }} params - Parameters.
   * @returns {SessionClerk} - For method chaining.
   */
  recordToken ({
    token,
  }) {
    this.store.accessToken = token

    return this
  }

  /**
   * Retrieve the access token.
   *
   * @returns {string | null} - The access token, or null when none is held.
   */
  retrieveToken () {
    return this.store.accessToken
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
 *   store: import('~/app/session/session.config.js').default
 * }} SessionClerkParams
 */

/**
 * @typedef {{
 *   store?: import('~/app/session/session.config.js').default
 * }} SessionClerkFactoryParams
 */
