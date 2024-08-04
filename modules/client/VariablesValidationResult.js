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
    )
  }

  /**
   * get: Proxy instance to handle invalid.
   *
   * @returns {Record<string, any | Record<string, any>>} Proxy instance.
   */
  get messages () {
    return this.generateValidationHandler({
      delegate: ({ field, validator }) => validator.getAllMessages({ field }),
    })
  }

  /**
   * get: Proxy instance to handle invalid.
   *
   * @returns {Record<string, any | Record<string, any>>} Proxy instance.
   */
  get message () {
    return this.generateValidationHandler({
      delegate: ({ field, validator }) => validator.getOneMessage({ field }),
    })
  }

  /**
   * get: generate Proxy instance with delegate callback.
   *
   * @param {{
   *   delegate: (params: {
   *     field: string
   *     validator: import('~/modules/client/VariablesPerSchemaValidator').default
   *   }) => *,
   * }} params - Parameters.
   * @returns {Record<string, any | Record<string, any>>} Proxy instance.
   */
  generateValidationHandler ({
    delegate,
  }) {
    const resultInstance = this

    return new Proxy({}, {
      /**
       * Get handler.
       *
       * @param {*} _
       * @param {string} field
       * @param {VariablesValidationResult} receiver
       * @returns {boolean | *} true: valid.
       */
      get (_, field, receiver) {
        if (!field.startsWith('$')) {
          const firstValidator =
            Object.values(resultInstance.validatorHash)
              .at(0)

          if (!firstValidator) {
            return true // when no validator, always true.
          }

          return delegate({
            field,
            validator: firstValidator,
          })
        }

        // ordered schema
        const schemaCore = field.slice(1)
        const schemaValidator = resultInstance.validatorHash[schemaCore]

        // When no validators of the schema
        if (!schemaValidator) {
          return new Proxy({}, {
            get (target, field, receiver) {
              return true // when no validators, always true.
            },
          })
        }

        return new Proxy({}, {
          /**
           * Get handler.
           *
           * @param {*} _
           * @param {string} field
           * @param {VariablesValidationResult} receiver
           * @returns {boolean | *} true: valid.
           */
          get (_, field, receiver) {
            return delegate({
              field,
              validator: schemaValidator,
            })
          },
        })
      },
    })
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
