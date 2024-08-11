import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import BaseGraphqlLauncher from '~/modules/client/BaseGraphqlLauncher'
import StorageClerk from '~/modules/storage/StorageClerk'

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
  describe('#createStorageClerk()', () => {
    describe('to return instance of StorageClerk', () => {
      test('with no params', () => {
        const launcher = BaseAppGraphqlLauncher.create({
          config: {},
        })

        const storageClerk = launcher.createStorageClerk()

        expect(storageClerk)
          .toBeInstanceOf(StorageClerk)
      })
    })

    describe('to call StorageClerk.createAsLocal()', () => {
      test('with no params', () => {
        const launcher = BaseAppGraphqlLauncher.create({
          config: {},
        })

        const storageClerkTally = /** @type {StorageClerk} */ ({})

        const createAsLocalSpy = jest.spyOn(StorageClerk, 'createAsLocal')
          .mockReturnValue(storageClerkTally)

        const actual = launcher.createStorageClerk()

        expect(actual)
          .toBe(storageClerkTally) // same reference

        expect(createAsLocalSpy)
          .toHaveBeenCalledWith()

        createAsLocalSpy.mockRestore()
      })
    })
  })
})
