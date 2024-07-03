import CurriculumsQueryGraphqlLauncher from '~/app/graphql/client/Curriculums/CurriculumsQueryGraphqlLauncher'

export function useCurriculums () {
  return {
    fetchCurriculums,
  }

  /**
   * Fetch curriculums.
   *
   * @param {{
   *   variables: {
   *     input?: {
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
   * }} params - Parameters.
   * @returns {Promise<import('~/app/graphql/client/Curriculums/CurriculumsQueryGraphqlCapsule').default>}
   */
  async function fetchCurriculums ({
    variables = {
      input: {
        pagination: {
          limit: 5,
          offset: 1,
          sort: {
            targetColumn: 'title',
            orderBy: 'ASC',
          },
        },
      },
    },
  } = {}) {
    const launcher = CurriculumsQueryGraphqlLauncher.create()

    const response = await launcher.launchQuery({
      variables,
    })

    return response
  }
}
