import BaseGraphqlPayload from '~/modules/client/BaseGraphqlPayload'

/**
 * CompanySponsors query payload.
 *
 * @extends {BaseGraphqlPayload<typeof CompanySponsorsQueryGraphqlPayload>}
 */
export default class CompanySponsorsQueryGraphqlPayload extends BaseGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      query CompanySponsorsQuery {
        companySponsors {
          companySponsors {
            id
            registeredAt
            companyName
            companyDescription
            companySponsorHomepage
            companySponsorLogo
          }
        }
      }
    `
  }
}
