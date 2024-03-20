import {
  ConstructorSpyGenerator,
} from '@openreachtech/renchan-test-tools'

import BaseGraphqlLauncher from '@/modules/client/BaseGraphqlLauncher'

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
