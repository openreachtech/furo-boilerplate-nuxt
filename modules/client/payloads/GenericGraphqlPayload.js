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
    variables = null,
    options = {},
  } = {}) {
    return new this({
      queryTemplate,
      variables,
      options,
    })
  }
}

/**
 * @typedef {import('~/modules/client/BaseGraphqlPayload').BaseGraphqlPayloadFactoryParams & {
 *   queryTemplate: string
 * }} GenericGraphqlPayloadFactoryParams
 */
