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
          },
        },
      ]

      test.each(cases)('Payload: $params.Payload.name', ({ params }) => {
        const PayloadSpy = jest.spyOn(BaseGraphqlLauncher, 'Payload', 'get')
          .mockReturnValue(params.Payload)

        const launcher = BaseGraphqlLauncher.create({
          config,
        })

        const payload = launcher.createPayload()

        expect(payload)
          .toBeInstanceOf(params.Payload)

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
