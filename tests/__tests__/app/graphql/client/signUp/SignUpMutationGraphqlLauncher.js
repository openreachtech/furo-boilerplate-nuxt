import SignUpMutationGraphqlLauncher from '~/app/graphql/client/signUp/SignUpMutationGraphqlLauncher'
import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'

describe('SignUpMutationGraphqlLauncher', () => {
  describe('super class', () => {
    test('to be derived class of BaseGraphqlCapsule', () => {
      const actual = SignUpMutationGraphqlLauncher.prototype

      expect(actual)
        .toBeInstanceOf(BaseAppGraphqlLauncher)
    })
  })
})
