import BaseAppGraphqlPayload from '../../BaseAppGraphqlPayload.js'

/**
 * UploadCustomerForumPostImage mutation payload.
 *
 * @extends {BaseAppGraphqlPayload<typeof UploadCustomerForumPostImageMutationGraphqlPayload, UploadCustomerForumPostImageMutationRequestVariables>}
 */
export default class UploadCustomerForumPostImageMutationGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      mutation UploadCustomerForumPostImageMutation ($input: UploadCustomerForumPostImageInput!) {
        uploadCustomerForumPostImage (input: $input) {
          imageUrl
        }
      }
    `
  }

  /**
   * Generate variables from value hash.
   *
   * @override
   * @param {{
   *   valueHash: {
   *     image: File
   *   }
   * }} params - Parameters.
   * @returns {UploadCustomerForumPostImageMutationRequestVariables} Variables.
   */
  static generateVariables ({
    valueHash: {
      image,
    },
  }) {
    return {
      input: {
        image,
      },
    }
  }
}

/**
 * @typedef {{
 *   input: {
 *     image: File
 *   }
 * }} UploadCustomerForumPostImageMutationRequestVariables
 */

/*
input UploadCustomerForumPostImageInput {
  image: Upload!
}
*/
