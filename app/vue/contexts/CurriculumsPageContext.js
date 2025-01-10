import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * Props context class for CurriculumsPageContext component.
 *
 * @property {import('vue').Ref<HTMLDialogElement | null>} dialogRef - Dialog element.
 * @extends {BaseFuroContext<null>} - Base class.
 */
export default class CurriculumsPageContext extends BaseFuroContext {
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

  /** @override */
  setupComponent () {
    this.graphqlClient
      .invokeRequestOnMounted({
        variables: this.defaultVariables,
        hooks: this.launcherHooks,
      })

    return this
  }

  /**
   * get: default variables.
   *
   * @returns {CurriculumsDefaultVariables} - Default variables.
   */
  get defaultVariables () {
    return {
      input: {
        pagination: {
          limit: 10,
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
   * @returns {Promise<void>}
   */
  async requestCurriculums ({
    offset = 0,
    hooks = this.launcherHooks,
  } = {}) {
    const variables = {
      input: {
        pagination: {
          limit: 10,
          offset,
          sort: {
            targetColumn: 'title',
            orderBy: 'ASC',
          },
        },
      },
    }

    await this.graphqlClient.invokeRequestOnEvent({
      variables,
      hooks,
    })
  }
}

/**
 * @typedef {import('./BaseFuroContext').BaseFuroContextParams & {
 *   graphqlClient: FuroGraphqlClient
 *   statusReactive: import('vue').Reactive<CurriculumsStatusReactive>
 * }} CurriculumsPageContextParams
 */

/**
 * @typedef {CurriculumsPageContextParams} CurriculumsPageContextFactoryParams
 */

/**
 * @typedef {{
 *   capsuleRef: import('vue').Ref<furo.CapsuleInstance<*, *> | null>
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
 *         orderBy?: string
 *       }
 *     }
 *   }
 * }} CurriculumsDefaultVariables
 */

/**
 * @typedef {{
 *   isLoading: boolean
 * }} CurriculumsStatusReactive
 */
