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
   * Fetch function.
   *
   * @returns {(
   *   input: URL | RequestInfo,
   *   init?: RequestInit
   * ) => Promise<Response>} fetch function.
   */
  static get fetch () {
    return fetch
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
   * get: Capsule class.
   *
   * @abstract
   * @returns {typeof import('./BaseGraphqlCapsule')} Capsule class.
   * @throws {Error} This function must be inherited.
   */
  static get Capsule () {
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

  /**
   * get: Endpoint URL.
   *
   * @returns {string} Endpoint URL.
   */
  get endpointUrl () {
    return this.config.ENDPOINT_URL
  }

  /**
   * Create payload.
   *
   * @returns {import('./BaseGraphqlPayload')} Instance of Payload.
   */
  createPayload () {
    return this.Ctor
      .Payload
      .create()
  }

  /**
   * Create instance of capsule with result.
   *
   * @param {{
   *   rawResponse: Response
   *   payload: import('./BaseGraphqlPayload')
   *   result: object
   * }} params - Parameters.
   * @returns
   */
  createResultCapsule ({
    rawResponse,
    payload,
    result,
  }) {
    const args = {
      rawResponse,
      payload,
      result,
    }

    return this.Ctor
      .Capsule
      .create(args)
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
