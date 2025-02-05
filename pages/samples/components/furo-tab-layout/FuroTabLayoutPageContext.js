import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * FuroTabLayoutPageContext.
 *
 * @extends {BaseFuroContext<null>} - Base class.
 */
export default class FuroTabLayoutPageContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {FuroTabLayoutPageContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,
    changeTabResultRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.changeTabResultRef = changeTabResultRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof FuroTabLayoutPageContext ? X : never} T, X
   * @override
   * @param {FuroTabLayoutPageContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    changeTabResultRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        changeTabResultRef,
      })
    )
  }

  /**
   * get: tabs.
   *
   * @returns {Array<{
   *   tabKey: string
   *   label: string
   * }>}
   */
  get tabs () {
    return [
      {
        tabKey: 'alpha',
        label: 'Alpha',
      },
      {
        tabKey: 'beta',
        label: 'Beta',
      },
      {
        tabKey: 'gamma',
        label: 'Gamma',
      },
    ]
  }

  /**
   * Change tab.
   *
   * @param {{
   *   fromTab: import('@openreachtech/furo-nuxt/lib/contexts/concretes/FuroTabItemContext').default | null
   *   toTab: import('@openreachtech/furo-nuxt/lib/contexts/concretes/FuroTabItemContext').default | null
   * }} params - Parameters of this method.
   */
  changeTab ({
    fromTab,
    toTab,
  }) {
    this.changeTabResultRef.value = {
      fromTab,
      toTab,
    }
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext.js').BaseFuroContextParams & {
 *   changeTabResultRef: import('vue').Ref<{
 *     fromTab: import('@openreachtech/furo-nuxt/lib/contexts/concretes/FuroTabItemContext').default | null
 *     toTab: import('@openreachtech/furo-nuxt/lib/contexts/concretes/FuroTabItemContext').default | null
 *   }>
 * }} FuroTabLayoutPageContextParams
 */

/**
 * @typedef {FuroTabLayoutPageContextParams} FuroTabLayoutPageContextFactoryParams
 */
