import BaseGraphqlCapsule from '~/modules/client/BaseGraphqlCapsule'

/**
 * CompanySponsorsQueryGraphqlCapsule
 *
 * @extends {BaseGraphqlCapsule<CompanySponsorsQueryGraphqlCapsule>}
 */
export default class CompanySponsorsQueryGraphqlCapsule extends BaseGraphqlCapsule {
  /**
   * Extract content from response.
   *
   * @override
   * @returns {CompanySponsorsContent | null} Content
   */
  extractContent () {
    return /** @type {*} */ (
      super.extractContent()
    )
  }

  /**
   * get: companySponsors
   *
   * @returns {Array<CompanySponsorEntity>} Array of company sponsor.
   */
  get companySponsors () {
    const content = this.extractContent()

    return content
      ?.companySponsors
      ?.companySponsors
      ?? []
  }
}

/**
 * @typedef {{
 *   companySponsors: {
 *     companySponsors: Array<CompanySponsorEntity>
 *   }
 * }} CompanySponsorsContent
 */

/**
 * @typedef {{
 *   id: number
 *   registeredAt: string
 *   companyName: string
 *   companyDescription: string
 *   companySponsorHomepage: string
 *   companySponsorLogo: string
 * }} CompanySponsorEntity
 */
