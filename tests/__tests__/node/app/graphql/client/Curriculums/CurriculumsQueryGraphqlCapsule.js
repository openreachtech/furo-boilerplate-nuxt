import CurriculumsQueryGraphqlCapsule from '@/app/graphql/client/Curriculums/CurriculumsQueryGraphqlCapsule'
import BaseGraphqlCapsule from '~/modules/client/BaseGraphqlCapsule'

describe('CurriculumsQueryGraphqlCapsule', () => {
  describe('super class', () => {
    test('to be derived class of BaseGraphqlCapsule', () => {
      const actual = CurriculumsQueryGraphqlCapsule.prototype

      expect(actual)
        .toBeInstanceOf(BaseGraphqlCapsule)
    })
  })
})
