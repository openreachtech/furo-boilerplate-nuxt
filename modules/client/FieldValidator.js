/**
 * Field validator.
 */
export default class FieldValidator {
  /**
   * Constructor of FieldValidator
   *
   * @param {FieldValidatorParams} params - Parameters.
   */
  constructor ({
    field,
    body,
    message = null,
  }) {
    this.field = field
    this.body = body
    this.message = message
  }

  /**
   * Factory method.
   *
   * @param {FieldValidatorFactoryParams} params - Parameters.
   * @returns {FieldValidator} An instance of this class.
   */
  static create (params) {
    return new this(params)
  }
}

/**
 * @typedef {{
 *   field: string
 *   body: (it: any, variables: object) => boolean
 *   message?: string | null
 * }} FieldValidatorParams
 */

/**
 * @typedef {FieldValidatorParams} FieldValidatorFactoryParams
 */
