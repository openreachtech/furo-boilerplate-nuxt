import BaseGraphqlCapsule from '@/modules/client/BaseGraphqlCapsule'

export default class NetworkErrorGraphqlCapsule extends BaseGraphqlCapsule {
  /**
   * Factory method.
   *
   * @param {NetworkErrorGraphqlCapsuleFactoryParams} params - Parameters of factory method.
   * @returns {NetworkErrorGraphqlCapsule} Instance of this class.
   */
  static create ({
    payload,
  }) {
    return super.create({
      rawResponse: null,
      payload,
      result: null,
    })
  }
}

/**
 * @typedef {BaseGraphqlCapsule & {
 *   payload: import('./BaseGraphqlPayload')
 * }} NetworkErrorGraphqlCapsuleFactoryParams
 */
