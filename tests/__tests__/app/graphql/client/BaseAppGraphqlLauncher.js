import BaseAppGraphqlLauncher from '@/app/graphql/client/BaseAppGraphqlLauncher'
import BaseGraphqlLauncher from '~/modules/client/BaseGraphqlLauncher'
import StorageFacade from '~/modules/storage/StorageFacade'

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
  describe('.createStorageFacade()', () => {
    describe('to return instance of StorageFacade', () => {
      test('with no params', () => {
        const storageFacade = BaseAppGraphqlLauncher.createStorageFacade()

        expect(storageFacade)
          .toBeInstanceOf(StorageFacade)
      })
    })

    describe('to call StorageFacade.createAsLocal()', () => {
      test('with no params', () => {
        const storageFacadeTally = /** @type {StorageFacade} */ ({})

        const createAsLocalSpy = jest.spyOn(StorageFacade, 'createAsLocal')
          .mockReturnValue(storageFacadeTally)

        const actual = BaseAppGraphqlLauncher.createStorageFacade()

        expect(actual)
          .toBe(storageFacadeTally) // same reference

        expect(createAsLocalSpy)
          .toHaveBeenCalledWith()

        createAsLocalSpy.mockRestore()
      })
    })
  })
})
