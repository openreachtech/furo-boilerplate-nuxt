import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * SignOut mutation graphql capsule.
 *
 * @extends {BaseAppGraphqlCapsule<SignOutMutationResponseContent>}
 */
export default class SignOutMutationGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * get: isSignedOut
   *
   * @returns {boolean | null} Whether the session was signed out.
   */
  get isSignedOut () {
    return this.content
      ?.signOut
      ?.isSignedOut
      ?? null
  }
}

/**
 * @typedef {{
 *   signOut: {
 *     isSignedOut: boolean
 *   }
 * }} SignOutMutationResponseContent
 */
