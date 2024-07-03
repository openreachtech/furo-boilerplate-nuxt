import JsonParseErrorGraphqlCapsule from '@/modules/client/capsules/JsonParseErrorGraphqlCapsule'
import NetworkErrorGraphqlCapsule from '@/modules/client/capsules/NetworkErrorGraphqlCapsule'

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
   * @returns {typeof import('./BaseGraphqlPayload').default} Payload class.
   * @throws {Error} This function must be inherited.
   */
  static get Payload () {
    throw new Error('this function must be inherited')
  }

  /**
   * get: Capsule class.
   *
   * @abstract
   * @returns {typeof import('./BaseGraphqlCapsule').default} Capsule class.
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
   * Launch query.
   *
   * @public
   * @param {{
   *   variables?: object | null
   *   options?: RequestInit
   * }} Params - Parameters.
   * @returns {Promise<import('./BaseGraphqlCapsule').default>} Promise of instance of capsule.
   */
  async launchQuery ({
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
      return NetworkErrorGraphqlCapsule.create({
        payload,
      })
    }

    const result = await this.generateFetchResult({
      response,
    })
    if (result === null) {
      return JsonParseErrorGraphqlCapsule.create({
        rawResponse: response,
        payload,
      })
    }

    return this.createResultCapsule({
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
   *   payload: import('@/modules/client/BaseGraphqlPayload').default
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
   * @returns {import('./BaseGraphqlPayload').default} Instance of Payload.
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
   *   payload: import('./BaseGraphqlPayload')
   *   result: object
   * }} params - Parameters.
   * @returns {import('./BaseGraphqlCapsule').default} Instance of capsule.
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
