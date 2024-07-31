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

  /**
   * Accepts for the field.
   *
   * @param {{
   *   field: string
   * }} args - Arguments.
   * @returns {boolean} true: Accepts, false: Rejects.
   */
  accepts ({
    field,
  }) {
    return this.field === field
  }

  /**
   * Rejects for the field.
   *
   * @param {{
   *   field: string
   * }} args - Arguments.
   * @returns {boolean} true: Rejects, false: Accepts.
   */
  rejects ({
    field,
  }) {
    return !this.accepts({ field })
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
