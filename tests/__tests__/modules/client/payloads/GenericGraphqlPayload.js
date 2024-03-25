import GenericGraphqlPayload from '@/modules/client/payloads/GenericGraphqlPayload'
import BaseGraphqlPayload from '~/modules/client/BaseGraphqlPayload'

describe('GenericGraphqlPayload', () => {
  describe('super class', () => {
    test('to be BaseGraphqlPayload', () => {
      const actual = GenericGraphqlPayload.prototype

      expect(actual)
        .toBeInstanceOf(BaseGraphqlPayload)
    })
  })
})
