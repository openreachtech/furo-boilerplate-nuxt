import BaseGraphqlPayload from '~/modules/client/BaseGraphqlPayload'

export default class CurriculumsGraphqlPayload extends BaseGraphqlPayload {
  /** @inheritdoc */
  static get query () {
    return `
      query {
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
  }
}
