/**
 * Field validation result.
 */
export default class VariablesPerSchemaValidator {
  /**
   * Constructor of VariablesPerSchemaValidator
   *
   * @param {VariablesPerSchemaValidatorParams} params - Parameters.
   */
  constructor ({
    variables,
    validators,
  }) {
    this.variables = variables
    this.validators = validators
  }

  /**
   * Factory method.
   *
   * @param {VariablesPerSchemaValidatorFactoryParams} params - Parameters.
   * @returns {VariablesPerSchemaValidator} An instance of this class.
   */
  static create (params) {
    return new this(params)
  }

  /**
   * Extract schema names.
   *
   * @returns {Array<string>} Schema names.
   */
  extractSchemaNames () {
    return Object.keys(this.variables)
  }
}

/**
 * @typedef {{
 *   variables: Record<string, any>
 *   validators: Array<import('~/modules/client/FieldValidator').default>
 * }} VariablesPerSchemaValidatorParams
 */

/**
 * @typedef {VariablesPerSchemaValidatorParams} VariablesPerSchemaValidatorFactoryParams
 */
