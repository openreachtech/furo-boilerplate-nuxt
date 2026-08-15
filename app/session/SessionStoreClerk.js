import sessionConfig from '~/app/session/session.config.js'

/**
 * The single gate to the in-memory access token, backed by the `sessionConfig` singleton (a
 * `SessionStore`). Every read / write / clear of the token goes through here — no component or
 * request payload touches the store directly.
 */
export default class SessionStoreClerk {
  /**
   * Constructor.
   *
   * @param {SessionStoreClerkParams} params - Parameters.
   */
  constructor ({
    storeConfig,
  }) {
    this.storeConfig = storeConfig
  }

  /**
   * Factory method.
   *
   * @param {SessionStoreClerkFactoryParams} [params] - Parameters.
   * @returns {SessionStoreClerk} - Instance of this class.
   */
  static create ({
    storeConfig = sessionConfig,
  } = {}) {
    return new this({
      storeConfig,
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
    this.storeConfig.accessToken = null

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
    this.storeConfig.accessToken = token

    return this
  }

  /**
   * Retrieve the access token.
   *
   * @returns {string | null} - The access token, or null when none is held.
   */
  retrieveToken () {
    return this.storeConfig.accessToken
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
 *   storeConfig: import('~/app/session/session.config.js').default
 * }} SessionStoreClerkParams
 */

/**
 * @typedef {{
 *   storeConfig?: import('~/app/session/session.config.js').default
 * }} SessionStoreClerkFactoryParams
 */
