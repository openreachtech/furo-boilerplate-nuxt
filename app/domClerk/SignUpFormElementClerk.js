import {
  BaseFormElementClerk,
} from '@openreachtech/furo'

/**
 * Clerk class of sign-up form element.
 *
 * @extends {BaseFormElementClerk<typeof SignUpFormElementClerk, SignUpFormValueHash, SchemaVariableHash>}
 */
export default class SignUpFormElementClerk extends BaseFormElementClerk {
  /** @override */
  static get rules () {
    /**
     * @type {Array<furo.FieldValidatorFactoryParams>}
     */
    return [
      // email
      {
        field: 'email',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) =>
          !it || /^[^@]+@[^@]+\.[^@]+$/u.test(it),
        message: 'email must be valid',
      },

      // username
      {
        field: 'username',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it,
        message: 'username must be set',
      },
      {
        field: 'username',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => /^\w+$/u.test(it),
        message: 'username must be alphanumeric',
      },

      // firstName
      {
        field: 'firstName',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it,
        message: 'firstName must be set',
      },

      // lastName
      {
        field: 'lastName',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it,
        message: 'lastName must be set',
      },

      // password
      {
        field: 'password',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => {
          if (!it) {
            return true
          }

          return it.length >= 1
            && it.length <= 16
        },
        message: 'password must be set with at least 1 character and no more than 16 characters',
      },

      // password-confirmation
      {
        field: 'password-confirmation',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => {
          if (!it) {
            return true
          }

          return it === valueHash.password
        },
        message: 'please re-enter password for confirmation',
      },
      {
        field: 'password-confirmation',
        /** @type {furo.ValidationRule} */
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
 * @typedef {{
 *   email: string
 *   username: string
 *   firstName: string
 *   lastName: string
 *   password: string
 *   'password-confirmation': string
 * }} SignUpFormValueHash
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
