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

  /**
   * get: Proxy instance to handle valid.
   *
   * @returns {Record<string, any | Record<string, any>>} Proxy instance.
   */
  get valid () {
    return Object.fromEntries(
      Object.entries(this.validatorHash)
        .map(([schema, validator]) => [
          schema,
          validator.generateIsValidHash(),
        ])
        .flatMap(([schema, hash]) => [
          [
            `$${schema}`,
            hash,
          ],
          ...Object.entries(hash),
        ])
        .reverse()
    )
  }

  /**
   * get: Proxy instance to handle invalid.
   *
   * @returns {Record<string, any | Record<string, any>>} Proxy instance.
   */
  get invalid () {
    return Object.fromEntries(
      Object.entries(this.validatorHash)
        .map(([schema, validator]) => [
          schema,
          validator.generateIsInvalidHash(),
        ])
        .flatMap(([schema, hash]) => [
          [
            `$${schema}`,
            hash,
          ],
          ...Object.entries(hash),
        ])
        .reverse()
    )
  }

  /**
   * get: Proxy instance to handle invalid.
   *
   * @returns {Record<string, any | Record<string, any>>} Proxy instance.
   */
  get messages () {
    return Object.fromEntries(
      Object.entries(this.validatorHash)
        .map(([schema, validator]) => [
          schema,
          validator.generateAllMessagesHash(),
        ])
        .flatMap(([schema, hash]) => [
          [
            `$${schema}`,
            hash,
          ],
          ...Object.entries(hash),
        ])
        .reverse()
    )
  }

  /**
   * get: Proxy instance to handle invalid.
   *
   * @returns {Record<string, any | Record<string, any>>} Proxy instance.
   */
  get message () {
    return Object.fromEntries(
      Object.entries(this.validatorHash)
        .map(([schema, validator]) => [
          schema,
          validator.generateOneMessageHash(),
        ])
        .flatMap(([schema, hash]) => [
          [
            `$${schema}`,
            hash,
          ],
          ...Object.entries(hash),
        ])
        .reverse()
    )
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
