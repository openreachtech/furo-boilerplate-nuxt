import FormControlElementClerk from '~/modules/domClerks/FormControlElementClerk'
import VariablesValidator from '~/modules/validators/ValueHashValidator'
import FieldValidator from '~/modules/client/FieldValidator'

/**
 * Base class of form element clerk.
 *
 * @template T
 * @template {Record<string, string | Array<string> | null>} FV - Form value hash.
 * @template {Record<string, *>} SV - Schema variable hash.
 */
export default class BaseFormElementClerk {
  /**
   * Constructor of BaseFormElementClerk.
   *
   * @param {BaseFormElementClerkParams} params
   */
  constructor ({
    formElement,
  }) {
    this.formElement = formElement
  }

  /**
   * Factory method of BaseFormElementClerk.
   *
   * @param {BaseFormElementClerkFactoryParams} params - Parameters of factory method.
   * @template {Record<string, string | Array<string> | null>} FV - Form value hash.
   * @template {Record<string, *>} SV - Schema variable hash.
   * @template {typeof BaseFormElementClerk<T, FV, SV>} T
   * @this {T}
   * @returns {InstanceType<T>} Instance of this class.
   */
  static create ({
    formElement,
  }) {
    return /** @type {*} */ (
      new this({
        formElement,
      })
    )
  }

  /**
   * get: Validators.
   *
   * @abstract
   * @returns {Array<ValidatorOptionsType>} Array of arguments to create an instance of FieldValidator.
   */
  static get validators () {
    return []
  }

  /**
   * get: Constructor from instance.
   *
   * @template {typeof BaseFormElementClerk} T
   * @returns {T} Constructor of the instance.
   */
  get Ctor () {
    return /** @type {*} */ (this.constructor)
  }

  /**
   * get: All control elements of the form.
   *
   * @returns {Array<FormControlElementType>}
   */
  get controlElements () {
    return /** @type {Array<*>} */ (
      [...this.formElement.elements]
    )
  }

  /**
   * Generate validation hash.
   *
   * @returns {import('~/modules/validators/ValueHashValidator').ValidatorHashType} Validation result.
   * @public
   */
  generateValidationHash () {
    const fieldValidators = this.Ctor.validators
      .map(it =>
        FieldValidator.create(it)
      )

    const validator = VariablesValidator.create({
      valueHash: this.extractValueHash(),
      validators: fieldValidators,
    })

    return validator.generateValidationHash()
  }

  /**
   * Generate schema variable hash.
   * The return value is set to Payload's variables.
   * NOTE: When all <form> controls are used as is for Payload's variables,
   *   does not need to override this method.
   * Why we use the complex structure of parameter?
   * It is for the resolve the input value and of the type definition of the return value.
   *
   * @param {{
   *   formValueHash?: FV
   * }} params - Parameters.
   * @returns {SV} Hash of schema variables.
   * @public
   */
  generateSchemaVariableHash ({
    formValueHash = this.extractValueHash(),
  } = {}) {
    return /** @type {*} */ (formValueHash)
  }

  /**
   * Is valid.
   *
   * @returns {boolean} true: valid.
   */
  isValid () {
    const validationHash = this.generateValidationHash()

    return Object.values(validationHash)
      .every(it => it)
  }

  /**
   * Is invalid.
   *
   * @returns {boolean} true: invalid.
   */
  isInvalid () {
    return !this.isValid()
  }

  /**
   * Extract value hash from the form element.
   *
   * @returns {FV} Hash of form control value.
   */
  extractValueHash () {
    const controlHash = this.extractControlElements()

    return /** @type {*} */ (
      Object.fromEntries(
        Object.entries(controlHash)
          .map(([name, control]) => [
            name,
            FormControlElementClerk.create({
              control,
            })
              .extractValueHash(),
          ])
      )
    )
  }

  /**
   * Extract control elements by object hash.
   *
   * @returns {Record<string, FormControlElementHash>} Hash of form control elements.
   */
  extractControlElements () {
    const names = this.extractNames()

    return Object.fromEntries(
      names.map(it => [
        it,
        this.formElement[it],
      ])
    )
  }

  /**
   * Extract names of the control elements.
   *
   * @returns {Array<string>}
   */
  extractNames () {
    return /** @type Array<*>} */ (
      [...new Set(
        this.controlElements
          .map(it => it.getAttribute('name'))
          .filter(it => it)
      )]
    )
  }
}

/**
 * @typedef {{
 *   formElement: HTMLFormElement
 * }} BaseFormElementClerkParams
 */

/**
 * @typedef {BaseFormElementClerkParams} BaseFormElementClerkFactoryParams
 */

/**
 * @typedef {FormControlElementType | RadioNodeList} FormControlElementHash
 */

/**
 * @typedef {HTMLButtonElement
 *   | HTMLInputElement
 *   | HTMLOptionElement
 *   | HTMLSelectElement
 *   | HTMLTextAreaElement
 * } FormControlElementType
 */

/**
 * @typedef {import('~/modules/client/FieldValidator').FieldValidatorFactoryParams} ValidatorOptionsType
 */
