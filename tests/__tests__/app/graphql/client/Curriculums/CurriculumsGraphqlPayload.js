import CurriculumsGraphqlPayload from '@/app/graphql/client/Curriculums/CurriculumsGraphqlPayload'
import BaseGraphqlPayload from '~/modules/client/BaseGraphqlPayload'

describe('CurriculumsGraphqlPayload', () => {
  describe('super class', () => {
    test('to be derived class of BaseGraphqlPayload', () => {
      const actual = CurriculumsGraphqlPayload.prototype

      expect(actual)
        .toBeInstanceOf(BaseGraphqlPayload)
    })
  })
})

describe('CurriculumsGraphqlPayload', () => {
  describe('.get:query', () => {
    const expected = `
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
      const actual = CurriculumsGraphqlPayload.query

      expect(actual)
        .toBe(expected)
    })
  })
})
