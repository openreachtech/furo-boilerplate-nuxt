import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * Curriculums query graphql capsule.
 *
 * @extends {BaseAppGraphqlCapsule<typeof CurriculumsQueryGraphqlCapsule, CurriculumsQueryResponseContent>}
 */
export default class CurriculumsQueryGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * get: curriculums
   *
   * @returns {Array<CurriculumEntity>} Array of curriculum
   */
  get curriculums () {
    const content = this.extractContent()

    return content
      ?.curriculums
      ?.curriculums
      ?? []
  }
}

/**
 * @typedef {{
 *   curriculums: {
 *     curriculums: Array<CurriculumEntity>
 *   }
 * }} CurriculumsQueryResponseContent
 */

/**
 * @typedef {{
 *   id: number
 *   title: string
 *   description: string
 *   thumbnailUrl: string
 *   postedAt: string
 * }} CurriculumEntity
 */
