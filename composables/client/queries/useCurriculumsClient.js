import {
  onMounted,
  ref,
} from 'vue'

import CurriculumsQueryGraphqlLauncher from '~/app/graphql/client/queries/curriculums/CurriculumsQueryGraphqlLauncher'

/**
 * Use curriculums GraphQL client
 *
 * @returns {{
 *   capsuleRef: import('vue').Ref<GraphqlResponseCapsule>
 *   invokeRequestOnEvent: (args?: GraphqlRequestArgs) => Promise<void>
 *   invokeRequestOnMounted: (args?: GraphqlRequestArgs) => void
 * }}
 */
export function useCurriculumsClient () {
  const capsuleRef = ref(
    CurriculumsQueryGraphqlLauncher.createCapsuleAsPending()
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
 * @param {GraphqlRequestArgs} params - Parameters.
 * @returns {Promise<GraphqlResponseCapsule>}
 */
async function retrieveCapsule ({
  variables = {
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
  options,
  hooks,
} = {}) {
  const launcher = CurriculumsQueryGraphqlLauncher.create()

  const capsule = await launcher.launchRequestWithVariables({
    variables,
    options,
    hooks,
  })

  return /** @type {*} */ (capsule)
}

/**
 * @typedef {import('~/app/graphql/client/queries/curriculums/CurriculumsQueryGraphqlCapsule').default} GraphqlResponseCapsule
 */

/*
 * {
 *   variables: {
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
 * }
 */

/**
 * @typedef {import('~/modules/client/BaseGraphqlLauncher').GraphqlRequestArgs} GraphqlRequestArgs
 */
