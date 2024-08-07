import BaseFormElementClerk from '~/modules/domClerks/BaseFormElementClerk'

/**
 * Clerk class of sign-up form element.
 *
 * @extends {BaseFormElementClerk<typeof SignUpFormElementClerk, FormValueHash, SchemaVariableHash>}
 */
export default class SignUpFormElementClerk extends BaseFormElementClerk {
  /** @override */
  static get validators () {
    return [
      {
        field: 'email',
        /** @type {ValidatorFunction} */
        body: (it, variables) => {
          return !it
            || /^[^@]+@[^@]+\.[^@]+$/.test(it)
        },
        message: 'email must be valid',
      },

      {
        field: 'username',
        /** @type {ValidatorFunction} */
        body: (it, variables) => it,
        message: 'username must be set',
      },
      {
        field: 'username',
        /** @type {ValidatorFunction} */
        body: (it, variables) => /^\w+$/.test(it),
        message: 'username must be alphanumeric',
      },

      {
        field: 'firstName',
        /** @type {ValidatorFunction} */
        body: (it, variables) => it,
        message: 'firstName must be set',
      },
      {
        field: 'lastName',
        /** @type {ValidatorFunction} */
        body: (it, variables) => it,
        message: 'lastName must be set',
      },

      {
        field: 'password',
        /** @type {ValidatorFunction} */
        body: (it, variables) => {
          return it
            && it.length >= 1
            && it.length <= 16
        },
        message: 'password must be set with at least 1 character and no more than 16 characters',
      },

      {
        field: 'password-confirmation',
        /** @type {ValidatorFunction} */
        body: (it, variables) => {
          return it
            && it === variables.password
        },
        message: 'passwords do not match.',
      },
    ]
  }

  /** @override */
  generateSchemaVariableHash ({
    formValueHash: {
      email,
      username,
      firstName,
      lastName,
      password,
    } = this.extractValueHash(),
  } = {}) {
    return {
      email,
      username,
      firstName,
      lastName,
      password,
    }
  }
}

/**
 * @typedef {(it: *, variables: Record<string, *>) => boolean | *} ValidatorFunction
 */

/**
 * @typedef {{
 *   email: string
 *   username: string
 *   firstName: string
 *   lastName: string
 *   password: string
 *   'password-confirmation': string
 * }} FormValueHash
 */

/**
 * @typedef {{
 *   email?: string
 *   username?: string
 *   firstName?: string
 *   lastName?: string
 *   password?: string
 * }} SchemaVariableHash
 */
