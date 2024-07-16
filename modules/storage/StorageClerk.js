export default class StorageClerk {
  /**
   * Constructor.
   *
   * @param {StorageClerkParams} params - Parameters of the constructor.
   */
  constructor ({
    storage,
  }) {
    this.storage = storage
  }

  /**
   * Factory method.
   *
   * @param {StorageClerkFactoryParams} params - Parameters of the factory method.
   * @returns {StorageClerk} Instance of this class.
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
   * @returns {StorageClerk} Instance of this class.
   */
  static createAsLocal () {
    return this.create({
      storage: localStorage,
    })
  }

  /**
   * Factory method to create an instance with `sessionStorage`.
   *
   * @returns {StorageClerk} Instance of this class.
   */
  static createAsSession () {
    return this.create({
      storage: sessionStorage,
    })
  }

  /**
   * Get an item from the storage.
   *
   * @param {string} key - Key of the item.
   * @returns {string | null} Value of the item.
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
   * @returns {StorageClerk} For method chaining.
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
 * }} StorageClerkParams
 */

/**
 * @typedef {StorageClerkParams} StorageClerkFactoryParams
 */
