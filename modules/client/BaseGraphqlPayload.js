/**
 * Base class of GraphQL payload.
 *
 * @template T
 * @template {VariablesType} SV
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

    const extractedVariables = this.extractFilteredVariables()

    const body = JSON.stringify({
      query: this.queryTemplate,
      variables: extractedVariables,
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

  /**
   * Resolve validators as object hash.
   *
   * @param {{
   *   validators: ValidatorHashType
   * }} args - Arguments for FieldValidator.
   * @returns {{
   *   [group: string]: Array<ValidatorOptionsType>
   * }}
   */
  resolveValidatorHash ({
    validators,
  }) {
    if (!Array.isArray(validators)) {
      return validators
    }

    const groupNames = Object.keys(this.variables ?? {})

    return Object.fromEntries(
      groupNames.map(
        group => [
          group,
          validators,
        ]
      )
    )
  }
}

/**
 * @typedef {{
 *   queryTemplate: string
 *   variables: VariablesType
 *   options?: RequestInit
 * }} BaseGraphqlPayloadParams
 */

/**
 * @typedef {{
 *   variables?: VariablesType
 *   options?: RequestInit
 * }} BaseGraphqlPayloadFactoryParams
 */

/**
 * @typedef {{
 *   [schema: string]: {
 *     [field: string]: any
 *   }
 * }} VariablesType
 */

/**
 * @typedef {Array<ValidatorOptionsType> | {
 *   [schema: string]: Array<ValidatorOptionsType>
 * }} ValidatorHashType
 */

/**
 * @typedef {import('~/modules/client/FieldValidator').FieldValidatorFactoryParams} ValidatorOptionsType
 */
