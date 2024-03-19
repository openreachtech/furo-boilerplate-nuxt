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
   * Create fetch request.
   *
   * @param {{
   *   url: URL
   *   options?: RequestInit
   *   input?: object | null
   * }} params - Parameters.
   * @returns {Request} Instance of fetch request.
   * @public
   */
  createFetchRequest ({
    url,
    options = {},
    input = null,
  }) {
    const builtOptions = this.generateFetchRequestOptions({
      options,
      input,
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
   *   input: object | null
   * }} params - Parameters.
   * @returns {RequestInit} Instance of RequestInit.
   */
  generateFetchRequestOptions ({
    options,
    input,
  }) {
    const headers = this.buildHeaders({
      headers: options.headers || new Headers(), // NOTE: When use ?? instead of ||, it will cause an error by ESLint.
    })

    const query = this.generateQuery({
      input,
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
    headers.set(
      'Content-Type',
      'application/json'
    )

    return headers
  }
}

/**
 * @typedef {{
 *   queryTemplate: string
 * }} BaseGraphqlPayloadParams
 */
