import {
  ref,
} from 'vue'

/**
 * Use form clerk.
 * Receive <form> clerk class and invoke request function.
 *
 * @param {{
 *   FormElementClerk: typeof import('~/modules/domClerks/BaseFormElementClerk').default<*, *, *>
 *   invokeRequest: (args?: GraphqlRequestArgs) => Promise<void>
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
export default function useFormClerk ({
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
   *   generateVariables?: (valueHash: Record<string, string | Array<string> | null>) => VariablesType
   * }} params - Parameters.
   * @returns {Promise<boolean>} true: Invoke request.
   */
  async function submitForm ({
    formElement,
    hooks,
    options,
    generateVariables = valueHash => ({
      input: valueHash,
    }),
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
      variables: generateVariables(variableHash),
      hooks,
      options,
    })

    return true
  }
}

/**
 * @typedef {import('~/modules/client/BaseGraphqlLauncher').GraphqlRequestArgs} GraphqlRequestArgs
 */

/**
 * @typedef {import('~/modules/client/BaseGraphqlPayload').VariablesType} VariablesType
 */

/**
 * @typedef {import('~/modules/client/BaseGraphqlLauncher').GraphqlLauncherHooks} HookHashType
 */
