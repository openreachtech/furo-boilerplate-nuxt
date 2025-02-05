import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * DesignDialogPageContext.
 *
 * @extends {BaseFuroContext<null>} - Base class.
 */
export default class DesignDialogPageContext extends BaseFuroContext {
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
}
