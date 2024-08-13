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

  /**
   * Submit form.
   *
   * @param {{
   *   formElement: HTMLFormElement
   *   hooks?: HookHashType
   *   options?: RequestInit
   * }} params - Parameters.
   * @returns {Promise<boolean>} true: Invoke request.
   */
  async function submitForm ({
    formElement,
    hooks,
    options,
  }) {
    const formElementClerk = FormElementClerk.create({
      formElement,
    })

    validationRef.value = formElementClerk.generateValidationHash()

    // Skip #launchRequest(), if invalid value hash of <form>.
    if (formElementClerk.isInvalid()) {
      return false
    }

    const variableHash = formElementClerk.generateSchemaVariableHash()

    await invokeRequest({
      variables: variableHash,
      hooks,
      options,
    })

    return true
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
