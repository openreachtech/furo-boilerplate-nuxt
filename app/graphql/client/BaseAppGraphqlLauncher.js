import BaseGraphqlLauncher from '~/modules/client/BaseGraphqlLauncher'
import StorageClerk from '~/modules/storage/StorageClerk'

import {
  HEADER_KEY,
  STORAGE_KEY,
} from '~/app/constants'

import graphqlConfig from '~/app/graphql/graphql.config'

/**
 * Company sponsors query graphql launcher.
 *
 * @template {typeof BaseAppGraphqlLauncher} T
 * @extends {BaseGraphqlLauncher<T>}
 */
export default class BaseAppGraphqlLauncher extends BaseGraphqlLauncher {
  /**
   * Factory method.
   *
   * @override
   * @param {BaseAppGraphqlLauncherFactoryParams} params - Parameters of factory method.
   * @template T
   * @this {T}
   * @returns {InstanceType<T>} Instance of BaseAppGraphqlLauncher.
   */
  static create ({
    config,
  } = {
    config: graphqlConfig,
  }) {
    return /** @type {*} */ (
      super.create({
        config,
      })
    )
  }

  /**
   * Create an instance of StorageClerk.
   *
   * @returns {StorageClerk} Instance of StorageClerk.
   */
  static createStorageClerk () {
    return StorageClerk.createAsLocal()
  }

  /**
   * Update headers.
   *
   * @override
   * @param {{
   *   headers: Headers
   * }} params - Parameters.
   * @returns {Headers} Updated headers.
   */
  updateHeaders ({
    headers,
  }) {
    const accessToken = this.loadAccessToken()

    if (accessToken) {
      headers.append(
        HEADER_KEY.ACCESS_TOKEN,
        accessToken
      )
    }

    return headers
  }

  /**
   * Load access token from storage.
   *
   * @returns {string | null} Access token.
   */
  loadAccessToken () {
    const storageClerk = this.Ctor.createStorageClerk()

    return storageClerk.get(STORAGE_KEY.ACCESS_TOKEN)
  }
}

/**
 * @typedef {import('~/modules/client/BaseGraphqlLauncher').BaseGraphqlLauncherFactoryParams} BaseAppGraphqlLauncherFactoryParams
 */
