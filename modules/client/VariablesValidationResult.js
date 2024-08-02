/**
 * Field validation result.
 */
export default class VariablesValidationResult {
  /**
   * Constructor of VariablesValidationResult
   *
   * @param {VariablesValidationResultParams} params - Parameters.
   */
  constructor ({
    validatorHash,
  }) {
    this.validatorHash = validatorHash
  }

  /**
   * Factory method.
   *
   * @param {VariablesValidationResultFactoryParams} params - Parameters.
   * @returns {VariablesValidationResult} An instance of this class.
   */
  static create (params) {
    return new this(params)
  }
}

/**
 * @typedef {{
 *   validatorHash: {
 *     [schema: string]: import('~/modules/client/VariablesPerSchemaValidator').default
 *   }
 * }} VariablesValidationResultParams
 */

/**
 * @typedef {VariablesValidationResultParams} VariablesValidationResultFactoryParams
 */
