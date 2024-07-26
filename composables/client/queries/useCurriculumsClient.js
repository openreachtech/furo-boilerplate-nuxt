import {
  onMounted,
  ref,
} from 'vue'

import CurriculumsQueryGraphqlLauncher from '~/app/graphql/client/queries/curriculums/CurriculumsQueryGraphqlLauncher'
import CurriculumsQueryGraphqlCapsule from '~/app/graphql/client/queries/curriculums/CurriculumsQueryGraphqlCapsule'

/**
 * Use curriculums GraphQL client
 *
 * @returns {{
 *   capsuleRef: import('vue').Ref<GraphqlResponseCapsule>
 *   invokeRequestOnEvent: (args?: GraphqlRequestParams) => Promise<void>
 *   invokeRequestOnMounted: (args?: GraphqlRequestParams) => void
 * }}
 */
export function useCurriculumsClient () {
  const capsuleRef = ref(
    CurriculumsQueryGraphqlCapsule.createAsPending()
  )

  return {
    capsuleRef,

    /**
     * Invoke request.
     *
     * @param {GraphqlRequestParams} [args] - Arguments.
     * @returns {Promise<void>}
     */
    async invokeRequestOnEvent (args) {
      await invokeRequest(args)
    },

    /**
     * Invoke request.
     *
     * @param {GraphqlRequestParams} [args] - Arguments.
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
   * @param {GraphqlRequestParams} [args] - Arguments.
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
 * @param {GraphqlRequestParams} params - Parameters.
 * @returns {Promise<GraphqlResponseCapsule>}
 */
async function fetchCapsule ({
  variables,
} = {
  variables: {
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
  },
}) {
  const launcher = CurriculumsQueryGraphqlLauncher.create()

  const capsule = await launcher.launchRequest({
    variables,
  })

  return /** @type {*} */ (capsule)
}

/**
 * @typedef {import('~/app/graphql/client/queries/curriculums/CurriculumsQueryGraphqlCapsule').default} GraphqlResponseCapsule
 */

/**
 * @typedef {{
 *   variables?: {
 *     input: {
 *       pagination: {
 *         limit: number
 *         offset: number
 *         sort: {
 *           targetColumn: string
 *           orderBy: string
 *         }
 *       }
 *     }
 *   }
 * }} GraphqlRequestParams
 */
