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
