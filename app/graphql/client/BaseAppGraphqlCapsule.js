import {
  BaseGraphqlCapsule,
} from '@openreachtech/furo'

import {
  ERROR_CODE_HASH,
} from '~/app/constants-error.js'

/**
 * Base GraphQL capsule of this app.
 *
 * Names the auth-related response codes. furo's `getErrorMessage()` returns the backend error code
 * (the first error's message); these checks compare it against `ERROR_CODE_HASH`, so no code string
 * is hardcoded at a call site.
 *
 * @template D - Type of content (data).
 * @extends {BaseGraphqlCapsule<D>}
 */
export default class BaseAppGraphqlCapsule extends BaseGraphqlCapsule {
  /**
   * Check whether the response is a refresh-token-reuse error.
   *
   * @returns {boolean} - true: the refresh token was reused (the series is revoked).
   */
  isRefreshTokenReused () {
    const errorCode = this.getErrorMessage()

    if (errorCode === null) {
      return false
    }

    return errorCode === ERROR_CODE_HASH.RefreshTokenReused
  }

  /**
   * Check whether the response is an unauthenticated error.
   *
   * @returns {boolean} - true: the access token was rejected as missing / expired.
   */
  isUnauthenticated () {
    const errorCode = this.getErrorMessage()

    if (errorCode === null) {
      return false
    }

    return errorCode === ERROR_CODE_HASH.Unauthenticated
  }
}
