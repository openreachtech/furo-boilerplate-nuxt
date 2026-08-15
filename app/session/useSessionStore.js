import {
  useState,
} from '#imports'

/**
 * Session store.
 *
 * The reactive, in-memory holder of the access token — plus the in-flight renew promise used to
 * deduplicate concurrent refreshes — backed by Nuxt `useState()`. Nothing is ever written to
 * `localStorage` / `sessionStorage`.
 *
 * It is a composable, so it may only be called from the Nuxt context (composables / middleware /
 * plugins). A plain class such as `SessionStoreClerk` never calls it — the returned refs are injected
 * into that class instead (`SessionStoreClerk.create({ sessionStore })`).
 *
 * @returns {SessionStore} - The reactive session store.
 */
export function useSessionStore () {
  const accessToken = useState('session:accessToken', () => null)
  const renewingPromise = useState('session:renewingPromise', () => null)

  return {
    accessToken,
    renewingPromise,
  }
}

/**
 * @typedef {{
 *   accessToken: import('vue').Ref<string | null>
 *   renewingPromise: import('vue').Ref<Promise<string | null> | null>
 * }} SessionStore
 */
