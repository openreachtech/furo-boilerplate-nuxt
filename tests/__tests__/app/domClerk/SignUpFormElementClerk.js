import SignUpFormElementClerk from '~/app/domClerk/SignUpFormElementClerk'
import BaseFormElementClerk from '~/modules/domClerks/BaseFormElementClerk'

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
  describe('.get:validators', () => {
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
          field: 'confirm-password',
          ok: expect.any(Function),
          message: 'passwords do not match',
        }),
      ]

      const actual = SignUpFormElementClerk.validators

      expect(actual)
        .toMatchObject(expected)
    })
  })
})
