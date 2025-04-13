import BaseAppSubscriptionGraphqlCapsule from '../../BaseAppSubscriptionGraphqlCapsule'

/**
 * OnObserveChatStates subscription capsule.
 *
 * @extends {BaseAppSubscriptionGraphqlCapsule<OnObserveChatStatesSubscriptionResponseContent>}
 */
export default class OnObserveChatStatesSubscriptionGraphqlCapsule extends BaseAppSubscriptionGraphqlCapsule {
  /**
   * Extract value hash.
   *
   * @returns {Record<string, *> | null} Value hash.
   */
  extractValueHash () {
    const content = this.extractContent()

    return content?.onObserveChatStates
      ?? null
  }

  /**
   * Has unread messages.
   *
   * @returns {boolean | null} Has unread messages
   */
  hasUnreadMessages () {
    return this.extractValueHash()
      ?.hasUnreadMessages
  }

  /**
   * Has updated members.
   *
   * @returns {boolean | null} Has unread messages
   */
  hasUpdatedMembers () {
    return this.extractValueHash()
      ?.hasUpdatedMembers
  }
}

/**
 * @typedef {{
 *   onObserveChatStates: {
 *     hasUnreadMessages: boolean
 *     hasUpdatedMembers: boolean
 *   }
 * }} OnObserveChatStatesSubscriptionResponseContent
 */
