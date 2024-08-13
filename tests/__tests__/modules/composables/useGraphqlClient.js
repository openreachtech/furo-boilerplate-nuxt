import useGraphqlClient from '~/modules/composables/useGraphqlClient'

describe('useGraphqlClient()', () => {
  test('to be an object', () => {
    const expected = {}

    const actual = useGraphqlClient()

    expect(actual)
      .toEqual(expected)
  })
})
