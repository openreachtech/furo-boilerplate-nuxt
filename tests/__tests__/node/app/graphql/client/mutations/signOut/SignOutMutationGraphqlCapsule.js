import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

import SignOutMutationGraphqlCapsule from '~/app/graphql/client/mutations/signOut/SignOutMutationGraphqlCapsule'

describe('SignOutMutationGraphqlCapsule', () => {
  describe('super class', () => {
    test('to be derived class of BaseAppGraphqlCapsule', () => {
      const actual = SignOutMutationGraphqlCapsule.prototype

      expect(actual)
        .toBeInstanceOf(BaseAppGraphqlCapsule)
    })
  })
})

describe('SignOutMutationGraphqlCapsule', () => {
  describe('#get:isSignedOut', () => {
    describe('to reflect the content isSignedOut', () => {
      const cases = [
        {
          input: {
            isSignedOut: true,
          },
          expected: true,
        },
        {
          input: {
            isSignedOut: false,
          },
          expected: false,
        },
      ]

      test.each(cases)('isSignedOut: $input.isSignedOut', ({
        input,
        expected,
      }) => {
        const capsule = SignOutMutationGraphqlCapsule.create({
          result: {
            data: {
              signOut: {
                isSignedOut: input.isSignedOut,
              },
            },
          },
        })

        const actual = capsule.isSignedOut

        expect(actual)
          .toBe(expected)
      })
    })

    describe('to be null when there is no content', () => {
      const cases = [
        {
          input: {
            result: null,
          },
          label: 'null result',
        },
        {
          input: {
            result: {
              data: null,
            },
          },
          label: 'null data',
        },
      ]

      test.each(cases)('label: $label', ({ input }) => {
        const capsule = SignOutMutationGraphqlCapsule.create({
          result: input.result,
        })

        const actual = capsule.isSignedOut

        expect(actual)
          .toBeNull()
      })
    })
  })
})
