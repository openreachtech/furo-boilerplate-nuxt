import {
  onMounted,
  ref,
} from 'vue'

import CompanySponsorsQueryGraphqlLauncher from '~/app/graphql/client/queries/companySponsors/CompanySponsorsQueryGraphqlLauncher'
import CompanySponsorsQueryGraphqlCapsule from '~/app/graphql/client/queries/companySponsors/CompanySponsorsQueryGraphqlCapsule'

/**
 * Use companySponsors GraphQL client
 *
 * @returns {{
 *   capsuleRef: import('vue').Ref<GraphqlResponseCapsule>
 *   invokeRequestOnEvent: () => Promise<void>
 *   invokeRequestOnMounted: () => void
 * }}
 */
export function useCompanySponsorsClient () {
  const capsuleRef = ref(
    CompanySponsorsQueryGraphqlCapsule.createAsPending()
  )

  return {
    capsuleRef,
    async invokeRequestOnEvent () {
      await invokeRequest()
    },
    invokeRequestOnMounted () {
      onMounted(invokeRequest)
    },
  }

  /**
   * Invoke request.
   *
   * @returns {Promise<void>}
   */
  async function invokeRequest () {
    const capsule = await fetchCapsule()

    capsuleRef.value = capsule
  }
}

/**
 * Fetch GraphQL client capsule.
 *
 * @returns {Promise<GraphqlResponseCapsule>}
 */
export async function fetchCapsule () {
  const launcher = CompanySponsorsQueryGraphqlLauncher.create()

  const capsule = await launcher.launchRequestWithVariables()

  return /** @type {*} */ (capsule)
}

/**
 * @typedef {import('~/app/graphql/client/queries/companySponsors/CompanySponsorsQueryGraphqlCapsule').default} GraphqlResponseCapsule
 */
