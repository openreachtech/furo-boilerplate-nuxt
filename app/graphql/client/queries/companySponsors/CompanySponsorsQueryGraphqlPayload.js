import BaseGraphqlPayload from '~/modules/client/BaseGraphqlPayload'

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
