/**
 * Props context class for FuroTab component.
 *
 * @property {string} tabKey - Tab key.
 * @property {string} label - Tab label.
 * @property {boolean} isActive - Whether the tab is active.
 */
export default class FuroTabContext {
  /**
   * Constructor.
   *
   * @param {FuroTabContextParams} params - Parameters of this constructor.
   */
  constructor ({
    tabKey,
    label,
    index,
  }) {
    this.tabKey = tabKey
    this.label = label
    this.index = index
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @param {FuroTabContextFactoryParams} params - Parameters of this factory method.
   * @returns {FuroTabContext} - New instance of this class.
   */
  static create ({
    tabKey,
    label,
  }) {
    return new this({
      tabKey,
      label,
    })
  }

  /**
   * Is target tab
   *
   * @param {{
   *   tabKey: string
   * }} params - Parameters of this method.
   * @returns {boolean} - Whether the tab is target.
   */
  isTargetTab ({
    tabKey,
  }) {
    return this.tabKey === tabKey
  }
}

/**
 * @typedef {{
 *   tabKey: string
 *   label: string
 *   index: number
 * }} FuroTabContextParams
 */

/**
 * @typedef {{
 *   tabKey: string
 *   label: string
 * }} FuroTabContextFactoryParams
 */
