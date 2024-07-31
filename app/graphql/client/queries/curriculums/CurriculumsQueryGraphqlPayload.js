import BaseGraphqlPayload from '~/modules/client/BaseGraphqlPayload'

/**
 * Curriculums query payload.
 *
 * @extends {BaseGraphqlPayload<typeof CurriculumsQueryGraphqlPayload>}
 */
export default class CurriculumsQueryGraphqlPayload extends BaseGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
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
  }
}
