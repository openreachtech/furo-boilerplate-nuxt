import BaseGraphqlLauncher from '@/modules/client/BaseGraphqlLauncher'
import constants from '~/app/constants'

import graphqlConfig from '~/app/graphql/graphql.config'
import StorageClerk from '~/modules/storage/StorageClerk'

export default class BaseAppGraphqlLauncher extends BaseGraphqlLauncher {
  /**
   * Factory method.
   *
   * @override
   * @param {BaseAppGraphqlLauncherFactoryParams} params - Parameters of factory method.
   * @returns
   */
  static create ({
    config = graphqlConfig,
  } = {}) {
    return super.create({
      config,
    })
  }

  /**
   * get: Constructor from instance.
   *
   * @override
   * @returns {typeof BaseAppGraphqlLauncher} Constructor of the instance.
   */
  get Ctor () {
    return super.Ctor
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
        constants.HEADER_KEY.ACCESS_TOKEN,
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

    return storageClerk.get(constants.STORAGE_KEY.ACCESS_TOKEN)
  }
}

/**
 * @typedef {import('@/modules/client/BaseGraphqlLauncher').BaseGraphqlLauncherFactoryParams} BaseAppGraphqlLauncherFactoryParams
 */
