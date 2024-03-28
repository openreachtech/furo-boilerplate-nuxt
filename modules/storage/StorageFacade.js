export default class StorageFacade {
  /**
   * Constructor.
   *
   * @param {StorageFacadeParams} params - Parameters of the constructor.
   */
  constructor ({
    storage,
  }) {
    this.storage = storage
  }
}

/**
 * @typedef {{
 *   storage: Storage
 * }} StorageFacadeParams
 */
