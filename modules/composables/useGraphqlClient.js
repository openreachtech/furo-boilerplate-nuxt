import {
  onMounted,
  ref,
} from 'vue'

/**
 * Composable to use GraphQL client.
 *
 * @param {{
 *   Launcher: typeof import('~/modules/client/BaseGraphqlLauncher').default
 * }} params - Parameters.
 * @returns {{
 *   capsuleRef: import('vue').Ref<Capsule>
 *   invokeRequestOnEvent: (args?: GraphqlRequestArgs) => Promise<void>
 *   invokeRequestOnMounted: (args?: GraphqlRequestArgs) => void
 * }}
 */
export default function useGraphqlClient ({
  Launcher,
}) {
  const capsuleRef = ref(
    Launcher.createCapsuleAsPending()
  )

  return {
    capsuleRef,

    /**
     * Invoke request.
     *
     * @param {GraphqlRequestArgs} [args] - Arguments.
     * @returns {Promise<void>}
     */
    async invokeRequestOnEvent (args) {
      await invokeRequest(args)
    },

    /**
     * Invoke request.
     *
     * @param {GraphqlRequestArgs} [args] - Arguments.
     * @returns {void}
     */
    invokeRequestOnMounted (args) {
      onMounted(async () => {
        await invokeRequest(args)
      })
    },
  }

  /**
   * Invoke request.
   *
   * @param {GraphqlRequestArgs} [args] - Arguments.
   * @returns {Promise<void>}
   */
  async function invokeRequest (args) {
    const capsule = await retrieveCapsule(args)

    capsuleRef.value = capsule
  }

  /**
   * Retrieve capsule.
   *
   * @param {GraphqlRequestArgs} [args] - Arguments.
   * @returns {Promise<Capsule>}
   */
  async function retrieveCapsule (args) {
    // TODO: Resolve type error of `.create()` → #1035
    const launcher = Launcher.create()

    const capsule = await launcher.launchRequestWithVariables(args)

    return /** @type {*} */ (capsule)
  }
}

/**
 * @typedef {import('~/modules/client/BaseGraphqlLauncher').GraphqlRequestArgs} GraphqlRequestArgs
 */

/**
 * @typedef {import('~/modules/client/BaseGraphqlCapsule').default<*, *>} Capsule
 */
