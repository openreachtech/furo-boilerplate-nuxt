import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import CurriculumsQueryGraphqlPayload from '~/app/graphql/client/Curriculums/CurriculumsQueryGraphqlPayload'
import CurriculumsQueryGraphqlCapsule from '~/app/graphql/client/Curriculums/CurriculumsQueryGraphqlCapsule'

export default class CurriculumsQueryGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @inheritdoc */
  static get Payload () {
    return CurriculumsQueryGraphqlPayload
  }

  /** @inheritdoc */
  static get Capsule () {
    return CurriculumsQueryGraphqlCapsule
  }
}
