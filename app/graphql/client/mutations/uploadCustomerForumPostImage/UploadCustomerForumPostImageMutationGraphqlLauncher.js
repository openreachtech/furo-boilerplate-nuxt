import BaseAppGraphqlLauncher from '../../BaseAppGraphqlLauncher.js'
import UploadCustomerForumPostImageMutationGraphqlPayload from './UploadCustomerForumPostImageMutationGraphqlPayload.js'
import UploadCustomerForumPostImageMutationGraphqlCapsule from './UploadCustomerForumPostImageMutationGraphqlCapsule.js'

/**
 * UploadCustomerForumPostImage mutation graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher<typeof UploadCustomerForumPostImageMutationGraphqlLauncher>}
 */
export default class UploadCustomerForumPostImageMutationGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return UploadCustomerForumPostImageMutationGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return UploadCustomerForumPostImageMutationGraphqlCapsule
  }
}
