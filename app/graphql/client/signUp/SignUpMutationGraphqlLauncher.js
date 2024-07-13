import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import SignUpMutationGraphqlPayload from '~/app/graphql/client/signUp/SignUpMutationGraphqlPayload'
import SignUpMutationGraphqlCapsule from '~/app/graphql/client/signUp/SignUpMutationGraphqlCapsule'

export default class SignUpMutationGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @inheritdoc */
  static get Payload () {
    return SignUpMutationGraphqlPayload
  }

  /** @inheritdoc */
  static get Capsule () {
    return SignUpMutationGraphqlCapsule
  }
}
