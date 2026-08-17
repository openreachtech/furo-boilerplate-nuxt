import SignOutMutationGraphqlLauncher from '~/app/graphql/client/mutations/signOut/SignOutMutationGraphqlLauncher'

/**
 * Revokes the session: revoke the refresh-token series on the server, then drop the in-memory token.
 *
 * A plain class — it never calls a composable, so the session clerk is injected. The server revoke
 * happens before the local drop so a failed revoke never leaves a live server session behind a
 * cleared client.
 */
export default class SessionRevoker {
  /**
   * Constructor.
   *
   * @param {SessionRevokerParams} params - Parameters.
   */
  constructor ({
    sessionClerk,
    launcherFactory,
  }) {
    this.sessionClerk = sessionClerk
    this.launcherFactory = launcherFactory
  }

  /**
   * Factory method. `sessionClerk` is injected by a composable; the sign-out launcher defaults to the
   * concrete one.
   *
   * @param {SessionRevokerFactoryParams} params - Parameters.
   * @returns {SessionRevoker} - Instance of this class.
   */
  static create ({
    sessionClerk,
    launcherFactory = SignOutMutationGraphqlLauncher,
  }) {
    return new this({
      sessionClerk,
      launcherFactory,
    })
  }

  /**
   * Revoke the session: revoke the series on the server, then drop the in-memory token.
   *
   * @returns {Promise<void>}
   */
  async revokeSession () {
    await this.sendSignOut()

    this.sessionClerk.clearToken()
  }

  /**
   * Send the `signOut` mutation. `credentials: 'include'` sends the refresh-token cookie so the
   * server can revoke the series and clear the cookie.
   *
   * @returns {Promise<void>}
   */
  async sendSignOut () {
    const payload = this.buildSignOutPayload()

    const launcher = this.createSignOutLauncher()

    await launcher.launchRequest({
      payload,
    })
  }

  /**
   * Build the sign-out request payload.
   *
   * @returns {ReturnType<typeof SignOutMutationGraphqlLauncher.createPayload>} - Payload.
   */
  buildSignOutPayload () {
    return this.launcherFactory.createPayload({
      variables: {},
      options: {
        credentials: 'include',
      },
    })
  }

  /**
   * Create the sign-out launcher.
   *
   * @returns {InstanceType<typeof SignOutMutationGraphqlLauncher>} - Launcher.
   */
  createSignOutLauncher () {
    return this.launcherFactory.create()
  }
}

/**
 * @typedef {{
 *   sessionClerk: import('./SessionStoreClerk.js').default
 *   launcherFactory: typeof import('~/app/graphql/client/mutations/signOut/SignOutMutationGraphqlLauncher').default
 * }} SessionRevokerParams
 */

/**
 * @typedef {{
 *   sessionClerk: import('./SessionStoreClerk.js').default
 *   launcherFactory?: typeof import('~/app/graphql/client/mutations/signOut/SignOutMutationGraphqlLauncher').default
 * }} SessionRevokerFactoryParams
 */
