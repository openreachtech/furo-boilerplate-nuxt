import BaseGraphqlLauncher from '~/modules/client/BaseGraphqlLauncher'

import graphqlConfig from '~/app/graphql/graphql.config'

/**
 * Company sponsors query graphql launcher.
 *
 * @template T
 * @extends {BaseGraphqlLauncher<typeof BaseAppGraphqlLauncher>}
 */
export default class BaseAppGraphqlLauncher extends BaseGraphqlLauncher {
  /** @override */
  static get graphqlConfig () {
    return graphqlConfig
  }
}

/**
 * @typedef {import('~/modules/client/BaseGraphqlLauncher').BaseGraphqlLauncherFactoryParams} BaseAppGraphqlLauncherFactoryParams
 */
