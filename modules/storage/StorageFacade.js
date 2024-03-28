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

  /**
   * Factory method.
   *
   * @param {StorageFacadeFactoryParams} params - Parameters of the factory method.
   * @returns {StorageFacade} Instance of this class.
   */
  static create ({
    storage,
  }) {
    return new this({
      storage,
    })
  }
}

/**
 * @typedef {{
 *   storage: Storage
 * }} StorageFacadeParams
 */

/**
 * @typedef {StorageFacadeParams} StorageFacadeFactoryParams
 */
