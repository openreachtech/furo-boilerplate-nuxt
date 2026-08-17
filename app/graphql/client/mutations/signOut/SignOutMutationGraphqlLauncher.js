import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import SignOutMutationGraphqlPayload from '~/app/graphql/client/mutations/signOut/SignOutMutationGraphqlPayload'
import SignOutMutationGraphqlCapsule from '~/app/graphql/client/mutations/signOut/SignOutMutationGraphqlCapsule'

/**
 * SignOut mutation graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class SignOutMutationGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return SignOutMutationGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return SignOutMutationGraphqlCapsule
  }
}
