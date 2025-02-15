import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * StatusDialogPageContext.
 *
 * @extends {BaseFuroContext<null>} - Base class.
 */
export default class StatusDialogPageContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {StatusDialogPageContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,
    statusMessageRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.statusMessageRef = statusMessageRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof StatusDialogPageContext ? X : never} T, X
   * @override
   * @param {StatusDialogPageContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    statusMessageRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        statusMessageRef,
      })
    )
  }

  /**
   * Show dialog.
   *
   * @param {{
   *   dialog: import('@openreachtech/furo-nuxt/lib/components/FuroDialog.vue').default
   * }} params - Parameters.
   */
  showDialog ({
    dialog,
  }) {
    dialog.showDialog()
  }

  /**
   * Dismiss dialog.
   *
   * @param {{
   *   dialog: import('@openreachtech/furo-nuxt/lib/components/FuroDialog.vue').default
   * }} params - Parameters.
   */
  dismissDialog ({
    dialog,
  }) {
    dialog.dismissDialog()
  }

  /**
   * get: statusMessage.
   *
   * @type {string | null}
   */
  get statusMessage () {
    return this.statusMessageRef.value
  }

  /**
   * Click on backdrop.
   *
   * @param {{
   *   dialog: import('@openreachtech/furo-nuxt/lib/components/FuroDialog.vue').default
   * }} params - Parameters of this method.
   */
  clickOnBackdrop ({
    dialog,
  }) {
    this.statusMessageRef.value = 'Clicked on backdrop'

    dialog.dismissDialog()
  }

  /**
   * On show dialog.
   */
  onShowDialog () {
    this.statusMessageRef.value = 'Show dialog'
  }

  /**
   * On dismiss dialog.
   */
  onDismissDialog () {
    this.statusMessageRef.value = 'Dismiss dialog'
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext.js').BaseFuroContextParams & {
 *   statusMessageRef: import('vue').Ref<string | null>
 * }} StatusDialogPageContextParams
 */

/**
 * @typedef {StatusDialogPageContextParams} StatusDialogPageContextFactoryParams
 */
