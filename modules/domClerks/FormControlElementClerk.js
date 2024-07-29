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

  /**
   * Extract value from the select element.
   *
   * @param {{
   *   selectElement: HTMLSelectElement
   * }} params
   * @returns {FormControlElementValueHash}
   */
  extractValueHashFromSelectElement ({
    selectElement,
  }) {
    if (!selectElement.multiple) {
      return selectElement.value
        || null // for <option disabled selected>
    }

    /** @type {Array<HTMLOptionElement>} */
    const optionElements = [...selectElement.selectedOptions]

    return /** @type {Array<*>} */ (
      optionElements
        .map(it =>
          FormControlElementClerk.create({
            control: it,
          })
        )
        .map(it =>
          it.extractValueHash()
        )
    )
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

/**
 * @typedef {string | Array<string> | null} FormControlElementValueHash
 */
