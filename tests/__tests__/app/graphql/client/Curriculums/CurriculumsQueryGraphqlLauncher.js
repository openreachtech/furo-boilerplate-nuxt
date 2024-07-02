import CurriculumsQueryGraphqlLauncher from '~/app/graphql/client/Curriculums/CurriculumsQueryGraphqlLauncher'
import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import CurriculumsQueryGraphqlPayload from '~/app/graphql/client/Curriculums/CurriculumsQueryGraphqlPayload'
import CurriculumsQueryGraphqlCapsule from '~/app/graphql/client/Curriculums/CurriculumsQueryGraphqlCapsule'

describe('CurriculumsGraphqlLauncher', () => {
  describe('super class', () => {
    test('to be derived class of BaseGraphqlCapsule', () => {
      const actual = CurriculumsQueryGraphqlLauncher.prototype

      expect(actual)
        .toBeInstanceOf(BaseAppGraphqlLauncher)
    })
  })
})

describe('CurriculumsGraphqlLauncher', () => {
  describe('.get:Payload', () => {
    test('to be CurriculumsQueryGraphqlPayload', () => {
      const actual = CurriculumsQueryGraphqlLauncher.Payload

      expect(actual)
        .toBe(CurriculumsQueryGraphqlPayload) // same reference
    })
  })
})

describe('CurriculumsGraphqlLauncher', () => {
  describe('.get:Capsule', () => {
    test('to be CurriculumsQueryGraphqlCapsule', () => {
      const actual = CurriculumsQueryGraphqlLauncher.Capsule

      expect(actual)
        .toBe(CurriculumsQueryGraphqlCapsule) // same reference
    })
  })
})
