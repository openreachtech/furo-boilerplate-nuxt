/**
 * Base class of GraphQL launcher.
 *
 * @template T
 */
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
   * @template {typeof BaseGraphqlLauncher} T
   * @this {T}
   * @returns {InstanceType<T>} Instance of this class.
   */
  static create (params) {
    return /** @type {*} */ (
      new this(params)
    )
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
   * @returns {PayloadClass} Payload class.
   * @throws {Error} This function must be inherited.
   */
  static get Payload () {
    throw new Error('this function must be inherited')
  }

  /**
   * get: Capsule class.
   *
   * @abstract
   * @returns {CapsuleClass} Capsule class.
   * @throws {Error} This function must be inherited.
   */
  static get Capsule () {
    throw new Error('this function must be inherited')
  }

  /**
   * Create instance of capsule with result as pending.
   *
   * @returns {InstanceType<CapsuleClass>} Instance of capsule.
   */
  static createResultCapsuleAsPending () {
    const args = {
      rawResponse: null,
      payload: null,
      result: null,
    }

    return this.createResultCapsule(args)
  }

  /**
   * Create instance of capsule with result as network error.
   *
   * @param {{
   *   rawResponse: Response
   *   payload: InstanceType<PayloadClass>
   *   result: object
   * }} params - Parameters.
   * @returns {InstanceType<CapsuleClass>} Instance of capsule.
   */
  static createResultCapsuleAsNetworkError ({
    payload,
  }) {
    const args = {
      rawResponse: null,
      payload,
      result: null,
    }

    return this.createResultCapsule(args)
  }

  /**
   * Create instance of capsule with result as JSON parse error.
   *
   * @param {{
   *   rawResponse: Response
   *   payload: InstanceType<PayloadClass>
   * }} params - Parameters.
   * @returns {InstanceType<CapsuleClass>} Instance of capsule.
   */
  static createResultCapsuleAsJsonParseError ({
    rawResponse,
    payload,
  }) {
    const args = {
      rawResponse,
      payload,
      result: null,
    }

    return this.createResultCapsule(args)
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
   * Launch query.
   *
   * @param {{
   *   variables?: object | null
   *   options?: RequestInit
   * }} Params - Parameters.
   * @returns {Promise<InstanceType<CapsuleClass>>} Promise of instance of capsule.
   * @public
   */
  async launchRequest ({
    variables = {},
    options = {},
  } = {}) {
    const updatedOptions = this.updateOptions({
      options,
    })

    const payload = this.createPayload({
      variables,
      options: updatedOptions,
    })

    const response = await this.invokeFetchQuery({
      payload,
    })
    if (response === null) {
      return this.Ctor.createResultCapsuleAsNetworkError({
        payload,
      })
    }

    const result = await this.generateFetchResult({
      response,
    })
    if (result === null) {
      return this.Ctor.createResultCapsuleAsJsonParseError({
        rawResponse: response,
        payload,
      })
    }

    return this.Ctor.createResultCapsule({
      rawResponse: response,
      payload,
      result,
    })
  }

  /**
   * Update options.
   *
   * @param {{
   *   options: RequestInit
   * }} params - Parameters.
   * @returns {RequestInit} Updated options.
   */
  updateOptions ({
    options: {
      headers = new Headers(),
      ...extraOptions
    },
  }) {
    const updatedHeaders = this.updateHeaders({
      headers,
    })

    return {
      headers: updatedHeaders,
      ...extraOptions,
    }
  }

  /**
   * Update headers.
   *
   * @param {{
   *   headers: Headers
   * }} params - Parameters.
   * @returns {Headers} Updated headers.
   */
  updateHeaders ({
    headers,
  }) {
    return headers
  }

  /**
   * Fetch query.
   *
   * @param {{
   *   payload: InstanceType<PayloadClass>
   * }} params - Parameters.
   * @returns {Promise<Response | null>} Instance of fetch API response.
   */
  async invokeFetchQuery ({
    payload,
  }) {
    const request = payload.createFetchRequest({
      url: this.endpointUrl,
    })

    try {
      const $fetch = this.Ctor.fetch
      const response = await $fetch(request)

      return response
    } catch (error) {
      return null
    }
  }

  /**
   * Create payload.
   *
   * @param {{
   *   variables: object | null
   *   options: RequestInit
   * }} params - Parameters.
   * @returns {InstanceType<PayloadClass>} Instance of Payload.
   */
  createPayload ({
    variables,
    options,
  }) {
    return this.Ctor
      .Payload
      .create({
        variables,
        options,
      })
  }

  /**
   * Generate fetch result.
   *
   * @param {{
   *   response: Response
   * }} params - Parameters.
   * @returns {Promise<object | null>} Promise of JSON.
   */
  async generateFetchResult ({
    response,
  }) {
    try {
      const result = await response.json()

      return result
    } catch (error) {
      return null
    }
  }

  /**
   * Create instance of capsule with result.
   *
   * @param {{
   *   rawResponse: Response
   *   payload: InstanceType<PayloadClass>
   *   result: object
   * }} params - Parameters.
   * @returns {InstanceType<CapsuleClass>} Instance of capsule.
   */
  static createResultCapsule ({
    rawResponse,
    payload,
    result,
  }) {
    const args = {
      rawResponse,
      payload,
      result,
    }

    return this.Capsule.create(args)
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

/**
 * @typedef {typeof import('./BaseGraphqlPayload').default} PayloadClass
 */

/**
 * @typedef {typeof import('./BaseGraphqlCapsule').default} CapsuleClass
 */
