import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import CurriculumsGraphqlPayload from '~/app/graphql/client/Curriculums/CurriculumsGraphqlPayload'
import CurriculumsGraphqlCapsule from '~/app/graphql/client/Curriculums/CurriculumsGraphqlCapsule'

export default class CurriculumsGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @inheritdoc */
  static get Payload () {
    return CurriculumsGraphqlPayload
  }

  /** @inheritdoc */
  static get Capsule () {
    return CurriculumsGraphqlCapsule
  }
}
