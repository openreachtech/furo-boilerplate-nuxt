import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

/**
 * SignUp mutation payload.
 *
 * @extends {BaseAppGraphqlPayload<typeof SignUpMutationGraphqlPayload, SignUpVariablesType>}
 */
export default class SignUpMutationGraphqlPayload extends BaseAppGraphqlPayload {
  /** @inheritdoc */
  static get document () {
    return /* GraphQL */ `
      mutation SignUpMutation ($input: SignUpInput!) {
        signUp (input: $input) {
          sentTo
        }
      }
    `
  }
}

/*
 * SignUpInput {
 *   email String!
 *   username String
 *   firstName String
 *   lastName String
 *   password String!
 * }
 */

/**
 * @typedef {{
 *   input: {
 *     email: string
 *     username: string
 *     firstName: string
 *     lastName: string
 *     password: string
 *   }
 * }} SignUpVariablesType
 */
