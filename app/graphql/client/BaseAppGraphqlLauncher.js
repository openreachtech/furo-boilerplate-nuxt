import BaseGraphqlLauncher from '~/modules/client/BaseGraphqlLauncher'
import StorageClerk from '~/modules/storage/StorageClerk'

import {
  STORAGE_KEY,
} from '~/app/constants'

import graphqlConfig from '~/app/graphql/graphql.config'

/**
 * Company sponsors query graphql launcher.
 *
 * @template T
 * @extends {BaseGraphqlLauncher<typeof BaseAppGraphqlLauncher>}
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
   * Load access token from storage.
   *
   * @returns {string | null} Access token.
   */
  loadAccessToken () {
    const storageClerk = this.createStorageClerk()

    return storageClerk.get(STORAGE_KEY.ACCESS_TOKEN)
  }

  /**
   * Create an instance of StorageClerk.
   *
   * @returns {StorageClerk} Instance of StorageClerk.
   */
  createStorageClerk () {
    return StorageClerk.createAsLocal()
  }
}

/**
 * @typedef {import('~/modules/client/BaseGraphqlLauncher').BaseGraphqlLauncherFactoryParams} BaseAppGraphqlLauncherFactoryParams
 */
