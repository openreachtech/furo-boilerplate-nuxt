import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import CompanySponsorsQueryGraphqlPayload from '~/app/graphql/client/queries/companySponsors/CompanySponsorsQueryGraphqlPayload'
import CompanySponsorsQueryGraphqlCapsule from '~/app/graphql/client/queries/companySponsors/CompanySponsorsQueryGraphqlCapsule'

/**
 * Company sponsors query graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher<typeof CompanySponsorsQueryGraphqlLauncher>}
 */
export default class CompanySponsorsQueryGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return CompanySponsorsQueryGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return CompanySponsorsQueryGraphqlCapsule
  }
}
