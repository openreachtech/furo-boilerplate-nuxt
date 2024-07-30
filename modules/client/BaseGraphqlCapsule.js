/**
 * Base class for GraphQL capsule.
 *
 * @template T, D
 */
export default class BaseGraphqlCapsule {
  /**
   * Constructor.
   *
   * @param {BaseGraphqlCapsuleParams<PayloadClass<*>>} params
   */
  constructor ({
    rawResponse,
    payload,
    result,
  }) {
    this.rawResponse = rawResponse
    this.payload = payload
    this.result = result
  }

  /**
   * Factory method.
   *
   * @template P
   * @param {BaseGraphqlCapsuleFactoryParams<PayloadClass<P>>} params - Parameters of factory method.
   * @template {typeof BaseGraphqlCapsule<C, D>} C, D
   * @this {C}
   * @returns {InstanceType<C>} Instance of this class.
   */
  static create (params) {
    return /** @type {*} */ (
      new this(params)
    )
  }

  /**
   * Factory method to create as pending behavior.
   *
   * @template {typeof BaseGraphqlCapsule<C, D>} C, D
   * @this {C}
   * @returns {InstanceType<C>} Instance of this class.
   */
  static createAsPending () {
    return this.create({
      rawResponse: null,
      payload: null,
      result: null,
    })
  }

  /**
   * Factory method to create as network error.
   *
   * @template P
   * @param {{
   *   payload: PayloadClass<P>
   * }} params - Parameters.
   * @template {typeof BaseGraphqlCapsule<C, D>} C, D
   * @this {C}
   * @returns {InstanceType<C>} Instance of this class.
   */
  static createAsNetworkError ({
    payload,
  }) {
    return this.create({
      rawResponse: null,
      payload,
      result: null,
    })
  }

  /**
   * Factory method to create as JSON parse error.
   *
   * @template P
   * @param {{
   *   rawResponse: Response
   *   payload: PayloadClass<P>
   * }} params - Parameters.
   * @template {typeof BaseGraphqlCapsule<C, D>} C, D
   * @this {C}
   * @returns {InstanceType<C>} Instance of this class.
   */
  static createAsJsonParseError ({
    rawResponse,
    payload,
  }) {
    return this.create({
      rawResponse,
      payload,
      result: null,
    })
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
   * Check to be pending.
   *
   * @returns {BooleanLike} true: is pending (pre-fetching).
   */
  isPending () {
    return this.payload === null
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
    if (this.isPending()) {
      return null
    }

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
   * @returns {D | null} Content.
   */
  extractContent () {
    if (this.hasError()) {
      return null
    }

    return /** @type {*} */ (
      this.result
        ?.data
        ?? null
    )
  }
}

/**
 * @template P
 * @typedef {{
 *   rawResponse: Response | null
 *   payload: PayloadClass<P> | null
 *   result: GraphqlCapsuleResult | null
 * }} BaseGraphqlCapsuleParams
 */

/**
 * @template P
 * @typedef {BaseGraphqlCapsuleParams<P>} BaseGraphqlCapsuleFactoryParams
 */

/**
 * @template P
 * @typedef {import('~/modules/client/BaseGraphqlPayload').default<P>} PayloadClass
 */

/**
 * @typedef {{
 *   data?: object
 *   errors?: Array<GraphqlResponseError>
 * }} GraphqlCapsuleResult
 */

/**
 * @typedef {{
 *   message: string
 *   locations: Array<{
 *     line: number
 *     column: number
 *   }>
 *   path: Array<string>
 * }} GraphqlResponseError
 */

/**
 * @typedef {*} BooleanLike
 */
