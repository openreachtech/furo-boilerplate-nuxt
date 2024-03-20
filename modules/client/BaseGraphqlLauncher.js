export default class BaseGraphqlLauncher {
  /**
   * Constructor.
   *
   * @param {BaseGraphqlLauncherParams} params - Parameters of constructor.
   */
  constructor ({
    config,
  }) {
    this.config = config
  }

  /**
   * Factory method.
   *
   * @param {BaseGraphqlLauncherFactoryParams} params - Parameters of factory method.
   * @returns {BaseGraphqlLauncher} Instance of this class.
   */
  static create (params) {
    return new this(params)
  }

  /**
   * get: Payload class.
   *
   * @abstract
   * @returns {typeof import('./BaseGraphqlPayload')} Payload class.
   * @throws {Error} This function must be inherited.
   */
  static get Payload () {
    throw new Error('this function must be inherited')
  }

  /**
   * get: Constructor from instance.
   *
   * @returns {typeof BaseGraphqlLauncher} Constructor of the instance.
   */
  get Ctor () {
    return this.constructor
  }
}

/**
 * @typedef {{
 *   config: {
 *     [x: string]: string
 *   }
 * }} BaseGraphqlLauncherParams
 */

/**
 * @typedef {BaseGraphqlLauncherParams} BaseGraphqlLauncherFactoryParams
 */
