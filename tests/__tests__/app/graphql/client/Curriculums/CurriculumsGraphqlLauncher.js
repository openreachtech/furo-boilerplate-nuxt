import CurriculumsGraphqlLauncher from '@/app/graphql/client/Curriculums/CurriculumsGraphqlLauncher'
import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import CurriculumsGraphqlPayload from '~/app/graphql/client/Curriculums/CurriculumsGraphqlPayload'

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
    test('to be CurriculumsGraphqlPayload', () => {
      const actual = CurriculumsGraphqlLauncher.Payload

      expect(actual)
        .toBe(CurriculumsGraphqlPayload) // same reference
    })
  })
})
