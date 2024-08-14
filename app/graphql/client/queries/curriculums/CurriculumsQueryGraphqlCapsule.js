import BaseGraphqlCapsule from '~/modules/client/BaseGraphqlCapsule'

/**
 * Curriculums query graphql capsule.
 *
 * @extends {BaseGraphqlCapsule<typeof CurriculumsQueryGraphqlCapsule, CurriculumsQueryResponseContent>}
 */
export default class CurriculumsQueryGraphqlCapsule extends BaseGraphqlCapsule {
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
