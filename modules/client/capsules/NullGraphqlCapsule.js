import BaseGraphqlCapsule from '@/modules/client/BaseGraphqlCapsule'

export default class NullGraphqlCapsule extends BaseGraphqlCapsule {
  /**
   * Factory method.
   *
   * @returns {NullGraphqlCapsule} Instance of this class.
   */
  static create () {
    return super.create({
      rawResponse: null,
      payload: null,
      result: null,
    })
  }
}
