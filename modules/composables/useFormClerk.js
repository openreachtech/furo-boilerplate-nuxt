import {
  ref,
} from 'vue'

/**
 * Use form clerk.
 * Receive <form> clerk class and invoke request function.
 *
 * @param {{
 *   FormElementClerk: typeof import('~/modules/domClerks/BaseFormElementClerk').default
 *   invokeRequest: (args: GraphqlRequestParams) => Promise<void>
 * }} params - Parameters.
 * @returns {{
 *   validationRef: import('vue').Ref<
 *     import('~/modules/validators/ValueHashValidator').ValidatorHashType
 *   >
 *   submitForm: (params: {
 *     formElement: HTMLFormElement
 *     hooks?: HookHashType
 *     options?: RequestInit
 *   }) => Promise<boolean>
 * }}
 */
export function useFormClerk ({
  FormElementClerk,
  invokeRequest,
}) {
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
    submitForm,
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
