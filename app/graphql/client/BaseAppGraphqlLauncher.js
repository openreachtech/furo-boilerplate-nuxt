import BaseGraphqlLauncher from '@/modules/client/BaseGraphqlLauncher'

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
}

/**
 * @typedef {import('@/modules/client/BaseGraphqlLauncher').BaseGraphqlLauncherFactoryParams} BaseAppGraphqlLauncherFactoryParams
 */
