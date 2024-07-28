export default class FormControlElementClerk {
  /**
   * Constructor of FormControlElementClerk.
   *
   * @param {FormControlElementClerkParams} params
   */
  constructor ({
    control,
  }) {
    this.control = control
  }

  /**
   * Factory method of FormControlElementClerk.
   *
   * @param {FormControlElementClerkFactoryParams} params
   * @returns
   */
  static create ({
    control,
  }) {
    return new this({
      control,
    })
  }
}

/**
 * @typedef {{
 *   control: FormControlElementType
 * }} FormControlElementClerkParams
 */

/**
 * @typedef {FormControlElementClerkParams} FormControlElementClerkFactoryParams
 */

/**
 * @typedef {HTMLButtonElement
 *   | HTMLInputElement
 *   | HTMLOptionElement
 *   | HTMLSelectElement
 *   | HTMLTextAreaElement
 *   | RadioNodeList
 * } FormControlElementType
 */
