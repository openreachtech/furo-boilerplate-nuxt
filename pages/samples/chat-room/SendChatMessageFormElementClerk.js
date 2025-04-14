import {
  BaseFormElementClerk,
} from '@openreachtech/furo'

/**
 * Clerk class of send chat message form element.
 *
 * @extends {BaseFormElementClerk<typeof SendChatMessageFormElementClerk, SendChatMessageFormValueHash, SchemaVariableHash>}
 */
export default class SendChatMessageFormElementClerk extends BaseFormElementClerk {
  /** @override */
  static get rules () {
    /**
     * @type {Array<furo.FieldValidatorFactoryParams>}
     */
    return [
      // content
      {
        field: 'content',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it,
        message: 'message must be set',
      },

      // // customerId
      // {
      //   field: 'customerId',
      //   /** @type {furo.ValidationRule} */
      //   ok: (it, valueHash) =>
      //     it
      //     && /^[0-9]+$/u.test(it),
      //   message: 'customer id is not a number',
      // },
    ]
  }
}

/**
 * @typedef {{
 *   name: string
 * }} SendChatMessageFormValueHash
 */

/**
 * @typedef {{
 *   email: string
 *   password: string
 * }} SchemaVariableHash
 */
