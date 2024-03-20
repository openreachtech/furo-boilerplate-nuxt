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
  describe('#hasContent()', () => {
    const mockResponse = new Response()
    const mockPayload = new BaseGraphqlPayload({
      queryTemplate: `
        query {
          customer {
            id
          }
        }
      `,
    })

    describe('to has content (truthy)', () => {
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
              data: {
                customer: {
                  id: 10002,
                },
              },
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
        const capsule = new BaseGraphqlCapsule(args)

        const actual = capsule.hasContent()

        expect(actual)
          .toBeTruthy()
      })
    })

    describe('to has no content (falsy)', () => {
      const cases = [
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
        {
          params: {
            result: null, // network error or json parse error, etc.
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
        const capsule = new BaseGraphqlCapsule(args)

        const actual = capsule.hasContent()

        expect(actual)
          .toBeFalsy()
      })
    })
  })
})
