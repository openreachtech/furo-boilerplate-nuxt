/**
 * Session store.
 *
 * The single in-memory holder of the access token, and of the in-flight renew promise used to
 * deduplicate concurrent refreshes. Mutated in place — the same pattern as
 * `app/graphql/graphql.config.js` — so nothing else ever touches token storage.
 *
 * @typedef {{
 *   accessToken: string | null
 *   renewingPromise: Promise<string | null> | null
 * }} SessionStore
 */

/** @type {SessionStore} */
export default {
  accessToken: null,
  renewingPromise: null,
}
