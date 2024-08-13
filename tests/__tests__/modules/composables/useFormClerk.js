import {
  ref,
} from 'vue'

import {
  useFormClerk,
} from '~/modules/composables/useFormClerk'

import BaseFormElementClerk from '~/modules/domClerks/BaseFormElementClerk'

describe('useFormClerk()', () => {
  test('to be an object', () => {
    /**
     * @extends {BaseFormElementClerk<typeof DerivedFormElementClerk, *, *>}
     */
    class DerivedFormElementClerk extends BaseFormElementClerk {
      static get validators () {
        return []
      }
    }

    const expected = {
      validationRef: ref({
        valid: {},
        invalid: {},
        messages: {},
        message: {},
      }),
      submitForm: expect.any(Function),
    }

    const actual = useFormClerk({
      FormElementClerk: DerivedFormElementClerk,
      invokeRequest: async () => {},
    })

    expect(actual)
      .toEqual(expected)
  })
})
