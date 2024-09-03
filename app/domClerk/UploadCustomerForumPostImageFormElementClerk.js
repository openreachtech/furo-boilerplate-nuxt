import {
  BaseFormElementClerk,
} from '@openreachtech/furo'

/**
 * Clerk class of sign-up form element.
 *
 * @extends {BaseFormElementClerk<typeof UploadCustomerForumPostImageFormElementClerk, UploadCustomerForumPostImageFormValueHash, SchemaVariableHash>}
 */
export default class UploadCustomerForumPostImageFormElementClerk extends BaseFormElementClerk {
  /** @override */
  static get rules () {
    /**
     * @type {Array<furo.FieldValidatorFactoryParams>}
     */
    return [
      // image
      {
        field: 'image',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it,
        message: 'require image file',
      },
    ]
  }
}

/**
 * @typedef {{
 *   image: File
 * }} UploadCustomerForumPostImageFormValueHash
 */

/**
 * @typedef {{
 *   image: File
 * }} SchemaVariableHash
 */
