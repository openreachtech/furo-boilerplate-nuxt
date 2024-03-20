import BaseGraphqlCapsule from '@/modules/client/BaseGraphqlCapsule'

export default class JsonParseErrorGraphqlCapsule extends BaseGraphqlCapsule {
  /**
   * Factory method.
   *
   * @param {JsonParseErrorGraphqlCapsuleFactoryParams} params
   */
  static create ({
    rawResponse,
    payload,
  }) {
    return super.create({
      rawResponse,
      payload,
      result: null,
    })
  }
}

/**
 * @typedef {BaseGraphqlCapsule.{
 *   rawResponse: Response
 *   payload: import('./BaseGraphqlPayload')
 * }} JsonParseErrorGraphqlCapsuleFactoryParams
 */
