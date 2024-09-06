import {
  BaseGraphqlLauncher,
} from '@openreachtech/furo'

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
    return /** @type {*} */ (
      graphqlConfig
    )
  }
}

/**
 * @typedef {furo.BaseGraphqlLauncherFactoryParams} BaseAppGraphqlLauncherFactoryParams
 */
