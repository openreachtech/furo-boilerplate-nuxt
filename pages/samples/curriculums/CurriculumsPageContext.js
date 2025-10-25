import BaseAppContext from '~/app/vue/contexts/BaseAppContext.js'

/**
 * CurriculumsPageContext.
 *
 * @extends {BaseAppContext<null>} - Base class.
 */
export default class CurriculumsPageContext extends BaseAppContext {
  /**
   * Constructor.
   *
   * @param {CurriculumsPageContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    graphqlClient,
    statusReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.graphqlClient = graphqlClient
    this.statusReactive = statusReactive
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof CurriculumsPageContext ? X : never} T, X
   * @override
   * @param {CurriculumsPageContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,

    graphqlClient,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,

        graphqlClient,
        statusReactive,
      })
    )
  }

  /**
   * Setup component context.
   *
   * @template {X extends CurriculumsPageContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent () {
    this.graphqlClient
      .invokeRequestOnMounted({
        variables: this.defaultVariables,
        hooks: this.graphqlRequestHooks,
      })

    return this
  }

  /**
   * get: defaultVariables.
   *
   * @returns {CurriculumsDefaultVariables} - Default variables.
   */
  get defaultVariables () {
    return { // TODO: Remove this variables with default values in Payload
      input: {
        pagination: {
          limit: 5,
          offset: 0,
          sort: {
            targetColumn: 'title',
            orderBy: 'ASC',
          },
        },
      },
    }
  }

  /**
   * get: graphqlRequestHooks.
   *
   * @returns {{
   *   beforeRequest: (payload: furo.Payload<*>) => Promise<boolean>
   *   afterRequest: (capsule: furo.Capsule<*>) => Promise<void>
   * }}
   */
  get graphqlRequestHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isLoading = true

        return false
      },
      afterRequest: async capsule => {
        this.statusReactive.isLoading = false
      },
    }
  }

  /**
   * get: capsuleRef.
   *
   * @returns {import('vue').Ref<import('../../../app/graphql/client/queries/curriculums/CurriculumsQueryGraphqlCapsule.js').default>} - Capsule reference.
   */
  get capsuleRef () {
    return /** @type {*} */ (
      this.graphqlClient.capsuleRef
    )
  }

  /**
   * get: curriculums.
   *
   * @returns {import('../../../app/graphql/client/queries/curriculums/CurriculumsQueryGraphqlCapsule.js').CurriculumsQueryResponseContent['curriculums']['curriculums']} - Array of curriculum.
   */
  get curriculums () {
    return this.capsuleRef.value
      .curriculums
  }

  /**
   * get: isLoading.
   *
   * @returns {boolean} - Loading status.
   */
  get isLoading () {
    return this.statusReactive.isLoading
  }

  /**
   * get: launcher hooks.
   *
   * @returns {furo.GraphqlLauncherHooks} - Launcher hooks.
   */
  get launcherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isLoading = true

        return false
      },
      afterRequest: async capsule => {
        this.statusReactive.isLoading = false
      },
    }
  }

  /**
   * Request curriculums.
   *
   * @param {{
   *   offset?: number
   *   hooks?: furo.GraphqlLauncherHooks
   * }} [args] - Arguments.
   * @returns {Promise<void>} - A promise.
   */
  async requestCurriculums ({
    offset = 0,
    hooks = this.launcherHooks,
  } = {}) {
    const variables = {
      input: {
        pagination: {
          limit: 5,
          offset,
          sort: {
            targetColumn: 'title',
            orderBy: 'ASC',
          },
        },
      },
    }

    await this.graphqlClient
      .invokeRequestOnEvent({
        variables,
        hooks: this.graphqlRequestHooks,
      })
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext.js').BaseFuroContextParams & {
 *   graphqlClient: FuroGraphqlClient
 *   statusReactive: import('vue').Reactive<Record<string, boolean>>
 * }} CurriculumsPageContextParams
 */

/**
 * @typedef {CurriculumsPageContextParams} CurriculumsPageContextFactoryParams
 */

/**
 * @typedef {{
 *   capsuleRef: import('vue').Ref<furo.Capsule<*>>
 *   invokeRequestOnEvent: (args?: furo.GraphqlRequestArgs) => Promise<void>
 *   invokeRequestOnMounted: (args?: furo.GraphqlRequestArgs) => void
 *   invokeRequestWithFormValueHash?: (args: furo.GraphqlRequestArgs) => Promise<void>
 * }} FuroGraphqlClient
 */

/**
 * @typedef {{
 *   input: {
 *     pagination?: {
 *       limit?: number
 *       offset?: number
 *       sort?: {
 *         targetColumn?: string
 *         orderBy?: 'ASC' | 'DESC'
 *       }
 *     }
 *   }
 * }} CurriculumsDefaultVariables
 */
