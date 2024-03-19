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
