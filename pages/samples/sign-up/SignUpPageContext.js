import BaseAppContext from '~/app/vue/contexts/BaseAppContext.js'

/**
 * SignUpPageContext.
 *
 * @extends {BaseAppContext<null>} - Base class.
 */
export default class SignUpPageContext extends BaseAppContext {
  /**
   * Constructor.
   *
   * @param {SignUpPageContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    graphqlClient,
    formClerk,

    formElementRef,
    statusReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.graphqlClient = graphqlClient
    this.formClerk = formClerk

    this.formElementRef = formElementRef
    this.statusReactive = statusReactive
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof SignUpPageContext ? X : never} T, X
   * @override
   * @param {SignUpPageContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,

    graphqlClient,
    formClerk,

    formElementRef,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,

        graphqlClient,
        formClerk,

        formElementRef,
        statusReactive,
      })
    )
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
   * get: validationRef.
   *
   * @returns {FormClerkType['validationRef']['value']} - Validation reference.
   */
  get validationRef () {
    return this.formClerk
      .validationRef
      .value
  }

  /**
   * get: capsuleRef.
   *
   * @returns {import('vue').Ref<import('../../../app/graphql/client/queries/curriculums/CurriculumsQueryGraphqlCapsule.js').default>} - Capsule reference.
   */
  get capsuleRef () {
    return /** @type {*} */ (
      this.graphqlClient
        .capsuleRef
    )
  }

  /**
   * get: isLoading.
   *
   * @returns {boolean} - Loading status.
   */
  get isLoading () {
    return this.statusReactive
      .isLoading
  }

  /**
   * Submit form event handler.
   */
  async submitFormWithHooks () {
    if (!this.formElementRef.value) {
      return
    }

    await this.formClerk
      .submitForm({
        formElement: this.formElementRef.value,
        hooks: {
          beforeRequest: async payload => {
            this.statusReactive.isLoading = true

            return false
          },
          afterRequest: async capsule => {
            this.statusReactive.isLoading = false
          },
        },
      })
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext.js').BaseFuroContextParams & {
 *   graphqlClient: FuroGraphqlClient
 *   formClerk: FormClerkType
 *   formElementRef: import('vue').Ref<HTMLFormElement | null>
 *   statusReactive: import('vue').Reactive<Record<string, boolean>>
 * }} SignUpPageContextParams
 */

/**
 * @typedef {SignUpPageContextParams} SignUpPageContextFactoryParams
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
 *   validationRef: import('vue').Ref<furo.ValidatorHashType>
 *   submitForm: (args: {
 *     formElement: HTMLFormElement
 *     hooks?: {
 *       beforeRequest: (payload: furo.Payload<*>) => Promise<boolean>
 *       afterRequest: (capsule: furo.Capsule<*>) => Promise<void>
 *     }
 *   }) => Promise<void>
 * }} FormClerkType
 */
