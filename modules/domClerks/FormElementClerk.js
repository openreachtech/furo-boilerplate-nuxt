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
 * @typedef {HTMLButtonElement
 *   | HTMLInputElement
 *   | HTMLOptionElement
 *   | HTMLSelectElement
 *   | HTMLTextAreaElement
 * } FormControlElementType
 */
