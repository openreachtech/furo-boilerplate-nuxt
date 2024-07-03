import BaseGraphqlLauncher from '@/modules/client/BaseGraphqlLauncher'
import constants from '~/app/constants'

import graphqlConfig from '~/app/graphql/graphql.config'
import StorageFacade from '~/modules/storage/StorageFacade'

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
   * Create an instance of StorageFacade.
   *
   * @returns {StorageFacade} Instance of StorageFacade.
   */
  static createStorageFacade () {
    return StorageFacade.createAsLocal()
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

    headers.append(
      constants.HEADER_KEY.ACCESS_TOKEN,
      accessToken
    )

    return headers
  }

  /**
   * Load access token from storage.
   *
   * @returns {string | null} Access token.
   */
  loadAccessToken () {
    const storageFacade = this.Ctor.createStorageFacade()

    return storageFacade.get(constants.STORAGE_KEY.ACCESS_TOKEN)
  }
}

/**
 * @typedef {import('@/modules/client/BaseGraphqlLauncher').BaseGraphqlLauncherFactoryParams} BaseAppGraphqlLauncherFactoryParams
 */
