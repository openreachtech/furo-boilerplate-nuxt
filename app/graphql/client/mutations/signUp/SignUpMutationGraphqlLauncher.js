import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import SignUpMutationGraphqlPayload from '~/app/graphql/client/mutations/signUp/SignUpMutationGraphqlPayload'
import SignUpMutationGraphqlCapsule from '~/app/graphql/client/mutations/signUp/SignUpMutationGraphqlCapsule'

/**
 * SignUp mutation graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher<typeof SignUpMutationGraphqlLauncher>}
 */
export default class SignUpMutationGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return SignUpMutationGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return SignUpMutationGraphqlCapsule
  }
}
