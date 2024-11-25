import {
  useRoute,
  useRouter,
} from 'vue-router'

/**
 * Redirect the user to a specific path.
 *
 * @param {{
 *   defaultPath?: string
 * }} [params] - The parameters
 * @returns {{
 *   redirectTo: (params?: { path?: string }) => void
 * }}
 */
export default function useRedirect ({
  defaultPath = '/',
} = {}) {
  const route = useRoute()
  const router = useRouter()

  return {
    redirectTo,
  }

  /**
   * Resolve the path.
   *
   * @returns {string} - The resolved path
   */
  function resolvePath () {
    return /** @type {*} */ (
      route.query.redirect
      ?? defaultPath
    )
  }

  /**
   * Redirect the user to a specific path.
   *
   * @param {{
   *   path?: string
   * }} [params] - The parameters
   */
  async function redirectTo ({
    path = resolvePath(),
  } = {}) {
    await router.push(path)
  }
}
