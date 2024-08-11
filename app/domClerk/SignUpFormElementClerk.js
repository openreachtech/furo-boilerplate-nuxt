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
      // email
      {
        field: 'email',
        /** @type {ValidationCallback} */
        ok: (it, valueHash) => {
          return !it
            || /^[^@]+@[^@]+\.[^@]+$/.test(it)
        },
        message: 'email must be valid',
      },

      // username
      {
        field: 'username',
        /** @type {ValidationCallback} */
        ok: (it, valueHash) => it,
        message: 'username must be set',
      },
      {
        field: 'username',
        /** @type {ValidationCallback} */
        ok: (it, valueHash) => /^\w+$/.test(it),
        message: 'username must be alphanumeric',
      },

      // firstName
      {
        field: 'firstName',
        /** @type {ValidationCallback} */
        ok: (it, valueHash) => it,
        message: 'firstName must be set',
      },

      // lastName
      {
        field: 'lastName',
        /** @type {ValidationCallback} */
        ok: (it, valueHash) => it,
        message: 'lastName must be set',
      },

      // password
      {
        field: 'password',
        /** @type {ValidationCallback} */
        ok: (it, valueHash) => {
          if (!it) {
            return true
          }

          return it.length >= 1
            && it.length <= 16
        },
        message: 'password must be set with at least 1 character and no more than 16 characters',
      },

      // confirm-password
      {
        field: 'confirm-password',
        /** @type {ValidationCallback} */
        ok: (it, valueHash) => {
          if (!it) {
            return true
          }

          return it === valueHash.password
        },
        message: 'passwords do not match',
      },
    ]
  }
}

/**
 * @typedef {import('~/modules/client/FieldValidator').ValidationCallback} ValidationCallback
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
