export default class BaseGraphqlPayload {
  /**
   * Constructor.
   *
   * @param {BaseGraphqlPayloadParams} params
   */
  constructor ({
    queryTemplate,
    input,
  }) {
    this.queryTemplate = queryTemplate
    this.input = input
  }

  /**
   * Factory method.
   *
   * @param {BaseGraphqlPayloadFactoryParams} params - Parameters of factory method.
   * @returns {BaseGraphqlPayload} Instance of this class.
   */
  static create ({
    input = null,
  } = {}) {
    return new this({
      queryTemplate: this.query,
      input,
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
   * Create fetch request.
   *
   * @param {{
   *   url: URL
   *   options?: RequestInit
   * }} params - Parameters.
   * @returns {Request} Instance of fetch request.
   * @public
   */
  createFetchRequest ({
    url,
    options = {},
  }) {
    const builtOptions = this.generateFetchRequestOptions({
      options,
      input: this.input,
    })

    return new Request(
      url,
      builtOptions
    )
  }

  /**
   * Generate fetch request options.
   *
   * @param {{
   *   options: RequestInit // Extra options of RequestInit.
   * }} params - Parameters.
   * @returns {RequestInit} Instance of RequestInit.
   */
  generateFetchRequestOptions ({
    options,
  }) {
    const headers = this.buildHeaders({
      headers: options.headers || new Headers(), // NOTE: When use ?? instead of ||, it will cause an error by ESLint.
    })

    const query = this.generateQuery({
      input: this.input,
    })
    const body = JSON.stringify({
      query,
    })

    return {
      method: 'POST',
      ...options,
      headers,
      body,
    }
  }

  /**
   * Generate query.
   *
   * @returns {string} Fulfilled query.
   */
  generateQuery () {
    if (!this.input) {
      return this.queryTemplate
    }

    const inputSlot = JSON.stringify(this.input)

    return this.queryTemplate
      .replace('$input', inputSlot)
  }

  /**
   * Build headers.
   *
   * @param {{
   *   headers: Headers
   * }} params - Parameters.
   * @returns {Headers} Instance of Headers.
   */
  buildHeaders ({
    headers,
  }) {
    const buildHeaders = new Headers(headers)

    buildHeaders.set(
      'Content-Type',
      'application/json'
    )

    return buildHeaders
  }
}

/**
 * @typedef {{
 *   queryTemplate: string
 *   input: object | null
 * }} BaseGraphqlPayloadParams
 */

/**
 * @typedef {{
 *   input?: object | null
 * }} BaseGraphqlPayloadFactoryParams
 */
