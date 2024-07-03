import BaseAppGraphqlLauncher from '@/app/graphql/client/BaseAppGraphqlLauncher'
import BaseGraphqlLauncher from '~/modules/client/BaseGraphqlLauncher'
import StorageFacade from '~/modules/storage/StorageFacade'

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

describe('BaseAppGraphqlLauncher', () => {
  describe('#loadAccessToken()', () => {
    describe('with no params', () => {
      const cases = [
        {
          args: {
            accessToken: 'fc3ff98e8c6a0d308700000000000001',
          },
        },
        {
          args: {
            accessToken: 'fc3ff98e8c6a0d308700000000000002',
          },
        },
      ]

      test.each(cases)('accessToken: $args.accessToken', ({ args }) => {
        localStorage.setItem('access_token', args.accessToken)

        const launcher = BaseAppGraphqlLauncher.create()

        const actual = launcher.loadAccessToken()

        expect(actual)
          .toBe(args.accessToken)
      })
    })
  })
})

describe('BaseAppGraphqlLauncher', () => {
  describe('#updateHeaders()', () => {
    describe('to add `x-renchan-app-access-token`', () => {
      const cases = [
        {
          args: {
            headers: new Headers({
              'content-type': 'application/json',
            }),
            accessToken: 'fc3ff98e8c6a0d308700000000000001',
          },
          expected: new Headers({
            'content-type': 'application/json',
            'x-renchan-app-access-token': 'fc3ff98e8c6a0d308700000000000001',
          }),
        },
        {
          args: {
            headers: new Headers(),
            accessToken: 'fc3ff98e8c6a0d308700000000000002',
          },
          expected: new Headers({
            'x-renchan-app-access-token': 'fc3ff98e8c6a0d308700000000000002',
          }),
        },
      ]

      test.each(cases)('accessToken: $args.accessToken', ({ args, expected }) => {
        localStorage.setItem('access_token', args.accessToken)

        const launcher = BaseAppGraphqlLauncher.create({
          config: {},
        })

        const actual = launcher.updateHeaders({
          headers: args.headers,
        })

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})
