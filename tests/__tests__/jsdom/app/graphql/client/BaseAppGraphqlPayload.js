import {
  BaseGraphqlPayload,
} from '@openreachtech/furo'

import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

describe('BaseAppGraphqlPayload', () => {
  describe('super class', () => {
    test('to be derived class of BaseGraphqlPayload', () => {
      const actual = BaseAppGraphqlPayload.prototype

      expect(actual)
        .toBeInstanceOf(BaseGraphqlPayload)
    })
  })
})
