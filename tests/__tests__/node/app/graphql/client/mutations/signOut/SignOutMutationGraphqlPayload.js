import {
  BaseGraphqlPayload,
} from '@openreachtech/furo'

import SignOutMutationGraphqlPayload from '~/app/graphql/client/mutations/signOut/SignOutMutationGraphqlPayload'

describe('SignOutMutationGraphqlPayload', () => {
  describe('super class', () => {
    test('to be derived class of BaseGraphqlPayload', () => {
      const actual = SignOutMutationGraphqlPayload.prototype

      expect(actual)
        .toBeInstanceOf(BaseGraphqlPayload)
    })
  })
})

describe('SignOutMutationGraphqlPayload', () => {
  describe('.get:document', () => {
    const expected = /* GraphQL */ `
      mutation SignOutMutation {
        signOut {
          isSignedOut
        }
      }
    `

    test('to be fixed string', () => {
      const actual = SignOutMutationGraphqlPayload.document

      expect(actual)
        .toBe(expected)
    })
  })
})
