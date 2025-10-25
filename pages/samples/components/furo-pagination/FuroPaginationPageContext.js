import BaseAppContext from '~/app/vue/contexts/BaseAppContext.js'

/**
 * FuroPaginationPageContext.
 *
 * @extends {BaseAppContext<null>} - Base class.
 */
export default class FuroPaginationPageContext extends BaseAppContext {
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
