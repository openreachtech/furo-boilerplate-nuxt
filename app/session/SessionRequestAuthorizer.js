import {
  HEADER_KEY,
} from '~/app/constants.js'

/**
 * Attaches the in-memory access token to a request's arguments as a header.
 *
 * The payload is token-free (the token lives in the Nuxt store), so each request must carry the token
 * itself. This plain class holds that build logic — the composable injects the `SessionStoreClerk`
 * and calls `buildAuthenticatedRequestArguments()` per request, so a retry after a renew reads the
 * fresh token.
 */
export default class SessionRequestAuthorizer {
  /**
   * Constructor.
   *
   * @param {SessionRequestAuthorizerParams} params - Parameters.
   */
  constructor ({
    sessionClerk,
  }) {
    this.sessionClerk = sessionClerk
  }

  /**
   * Factory method. `sessionClerk` is injected by the composable (it needs the Nuxt session store).
   *
   * @param {SessionRequestAuthorizerParams} params - Parameters.
   * @returns {SessionRequestAuthorizer} - Instance of this class.
   */
  static create ({
    sessionClerk,
  }) {
    return new this({
      sessionClerk,
    })
  }

  /**
   * Build the request arguments with the access-token header, when a token is held. Returns the
   * request arguments unchanged when no token exists.
   *
   * @param {{
   *   requestArguments: furo.GraphqlRequestArgs
   * }} params - Parameters.
   * @returns {furo.GraphqlRequestArgs} - The request arguments, with the access-token header when a token exists.
   */
  buildAuthenticatedRequestArguments ({
    requestArguments,
  }) {
    const token = this.sessionClerk.retrieveToken()

    if (!token) {
      return requestArguments
    }

    return {
      ...requestArguments,
      options: this.buildOptionsWithToken({
        options: requestArguments.options,
        token,
      }),
    }
  }

  /**
   * Merge the access-token header into the request options.
   *
   * @param {{
   *   options: furo.GraphqlRequestArgs['options']
   *   token: string
   * }} params - Parameters.
   * @returns {furo.GraphqlRequestArgs['options']} - The options with the access-token header.
   */
  buildOptionsWithToken ({
    options,
    token,
  }) {
    const headers = this.extractHeaders({
      options,
    })

    return {
      ...options,
      headers: {
        ...headers,
        [HEADER_KEY.ACCESS_TOKEN]: token,
      },
    }
  }

  /**
   * Extract the headers already present on the request options.
   *
   * @param {{
   *   options: furo.GraphqlRequestArgs['options']
   * }} params - Parameters.
   * @returns {Record<string, string>} - The existing headers, or an empty object.
   */
  extractHeaders ({
    options,
  }) {
    return options?.headers
      ?? {}
  }
}

/**
 * @typedef {{
 *   sessionClerk: import('./SessionStoreClerk.js').default
 * }} SessionRequestAuthorizerParams
 */
