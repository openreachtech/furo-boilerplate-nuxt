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

  /**
   * Generate query.
   *
   * @param {{
   *   input: any
   * }} params
   * @returns {string} Fulfilled query.
   */
  generateQuery ({
    input = null,
  } = {}) {
    if (!input) {
      return this.queryTemplate
    }

    const inputSlot = JSON.stringify(input)

    return this.queryTemplate
      .replace('$input', inputSlot)
  }
}

/**
 * @typedef {{
 *   queryTemplate: string
 * }} BaseGraphqlPayloadParams
 */
