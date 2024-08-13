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
 *   invokeRequestOnEvent: (args?: GraphqlRequestArgs) => Promise<void>
 *   invokeRequestOnMounted: (args?: GraphqlRequestArgs) => void
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
     * @param {GraphqlRequestArgs} [args] - Arguments.
     * @returns {Promise<void>}
     */
    async invokeRequestOnEvent (args) {
      await invokeRequest(args)
    },

    /**
     * Invoke request.
     *
     * @param {GraphqlRequestArgs} [args] - Arguments.
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
   * @param {GraphqlRequestArgs} [args] - Arguments.
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
 * @param {GraphqlRequestArgs} [args] - Arguments.
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
 * @typedef {import('~/modules/client/BaseGraphqlLauncher').GraphqlRequestArgs} GraphqlRequestArgs
 */

/**
 * @typedef {import('~/app/graphql/client/mutations/signUp/SignUpMutationGraphqlPayload').SignUpVariablesType} SignUpVariablesType
 */
