import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

import SignOutMutationGraphqlCapsule from '~/app/graphql/client/mutations/signOut/SignOutMutationGraphqlCapsule'

describe('SignOutMutationGraphqlCapsule', () => {
  describe('super class', () => {
    test('to be derived class of BaseAppGraphqlCapsule', () => {
      const actual = SignOutMutationGraphqlCapsule.prototype

      expect(actual)
        .toBeInstanceOf(BaseAppGraphqlCapsule)
    })
  })
})
