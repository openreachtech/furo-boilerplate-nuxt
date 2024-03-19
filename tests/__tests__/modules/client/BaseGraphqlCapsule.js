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
