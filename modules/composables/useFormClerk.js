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
