import ObjectLiteralizer from '@/modules/client/ObjectLiteralizer'

export default class BaseGraphqlPayload {
  /**
   * Constructor.
   *
   * @param {BaseGraphqlPayloadParams} params
   */
  constructor ({
    queryTemplate,
    input,
    options,
  }) {
    this.queryTemplate = queryTemplate
    this.input = input
    this.options = options
  }

  /**
   * Factory method.
   *
   * @param {BaseGraphqlPayloadFactoryParams} params - Parameters of factory method.
   * @returns {BaseGraphqlPayload} Instance of this class.
   */
  static create ({
    input = null,
    options = {},
  } = {}) {
    return new this({
      queryTemplate: this.query,
      input,
      options,
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
   * }} params - Parameters.
   * @returns {Request} Instance of fetch request.
   * @public
   */
  createFetchRequest ({
    url,
  }) {
    const builtOptions = this.generateFetchRequestOptions({
      options: this.options,
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
      headers: options.headers ?? new Headers(),
    })

    const body = JSON.stringify({
      query: this.queryTemplate,
      variables: this.input,
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

    const literalizer = ObjectLiteralizer.create({
      source: this.input,
    })

    const inputSlot = literalizer.literalize()

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
 *   options?: RequestInit
 * }} BaseGraphqlPayloadParams
 */

/**
 * @typedef {{
 *   input?: object | null
 *   options?: RequestInit
 * }} BaseGraphqlPayloadFactoryParams
 */
