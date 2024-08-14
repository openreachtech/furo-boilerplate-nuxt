/**
 * Base class of GraphQL payload.
 *
 * @template T - Type of this class.
 * @template {GraphqlRequestVariables} SV - Type of variables for schema.
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
    options: {
      headers = new Headers(),
      ...restOptions
    } = {},
  }) {
    this.queryTemplate = queryTemplate
    this.variables = variables
    this.headers = headers
    this.restOptions = restOptions
    this.options = {
      headers,
      ...restOptions,
    }
  }

  /**
   * Factory method.
   *
   * @param {BaseGraphqlPayloadFactoryParams} params - Parameters of factory method.
   * @template {typeof BaseGraphqlPayload<T, *>} T
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
   * get: field hash.
   *
   * @returns {Record<string, Array<string>>} Array of fields.
   */
  static get fieldHash () {
    return {}
  }

  /**
   * Collect based headers options.
   *
   * @returns {Array<Record<string, string>>} Headers options.
   */
  static collectBasedHeadersOptions () {
    return [
      {
        'content-type': 'application/json',
      },
    ]
  }

  /**
   * Collect based fetch options.
   *
   * @returns {Array<RequestInit>} Fetch options.
   */
  static collectBasedFetchOptions () {
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
    const builtOptions = this.generateMergedFetchOptionHash()

    return new Request(
      url,
      builtOptions
    )
  }

  /**
   * Create merged headers.
   *
   * @returns {Headers} Instance of Headers.
   */
  createMergedHeaders () {
    const optionsEntries = this.Ctor.collectBasedHeadersOptions()
      .flatMap(it =>
        Object.entries(it)
      )
    const normalizedHeaders = new Headers(this.headers)

    const entries = [
      ...optionsEntries,
      ...normalizedHeaders.entries(),
    ]

    return new Headers(
      Object.fromEntries(entries)
    )
  }

  /**
   * Generate merged fetch option hash.
   *
   * @returns {RequestInit} Instance of RequestInit.
   */
  generateMergedFetchOptionHash () {
    const mergedHeaders = this.createMergedHeaders()

    const basedOptionsEntries = this.Ctor.collectBasedFetchOptions()
      .flatMap(it =>
        Object.entries(it)
      )

    const extractedVariables = this.extractFilteredVariables()

    const body = JSON.stringify({
      query: this.queryTemplate,
      variables: extractedVariables,
    })

    return Object.fromEntries([
      ...basedOptionsEntries,
      ...Object.entries(this.restOptions),

      [
        'method',
        'POST',
      ],
      [
        'headers',
        mergedHeaders,
      ],
      [
        'body',
        body,
      ],
    ])
  }

  /**
   * Extract filtered variables.
   *
   * @abstract
   * @returns {SV} Filtered variables
   */
  extractFilteredVariables () {
    return /** @type {*} */ (this.variables)
  }

  /**
   * Is valid variables.
   *
   * @returns {boolean} true: valid, false: invalid.
   */
  isValidVariables () {
    return Object.entries(this.Ctor.fieldHash)
      .map(([
        schema,
        fields,
      ]) => [
        fields,
        Object.keys(
          this.variables?.[schema]
          ?? {}
        ),
      ])
      .map(([
        fields,
        variableFields,
      ]) => ({
        fields,
        unifiedFields: [...new Set(
          variableFields.concat(fields)
        )],
      }))
      .every(({
        fields,
        unifiedFields,
      }) =>
        unifiedFields.length === fields.length
      )
  }

  /**
   * Is invalid variables.
   *
   * @returns {boolean} true: invalid, false: valid.
   */
  isInvalidVariables () {
    return !this.isValidVariables()
  }
}

/**
 * @typedef {{
 *   queryTemplate: string
 *   variables: GraphqlRequestVariables
 *   options?: RequestInit
 * }} BaseGraphqlPayloadParams
 */

/**
 * @typedef {{
 *   variables?: GraphqlRequestVariables
 *   options?: RequestInit
 * }} BaseGraphqlPayloadFactoryParams
 */

/**
 * @typedef {{
 *   [variablesName: string]: {
 *     [field: string]: any
 *   }
 * }} GraphqlRequestVariables
 */
