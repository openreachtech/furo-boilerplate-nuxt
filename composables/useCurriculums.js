import CurriculumsGraphqlLauncher from '~/app/graphql/client/Curriculums/CurriculumsGraphqlLauncher'

export function useCurriculums () {
  return {
    fetchCurriculums,
  }

  /**
   * Fetch curriculums.
   *
   * @param {{
   *   input?: {
   *     pagination: {
   *       limit: number
   *       offset: number
   *       sort: {
   *         targetColumn: string
   *         orderBy: string
   *       }
   *     }
   *   }
   * }} params - Parameters.
   * @returns {Promise<import('~/app/graphql/client/Curriculums/CurriculumsGraphqlCapsule').default>}
   */
  async function fetchCurriculums ({
    input = {
      pagination: {
        limit: 5,
        offset: 1,
        sort: {
          targetColumn: 'title',
          orderBy: 'ASC',
        },
      },
    },
  } = {}) {
    const launcher = CurriculumsGraphqlLauncher.create()

    const response = await launcher.launchQuery({
      input,
    })

    return response
  }
}
