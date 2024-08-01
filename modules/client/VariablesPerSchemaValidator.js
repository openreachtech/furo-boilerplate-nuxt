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
   * Is valid variables.
   *
   * @returns {boolean} true: valid.
   */
  isValid () {
    const fieldNames = this.extractFieldNames()

    /**
     * @type {Array<{
     *   field: string
     *   validators: Array<import('~/modules/client/FieldValidator').default>
     * }>} Entries.
     */
    const entries = fieldNames.map(field => ({
      field,
      validators: this.extractValidators({
        field,
      }),
    }))

    return entries
      .flatMap(({
        field,
        validators,
      }) =>
        validators.every(it =>
          it.isValid({
            target: this.variables[field],
            variables: this.variables,
          })
        )
      )
      .every(it => it)
  }

  /**
   * Is invalid variables.
   *
   * @returns {boolean} true: invalid.
   */
  isInvalid () {
    return !this.isValid()
  }

  /**
   * Extract field names.
   *
   * @returns {Array<string>} Field names.
   */
  extractFieldNames () {
    return Object.keys(this.variables)
  }

  /**
   * Extract validators.
   *
   * @param {{
   *   field: string
   * }} params - Parameters.
   * @returns {Array<import('~/modules/client/FieldValidator').default>} Validators.
   */
  extractValidators ({
    field,
  }) {
    return this.validators
      .filter(it =>
        it.accepts({
          field,
        })
      )
  }

  /**
   * Get all messages by field.
   *
   * @param {{
   *   field: string
   * }} params - Parameters.
   * @returns {Array<string>} Error messages.
   */
  getAllMessages ({
    field,
  }) {
    const validators = this.extractValidators({
      field,
    })

    return validators
      .filter(it =>
        it.isInvalid({
          target: this.variables[field],
          variables: this.variables,
        })
      )
      .map(it =>
        it.getMessage()
      )
      .filter(it =>
        it !== null
      )
  }

  /**
   * Get one message by field.
   *
   * @param {{
   *   field: string
   * }} params - Parameters.
   * @returns {string | null} Error message.
   */
  getOneMessage ({
    field,
  }) {
    return this.getAllMessages({
      field,
    })
      .at(0)
      ?? null
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
