import BaseFormElementClerk from '~/modules/domClerks/BaseFormElementClerk'

/**
 * Clerk class of sign-up form element.
 *
 * @extends {BaseFormElementClerk<typeof SignUpFormElementClerk, FormValueHash, SchemaVariableHash>}
 */
export default class SignUpFormElementClerk extends BaseFormElementClerk {

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
