import {
  BaseFuroContextAccessor,
} from '@openreachtech/furo-nuxt'

/**
 * ChatRoomPagePageContextAccessor.
 *
 * @extends {BaseFuroContextAccessor<import('./ChatRoomPageContext.js').default>} - Base class <Context, State, Emit>
 */
export default class ChatRoomPagePageContextAccessor extends BaseFuroContextAccessor {
  /**
   * get: capsuleRef.
   *
   * @returns {import('../../../app/graphql/client/queries/chatRooms/ChatRoomsQueryGraphqlCapsule.js').default} - Capsule reference.
   */
  get chatRoomsCapsule () {
    return /** @type {*} */ (
      this.context
        .graphqlClientHash
        .chatRooms
        .capsuleRef
        .value
    )
  }

  /**
   * get: ChatRoomPage.
   *
   * @returns {Array<import('../../../app/graphql/client/queries/chatRooms/ChatRoomsQueryGraphqlCapsule.js').RoomEntity>} - Array of curriculum.
   */
  get chatRooms () {
    return this.chatRoomsCapsule
      .chatRooms
  }

  /**
   * get: capsuleRef.
   *
   * @returns {import('../../../app/graphql/client/queries/chatMessages/ChatMessagesQueryGraphqlCapsule.js').default} - Capsule reference.
   */
  get chatMessagesCapsule () {
    return /** @type {*} */ (
      this.context
        .graphqlClientHash
        .chatMessages
        .capsuleRef
        .value
    )
  }

  /**
   * get: ChatRoomPage.
   *
   * @returns {Array<import('../../../app/graphql/client/queries/chatMessages/ChatMessagesQueryGraphqlCapsule.js').ChatMessageEntity>} - Array of curriculum.
   */
  get chatMessages () {
    return this.chatMessagesCapsule
      .chatMessages
  }
}
