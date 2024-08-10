import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'
import BaseGraphqlPayload from '~/modules/client/BaseGraphqlPayload'
import StorageClerk from '~/modules/storage/StorageClerk'

beforeEach(() => {
  localStorage.clear()
})

describe('BaseAppGraphqlPayload', () => {
  describe('super class', () => {
    test('to be derived class of BaseGraphqlPayload', () => {
      const actual = BaseAppGraphqlPayload.prototype

      expect(actual)
        .toBeInstanceOf(BaseGraphqlPayload)
    })
  })
})

describe('BaseAppGraphqlPayload', () => {
  describe('.createStorageClerk()', () => {
    describe('to return instance of StorageClerk', () => {
      test('with no params', () => {
        const storageClerk = BaseAppGraphqlPayload.createStorageClerk()

        expect(storageClerk)
          .toBeInstanceOf(StorageClerk)
      })
    })

    describe('to call StorageClerk.createAsLocal()', () => {
      test('with no params', () => {
        const storageClerkTally = /** @type {StorageClerk} */ ({})

        const createAsLocalSpy = jest.spyOn(StorageClerk, 'createAsLocal')
          .mockReturnValue(storageClerkTally)

        const actual = BaseAppGraphqlPayload.createStorageClerk()

        expect(actual)
          .toBe(storageClerkTally) // same reference

        expect(createAsLocalSpy)
          .toHaveBeenCalledWith()

        createAsLocalSpy.mockRestore()
      })
    })
  })
})

describe('BaseAppGraphqlPayload', () => {
  describe('.loadAccessToken()', () => {
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

        const actual = BaseAppGraphqlPayload.loadAccessToken()

        expect(actual)
          .toBe(args.accessToken)
      })
    })
  })
})
