import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * FuroPaginationPageContext.
 *
 * @extends {BaseFuroContext<null>} - Base class.
 */
export default class FuroPaginationPageContext extends BaseFuroContext {
  /**
   * get: pagination.
   *
   * @returns {{
   *   limit: number,
   *   totalRecords: number
   * }} - Pagination.
   */
  get pagination () {
    return {
      limit: 5,
      totalRecords: 53,
    }
  }
}
