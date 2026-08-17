import {
  BaseGraphqlCapsule,
} from '@openreachtech/furo'

import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule.js'

describe('BaseAppGraphqlCapsule', () => {
  describe('inheritance', () => {
    test('to be a subclass of BaseGraphqlCapsule', () => {
      const received = BaseAppGraphqlCapsule.prototype

      expect(received)
        .toBeInstanceOf(BaseGraphqlCapsule)
    })
  })
})

describe('BaseAppGraphqlCapsule', () => {
  describe('#isUnauthenticated()', () => {
    describe('to be truthy on the unauthenticated code', () => {
      const cases = [
        {
          input: {
            errorCode: '102.X000.001',
          },
        },
      ]

      test.each(cases)('errorCode: $input.errorCode', ({ input }) => {
        const capsule = BaseAppGraphqlCapsule.create({
          rawResponse: null,
          payload: null,
          result: null,
        })

        jest.spyOn(capsule, 'getErrorMessage')
          .mockReturnValue(input.errorCode)

        const received = capsule.isUnauthenticated()

        expect(received)
          .toBeTruthy()
      })
    })

    describe('to be falsy on any other outcome', () => {
      const cases = [
        {
          input: {
            errorCode: '205.M003.001',
          },
        },
        {
          input: {
            errorCode: '203.M001.001',
          },
        },
        {
          input: {
            errorCode: null,
          },
        },
      ]

      test.each(cases)('errorCode: $input.errorCode', ({ input }) => {
        const capsule = BaseAppGraphqlCapsule.create({
          rawResponse: null,
          payload: null,
          result: null,
        })

        jest.spyOn(capsule, 'getErrorMessage')
          .mockReturnValue(input.errorCode)

        const received = capsule.isUnauthenticated()

        expect(received)
          .toBeFalsy()
      })
    })
  })
})

describe('BaseAppGraphqlCapsule', () => {
  describe('#isRefreshTokenReused()', () => {
    describe('to be truthy on the refresh-token-reuse code', () => {
      const cases = [
        {
          input: {
            errorCode: '205.M003.001',
          },
        },
      ]

      test.each(cases)('errorCode: $input.errorCode', ({ input }) => {
        const capsule = BaseAppGraphqlCapsule.create({
          rawResponse: null,
          payload: null,
          result: null,
        })

        jest.spyOn(capsule, 'getErrorMessage')
          .mockReturnValue(input.errorCode)

        const received = capsule.isRefreshTokenReused()

        expect(received)
          .toBeTruthy()
      })
    })

    describe('to be falsy on any other outcome', () => {
      const cases = [
        {
          input: {
            errorCode: '102.X000.001',
          },
        },
        {
          input: {
            errorCode: '203.M001.001',
          },
        },
        {
          input: {
            errorCode: null,
          },
        },
      ]

      test.each(cases)('errorCode: $input.errorCode', ({ input }) => {
        const capsule = BaseAppGraphqlCapsule.create({
          rawResponse: null,
          payload: null,
          result: null,
        })

        jest.spyOn(capsule, 'getErrorMessage')
          .mockReturnValue(input.errorCode)

        const received = capsule.isRefreshTokenReused()

        expect(received)
          .toBeFalsy()
      })
    })
  })
})
