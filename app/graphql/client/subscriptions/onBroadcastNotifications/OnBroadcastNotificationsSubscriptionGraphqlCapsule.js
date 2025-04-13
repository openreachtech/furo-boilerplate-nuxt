import BaseAppSubscriptionGraphqlCapsule from '../../BaseAppSubscriptionGraphqlCapsule'

/**
 * OnBroadcastNotifications subscription capsule.
 *
 * @extends {BaseAppSubscriptionGraphqlCapsule<OnBroadcastNotificationsSubscriptionResponseContent>}
 */
export default class OnBroadcastNotificationsSubscriptionGraphqlCapsule extends BaseAppSubscriptionGraphqlCapsule {
  /**
   * Extract value hash.
   *
   * @returns {Record<string, *> | null} Value hash.
   */
  extractValueHash () {
    const content = this.extractContent()

    return content?.onBroadcastNotifications
      ?? null
  }

  /**
   * Has unread messages.
   *
   * @returns {boolean | null} Has unread messages
   */
  extractNotifications () {
    return this.extractValueHash()
      ?.rooms
      ?? []
  }
}

/**
 * @typedef {{
 *   onBroadcastNotifications: {
 *     notification: Array<{
 *       message: string
 *       segment: string
 *     }>
 *   }
 * }} OnBroadcastNotificationsSubscriptionResponseContent
 */
