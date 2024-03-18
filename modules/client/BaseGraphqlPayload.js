export default class BaseGraphqlPayload {
  /**
   * Constructor.
   *
   * @param {BaseGraphqlPayloadParams} params
   */
  constructor ({
    queryTemplate,
  }) {
    this.queryTemplate = queryTemplate
  }

  /**
   * Factory method.
   *
   * @returns {BaseGraphqlPayload} Instance of this class.
   */
  static create () {
    return new this({
      queryTemplate: this.query,
    })
  }

  /**
   * get: query.
   *
   * @abstract
   * @return {string} GraphQL query template.
   * @throws {Error} This function must be inherited.
   */
  static get query () {
    throw new Error('this function must be inherited')
  }
}

/**
 * @typedef {{
 *   queryTemplate: string
 * }} BaseGraphqlPayloadParams
 */
