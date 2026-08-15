import SessionStore from '~/app/session/SessionStore.js'

/**
 * The shared session store singleton — one `SessionStore` instance for the whole app, injected by
 * default into `SessionStoreClerk` and `SessionRenewer`. It lives here (the same module-singleton wiring
 * as `app/graphql/graphql.config.js`) so both share the one holder; the state itself is owned by the
 * `SessionStore` class, not a plain object.
 */
export default SessionStore.create()
