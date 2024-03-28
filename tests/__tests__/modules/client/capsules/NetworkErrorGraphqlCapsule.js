import {
  ConstructorSpyGenerator,
} from '@openreachtech/renchan-test-tools'

import NetworkErrorGraphqlCapsule from '@/modules/client/capsules/NetworkErrorGraphqlCapsule'
import BaseGraphqlCapsule from '~/modules/client/BaseGraphqlCapsule'
import BaseGraphqlPayload from '~/modules/client/BaseGraphqlPayload'

describe('NetworkErrorGraphqlCapsule', () => {
  describe('super class', () => {
    test('to be derived class of BaseGraphqlCapsule', () => {
      const actual = NetworkErrorGraphqlCapsule.prototype

      expect(actual)
        .toBeInstanceOf(BaseGraphqlCapsule)
    })
  })
})

describe('NetworkErrorGraphqlCapsule', () => {
  describe('.create', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            payload: new BaseGraphqlPayload({
              queryTemplate: /* GraphQL */ `
                query {
                  customer: {
                    id
                  }
                }
              }`,
            }),
          },
        },
        {
          params: {
            payload: new BaseGraphqlPayload({
              queryTemplate: /* GraphQL */ `
                query {
                  admin: {
                    id
                  }
                }
              }`,
            }),
          },
        },
      ]

      test.each(cases)('payload: $params.payload', ({ params }) => {
        const actual = NetworkErrorGraphqlCapsule.create(params)

        expect(actual)
          .toBeInstanceOf(NetworkErrorGraphqlCapsule)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            payload: new BaseGraphqlPayload({
              queryTemplate: /* GraphQL */ `
                query {
                  customer: {
                    id
                  }
                }
              }`,
            }),
          },
        },
        {
          params: {
            payload: new BaseGraphqlPayload({
              queryTemplate: /* GraphQL */ `
                query {
                  admin: {
                    id
                  }
                }
              }`,
            }),
          },
        },
      ]

      test.each(cases)('payload: $params.payload', ({ params }) => {
        const expected = {
          rawResponse: null,
          payload: params.payload,
          result: null,
        }

        const DerivedClass = ConstructorSpyGenerator.create({ jest })
          .generateSpyKitClass(NetworkErrorGraphqlCapsule)

        DerivedClass.create(params)

        expect(DerivedClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})
