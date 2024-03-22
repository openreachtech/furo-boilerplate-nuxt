import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import CurriculumsGraphqlPayload from '~/app/graphql/client/Curriculums/CurriculumsGraphqlPayload'

export default class CurriculumsGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @inheritdoc */
  static get Payload () {
    return CurriculumsGraphqlPayload
  }
}
