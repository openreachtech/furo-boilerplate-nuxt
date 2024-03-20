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

describe('BaseGraphqlCapsule', () => {
  describe('#hasQueryError()', () => {
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

    describe('to has errors (truthy)', () => {
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
            result: {
              // Even if empty array, it is considered as query error.
              // Because it is not a normal response, not network error and not json parse error.
              errors: [],
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

        const actual = capsule.hasQueryError()

        expect(actual)
          .toBeTruthy()
      })
    })

    describe('to has no errors (falsy)', () => {
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

        const actual = capsule.hasQueryError()

        expect(actual)
          .toBeFalsy()
      })
    })
  })
})

describe('BaseGraphqlCapsule', () => {
  describe('#hasNetworkError()', () => {
    const mockPayload = new BaseGraphqlPayload({
      queryTemplate: `
        query {
          customer {
            id
          }
        }
      `,
    })

    describe('to has no rawResponse (truthy)', () => {
      const cases = [
        {
          params: {
            rawResponse: null,
          },
        },
      ]

      test.each(cases)('rawResponse: $params.rawResponse', ({ params }) => {
        const args = {
          rawResponse: params.rawResponse,
          payload: mockPayload,
          input: null,
          result: null,
        }
        const capsule = new BaseGraphqlCapsule(args)

        const actual = capsule.hasNetworkError()

        expect(actual)
          .toBeTruthy()
      })
    })

    describe('to has rawResponse (falsy)', () => {
      const cases = [
        {
          params: {
            rawResponse: new Response(),
          },
        },
      ]

      test.each(cases)('rawResponse: $params.rawResponse', ({ params }) => {
        const args = {
          rawResponse: params.rawResponse,
          payload: mockPayload,
          input: null,
          result: null,
        }
        const capsule = new BaseGraphqlCapsule(args)

        const actual = capsule.hasNetworkError()

        expect(actual)
          .toBeFalsy()
      })
    })
  })
})

describe('BaseGraphqlCapsule', () => {
  describe('#hasJsonParseError()', () => {
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

    describe('when has rawResponse', () => {
      describe('to has no result (truthy)', () => {
        const cases = [
          {
            params: {
              result: null,
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

          const actual = capsule.hasJsonParseError()

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to has result (falsy)', () => {
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
          const capsule = new BaseGraphqlCapsule(args)

          const actual = capsule.hasJsonParseError()

          expect(actual)
            .toBeFalsy()
        })
      })
    })

    describe('when has no rawResponse', () => {
      describe('to be falsy always', () => {
        const cases = [
          {
            params: {
              result: null,
            },
          },
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
            rawResponse: null,
            payload: mockPayload,
            input: null,
            result: params.result,
          }
          const capsule = new BaseGraphqlCapsule(args)

          const actual = capsule.hasJsonParseError()

          expect(actual)
            .toBeFalsy()
        })
      })
    })
  })
})

describe('BaseGraphqlCapsule', () => {
  describe('#hasError()', () => {
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

    describe('to has error (truthy)', () => {
      const cases = [
        // query error
        {
          params: {
            rawResponse: mockResponse,
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
        // network error
        {
          params: {
            rawResponse: null,
            result: null,
          },
        },
        // JSON parse error
        {
          params: {
            rawResponse: mockResponse,
            result: null,
          },
        },
      ]

      test.each(cases)('rawResponse: $params.rawResponse; result: $params.result', ({ params }) => {
        const args = {
          rawResponse: params.rawResponse,
          payload: mockPayload,
          input: null,
          result: params.result,
        }

        const capsule = new BaseGraphqlCapsule(args)

        const actual = capsule.hasError()

        expect(actual)
          .toBeTruthy()
      })
    })

    describe('to has no error (falsy)', () => {
      const cases = [
        {
          params: {
            rawResponse: mockResponse,
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
            rawResponse: mockResponse,
            result: {},
          },
        },
      ]

      test.each(cases)('rawResponse: $params.rawResponse; result: $params.result', ({ params }) => {
        const args = {
          rawResponse: params.rawResponse,
          payload: mockPayload,
          input: null,
          result: params.result,
        }

        const capsule = new BaseGraphqlCapsule(args)

        const actual = capsule.hasError()

        expect(actual)
          .toBeFalsy()
      })
    })
  })
})

describe('BaseGraphqlCapsule', () => {
  describe('#extractErrors()', () => {
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

    describe('when existing errors', () => {
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
          expected: [
            {
              message: 'error message-01',
            },
            {
              message: 'error message-02',
            },
          ],
        },
        {
          params: {
            result: {
              errors: [
                {
                  message: 'error message-03',
                },
              ],
            },
          },
          expected: [
            {
              message: 'error message-03',
            },
          ],
        },
      ]

      test.each(cases)('result: $params.result', ({ params, expected }) => {
        const args = {
          rawResponse: mockResponse,
          payload: mockPayload,
          input: null,
          result: params.result,
        }
        const capsule = new BaseGraphqlCapsule(args)

        const actual = capsule.extractErrors()

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('to get empty array', () => {
      const cases = [
        {
          params: {
            rawResponse: mockResponse,
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
            rawResponse: mockResponse,
            result: null,
          },
        },
        {
          params: {
            rawResponse: null,
            result: null,
          },
        },
      ]

      test.each(cases)('rawResponse: $params.rawResponse; result: $params.result', ({ params }) => {
        const args = {
          rawResponse: params.rawResponse,
          payload: mockPayload,
          input: null,
          result: params.result,
        }
        const capsule = new BaseGraphqlCapsule(args)

        const actual = capsule.extractErrors()

        expect(actual)
          .toBeInstanceOf(Array)
        expect(actual)
          .toHaveLength(0)
      })
    })
  })
})

describe('BaseGraphqlCapsule', () => {
  describe('#getErrorMessage()', () => {
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

    describe('when has error', () => {
      const cases = [
        // on network error
        {
          params: {
            rawResponse: null,
            result: null,
          },
          expected: 'Network error',
        },
        // on JSON parse error
        {
          params: {
            rawResponse: mockResponse,
            result: null,
          },
          expected: 'JSON parse error',
        },
        // on query error
        {
          params: {
            rawResponse: mockResponse,
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
          expected: 'error message-01',
        },
        {
          params: {
            rawResponse: mockResponse,
            result: {
              errors: [
                {
                  message: 'error message-03',
                },
              ],
            },
          },
          expected: 'error message-03',
        },
        {
          params: {
            rawResponse: mockResponse,
            result: {
              errors: [],
            },
          },
          expected: 'Unknown error',
        },
      ]

      test.each(cases)('rawResponse: $params.rawResponse; result: $params.result', ({ params, expected }) => {
        const args = {
          rawResponse: params.rawResponse,
          payload: mockPayload,
          input: null,
          result: params.result,
        }
        const capsule = new BaseGraphqlCapsule(args)

        const actual = capsule.getErrorMessage()

        expect(actual)
          .toBe(expected)
      })
    })

    describe('when has no error', () => {
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
            result: {},
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

        const actual = capsule.getErrorMessage()

        expect(actual)
          .toBeNull()
      })
    })
  })
})
