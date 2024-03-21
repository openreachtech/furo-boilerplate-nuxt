import BaseGraphqlCapsule from '@/modules/client/BaseGraphqlCapsule'

export default class NetworkErrorGraphqlCapsule extends BaseGraphqlCapsule {
  /**
   * Factory method.
   *
   * @param {NetworkErrorGraphqlCapsuleFactoryParams} params
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
 * @typedef {BaseGraphqlCapsule.{
 *   payload: import('./BaseGraphqlPayload')
 * }} NetworkErrorGraphqlCapsuleFactoryParams
 */
