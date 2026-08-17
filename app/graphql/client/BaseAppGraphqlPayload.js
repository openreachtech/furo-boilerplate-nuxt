import {
  BaseGraphqlPayload,
} from '@openreachtech/furo'

/**
 * Base GraphQL payload of this app.
 *
 * Universal: it only merges the headers it is given for the request (via `options.headers`). The
 * access token is attached per request by `useAppGraphqlClient`, so this payload never reads the
 * token or touches storage itself.
 *
 * @template {furo.GraphqlRequestVariables} SV
 * @extends {BaseGraphqlPayload<SV>}
 */
export default class BaseAppGraphqlPayload extends BaseGraphqlPayload {
}
