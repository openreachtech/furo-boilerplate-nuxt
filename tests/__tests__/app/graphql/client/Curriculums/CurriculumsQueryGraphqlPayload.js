import CurriculumsQueryGraphqlPayload from '@/app/graphql/client/Curriculums/CurriculumsQueryGraphqlPayload'
import BaseGraphqlPayload from '~/modules/client/BaseGraphqlPayload'

describe('CurriculumsQueryGraphqlPayload', () => {
  describe('super class', () => {
    test('to be derived class of BaseGraphqlPayload', () => {
      const actual = CurriculumsQueryGraphqlPayload.prototype

      expect(actual)
        .toBeInstanceOf(BaseGraphqlPayload)
    })
  })
})

describe('CurriculumsQueryGraphqlPayload', () => {
  describe('.get:query', () => {
    const expected = /* GraphQL */ `
      query CurriculumsQuery ($input: CurriculumsSearchInput!) {
        curriculums (input: $input) {
          curriculums {
            id
            title
            description
            thumbnailUrl
            postedAt
          }
          pagination {
            limit
            offset
            sort {
              targetColumn
              orderBy
            }
            totalRecords
          }
        }
      }
    `

    test('to be fixed string', () => {
      const actual = CurriculumsQueryGraphqlPayload.query

      expect(actual)
        .toBe(expected)
    })
  })
})
