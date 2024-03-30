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
   * Factory method to create an instance with `localStorage`.
   *
   * @returns {StorageFacade} Instance of this class.
   */
  static createAsLocal () {
    return this.create({
      storage: localStorage,
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

  /**
   * Set an item to the storage.
   *
   * @param {string} key - Key of the item.
   * @param {string} value - Value of the item.
   * @returns {StorageFacade} For method chaining.
   */
  set (
    key,
    value
  ) {
    const methodName = 'setItem'

    this.storage[methodName](key, value)

    return this
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
