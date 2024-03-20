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
   * Check to have query error.
   *
   * @returns {BooleanLike} true: has query error.
   */
  hasQueryError () {
    return this.result
      ?.errors
      ?? false
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
