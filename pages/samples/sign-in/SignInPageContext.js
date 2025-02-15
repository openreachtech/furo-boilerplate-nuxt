import {
  AccessTokenClerk,
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * SignInPageContext.
 *
 * @extends {BaseFuroContext<null>} - Base class.
 */
export default class SignInPageContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {SignInPageContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    graphqlClient,
    formClerk,
    redirectTo,

    formElementRef,
    statusReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.graphqlClient = graphqlClient
    this.formClerk = formClerk
    this.redirectTo = redirectTo

    this.formElementRef = formElementRef
    this.statusReactive = statusReactive
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof SignInPageContext ? X : never} T, X
   * @override
   * @param {SignInPageContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,

    graphqlClient,
    formClerk,
    redirectTo,

    formElementRef,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,

        graphqlClient,
        formClerk,
        redirectTo,

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

            const hasSaved = AccessTokenClerk.create()
              .saveToken({
                // @ts-expect-error
                token: capsule.accessToken,
              })

            if (!hasSaved) {
              this.onFailToGetAccessToken()

              return
            }

            // // Redirect to the path after success to sign in.
            await this.redirectTo()
          },
        },
      })
  }

  /**
   * On fail to get access token.
   */
  onFailToGetAccessToken () {
    // alert('TODO: Please support the error here.')
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext.js').BaseFuroContextParams & {
 *   graphqlClient: FuroGraphqlClient
 *   formClerk: FormClerkType
 *   redirectTo: (args?: {
 *     path?: string
 *   }) => Promise<void>
 *   formElementRef: import('vue').Ref<HTMLFormElement | null>
 *   statusReactive: import('vue').Reactive<Record<string, boolean>>
 * }} SignInPageContextParams
 */

/**
 * @typedef {SignInPageContextParams} SignInPageContextFactoryParams
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
