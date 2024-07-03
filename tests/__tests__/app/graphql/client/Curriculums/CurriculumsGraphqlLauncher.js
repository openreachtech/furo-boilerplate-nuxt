import CurriculumsGraphqlLauncher from '@/app/graphql/client/Curriculums/CurriculumsGraphqlLauncher'
import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import CurriculumsQueryGraphqlPayload from '~/app/graphql/client/Curriculums/CurriculumsQueryGraphqlPayload'
import CurriculumsGraphqlCapsule from '~/app/graphql/client/Curriculums/CurriculumsGraphqlCapsule'

describe('CurriculumsGraphqlLauncher', () => {
  describe('super class', () => {
    test('to be derived class of BaseGraphqlCapsule', () => {
      const actual = CurriculumsGraphqlLauncher.prototype

      expect(actual)
        .toBeInstanceOf(BaseAppGraphqlLauncher)
    })
  })
})

describe('CurriculumsGraphqlLauncher', () => {
  describe('.get:Payload', () => {
    test('to be CurriculumsQueryGraphqlPayload', () => {
      const actual = CurriculumsGraphqlLauncher.Payload

      expect(actual)
        .toBe(CurriculumsQueryGraphqlPayload) // same reference
    })
  })
})

describe('CurriculumsGraphqlLauncher', () => {
  describe('.get:Capsule', () => {
    test('to be CurriculumsGraphqlCapsule', () => {
      const actual = CurriculumsGraphqlLauncher.Capsule

      expect(actual)
        .toBe(CurriculumsGraphqlCapsule) // same reference
    })
  })
})
