import FuroTabContext from './FuroTabContext.js'

/**
 * Props context class for FuroTabLayout component.
 *
 * @property {Array} tabContexts - Tab contexts.
 * @property {string | null} activeTabKey - Active tab key
 */
export default class FuroTabLayoutContext {
  /**
   * Constructor.
   *
   * @param {FuroTabLayoutContextParams} params - Parameters of this constructor.
   */
  constructor ({
    tabContexts,
    activeTabKey,
  }) {
    this.tabContexts = tabContexts
    this.activeTabKey = activeTabKey
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof FuroTabLayoutContext ? X : never} T, X
   * @param {FuroTabLayoutContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - New instance of this class.
   * @this {T}
   */
  static create ({
    props: {
      tabs,
      activeTabKey = null,
    },
  }) {
    const tabContexts = tabs.map((it, index) =>
      this.createTabContexts({
        tab: it,
      })
    )

    return /** @type {InstanceType<T>} */ (
      new this({
        tabContexts,
        activeTabKey,
      })
    )
  }

  /**
   * Create tab contexts.
   *
   * @param {{
   *   tab: FuroTabParams
   * }} params - Parameters of this factory method.
   * @returns {FuroTabContext} - New instance of this class.
   */
  static createTabContexts ({
    tab: {
      tabKey,
      label,
    },
  }) {
    return FuroTabContext.create({
      tabKey,
      label,
    })
  }

  /**
   * Is active tab.
   *
   * @param {{
   *   tabKey: string
   * }} params - Parameters of this method
   * @returns {boolean} - true: if default active.
   */
  isActiveTab ({
    tabKey,
  }) {
    return this.activeTabKey === tabKey
  }

  /**
   * On click tab.
   *
   * @param {{
   *   event: {
   *     target: HTMLElement
   *   }
   *   tabsRef: Array<HTMLElement>
   * }} params - Parameters of this method
   * @returns {void}
   */
  onClickTab ({
    event: {
      target,
    },
    tabsRef,
  }) {
    const ACTIVE_CLASS = 'active'

    tabsRef.forEach(it => {
      it['classList'].remove(ACTIVE_CLASS)
    })

    target['classList'].add(ACTIVE_CLASS)
  }
}

/**
 * @typedef {{
 *   tabContexts: Array<FuroTabContext>
 *   activeTabKey: string | null
 * }} FuroTabLayoutContextParams
 */

/**
 * @typedef {{
 *   props: {
 *     tabs: Array<FuroTabParams>
 *     activeTabKey?: string | null
 *   }
 * }} FuroTabLayoutContextFactoryParams
 */

/**
 * @typedef {{
 *   tabKey: string
 *   label: string
 * }} FuroTabParams
 */
