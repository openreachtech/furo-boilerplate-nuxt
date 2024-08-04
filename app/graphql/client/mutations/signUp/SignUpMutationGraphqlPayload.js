import BaseGraphqlPayload from '~/modules/client/BaseGraphqlPayload'

/**
 * SignUp mutation payload.
 *
 * @extends {BaseGraphqlPayload<typeof SignUpMutationGraphqlPayload>}
 */
export default class SignUpMutationGraphqlPayload extends BaseGraphqlPayload {
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

  /** @override */
  static get validators () {
    return [
      {
        field: 'email',
        body: (it, variables) => {
          return !it
            || /^[^@]+@[^@]+\.[^@]+$/.test(it)
        },
        message: 'email must be valid',
      },

      {
        field: 'username',
        body: (it, variables) => it,
        message: 'username must be set',
      },
      {
        field: 'username',
        body: (it, variables) => /^\w+$/.test(it),
        message: 'username must be alphanumeric',
      },

      {
        field: 'firstName',
        body: (it, variables) => it,
        message: 'firstName must be set',
      },
      {
        field: 'lastName',
        body: (it, variables) => it,
        message: 'lastName must be set',
      },

      {
        field: 'password',
        body: (it, variables) => {
          return it
            && it.length >= 1
            && it.length <= 16
        },
        message: 'password must be set with at least 1 character and no more than 16 characters',
      },

      {
        field: 'password-confirmation',
        body: (it, variables) => {
          return it
            && it === variables.password
        },
        message: 'passwords do not match.',
      },
    ]
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
