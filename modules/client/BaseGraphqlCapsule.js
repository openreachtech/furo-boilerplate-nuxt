export default class BaseGraphqlCapsule {
  /**
   * Constructor.
   *
   * @param {BaseGraphqlCapsuleParams} params
   */
  constructor ({
    rawResponse,
    payload,
    input,
    result,
  }) {
    this.rawResponse = rawResponse
    this.payload = payload
    this.input = input
    this.result = result
  }

  /**
   * Factory method.
   *
   * @param {BaseGraphqlCapsuleFactoryParams} params - Parameters of factory method.
   * @returns {BaseGraphqlCapsule} Instance of this class.
   */
  static create (params) {
    return new this(params)
  }

  /**
   * Check to have content.
   *
   * @returns {BooleanLike} true: has content.
   */
  hasContent () {
    return this.result
      ?.data
      ?? false
  }

  /**
   * Check to have error.
   *
   * @returns {BooleanLike} true: has error.
   */
  hasError () {
    return this.hasQueryError()
      || this.hasNetworkError()
      || this.hasJsonParseError()
  }

  /**
   * Check to have query error.
   *
   * @returns {BooleanLike} true: has query error.
   */
  hasQueryError () {
    return this.result
      ?.errors
      ?? false
  }

  /**
   * Check to have network error.
   *
   * @returns {BooleanLike} true: has network error.
   */
  hasNetworkError () {
    return this.rawResponse === null
  }

  /**
   * Check to have JSON parse error.
   *
   * @returns {BooleanLike} true: has JSON parse error.
   */
  hasJsonParseError () {
    return this.rawResponse
      && !this.result
  }

  /**
   * Get error message.
   *
   * @returns {string | null} Error message.
   */
  getErrorMessage () {
    if (this.hasNetworkError()) {
      return 'Network error' // TODO: resolve embedded text
    }

    if (this.hasJsonParseError()) {
      return 'JSON parse error' // TODO: resolve embedded text
    }

    if (!this.hasQueryError()) {
      return null
    }

    return this.extractErrors()
      .at(0)
      ?.message
      ?? 'Unknown error' // TODO: resolve embedded text
  }

  /**
   * Extract errors from #result.
   *
   * @returns {Array<object>} Array of errors.
   */
  extractErrors () {
    return this.result
      ?.errors
      ?? []
  }

  /**
   * Extract content from #result.
   *
   * @returns {object | null} Content.
   */
  extractContent () {
    if (this.hasError()) {
      return null
    }

    return this.result
      ?.data
      ?? null
  }
}

/**
 * @typedef {{
 *   rawResponse: Response
 *   payload: BaseGraphqlPayload
 *   input: object | null
 *   result: null | {
 *     data?: object
 *     errors?: Array<object>
 *   }
 * }} BaseGraphqlCapsuleParams
 */

/**
 * @typedef {BaseGraphqlCapsuleParams} BaseGraphqlCapsuleFactoryParams
 */

/**
 * @typedef {*} BooleanLike
 */
