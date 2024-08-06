/**
 * Field validation result.
 */
export default class VariablesValidator {
  /**
   * Constructor of VariablesValidator
   *
   * @param {VariablesValidatorParams} params - Parameters.
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
   * @param {VariablesValidatorFactoryParams} params - Parameters.
   * @returns {VariablesValidator} An instance of this class.
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
   * Generate validation hash.
   *
   * @returns {{
   *   valid: Record<string, boolean>
   *   invalid: Record<string, boolean>
   *   messages: Record<string, Array<string>>
   *   message: Record<string, string | null>
   * }} Validation hash.
   * @public
   */
  generateValidationHash () {
    return {
      valid: this.generateIsValidHash(),
      invalid: this.generateIsInvalidHash(),
      messages: this.generateAllMessagesHash(),
      message: this.generateOneMessageHash(),
    }
  }

  /**
   * Generate isValid hash.
   *
   * @returns {Record<string, boolean>} Validation result.
   */
  generateIsValidHash () {
    const fieldNames = this.extractFieldNames()

    return Object.fromEntries(
      fieldNames.map(field => [
        field,
        this.isValidField({
          field,
        }),
      ])
    )
  }

  /**
   * Generate isInvalid hash.
   *
   * @returns {Record<string, boolean>} Validation result.
   */
  generateIsInvalidHash () {
    const fieldNames = this.extractFieldNames()

    return Object.fromEntries(
      fieldNames.map(field => [
        field,
        this.isInvalidField({
          field,
        }),
      ])
    )
  }

  /**
   * Generate all messages hash.
   *
   * @returns {Record<string, Array<string>>} Validation result.
   */
  generateAllMessagesHash () {
    const fieldNames = this.extractFieldNames()

    return Object.fromEntries(
      fieldNames.map(field => [
        field,
        this.getAllMessages({
          field,
        }),
      ])
    )
  }

  /**
   * Generate one message hash.
   *
   * @returns {Record<string, string | null>} Validation result.
   */
  generateOneMessageHash () {
    const fieldNames = this.extractFieldNames()

    return Object.fromEntries(
      fieldNames.map(field => [
        field,
        this.getOneMessage({
          field,
        }),
      ])
    )
  }

  /**
   * Is valid field.
   *
   * @param {{
   *   field: string
   * }} params - Parameters.
   * @returns {boolean} true: valid.
   */
  isValidField ({
    field,
  }) {
    const validators = this.extractValidators({
      field,
    })

    return validators
      .every(it =>
        it.isValid({
          target: this.variables[field],
          variables: this.variables,
        })
      )
  }

  /**
   * Is invalid field.
   *
   * @param {{
   *   field: string
   * }} params - Parameters.
   * @returns {boolean} true: invalid.
   */
  isInvalidField ({
    field,
  }) {
    return !this.isValidField({
      field,
    })
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
 * }} VariablesValidatorParams
 */

/**
 * @typedef {VariablesValidatorParams} VariablesValidatorFactoryParams
 */
