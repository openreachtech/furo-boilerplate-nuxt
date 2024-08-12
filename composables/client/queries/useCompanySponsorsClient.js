import {
  onMounted,
  ref,
} from 'vue'

import CompanySponsorsQueryGraphqlLauncher from '~/app/graphql/client/queries/companySponsors/CompanySponsorsQueryGraphqlLauncher'

/**
 * Use companySponsors GraphQL client
 *
 * @returns {{
 *   capsuleRef: import('vue').Ref<GraphqlResponseCapsule>
 *   invokeRequestOnEvent: (args?: GraphqlRequestArgs) => Promise<void>
 *   invokeRequestOnMounted: (args?: GraphqlRequestArgs) => void
 * }}
 */
export function useCompanySponsorsClient () {
  const capsuleRef = ref(
    CompanySponsorsQueryGraphqlLauncher.createCapsuleAsPending()
  )

  return {
    capsuleRef,

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
    const capsule = await retrieveCapsule(args)

    capsuleRef.value = capsule
  }
}

/**
 * Retrieve capsule.
 *
 * @param {GraphqlRequestArgs} [args] - Arguments.
 * @returns {Promise<GraphqlResponseCapsule>}
 */
export async function retrieveCapsule (args) {
  const launcher = CompanySponsorsQueryGraphqlLauncher.create()

  const capsule = await launcher.launchRequestWithVariables(args)

  return /** @type {*} */ (capsule)
}

/**
 * @typedef {import('~/modules/client/BaseGraphqlLauncher').GraphqlRequestArgs} GraphqlRequestArgs
 */

/**
 * @typedef {import('~/app/graphql/client/queries/companySponsors/CompanySponsorsQueryGraphqlCapsule').default} GraphqlResponseCapsule
 */
