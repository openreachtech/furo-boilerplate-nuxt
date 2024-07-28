import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import CurriculumsQueryGraphqlPayload from '~/app/graphql/client/queries/curriculums/CurriculumsQueryGraphqlPayload'
import CurriculumsQueryGraphqlCapsule from '~/app/graphql/client/queries/curriculums/CurriculumsQueryGraphqlCapsule'

/**
 * Curriculums query graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher<typeof CurriculumsQueryGraphqlLauncher>}
 */
export default class CurriculumsQueryGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return CurriculumsQueryGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return CurriculumsQueryGraphqlCapsule
  }
}
