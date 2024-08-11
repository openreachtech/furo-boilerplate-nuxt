import {
  onMounted,
  ref,
} from 'vue'

import SignUpMutationGraphqlLauncher from '~/app/graphql/client/mutations/signUp/SignUpMutationGraphqlLauncher'
import SignUpMutationGraphqlCapsule from '~/app/graphql/client/mutations/signUp/SignUpMutationGraphqlCapsule'

/**
 * Use signUp GraphQL client
 *
 * @returns {{
 *   capsuleRef: import('vue').Ref<GraphqlResponseCapsule>
 *   validationRef: import('vue').Ref<import('~/modules/client/VariablesValidationResult').default>
 *   invokeRequestOnEvent: (args: GraphqlRequestParams) => Promise<void>
 *   invokeRequestOnMounted: (args: GraphqlRequestParams) => void
 * }}
 */
export default function useSignUpClient () {
  const capsuleRef = ref(
    SignUpMutationGraphqlLauncher.createCapsuleAsPending()
  )
  const validationRef = ref(
    capsuleRef.value.createVariablesValidationResult()
  )

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

    validationRef.value = capsule.createVariablesValidationResult()
  }
}

/**
 * Fetch GraphQL client capsule.
 *
 * @param {GraphqlRequestParams} params - Parameters.
 * @returns {Promise<GraphqlResponseCapsule>}
 */
export async function fetchCapsule ({
  variables,
}) {
  const launcher = SignUpMutationGraphqlLauncher.create()

  const capsule = await launcher.launchRequestWithVariables({
    variables,
  })

  return /** @type {*} */ (capsule)
}

/**
 * @typedef {import('~/app/graphql/client/mutations/signUp/SignUpMutationGraphqlCapsule').default} GraphqlResponseCapsule
 */

/**
 * @typedef {{
 *   variables?: {
 *     input: {
 *       email?: string
 *       username?: string
 *       firstName?: string
 *       lastName?: string
 *       password?: string
 *       'password-confirmation'?: string
 *     }
 *   }
 * }} GraphqlRequestParams
 */
