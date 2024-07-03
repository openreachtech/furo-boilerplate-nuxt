import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import CurriculumsQueryGraphqlPayload from '~/app/graphql/client/Curriculums/CurriculumsQueryGraphqlPayload'
import CurriculumsGraphqlCapsule from '~/app/graphql/client/Curriculums/CurriculumsGraphqlCapsule'

export default class CurriculumsGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @inheritdoc */
  static get Payload () {
    return CurriculumsQueryGraphqlPayload
  }

  /** @inheritdoc */
  static get Capsule () {
    return CurriculumsGraphqlCapsule
  }
}
