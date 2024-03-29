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

  /**
   * Get an item from the storage.
   *
   * @param {string} key - Key of the item.
   * @returns {string} Value of the item.
   */
  get (key) {
    const methodName = 'getItem'

    return this.storage[methodName](key)
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
