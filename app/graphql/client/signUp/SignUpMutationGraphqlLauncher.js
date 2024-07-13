import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import SignUpMutationGraphqlPayload from '~/app/graphql/client/signUp/SignUpMutationGraphqlPayload'

export default class SignUpMutationGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @inheritdoc */
  static get Payload () {
    return SignUpMutationGraphqlPayload
  }
}
