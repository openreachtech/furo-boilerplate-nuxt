/**
 * Base class of GraphQL payload.
 *
 * @template T
 */
export default class BaseGraphqlPayload {
  /**
   * Constructor.
   *
   * @param {BaseGraphqlPayloadParams} params
   */
  constructor ({
    queryTemplate,
    variables,
    options,
  }) {
    this.queryTemplate = queryTemplate
    this.variables = variables
    this.options = options
  }

  /**
   * Factory method.
   *
   * @param {BaseGraphqlPayloadFactoryParams} params - Parameters of factory method.
   * @template {typeof BaseGraphqlPayload} T
   * @this {T}
   * @returns {InstanceType<T>} Instance of this class.
   */
  static create ({
    variables = {},
    options = {},
  } = {}) {
    return /** @type {*} */ (
      new this({
        queryTemplate: this.document,
        variables,
        options,
      })
    )
  }

  /**
   * get: document.
   *
   * @abstract
   * @returns {string} GraphQL document template.
   * @throws {Error} This function must be inherited.
   */
  static get document () {
    throw new Error('this function must be inherited')
  }

  /**
   * get: validators.
   *
   * @returns {Array<import('./FieldValidator').FieldValidatorFactoryParams>} Array of arguments to create an instance of FieldValidator.
   */
  static get validators () {
    return []
  }

  /**
   * get: Ctor.
   *
   * @template {typeof BaseGraphqlPayload} T
   * @returns {T} Constructor of this
   */
  get Ctor () {
    return /** @type {*} */ (this.constructor)
  }

  /**
   * Create fetch request.
   *
   * @param {{
   *   url: RequestInfo | URL
   * }} params - Parameters.
   * @returns {Request} Instance of fetch request.
   * @public
   */
  createFetchRequest ({
    url,
  }) {
    const builtOptions = this.generateFetchRequestOptions()

    return new Request(
      url,
      builtOptions
    )
  }

  /**
   * Generate fetch request options.
   *
   * @returns {RequestInit} Instance of RequestInit.
   */
  generateFetchRequestOptions () {
    const headers = this.buildHeaders({
      headers: new Headers(
        this.options?.headers
      ),
    })

    const body = JSON.stringify({
      query: this.queryTemplate,
      variables: this.variables,
    })

    return {
      method: 'POST',
      ...this.options,
      headers,
      body,
    }
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
 *   variables: object | null
 *   options?: RequestInit
 * }} BaseGraphqlPayloadParams
 */

/**
 * @typedef {{
 *   variables?: object | null
 *   options?: RequestInit
 * }} BaseGraphqlPayloadFactoryParams
 */
