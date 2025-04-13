import BaseAppGraphqlLauncher from '../../BaseAppGraphqlLauncher.js'
import SendChatMessageMutationGraphqlPayload from './SendChatMessageMutationGraphqlPayload.js'
import SendChatMessageMutationGraphqlCapsule from './SendChatMessageMutationGraphqlCapsule.js'

/**
 * ChatRooms query graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class SendChatMessageMutationGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return SendChatMessageMutationGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return SendChatMessageMutationGraphqlCapsule
  }
}
