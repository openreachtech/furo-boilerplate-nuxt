import FormControlElementClerk from '~/modules/domClerks/FormControlElementClerk'

export default class FormElementClerk {
  /**
   * Constructor of FormElementClerk.
   *
   * @param {FormElementClerkParams} params
   */
  constructor ({
    formElement,
  }) {
    this.formElement = formElement
  }

  /**
   * Factory method of FormElementClerk.
   *
   * @param {FormElementClerkFactoryParams} params
   * @returns
   */
  static create ({
    formElement,
  }) {
    return new this({
      formElement,
    })
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
 * }} FormElementClerkParams
 */

/**
 * @typedef {FormElementClerkParams} FormElementClerkFactoryParams
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
