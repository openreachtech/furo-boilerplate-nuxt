import SignUpMutationGraphqlCapsule from '@/app/graphql/client/signUp/SignUpMutationGraphqlCapsule'
import BaseGraphqlCapsule from '~/modules/client/BaseGraphqlCapsule'

describe('SignUpMutationGraphqlCapsule', () => {
  describe('super class', () => {
    test('to be derived class of BaseGraphqlCapsule', () => {
      const actual = SignUpMutationGraphqlCapsule.prototype

      expect(actual)
        .toBeInstanceOf(BaseGraphqlCapsule)
    })
  })
})
