import BaseGraphqlPayload from '~/modules/client/BaseGraphqlPayload'

/**
 * SignUp mutation payload.
 *
 * @extends {BaseGraphqlPayload<typeof SignUpMutationGraphqlPayload>}
 */
export default class SignUpMutationGraphqlPayload extends BaseGraphqlPayload {
  /** @inheritdoc */
  static get query () {
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
