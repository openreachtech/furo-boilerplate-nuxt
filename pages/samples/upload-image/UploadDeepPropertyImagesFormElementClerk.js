import {
  BaseFormElementClerk,
} from '@openreachtech/furo'

/**
 * @extends {BaseFormElementClerk<UploadDeepPropertyImagesFormValueHash>}
 */
export default class UploadDeepPropertyImagesFormElementClerk extends BaseFormElementClerk {
  /** @override */
  static get rules () {
    /**
     * @type {Array<furo.FieldValidatorFactoryParams>}
     */
    return [
      {
        field: 'nickname',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it?.length > 0,
        message: 'Nickname is required',
      },
      {
        field: 'bio',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it?.length > 0,
        message: 'Bio is required',
      },
      {
        field: 'avatarImage',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it,
        message: 'Avatar image is required',
      },
      {
        field: 'themeColor',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it?.length > 0,
        message: 'Theme color is required',
      },
      {
        field: 'avatarImage',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it,
        message: 'Avatar image is required',
      },
    ]
  }
}

/**
 * @typedef {{
 *   nickname: string
 *   bio: string
 *   avatarImage: File
 *   themeColor: string
 *   coverImage: File
 * }} UploadDeepPropertyImagesFormValueHash
 */

/**
 * @typedef {{
 *   nickname: string
 *   bio: string
 *   avatarImage: File
 *   themeColor: string
 *   coverImage: File
 * }} SchemaVariableHash
 */
