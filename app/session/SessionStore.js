/**
 * Session store.
 *
 * A store — a class that owns the mutable session state — not a plain object. It holds the access
 * token and the in-flight renew promise used to deduplicate concurrent refreshes. Its single
 * instance (`session.config.js`) is shared by `SessionClerk` and `SessionRenewer`, which read and
 * write these fields. Nothing is ever written to `localStorage` / `sessionStorage`.
 *
 * It is a plain class (not a Nuxt `useState()` store) on purpose: the token is read from
 * `BaseAppGraphqlPayload.collectBasedHeadersOptions()`, a `static` method that runs outside the
 * Nuxt context, where `useState()` cannot be called.
 */
export default class SessionStore {
  /**
   * Constructor.
   *
   * @param {SessionStoreParams} params - Parameters.
   */
  constructor ({
    accessToken,
    renewingPromise,
  }) {
    this.accessToken = accessToken
    this.renewingPromise = renewingPromise
  }

  /**
   * Factory method.
   *
   * @param {SessionStoreFactoryParams} [params] - Parameters.
   * @returns {SessionStore} - Instance of this class.
   */
  static create ({
    accessToken = null,
    renewingPromise = null,
  } = {}) {
    return new this({
      accessToken,
      renewingPromise,
    })
  }
}

/**
 * @typedef {{
 *   accessToken: string | null
 *   renewingPromise: Promise<string | null> | null
 * }} SessionStoreParams
 */

/**
 * @typedef {{
 *   accessToken?: string | null
 *   renewingPromise?: Promise<string | null> | null
 * }} SessionStoreFactoryParams
 */
