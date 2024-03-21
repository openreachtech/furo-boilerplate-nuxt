import {
  ConstructorSpyGenerator,
} from '@openreachtech/renchan-test-tools'

import JsonParseErrorGraphqlCapsule from '@/modules/client/capsules/JsonParseErrorGraphqlCapsule'
import BaseGraphqlCapsule from '~/modules/client/BaseGraphqlCapsule'
import BaseGraphqlPayload from '~/modules/client/BaseGraphqlPayload'

describe('JsonParseErrorGraphqlCapsule', () => {
  describe('super class', () => {
    test('to be derived class of BaseGraphqlCapsule', () => {
      const actual = JsonParseErrorGraphqlCapsule.prototype

      expect(actual)
        .toBeInstanceOf(BaseGraphqlCapsule)
    })
  })
})

describe('JsonParseErrorGraphqlCapsule', () => {
  describe('.create', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            rawResponse: new Response(),
            payload: new BaseGraphqlPayload({
              queryTemplate: `
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
            rawResponse: new Response(),
            payload: new BaseGraphqlPayload({
              queryTemplate: `
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
        const actual = JsonParseErrorGraphqlCapsule.create(params)

        expect(actual)
          .toBeInstanceOf(JsonParseErrorGraphqlCapsule)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            rawResponse: new Response(),
            payload: new BaseGraphqlPayload({
              queryTemplate: `
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
            rawResponse: new Response(),
            payload: new BaseGraphqlPayload({
              queryTemplate: `
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
          rawResponse: params.rawResponse,
          payload: params.payload,
          result: null,
        }

        const DerivedClass = ConstructorSpyGenerator.create({ jest })
          .generateSpyKitClass(JsonParseErrorGraphqlCapsule)

        DerivedClass.create(params)

        expect(DerivedClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})
