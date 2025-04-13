import BaseAppGraphqlCapsule from '../../BaseAppGraphqlCapsule'

/**
 * ChatRooms query graphql capsule.
 *
 * @extends {BaseAppGraphqlCapsule<CreateChatRoomMutationResponseContent>}
 */
export default class CreateChatRoomMutationGraphqlCapsule extends BaseAppGraphqlCapsule {
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
 * }} CreateChatRoomMutationResponseContent
 */

/**
 * @typedef {{
 *   id: number
 *   name: string
 * }} RoomEntity
 */
