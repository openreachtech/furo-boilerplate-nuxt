/**
 * Field validation result.
 */
export default class FieldValidationResult {
  /**
   * Constructor of FieldValidationResult
   *
   * @param {FieldValidationResultParams} params - Parameters.
   */
  constructor ({
    field,
    variables,
    validators,
  }) {
    this.field = field
    this.variables = variables
    this.validators = validators
  }

  /**
   * Factory method.
   *
   * @param {FieldValidationResultFactoryParams} params - Parameters.
   * @returns {FieldValidationResult} An instance of this class.
   */
  static create (params) {
    return new this(params)
  }
}

/**
 * @typedef {{
 *   field: string
 *   variables: Record<string, any>
 *   validators: Array<import('~/modules/client/FieldValidator').default>
 * }} FieldValidationResultParams
 */

/**
 * @typedef {FieldValidationResultParams} FieldValidationResultFactoryParams
 */
