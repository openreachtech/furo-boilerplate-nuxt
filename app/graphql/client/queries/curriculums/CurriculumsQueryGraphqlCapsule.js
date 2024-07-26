import BaseGraphqlCapsule from '~/modules/client/BaseGraphqlCapsule'

export default class CurriculumsQueryGraphqlCapsule extends BaseGraphqlCapsule {
  /**
   * Factory method to create as pending behavior.
   *
   * @override
   * @returns {CurriculumsQueryGraphqlCapsule} Instance of this class.
   */
  static createAsPending () {
    return /** @type {*} */ (
      super.createAsPending()
    )
  }

  /**
   * Extract content from response.
   *
   * @override
   * @returns {CurriculumsContent | null} Content
   */
  extractContent () {
    return /** @type {*} */ (
      super.extractContent()
    )
  }

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
 * }} CurriculumsContent
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
