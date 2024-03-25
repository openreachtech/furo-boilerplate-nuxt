import BaseGraphqlPayload from '@/modules/client/BaseGraphqlPayload'

export default class GenericGraphqlPayload extends BaseGraphqlPayload {
  /**
   * Factory method.
   *
   * @param {GenericGraphqlPayloadFactoryParams} params - Parameters of factory method.
   * @returns {GenericGraphqlPayload} Instance of this class.
   */
  static create ({
    queryTemplate,
    input = null,
    options = {},
  } = {}) {
    return new this({
      queryTemplate,
      input,
      options,
    })
  }
}

/**
 * @typedef {BaseGraphqlPayload.GenericGraphqlPayloadFactoryParams & {
 *   queryTemplate: string
 * }} GenericGraphqlPayloadFactoryParams
 */
