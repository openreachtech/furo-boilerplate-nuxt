import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

import CurriculumsQueryGraphqlCapsule from '~/app/graphql/client/queries/curriculums/CurriculumsQueryGraphqlCapsule'

describe('CurriculumsQueryGraphqlCapsule', () => {
  describe('super class', () => {
    test('to be derived class of BaseAppGraphqlCapsule', () => {
      const actual = CurriculumsQueryGraphqlCapsule.prototype

      expect(actual)
        .toBeInstanceOf(BaseAppGraphqlCapsule)
    })
  })
})
