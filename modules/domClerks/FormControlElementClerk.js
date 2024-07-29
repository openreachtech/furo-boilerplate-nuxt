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
   * Extract value from the control element.
   *
   * @returns {FormControlElementValueHash}
   */
  extractValueHash () {
    if (this.control instanceof HTMLInputElement) {
      return this.control.value
    }

    if (this.control instanceof HTMLTextAreaElement) {
      return this.control.value
    }

    if (this.control instanceof HTMLSelectElement) {
      return this.extractValueHashFromSelectElement({
        selectElement: this.control,
      })
    }

    if (this.control instanceof HTMLOptionElement) {
      return this.control.value
    }

    if (this.control instanceof RadioNodeList) {
      return this.extractValueHashFromRadioNodes({
        radioNodes: this.control,
      })
    }

    return null
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

  /**
   * Extract value from the radio node list
   *
   * @param {{
   *   radioNodes: RadioNodeList
   * }} params
   * @returns {FormControlElementValueHash}
   */
  extractValueHashFromRadioNodes ({
    radioNodes,
  }) {
    /** @type {Array<HTMLInputElement>} */
    const inputElements = /***/ (
      [...radioNodes.values()]
    )

    if (inputElements.length === 0) {
      return null
    }

    const sampleElement = inputElements.at(0)

    if (sampleElement?.type === 'radio') {
      const checkedElement = inputElements.find(it => it.checked)

      return checkedElement?.value
        ?? null
    }

    const extractingElements = sampleElement?.type === 'checkbox'
      ? inputElements.filter(it => it.checked)
      : inputElements

    return /** @type {Array<string>} */ (
      extractingElements
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
