import {
  ConstructorSpyGenerator,
} from '@openreachtech/renchan-test-tools'

import BaseGraphqlLauncher from '@/modules/client/BaseGraphqlLauncher'
import BaseGraphqlPayload from '~/modules/client/BaseGraphqlPayload'
import BaseGraphqlCapsule from '~/modules/client/BaseGraphqlCapsule'

describe('BaseGraphqlLauncher', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      describe('#config', () => {
        const cases = [
          {
            params: {
              config: {
                ENDPOINT_URL: 'http://example.com/graphql-customer',
              },
            },
          },
          {
            params: {
              config: {
                ENDPOINT_URL: 'http://example.com/graphql-admin',
              },
            },
          },
        ]

        test.each(cases)('ENDPOINT_URL: $params.config.ENDPOINT_URL', ({ params }) => {
          const launcher = new BaseGraphqlLauncher(params)

          expect(launcher)
            .toHaveProperty('config', params.config)
        })
      })
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            config: {
              ENDPOINT_URL: 'http://example.com/graphql-customer',
            },
          },
        },
        {
          params: {
            config: {
              ENDPOINT_URL: 'http://example.com/graphql-admin',
            },
          },
        },
      ]

      test.each(cases)('ENDPOINT_URL: $params.config.ENDPOINT_URL', ({ params }) => {
        const launcher = BaseGraphqlLauncher.create(params)

        expect(launcher)
          .toBeInstanceOf(BaseGraphqlLauncher)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            config: {
              ENDPOINT_URL: 'http://example.com/graphql-customer',
            },
          },
        },
        {
          params: {
            config: {
              ENDPOINT_URL: 'http://example.com/graphql-admin',
            },
          },
        },
      ]

      test.each(cases)('ENDPOINT_URL: $params.config.ENDPOINT_URL', ({ params }) => {
        const DerivedClass = ConstructorSpyGenerator.create({ jest })
          .generateSpyKitClass(BaseGraphqlLauncher)

        DerivedClass.create(params)

        expect(DerivedClass.__spy__)
          .toHaveBeenCalledWith(params)
      })
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('#get:Ctor', () => {
    describe('to be own class', () => {
      const cases = [
        {
          params: {
            config: {
              ENDPOINT_URL: 'http://example.com/graphql-customer',
            },
          },
        },
        {
          params: {
            config: {
              ENDPOINT_URL: 'http://example.com/graphql-admin',
            },
          },
        },
      ]

      test.each(cases)('ENDPOINT_URL: $params.config.ENDPOINT_URL', ({ params }) => {
        const launcher = BaseGraphqlLauncher.create(params)

        expect(launcher.Ctor)
          .toBe(BaseGraphqlLauncher)
      })
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('.get:Payload', () => {
    test('to throw', () => {
      expect(() => BaseGraphqlLauncher.Payload)
        .toThrow('this function must be inherited')
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('.get:Capsule', () => {
    test('to throw', () => {
      expect(() => BaseGraphqlLauncher.Capsule)
        .toThrow('this function must be inherited')
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('#createPayload()', () => {
    const config = {
      ENDPOINT_URL: 'http://example.com/graphql-customer',
    }

    describe('to be instance of Payload', () => {
      const cases = [
        {
          params: {
            Payload: class CustomerPayload extends BaseGraphqlPayload {
              /** @inheritdoc */
              static get query () {
                return `query {
                  customer (input: $input) {
                    id
                  }
                }`
              }
            },
            input: {
              id: 10001,
            },
          },
        },
        {
          params: {
            Payload: class AdminPayload extends BaseGraphqlPayload {
              /** @inheritdoc */
              static get query () {
                return `query {
                  admin (input: $input) {
                    id
                  }
                }`
              }
            },
            input: null,
          },
        },
      ]

      test.each(cases)('Payload: $params.Payload.name', ({ params }) => {
        const expected = {
          input: params.input,
        }

        const PayloadSpy = jest.spyOn(BaseGraphqlLauncher, 'Payload', 'get')
          .mockReturnValue(params.Payload)
        const createSpy = jest.spyOn(params.Payload, 'create')

        const launcher = BaseGraphqlLauncher.create({
          config,
        })

        const payload = launcher.createPayload({
          input: params.input,
        })

        expect(payload)
          .toBeInstanceOf(params.Payload)

        expect(createSpy)
          .toHaveBeenCalledWith(expected)

        PayloadSpy.mockRestore()
      })
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('.get:fetch', () => {
    test('to be fixed value', () => {
      const actual = BaseGraphqlLauncher.fetch

      expect(actual)
        .toBe(fetch) // same reference
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('#get:endpointUrl', () => {
    const cases = [
      {
        params: {
          config: {
            ENDPOINT_URL: 'http://example.com/graphql-customer',
          },
        },
        expected: 'http://example.com/graphql-customer',
      },
      {
        params: {
          config: {
            ENDPOINT_URL: 'http://example.com/graphql-admin',
          },
        },
        expected: 'http://example.com/graphql-admin',
      },
    ]

    test.each(cases)('ENDPOINT_URL: $params.config.ENDPOINT_URL', ({ params, expected }) => {
      const launcher = BaseGraphqlLauncher.create(params)

      const actual = launcher.endpointUrl

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('#createResultCapsule()', () => {
    describe('to be instance of BaseGraphqlCapsule', () => {
      const MockGraphqlCapsule = class extends BaseGraphqlCapsule {}

      const mockLauncherParams = {
        config: {
          ENDPOINT_URL: 'http://example.com/graphql-customer',
        },
      }

      const cases = [
        {
          params: {
            rawResponse: new Response(),
            payload: new BaseGraphqlPayload({
              input: {
                customerId: 10001,
              },
            }),
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
              input: {
                adminId: 20001,
              },
            }),
            result: {
              data: {
                admin: {
                  id: 20001,
                },
              },
            },
          },
        },
      ]

      test.each(cases)('result: $params.result', ({ params }) => {
        const CapsuleSpy = jest.spyOn(BaseGraphqlLauncher, 'Capsule', 'get')
          .mockReturnValue(MockGraphqlCapsule)

        const launcher = BaseGraphqlLauncher.create(mockLauncherParams)

        const capsule = launcher.createResultCapsule(params)

        expect(capsule)
          .toBeInstanceOf(BaseGraphqlCapsule)

        CapsuleSpy.mockRestore()
      })
    })

    describe('to call Capsule factory method', () => {
      const MockGraphqlCapsule = class extends BaseGraphqlCapsule {}

      const mockLauncherParams = {
        config: {
          ENDPOINT_URL: 'http://example.com/graphql-customer',
        },
      }

      const cases = [
        {
          params: {
            rawResponse: new Response(),
            payload: new BaseGraphqlPayload({
              input: {
                customerId: 10001,
              },
            }),
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
              input: {
                adminId: 20001,
              },
            }),
            result: {
              data: {
                admin: {
                  id: 20001,
                },
              },
            },
          },
        },
      ]

      test.each(cases)('result: $params.result', ({ params }) => {
        const CapsuleSpy = jest.spyOn(BaseGraphqlLauncher, 'Capsule', 'get')
          .mockReturnValue(MockGraphqlCapsule)
        const createSpy = jest.spyOn(MockGraphqlCapsule, 'create')

        const launcher = BaseGraphqlLauncher.create(mockLauncherParams)

        launcher.createResultCapsule(params)

        expect(createSpy)
          .toHaveBeenCalledWith(params)

        CapsuleSpy.mockRestore()
        createSpy.mockRestore()
      })
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('#createFetchRequest()', () => {
    describe('to be instance of Request', () => {
      const cases = [
        {
          params: {
            url: 'http://example.com/graphql-customer',
            input: {
              id: 10001,
            },
            options: {
              headers: new Headers({
                'x-access-key': 'access-key-01',
              }),
            },
            Payload: class CustomerPayload extends BaseGraphqlPayload {
              /** @inheritdoc */
              static get query () {
                return `query {
                  customer (input: $input) {
                    id
                  }
                }`
              }
            },
          },
        },
        {
          params: {
            url: 'http://example.com/graphql-admin',
            input: null,
            options: {
              headers: new Headers({
                'x-access-key': 'access-key-02',
              }),
            },
            Payload: class AdminPayload extends BaseGraphqlPayload {
              /** @inheritdoc */
              static get query () {
                return `query {
                  admin (input: $input) {
                    id
                  }
                }`
              }
            },
          },
        },
      ]

      test.each(cases)('url: $params.url', ({ params }) => {
        const PayloadSpy = jest.spyOn(BaseGraphqlLauncher, 'Payload', 'get')
          .mockReturnValue(params.Payload)

        const launcher = BaseGraphqlLauncher.create({
          config: {
            ENDPOINT_URL: params.url,
          },
        })
        const args = {
          input: params.input,
          options: params.options,
        }

        const actual = launcher.createFetchRequest(args)

        expect(actual)
          .toBeInstanceOf(Request)
        expect(actual)
          .toHaveProperty('url', params.url)
        expect(actual)
          .toHaveProperty('headers', params.options.headers)
        expect(actual)
          .toHaveProperty('method', 'POST')

        PayloadSpy.mockRestore()
      })
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('#invokeFetchQuery()', () => {
    describe('to return response', () => {
      const graphqlConfig = {
        ENDPOINT_URL: 'http://example.com/graphql-customer',
      }

      const cases = [
        {
          params: {
            request: new Request('http://example.com/graphql-customer'),
          },
        },
        {
          params: {
            request: new Request('http://example.com/graphql-admin'),
          },
        },
      ]

      test.each(cases)('request: $params.request.request', async ({ params }) => {
        const responseTally = new Response()

        const fetchSpy = jest.spyOn(globalThis, 'fetch')
          .mockResolvedValue(responseTally)

        const launcher = BaseGraphqlLauncher.create({
          config: graphqlConfig,
        })

        const actual = await launcher.invokeFetchQuery(params)

        expect(actual)
          .toBe(responseTally) // same instance
        expect(fetchSpy)
          .toHaveBeenCalledWith(params.request)

        fetchSpy.mockRestore()
      })
    })

    describe('to throw on fetch', () => {
      const graphqlConfig = {
        ENDPOINT_URL: 'http://example.com/graphql-customer',
      }

      const cases = [
        {
          params: {
            request: new Request('http://example.com/graphql-customer'),
          },
        },
        {
          params: {
            request: new Request('http://example.com/graphql-admin'),
          },
        },
      ]

      test.each(cases)('request: $params.request.request', async ({ params }) => {
        const fetchSpy = jest.spyOn(globalThis, 'fetch')
          .mockRejectedValue(new Error('Network Error'))

        const launcher = BaseGraphqlLauncher.create({
          config: graphqlConfig,
        })

        const actual = await launcher.invokeFetchQuery(params)

        expect(actual)
          .toBeNull()
        expect(fetchSpy)
          .toHaveBeenCalledWith(params.request)

        fetchSpy.mockRestore()
      })
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('#generateFetchResult()', () => {
    describe('to be parsed JSON object', () => {
      const cases = [
        {
          params: {
            response: new Response(`{
              "data": {
                "customer": {
                  "id": 10001
                }
              }
            }`),
          },
          expected: {
            data: {
              customer: {
                id: 10001,
              },
            },
          },
        },
        {
          params: {
            response: new Response(`{
              "data": {
                "customer": {
                  "id": 10002
                }
              }
            }`),
          },
          expected: {
            data: {
              customer: {
                id: 10002,
              },
            },
          },
        },
        {
          params: {
            response: new Response(`{
              "errors": [
                {
                  "message": "Error message 01"
                },
                {
                  "message": "Error message 02"
                }
              ]
            }`),
          },
          expected: {
            errors: [
              {
                message: 'Error message 01',
              },
              {
                message: 'Error message 02',
              },
            ],
          },
        },
        {
          params: {
            response: new Response(`{
              "errors": [
                {
                  "message": "Error message 03"
                }
              ]
            }`),
          },
          expected: {
            errors: [
              {
                message: 'Error message 03',
              },
            ],
          },
        },
      ]

      test.each(cases)('response: $params.response', async ({ params, expected }) => {
        const launcher = BaseGraphqlLauncher.create({
          config: {
            ENDPOINT_URL: 'http://example.com/graphql-customer',
          },
        })

        const actual = await launcher.generateFetchResult(params)

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('on JSON parsed error', () => {
      const cases = [
        {
          params: {
            response: new Response(`{
              "data": {
                "customer": {
                  "id": 10001
                }
              }
            }}`), // ERROR: last } is doubled
          },
        },
        {
          params: {
            response: new Response(`{
              "data": {
                "customer": {
                  "id": 10002
                }
              }
            }}`), // ERROR: last } is doubled
          },
        },
        {
          params: {
            response: new Response(`{
              "errors": [
                {
                  "message": "Error message 01"
                },
                {
                  "message": "Error message 02"
                }
              ]
            }}`), // ERROR: last } is doubled
          },
        },
        {
          params: {
            response: new Response(`{
              "errors": [
                {
                  "message": "Error message 03"
                }
              ]
            }}`), // ERROR: last } is doubled
          },
        },
      ]

      test.each(cases)('response: $params.response', async ({ params }) => {
        const launcher = BaseGraphqlLauncher.create({
          config: {
            ENDPOINT_URL: 'http://example.com/graphql-admin',
          },
        })

        const actual = await launcher.generateFetchResult(params)

        expect(actual)
          .toBeNull()
      })
    })
  })
})
