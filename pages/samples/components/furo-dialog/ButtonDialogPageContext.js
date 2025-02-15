import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * ButtonDialogPageContext.
 *
 * @extends {BaseFuroContext<null>} - Base class.
 */
export default class ButtonDialogPageContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {ButtonDialogPageContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,
    feedbackMessageRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.feedbackMessageRef = feedbackMessageRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof ButtonDialogPageContext ? X : never} T, X
   * @override
   * @param {ButtonDialogPageContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    feedbackMessageRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        feedbackMessageRef,
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
   * get: feedbackMessage.
   *
   * @type {string | null}
   */
  get feedbackMessage () {
    return this.feedbackMessageRef.value
  }

  /**
   * Click positive button.
   *
   * @param {{
   *   dialogType: string
   * }} params - Parameters.
   */
  clickPositiveButton ({
    dialogType,
  }) {
    this.feedbackMessageRef.value = `Positive @${dialogType}`
  }

  /**
   * Click negative button.
   *
   * @param {{
   *   dialogType: string
   * }} params - Parameters.
   */
  clickNegativeButton ({
    dialogType,
  }) {
    this.feedbackMessageRef.value = `Negative @${dialogType}`
  }

  /**
   * Click neutral button.
   *
   * @param {{
   *   dialogType: string
   * }} params - Parameters.
   */
  clickNeutralButton ({
    dialogType,
  }) {
    this.feedbackMessageRef.value = `Neutral @${dialogType}`
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext.js').BaseFuroContextParams & {
 *   feedbackMessageRef: import('vue').Ref<string | null>
 * }} ButtonDialogPageContextParams
 */

/**
 * @typedef {ButtonDialogPageContextParams} ButtonDialogPageContextFactoryParams
 */
