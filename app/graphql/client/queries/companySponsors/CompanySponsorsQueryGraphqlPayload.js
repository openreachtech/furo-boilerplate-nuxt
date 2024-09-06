import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

/**
 * CompanySponsors query payload.
 *
 * @extends {BaseAppGraphqlPayload<typeof CompanySponsorsQueryGraphqlPayload, CompanySponsorsQueryRequestVariables>}
 */
export default class CompanySponsorsQueryGraphqlPayload extends BaseAppGraphqlPayload {
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

/**
 * @typedef {{}} CompanySponsorsQueryRequestVariables
 */
