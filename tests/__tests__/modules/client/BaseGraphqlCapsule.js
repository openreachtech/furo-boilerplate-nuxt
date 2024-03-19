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
            result: null,
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
            result: null,
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
            result: null,
          }

          const actual = new BaseGraphqlCapsule(args)

          expect(actual)
            .toHaveProperty('input', params.input)
        })
      })

      describe('#result', () => {
        /**
         * @type {BaseGraphqlCapsuleParams}
         */
        const cases = [
          {
            params: {
              result: {
                data: {
                  customer: {
                    id: 10001,
                  },
                },
              },
            },
          },
          {
            params: {
              result: {
                errors: [
                  {
                    message: 'error message-01',
                  },
                  {
                    message: 'error message-02',
                  },
                ],
              },
            },
          },
        ]

        test.each(cases)('result: $params.result', ({ params }) => {
          const args = {
            rawResponse: mockResponse,
            payload: mockPayload,
            input: null,
            result: params.result,
          }

          const actual = new BaseGraphqlCapsule(args)

          expect(actual)
            .toHaveProperty('result', params.result)
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
            result: {
              data: {
                customer: {
                  id: 10001,
                },
              },
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
            result: {
              errors: [
                {
                  message: 'error message-01',
                },
                {
                  message: 'error message-02',
                },
              ],
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
            result: {
              data: {
                customer: {
                  id: 10001,
                },
              },
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
            result: {
              errors: [
                {
                  message: 'error message-01',
                },
                {
                  message: 'error message-02',
                },
              ],
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

describe('BaseGraphqlCapsule', () => {
  describe('.extractResult()', () => {
    describe('when Response.json() returns result', () => {
      const response = new Response()

      const cases = [
        {
          params: {
            result: {
              data: {
                customer: {
                  id: 10001,
                },
              },
            },
          },
          expected: {
            result: {
              data: {
                customer: {
                  id: 10001,
                },
              },
            },
            error: null,
          },
        },
        {
          params: {
            result: {
              errors: [
                {
                  message: 'error message-01',
                },
                {
                  message: 'error message-02',
                },
              ],
            },
          },
          expected: {
            result: {
              errors: [
                {
                  message: 'error message-01',
                },
                {
                  message: 'error message-02',
                },
              ],
            },
            error: null,
          },
        },
      ]

      test.each(cases)('result: $params.result', async ({ params, expected }) => {
        const jsonSpy = jest.spyOn(response, 'json')
          .mockResolvedValue(params.result)

        const actual = await BaseGraphqlCapsule.extractResult({
          response,
        })

        expect(actual)
          .toEqual(expected)

        jsonSpy.mockRestore()
      })
    })

    describe('when Response.json() throws error', () => {
      const response = new Response()

      const cases = [
        {
          params: {
            error: new Error('SyntaxError: Unexpected end of input'),
          },
          expected: {
            result: null,
            error: new Error('SyntaxError: Unexpected end of input'),
          },
        },
        {
          params: {
            error: new Error('Unknown error'),
          },
          expected: {
            result: null,
            error: new Error('Unknown error'),
          },
        },
      ]

      test.each(cases)('result: $params.result', async ({ params, expected }) => {
        const jsonSpy = jest.spyOn(response, 'json')
          .mockRejectedValue(params.error)

        const actual = await BaseGraphqlCapsule.extractResult({
          response,
        })

        expect(actual)
          .toEqual(expected)

        jsonSpy.mockRestore()
      })
    })
  })
})
