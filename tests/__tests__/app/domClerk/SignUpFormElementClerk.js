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
