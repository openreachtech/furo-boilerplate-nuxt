import FieldValidator from '~/modules/client/FieldValidator'
import VariablesPerSchemaValidator from '~/modules/client/VariablesPerSchemaValidator'

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
   * get: fields.
   *
   * @returns {Array<string>} Array of fields.
   */
  static get fields () {
    return []
  }

  /**
   * get: validators.
   *
   * @returns {ValidatorHashType} Array of arguments to create an instance of FieldValidator.
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

  /**
   * Is valid variables.
   *
   * @returns {boolean} true: valid, false: invalid.
   */
  isValidVariables () {
    if (!this.variables) {
      return true
    }

    const validatorHash = this.generateSchemaValidatorHash()

    return Object.values(validatorHash)
      .every(it => it.isValid())
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
   * Is invalid variables.
   *
   * @returns {{
   *   [schema: string]: VariablesPerSchemaValidator
   * }} true: invalid, false: valid.
   */
  generateSchemaValidatorHash () {
    const targetVariables = this.variables ?? {}

    const validatorOptionHash = this.resolveValidatorHash({
      validators: this.Ctor.validators,
    })

    return Object.fromEntries(
      Object.keys(targetVariables)
        .map(schema => [
          schema,
          VariablesPerSchemaValidator.create({
            variables:
              targetVariables[schema]
              ?? {},
            validators:
              validatorOptionHash[schema]
                .map(it =>
                  FieldValidator.create(it)
                )
              ?? [],
          }),
        ])
    )
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
 *   variables: VariablesType | null
 *   options?: RequestInit
 * }} BaseGraphqlPayloadParams
 */

/**
 * @typedef {{
 *   variables?: VariablesType | null
 *   options?: RequestInit
 * }} BaseGraphqlPayloadFactoryParams
 */

/**
 * @typedef {{
 *   [group: string]: {
 *     [field: string]: any
 *   }
 * }} VariablesType
 */

/**
 * @typedef {Array<ValidatorOptionsType> | {
 *   [group: string]: Array<ValidatorOptionsType>
 * }} ValidatorHashType
 */

/**
 * @typedef {import('~/modules/client/FieldValidator').FieldValidatorFactoryParams} ValidatorOptionsType
 */
