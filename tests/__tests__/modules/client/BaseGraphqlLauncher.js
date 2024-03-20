import {
  ConstructorSpyGenerator,
} from '@openreachtech/renchan-test-tools'

import BaseGraphqlLauncher from '@/modules/client/BaseGraphqlLauncher'
import BaseGraphqlPayload from '~/modules/client/BaseGraphqlPayload'

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
