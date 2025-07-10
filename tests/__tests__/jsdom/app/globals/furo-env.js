import furoEnv from '~/app/globals/furo-env'

describe('furo-env', () => {
  test('to be fixed value', () => {
    const expected = {
      ENDPOINT_URL: 'http://localhost:3900/graphql-stub',
      TEST_MESSAGE: 'I am .furo-env.test',

      RENCHAN_RESTFUL_API_BASE_URL: 'http://localhost:8001',
    }

    expect(furoEnv)
      .toEqual(expected)
  })
})
