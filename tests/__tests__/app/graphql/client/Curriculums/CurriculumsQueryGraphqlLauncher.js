import CurriculumsQueryGraphqlLauncher from '~/app/graphql/client/Curriculums/CurriculumsQueryGraphqlLauncher'
import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import CurriculumsQueryGraphqlPayload from '~/app/graphql/client/Curriculums/CurriculumsQueryGraphqlPayload'
import CurriculumsQueryGraphqlCapsule from '~/app/graphql/client/Curriculums/CurriculumsQueryGraphqlCapsule'

describe('CurriculumsQueryGraphqlLauncher', () => {
  describe('super class', () => {
    test('to be derived class of BaseGraphqlCapsule', () => {
      const actual = CurriculumsQueryGraphqlLauncher.prototype

      expect(actual)
        .toBeInstanceOf(BaseAppGraphqlLauncher)
    })
  })
})

describe('CurriculumsQueryGraphqlLauncher', () => {
  describe('.get:Payload', () => {
    test('to be CurriculumsQueryGraphqlPayload', () => {
      const actual = CurriculumsQueryGraphqlLauncher.Payload

      expect(actual)
        .toBe(CurriculumsQueryGraphqlPayload) // same reference
    })
  })
})

describe('CurriculumsQueryGraphqlLauncher', () => {
  describe('.get:Capsule', () => {
    test('to be CurriculumsQueryGraphqlCapsule', () => {
      const actual = CurriculumsQueryGraphqlLauncher.Capsule

      expect(actual)
        .toBe(CurriculumsQueryGraphqlCapsule) // same reference
    })
  })
})
