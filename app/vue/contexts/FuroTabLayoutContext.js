import BaseFuroContext from './BaseFuroContext.js'

import FuroTabContext from './FuroTabContext.js'

/**
 * Props context class for FuroTabLayout component.
 *
 * @property {Array} tabContexts - Tab contexts.
 * @property {string | null} activeTabKey - Active tab key
 * @extends {BaseFuroContext<null>}
 */
export default class FuroTabLayoutContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {FuroTabLayoutContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,
    tabElementsRef,
    tabContexts,
    activeTabKey,
  }) {
    super({
      props,
      componentContext,
    })

    this.tabElementsRef = tabElementsRef
    this.tabContexts = tabContexts
    this.activeTabKey = activeTabKey
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof FuroTabLayoutContext ? X : never} T, X
   * @override
   * @param {FuroTabLayoutContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - New instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    tabElementsRef,
  }) {
    const {
      tabs,
      activeTabKey = null,
    } = props

    const tabContexts = tabs.map((it, index) =>
      this.createTabContexts({
        tab: it,
      })
    )

    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        tabElementsRef,
        componentContext,
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
 *   props: FuroTabLayoutContextProps
 *   componentContext: import('vue').SetupContext
 *   tabElementsRef: import('vue').Ref<Array<HTMLElement>>
 *   tabContexts: Array<FuroTabContext>
 *   activeTabKey: string | null
 * }} FuroTabLayoutContextParams
 */

/**
 * @typedef {{
 *   props: FuroTabLayoutContextProps
 *   componentContext: import('vue').SetupContext
 *   tabElementsRef: import('vue').Ref<Array<HTMLElement>>
 * }} FuroTabLayoutContextFactoryParams
 */

/**
 * @typedef {{
 *   tabs: Array<FuroTabParams>
 *   activeTabKey?: string | null
 * }} FuroTabLayoutContextProps
 */

/**
 * @typedef {{
 *   tabKey: string
 *   label: string
 * }} FuroTabParams
 */
