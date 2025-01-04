/**
 * Props context class for FuroButtonDialogContext component.
 *
 * @property {import('vue').Ref<HTMLDialogElement | null>} dialogRef - Dialog element.
 * @property {FuroButtonDialogContextEmit} emit - Emit event.
 */
export default class FuroButtonDialogContext {
  /**
   * Constructor.
   *
   * @param {FuroButtonDialogContextParams} params - Parameters of this constructor.
   */
  constructor ({
    dialogComponentRef,
    emit,
  }) {
    this.dialogComponentRef = dialogComponentRef
    this.emit = emit
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @param {FuroButtonDialogContextFactoryParams} params - Parameters of this factory method.
   * @returns {FuroButtonDialogContext} - New instance of this class.
   */
  static create ({
    dialogComponentRef,
    emit,
  }) {
    return new this({
      dialogComponentRef,
      emit,
    })
  }

  /**
   * emit() event name.
   *
   * @returns {{
   *   CLICK_POSITIVE_BUTTON: 'clickPositiveButton',
   *   CLICK_NEGATIVE_BUTTON: 'clickNegativeButton',
   *   CLICK_NEUTRAL_BUTTON: 'clickNeutralButton',
   * }}
   */
  static get EMIT_EVENT_NAME () {
    return {
      CLICK_POSITIVE_BUTTON: 'clickPositiveButton',
      CLICK_NEGATIVE_BUTTON: 'clickNegativeButton',
      CLICK_NEUTRAL_BUTTON: 'clickNeutralButton',
    }
  }

  /**
   * get: constructor.
   *
   * @returns {typeof FuroButtonDialogContext}
   */
  get Ctor () {
    return /** @type {*} */ (this.constructor)
  }

  /**
   * get: dialog component.
   *
   * @returns {import('~/components/lib/FuroDialog.vue').default | null}
   */
  get dialogComponent () {
    return this.dialogComponentRef.value
  }

  /**
   * Show dialog.
   */
  showDialog () {
    this.dialogComponent?.showDialog()
  }

  /**
   * Dismiss dialog.
   */
  dismissDialog () {
    this.dialogComponent?.dismissDialog()
  }

  /**
   * Click in backdrop.
   *
   * @returns {{
   *   showDialog: () => void,
   *   dismissDialog: () => void,
   * }}
   */
  generateExposeHash () {
    return {
      showDialog: () => this.showDialog(),
      dismissDialog: () => this.dismissDialog(),
    }
  }

  /**
   * Click in positive button.
   */
  clickPositiveButton () {
    this.emit(
      this.Ctor
        .EMIT_EVENT_NAME
        .CLICK_POSITIVE_BUTTON
    )

    this.dismissDialog()
  }

  /**
   * Click in negative button.
   */
  clickNegativeButton () {
    this.emit(
      this.Ctor
        .EMIT_EVENT_NAME
        .CLICK_NEGATIVE_BUTTON
    )

    this.dismissDialog()
  }

  /**
   * Click in neutral button.
   */
  clickNeutralButton () {
    this.emit(
      this.Ctor
        .EMIT_EVENT_NAME
        .CLICK_NEUTRAL_BUTTON
    )

    this.dismissDialog()
  }
}

/**
 * @typedef {import('./BaseFuroContext').BaseFuroContextParams & {
 *   dialogComponentRef: import('vue').Ref<import('~/components/lib/FuroDialog.vue').default | null>
 *   emit: FuroButtonDialogContextEmit
 * }} FuroButtonDialogContextParams
 */

/**
 * @typedef {FuroButtonDialogContextParams} FuroButtonDialogContextFactoryParams
 */

/**
 * @typedef {(
 *   event: 'clickBackdrop' | 'clickPositiveButton' | 'clickNegativeButton' | 'clickNeutralButton',
 *   ...args: Array<any>
 * ) => void} FuroButtonDialogContextEmit
 */
