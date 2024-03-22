import BaseGraphqlLauncher from '@/modules/client/BaseGraphqlLauncher'

import graphqlConfig from '~/app/graphql/graphql.config'

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
}

/**
 * @typedef {import('@/modules/client/BaseGraphqlLauncher').BaseGraphqlLauncherFactoryParams} BaseAppGraphqlLauncherFactoryParams
 */
