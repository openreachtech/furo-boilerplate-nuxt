import {
  BaseGraphqlLauncher,
} from '@openreachtech/furo'
import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'

import graphqlConfig from '~/app/graphql/graphql.config'

beforeEach(() => {
  localStorage.clear()
})

describe('BaseAppGraphqlLauncher', () => {
  describe('super class', () => {
    test('to be derived class of BaseGraphqlLauncher', () => {
      const actual = BaseAppGraphqlLauncher.prototype

      expect(actual)
        .toBeInstanceOf(BaseGraphqlLauncher)
    })
  })
})

describe('BaseAppGraphqlLauncher', () => {
  describe('.create()', () => {
    describe('to be instance of BaseAppGraphqlLauncher', () => {
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

      test.each(cases)('config: $params.config', ({ params }) => {
        const actual = BaseAppGraphqlLauncher.create(params)

        expect(actual)
          .toBeInstanceOf(BaseAppGraphqlLauncher)
      })

      test('without params', () => {
        const actual = BaseAppGraphqlLauncher.create()

        expect(actual)
          .toBeInstanceOf(BaseAppGraphqlLauncher)
      })
    })

    describe('to call super.create()', () => {
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

      test.each(cases)('config: $params.config', ({ params }) => {
        const createSpy = jest.spyOn(BaseGraphqlLauncher, 'create')

        BaseAppGraphqlLauncher.create(params)

        expect(createSpy)
          .toHaveBeenCalledWith(params)
      })
    })
  })
})

describe('BaseAppGraphqlLauncher', () => {
  describe('.get:graphqlConfig', () => {
    test('to be fixed value', () => {
      const emptyActual = BaseAppGraphqlLauncher.graphqlConfig

      expect(emptyActual)
        .toEqual({
          ENDPOINT_URL: null,
        })

      // -----------------------------------------------------------------------

      const tally = 'http://localhost:3900/graphql-customer'

      const expected = {
        ENDPOINT_URL: tally,
      }

      const ENDPOINT_URL_SPY = jest.spyOn(graphqlConfig, 'ENDPOINT_URL', 'get')
        .mockReturnValue(tally)

      const fulfilledActual = BaseAppGraphqlLauncher.graphqlConfig

      expect(fulfilledActual)
        .toEqual(expected)

      ENDPOINT_URL_SPY.mockRestore()
    })
  })
})

describe('BaseAppGraphqlLauncher', () => {
  describe('#get:Ctor', () => {
    describe('to be BaseAppGraphqlLauncher', () => {
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

      test.each(cases)('config: $params.config', ({ params }) => {
        /** @type {BaseAppGraphqlLauncher} */
        const launcher = BaseAppGraphqlLauncher.create(params)

        const actual = launcher.Ctor

        expect(actual)
          .toBe(BaseAppGraphqlLauncher) // same reference
        expect(actual)
          .not
          .toBe(BaseGraphqlLauncher) // not same reference
      })
    })
  })
})
