import SignUpMutationGraphqlPayload from '~/app/graphql/client/signUp/SignUpMutationGraphqlPayload'
import BaseGraphqlPayload from '~/modules/client/BaseGraphqlPayload'

describe('SignUpMutationGraphqlPayload', () => {
  describe('super class', () => {
    test('to be derived class of BaseGraphqlPayload', () => {
      const actual = SignUpMutationGraphqlPayload.prototype

      expect(actual)
        .toBeInstanceOf(BaseGraphqlPayload)
    })
  })
})
