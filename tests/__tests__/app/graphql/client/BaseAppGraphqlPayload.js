import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'
import BaseGraphqlPayload from '~/modules/client/BaseGraphqlPayload'

beforeEach(() => {
  localStorage.clear()
})

describe('BaseAppGraphqlPayload', () => {
  describe('super class', () => {
    test('to be derived class of BaseGraphqlPayload', () => {
      const actual = BaseAppGraphqlPayload.prototype

      expect(actual)
        .toBeInstanceOf(BaseGraphqlPayload)
    })
  })
})
