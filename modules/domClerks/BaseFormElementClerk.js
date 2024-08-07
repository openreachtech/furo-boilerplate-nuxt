import FormControlElementClerk from '~/modules/domClerks/FormControlElementClerk'
import VariablesValidator from '~/modules/validators/VariablesValidator'
import FieldValidator from '~/modules/client/FieldValidator'

/**
 * Base class of form element clerk.
 *
 * @template T
 * @template {Record<string, string | Array<string> | null>} FV
 * @template {Record<string, *>} SV
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
   * @template {typeof BaseFormElementClerk<*, *, *>} T
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
   * @returns {import('~/modules/validators/VariablesValidator').ValidatorHashType} Validation result.
   * @public
   */
  generateValidationHash () {
    const fieldValidators = this.Ctor.validators
      .map(it =>
        FieldValidator.create(it)
      )

    const validator = VariablesValidator.create({
      variables: this.extractValueHash(),
      validators: fieldValidators,
    })

    return validator.generateValidationHash()
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
   * @returns {{
   *   [key: string]: string | Array<string> | null
   * }}
   */
  extractValueHash () {
    const controlHash = this.extractControlElements()

    return Object.fromEntries(
      Object.entries(controlHash)
        .map(([name, control]) => [
          name,
          FormControlElementClerk.create({
            control,
          })
            .extractValueHash(),
        ])
    )
  }

  /**
   * Extract control elements by object hash.
   *
   * @returns {{
   *   [key: string]: FormControlElementHash
   * }}
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
