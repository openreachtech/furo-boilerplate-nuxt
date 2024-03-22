import BaseAppGraphqlLauncher from '@/app/graphql/client/BaseAppGraphqlLauncher'
import BaseGraphqlLauncher from '~/modules/client/BaseGraphqlLauncher'

describe('BaseAppGraphqlLauncher', () => {
  describe('super class', () => {
    test('to be derived class of BaseGraphqlLauncher', () => {
      const actual = BaseAppGraphqlLauncher.prototype

      expect(actual)
        .toBeInstanceOf(BaseGraphqlLauncher)
    })
  })
})
