import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * CompanySponsorsPageContext.
 *
 * @extends {BaseFuroContext<null>} - Base class.
 */
export default class CompanySponsorsPageContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {CompanySponsorsPageContextParams} params - Parameters of this constructor.
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
   * @template {X extends typeof CompanySponsorsPageContext ? X : never} T, X
   * @override
   * @param {CompanySponsorsPageContextFactoryParams} params - Parameters of this factory method.
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
   * @template {X extends CompanySponsorsPageContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent () {
    this.graphqlClient
      .invokeRequestOnMounted({
        hooks: this.graphqlRequestHooks,
      })

    return this
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
   * @returns {import('vue').Ref<import('../../../app/graphql/client/queries/companySponsors/CompanySponsorsQueryGraphqlCapsule.js').default>} - Capsule reference.
   */
  get capsuleRef () {
    return /** @type {*} */ (
      this.graphqlClient.capsuleRef
    )
  }

  /**
   * get: companySponsors.
   *
   * @returns {import('../../../app/graphql/client/queries/companySponsors/CompanySponsorsQueryGraphqlCapsule.js').CompanySponsorsQueryResponseContent['companySponsors']['companySponsors']} - Company sponsors.
   */
  get companySponsors () {
    return this.capsuleRef.value
      .companySponsors
  }

  /**
   * get: isLoading.
   *
   * @returns {boolean} - Loading status.
   */
  get isLoading () {
    return this.statusReactive.isLoading
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext.js').BaseFuroContextParams & {
 *   graphqlClient: FuroGraphqlClient
 *   statusReactive: import('vue').Reactive<Record<string, boolean>>
 * }} CompanySponsorsPageContextParams
 */

/**
 * @typedef {CompanySponsorsPageContextParams} CompanySponsorsPageContextFactoryParams
 */

/**
 * @typedef {{
 *   capsuleRef: import('vue').Ref<furo.Capsule<*>>
 *   invokeRequestOnEvent: (args?: furo.GraphqlRequestArgs) => Promise<void>
 *   invokeRequestOnMounted: (args?: furo.GraphqlRequestArgs) => void
 *   invokeRequestWithFormValueHash?: (args: furo.GraphqlRequestArgs) => Promise<void>
 * }} FuroGraphqlClient
 */
