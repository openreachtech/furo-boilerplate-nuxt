import useGraphqlClient from '~/modules/composables/useGraphqlClient'

import CompanySponsorsQueryGraphqlLauncher from '~/app/graphql/client/queries/companySponsors/CompanySponsorsQueryGraphqlLauncher'
import CurriculumsQueryGraphqlLauncher from '~/app/graphql/client/queries/curriculums/CurriculumsQueryGraphqlLauncher'
import SignUpMutationGraphqlLauncher from '~/app/graphql/client/mutations/signUp/SignUpMutationGraphqlLauncher'

describe('useGraphqlClient()', () => {
  describe('to be an object', () => {
    const cases = [
      {
        params: {
          Launcher: CompanySponsorsQueryGraphqlLauncher,
        },
      },
      {
        params: {
          Launcher: CurriculumsQueryGraphqlLauncher,
        },
      },
      {
        params: {
          Launcher: SignUpMutationGraphqlLauncher,
        },
      },
    ]

    test.each(cases)('Launcher: $params.Launcher.name', ({ params }) => {
      const expected = {
        capsuleRef: expect.any(Object),
        invokeRequestOnEvent: expect.any(Function),
        invokeRequestOnMounted: expect.any(Function),
      }

      const actual = useGraphqlClient({
        Launcher: params.Launcher,
      })

      expect(actual)
        .toEqual(expected)
    })
  })
})
