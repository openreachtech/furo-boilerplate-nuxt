import {
  useFormClerk,
} from '~/modules/composables/useFormClerk'

describe('useFormClerk()', () => {
  test('to be an object', () => {
    const expected = {}

    const actual = useFormClerk()

    expect(actual)
      .toMatchObject(expected)
  })
})
