import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

/**
 * SignOut mutation payload.
 *
 * @extends {BaseAppGraphqlPayload<SignOutMutationRequestVariables>}
 */
export default class SignOutMutationGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      mutation SignOutMutation {
        signOut {
          isSignedOut
        }
      }
    `
  }
}

/**
 * @typedef {{}} SignOutMutationRequestVariables
 */
