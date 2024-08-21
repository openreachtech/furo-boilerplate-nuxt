import {
  BaseFormElementClerk,
} from '@openreachtech/furo'

import SignUpFormElementClerk from '~/app/domClerk/SignUpFormElementClerk'

beforeEach(() => {
  localStorage.clear()
})

describe('SignUpFormElementClerk', () => {
  describe('super class', () => {
    test('to be derived class of BaseGraphqlLauncher', () => {
      const actual = SignUpFormElementClerk.prototype

      expect(actual)
        .toBeInstanceOf(BaseFormElementClerk)
    })
  })
})

describe('SignUpFormElementClerk', () => {
  describe('.get:rules', () => {
    test('to be array', () => {
      const expected = [
        expect.objectContaining({
          field: 'email',
          ok: expect.any(Function),
          message: 'email must be valid',
        }),
        expect.objectContaining({
          field: 'username',
          ok: expect.any(Function),
          message: 'username must be set',
        }),
        expect.objectContaining({
          field: 'username',
          ok: expect.any(Function),
          message: 'username must be alphanumeric',
        }),
        expect.objectContaining({
          field: 'firstName',
          ok: expect.any(Function),
          message: 'firstName must be set',
        }),
        expect.objectContaining({
          field: 'lastName',
          ok: expect.any(Function),
          message: 'lastName must be set',
        }),
        expect.objectContaining({
          field: 'password',
          ok: expect.any(Function),
          message: 'password must be set with at least 1 character and no more than 16 characters',
        }),
        expect.objectContaining({
          field: 'password-confirmation',
          ok: expect.any(Function),
          message: 'please re-enter password for confirmation',
        }),
        expect.objectContaining({
          field: 'password-confirmation',
          ok: expect.any(Function),
          message: 'passwords do not match',
        }),
      ]

      const actual = SignUpFormElementClerk.rules

      expect(actual)
        .toMatchObject(expected)
    })
  })
})

describe('SignUpFormElementClerk', () => {
  describe('#generateSchemaVariableHash', () => {
    const mockFormElement = document.createElement('form')

    const cases = [
      {
        params: {
          valueHash: {
            email: 'alice@example.com',
            username: 'AliceDoe',
            firstName: 'Alice',
            lastName: 'Doe',
            password: 'passAlice',
            'password-confirmation': 'passAlice',
          },
        },
        expected: {
          email: 'alice@example.com',
          username: 'AliceDoe',
          firstName: 'Alice',
          lastName: 'Doe',
          password: 'passAlice',
        },
      },
      {
        params: {
          valueHash: {
            email: 'betty@example.com',
            username: 'BettyDoe',
            firstName: 'Betty',
            lastName: 'Doe',
            password: 'passBetty',
            'password-confirmation': 'passBetty',
          },
        },
        expected: {
          email: 'betty@example.com',
          username: 'BettyDoe',
          firstName: 'Betty',
          lastName: 'Doe',
          password: 'passBetty',
        },
      },
    ]

    test.each(cases)('username: $params.valueHash.username', ({ params, expected }) => {
      const clerk = new SignUpFormElementClerk({
        formElement: mockFormElement,
      })

      const actual = clerk.generateSchemaVariableHash({
        formValueHash: params.valueHash,
      })

      expect(actual)
        .toEqual(expected)
    })
  })
})
