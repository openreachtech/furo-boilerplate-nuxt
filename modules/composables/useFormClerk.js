import {
  ref,
} from 'vue'

export /** @template V */ function useFormClerk () {
  /**
   * @type {import('vue').Ref<
   *   import('~/modules/validators/ValueHashValidator').ValidatorHashType
   * >}
   */
  const validationRef = ref({
    valid: {},
    invalid: {},
    messages: {},
    message: {},
  })

  return {
    validationRef,
  }
}

/**
 * @typedef {{
 *   variables: VariablesType
 *   hooks?: HookHashType
 *   options?: RequestInit
 * }} GraphqlRequestParams
 */

/**
 * @typedef {import('~/modules/client/BaseGraphqlPayload').VariablesType} VariablesType
 */

/**
 * @typedef {{
 *   beforeRequest?: (payload: import('~/modules/client/BaseGraphqlPayload')) => Promise<boolean>
 *   afterRequest?: (capsule: import('~/modules/client/BaseGraphqlCapsule')) => Promise<void>
 * }} HookHashType
 */
