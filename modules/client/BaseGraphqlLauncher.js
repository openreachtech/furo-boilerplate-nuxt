import {
  LAUNCH_ABORTED_REASON,
} from './BaseGraphqlCapsule.js'

/**
 * Base class of GraphQL launcher.
 *
 * @template T - Type of this class.
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
   * @param {BaseGraphqlLauncherFactoryParams} [params] - Parameters of factory method.
   * @template {typeof BaseGraphqlLauncher} T
   * @this {T}
   * @returns {InstanceType<T>} Instance of this class.
   */
  static create ({
    config = this.graphqlConfig,
  } = {}) {
    return /** @type {*} */ (
      new this({
        config,
      })
    )
  }

  /**
   * get: GraphQL configuration.
   *
   * @abstract
   * @returns {{
   *   [key: string]: string
   * }} GraphQL configuration.
   * @throws {Error} This function must be inherited.
   */
  static get graphqlConfig () {
    throw new Error('this function must be inherited')
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
   * get: Launcher class.
   *
   * @abstract
   * @returns {typeof BaseGraphqlLauncher<*>} Launcher class.
   */
  static get Launcher () {
    return this
  }

  /**
   * get: Payload class.
   *
   * @abstract
   * @returns {PayloadClass<*, *>} Payload class.
   * @throws {Error} This function must be inherited.
   */
  static get Payload () {
    throw new Error('this function must be inherited')
  }

  /**
   * get: Capsule class.
   *
   * @abstract
   * @returns {CapsuleClass<*, *>} Capsule class.
   * @throws {Error} This function must be inherited.
   */
  static get Capsule () {
    throw new Error('this function must be inherited')
  }

  /**
   * Create payload.
   *
   * @param {{
   *   variables: RequestVariables
   *   options: RequestInit
   * }} params - Parameters.
   * @template P
   * @returns {InstanceType<P>} Instance of Payload.
   */
  static createPayload ({
    variables,
    options,
  }) {
    return /** @type {*} */ (
      this.Payload
        .create({
          variables,
          options,
        })
    )
  }

  /**
   * Create instance of capsule with result.
   *
   * @param {CapsuleParams} params - Parameters.
   * @template C
   * @returns {InstanceType<C>} Instance of capsule.
   */
  static createCapsule ({
    rawResponse,
    payload,
    result,
    abortedReason,
  }) {
    const args = {
      rawResponse,
      payload,
      result,
      abortedReason,
    }

    return /** @type {*} */ (
      this.Capsule.create(args)
    )
  }

  /**
   * Create instance of capsule with result as pending.
   *
   * @template C
   * @returns {InstanceType<C>} Instance of capsule.
   */
  static createCapsuleAsPending () {
    const args = {
      rawResponse: null,
      payload: null,
      result: null,
    }

    return this.createCapsule(args)
  }

  /**
   * Create instance of capsule with result as network error.
   *
   * @param {{
   *   payload: InstanceType<PayloadClass<*, *>>
   * }} params - Parameters.
   * @template C, D
   * @returns {InstanceType<CapsuleClass<C, D>>} Instance of capsule.
   */
  static createCapsuleAsInvalidVariablesError ({
    payload,
  }) {
    const args = {
      rawResponse: null,
      payload,
      result: null,
      abortedReason: LAUNCH_ABORTED_REASON.INVALID_VARIABLES,
    }

    return this.createCapsule(args)
  }

  /**
   * Create instance of capsule with result as aborted by hooks.
   *
   * @param {{
   *   payload: InstanceType<PayloadClass<*, *>>
   * }} params - Parameters.
   * @template C, D
   * @returns {InstanceType<CapsuleClass<C, D>>} Instance of capsule.
   */
  static createCapsuleAsAbortedByHooks ({
    payload,
  }) {
    const args = {
      rawResponse: null,
      payload,
      result: null,
      abortedReason: LAUNCH_ABORTED_REASON.BEFORE_REQUEST_HOOK,
    }

    return this.createCapsule(args)
  }

  /**
   * Create instance of capsule with result as network error.
   *
   * @param {{
   *   payload: InstanceType<PayloadClass<*, *>>
   * }} params - Parameters.
   * @template C, D
   * @returns {InstanceType<CapsuleClass<C, D>>} Instance of capsule.
   */
  static createCapsuleAsNetworkError ({
    payload,
  }) {
    const args = {
      rawResponse: null,
      payload,
      result: null,
    }

    return this.createCapsule(args)
  }

  /**
   * Create instance of capsule with result as JSON parse error.
   *
   * @param {{
   *   rawResponse: Response
   *   payload: InstanceType<PayloadClass<*, *>>
   * }} params - Parameters.
   * @template C, D
   * @returns {InstanceType<CapsuleClass<C, D>>} Instance of capsule.
   */
  static createCapsuleAsJsonParseError ({
    rawResponse,
    payload,
  }) {
    const args = {
      rawResponse,
      payload,
      result: null,
    }

    return this.createCapsule(args)
  }

  /**
   * get: Constructor from instance.
   *
   * @template {typeof BaseGraphqlLauncher} T
   * @returns {T} Constructor of the instance.
   */
  get Ctor () {
    return /** @type {*} */ (this.constructor)
  }

  /**
   * get: Endpoint URL.
   *
   * @returns {RequestInfo | URL} Endpoint URL.
   */
  get endpointUrl () {
    return this.config.ENDPOINT_URL
  }

  /**
   * Launch request.
   *
   * @param {{
   *   payload: InstanceType<PayloadClass<*, *>>
   *   hooks?: GraphqlLauncherHooks
   * }} params - Parameters.
   * @template C, D
   * @returns {Promise<InstanceType<CapsuleClass<C, D>>>} Promise of instance of capsule.
   * @public
   */
  async launchRequest ({
    payload,
    hooks: {
      beforeRequest = async () => false,
      afterRequest = async () => {},
    } = {},
  }) {
    const capsule = await this.obtainCapsule({
      payload,
      beforeRequest,
    })

    await afterRequest(capsule)

    return capsule
  }

  /**
   * Obtain capsule.
   *
   * @param {{
   *   payload: InstanceType<PayloadClass<*, *>>
   *   beforeRequest: (payload: InstanceType<PayloadClass<*, *>>) => Promise<boolean>
   * }} params - Parameters.
   * @returns {Promise<InstanceType<CapsuleClass<*, *>>>} An instance of capsule.
   */
  async obtainCapsule ({
    payload,
    beforeRequest,
  }) {
    if (payload.isInvalidVariables()) {
      return this.Ctor.createCapsuleAsInvalidVariablesError({
        payload,
      })
    }

    const aborted = await beforeRequest(payload)
    if (aborted) {
      return this.Ctor.createCapsuleAsAbortedByHooks({
        payload,
      })
    }

    return this.retrieveLaunchedCapsule({
      payload,
    })
  }

  /**
   * Resolve launched capsule.
   *
   * @param {{
   *   payload: InstanceType<PayloadClass<*, *>>
   * }} params - Parameters.
   * @returns {Promise<InstanceType<CapsuleClass<*, *>>>} Promise of instance of capsule.
   */
  async retrieveLaunchedCapsule ({
    payload,
  }) {
    const response = await this.invokeFetchQuery({
      payload,
    })
    if (response === null) {
      return this.Ctor.createCapsuleAsNetworkError({
        payload,
      })
    }

    const result = await this.generateFetchResult({
      response,
    })
    if (result === null) {
      return this.Ctor.createCapsuleAsJsonParseError({
        rawResponse: response,
        payload,
      })
    }

    return this.Ctor.createCapsule({
      rawResponse: response,
      payload,
      result,
    })
  }

  /**
   * Fetch query.
   *
   * @param {{
   *   payload: InstanceType<PayloadClass<*, *>>
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
}

/**
 * @typedef {{
 *   config: {
 *     [x: string]: string
 *   }
 * }} BaseGraphqlLauncherParams
 */

/**
 * @typedef {{
 *   config?: {
 *     [x: string]: string
 *   }
 * }} BaseGraphqlLauncherFactoryParams
 */

/**
 * @template {typeof import('./BaseGraphqlPayload')} P
 * @template {RequestVariables} SV
 * @typedef {typeof import('./BaseGraphqlPayload').default<P, SV>} PayloadClass
 */

/**
 * @template {typeof import('./BaseGraphqlCapsule')} C, D
 * @typedef {typeof import('./BaseGraphqlCapsule').default<C, D>} CapsuleClass
 */

/**
 * @typedef {import('./BaseGraphqlPayload').GraphqlRequestVariables} RequestVariables
 */

/**
 * @typedef {{
 *   rawResponse: Response | null
 *   payload: InstanceType<PayloadClass<*, *>> | null
 *   result: object | null
 *   abortedReason?: import('./BaseGraphqlCapsule').LAUNCH_ABORTED_REASON
 * }} CapsuleParams
 */

/**
 * @typedef {{
 *   variables?: RequestVariables
 *   options?: RequestInit
 *   hooks?: GraphqlLauncherHooks
 * }} GraphqlRequestArgs
 */

/**
 * @typedef {{
 *   beforeRequest?: (payload: InstanceType<PayloadClass<*, *>>) => Promise<boolean>
 *   afterRequest?: (capsule: InstanceType<CapsuleClass<*, *>>) => Promise<void>
 * }} GraphqlLauncherHooks
 */
