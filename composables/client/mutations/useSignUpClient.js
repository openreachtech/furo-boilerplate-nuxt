import {
  onMounted,
  ref,
} from 'vue'

import SignUpMutationGraphqlLauncher from '~/app/graphql/client/mutations/signUp/SignUpMutationGraphqlLauncher'

/**
 * Use signUp GraphQL client
 *
 * @returns {{
 *   capsuleRef: import('vue').Ref<GraphqlResponseCapsule>
 *   validationRef: import('vue').Ref<import('~/modules/validators/ValueHashValidator').ValidatorHashType>
 *   invokeRequestOnEvent: (args: GraphqlRequestParams) => Promise<void>
 *   invokeRequestOnMounted: (args: GraphqlRequestParams) => void
 * }}
 */
export default function useSignUpClient () {
  const capsuleRef = ref(
    SignUpMutationGraphqlLauncher.createCapsuleAsPending()
  )

  // TODO: VariablesValidator から生成させる様に変更
  //   理由は、VariablesValidator が型情報を持っている為 → ValidatorHashType
  // VariablesValidator.generateStubValidationHash()
  const validationRef = ref({
    valid: {},
    invalid: {},
    messages: {},
    message: {},
  })

  return {
    capsuleRef,
    validationRef,

    /**
     * Invoke request.
     *
     * @param {GraphqlRequestParams} args - Arguments.
     * @returns {Promise<void>}
     */
    async invokeRequestOnEvent (args) {
      await invokeRequest(args)
    },

    /**
     * Invoke request.
     *
     * @param {GraphqlRequestParams} args - Arguments.
     * @returns {void}
     */
    invokeRequestOnMounted (args) {
      onMounted(async () => {
        await invokeRequest(args)
      })
    },
  }

  /**
   * Invoke request.
   *
   * @param {GraphqlRequestParams} args - Arguments.
   * @returns {Promise<void>}
   */
  async function invokeRequest (args) {
    const capsule = await fetchCapsule(args)

    capsuleRef.value = capsule
  }
}

/**
 * Fetch GraphQL client capsule.
 *
 * @param {GraphqlRequestParams} args - Arguments.
 * @returns {Promise<GraphqlResponseCapsule>}
 */
export async function fetchCapsule (args) {
  const launcher = SignUpMutationGraphqlLauncher.create()

  const capsule = await launcher.launchRequestWithVariables(args)

  return /** @type {*} */ (capsule)
}

/**
 * @typedef {import('~/app/graphql/client/mutations/signUp/SignUpMutationGraphqlCapsule').default} GraphqlResponseCapsule
 */

/**
 * @typedef {{
 *   variables: SignUpVariablesType
 *   hooks?: Record<string, Function>
 * }} GraphqlRequestParams
 */

/**
 * @typedef {import('~/app/graphql/client/mutations/signUp/SignUpMutationGraphqlPayload').SignUpVariablesType} SignUpVariablesType
 */
