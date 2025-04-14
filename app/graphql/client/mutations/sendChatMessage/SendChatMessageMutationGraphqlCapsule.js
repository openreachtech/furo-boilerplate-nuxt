import BaseAppGraphqlCapsule from '../../BaseAppGraphqlCapsule'

/**
 * ChatRooms query graphql capsule.
 *
 * @extends {BaseAppGraphqlCapsule<SendChatMessageMutationResponseContent>}
 */
export default class SendChatMessageMutationGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * get: chat rooms
   *
   * @returns {Array<RoomEntity>} Array of curriculum
   */
  get chatRooms () {
    const content = this.extractContent()

    return content
      ?.chatRooms
      ?.rooms
      ?? []
  }
}

/**
 * @typedef {{
 *   chatRooms: {
 *     rooms: Array<RoomEntity>
 *   }
 * }} SendChatMessageMutationResponseContent
 */

/**
 * @typedef {{
 *   id: number
 *   postedAt: string
 *   content: string
 *   sender: string
 * }} RoomEntity
 */
