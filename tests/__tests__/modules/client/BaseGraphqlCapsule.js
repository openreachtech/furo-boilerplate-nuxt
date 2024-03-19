import {
  ConstructorSpyGenerator,
} from '@openreachtech/renchan-test-tools'

import BaseGraphqlCapsule from '@/modules/client/BaseGraphqlCapsule'
import BaseGraphqlPayload from '~/modules/client/BaseGraphqlPayload'

describe('BaseGraphqlCapsule', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      const mockResponse = new Response()
      const mockPayload = new BaseGraphqlCapsule({
        queryTemplate: `
          query {
            customer {
              id
            }
          }
        `,
      })

      describe('#rawResponse', () => {
        const cases = [
          {
            params: {
              response: new Response(),
            },
          },
        ]

        test.each(cases)('response: $params.response', ({ params }) => {
          const args = {
            rawResponse: params.response,
            payload: mockPayload,
            input: null,
          }

          const actual = new BaseGraphqlCapsule(args)

          expect(actual)
            .toHaveProperty('rawResponse', params.response)
        })
      })

      describe('#payload', () => {
        const cases = [
          {
            params: {
              payload: new BaseGraphqlPayload({
                queryTemplate: `
                  query {
                    customer {
                      id
                    }
                  }
                `,
              }),
            },
          },
          {
            params: {
              payload: new BaseGraphqlPayload({
                queryTemplate: `
                  query {
                    admin {
                      id
                    }
                  }
                `,
              }),
            },
          },
        ]

        test.each(cases)('payload: $params.payload', ({ params }) => {
          const args = {
            rawResponse: mockResponse,
            payload: params.payload,
            input: null,
          }

          const actual = new BaseGraphqlCapsule(args)

          expect(actual)
            .toHaveProperty('payload', params.payload)
        })
      })

      describe('#input', () => {
        const cases = [
          {
            params: {
              input: {
                id: 10001,
              },
            },
          },
          {
            params: {
              input: {
                id: 10002,
              },
            },
          },
        ]

        test.each(cases)('input: $params.input', ({ params }) => {
          const args = {
            rawResponse: mockResponse,
            payload: mockPayload,
            input: params.input,
          }

          const actual = new BaseGraphqlCapsule(args)

          expect(actual)
            .toHaveProperty('input', params.input)
        })
      })
    })
  })
})

describe('BaseGraphqlCapsule', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            rawResponse: new Response(),
            payload: new BaseGraphqlPayload({
              queryTemplate: `
                query {
                  customer {
                    id
                  }
                }
              `,
            }),
            input: {
              id: 10001,
            },
          },
        },
        {
          params: {
            rawResponse: new Response(),
            payload: new BaseGraphqlPayload({
              queryTemplate: `
                query {
                  admin {
                    id
                  }
                }
              `,
            }),
            input: {
              id: 10002,
            },
          },
        },
      ]

      test.each(cases)('input: $params.input', ({ params }) => {
        const actual = BaseGraphqlCapsule.create(params)

        expect(actual)
          .toBeInstanceOf(BaseGraphqlCapsule)
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
                  customer {
                    id
                  }
                }
              `,
            }),
            input: {
              id: 10001,
            },
          },
        },
        {
          params: {
            rawResponse: new Response(),
            payload: new BaseGraphqlPayload({
              queryTemplate: `
                query {
                  admin {
                    id
                  }
                }
              `,
            }),
            input: {
              id: 10002,
            },
          },
        },
      ]

      test.each(cases)('input: $params.input', ({ params }) => {
        const DerivedClass = ConstructorSpyGenerator.create({ jest })
          .generateSpyKitClass(BaseGraphqlCapsule)

        DerivedClass.create(params)

        expect(DerivedClass.__spy__)
          .toHaveBeenCalledWith(params)
      })
    })
  })
})
