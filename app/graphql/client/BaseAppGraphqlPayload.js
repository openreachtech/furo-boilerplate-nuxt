import BaseGraphqlPayload from '~/modules/client/BaseGraphqlPayload'
import StorageClerk from '~/modules/storage/StorageClerk'

import {
  STORAGE_KEY,
} from '~/app/constants'

/**
 * Company sponsors query graphql launcher.
 *
 * @template T
 * @template {import('~/modules/client/BaseGraphqlPayload').VariablesType} SV
 * @extends {BaseGraphqlPayload<typeof BaseAppGraphqlPayload, SV>}
 */
export default class BaseAppGraphqlPayload extends BaseGraphqlPayload {
  /**
   * Load access token from storage.
   *
   * @returns {string | null} Access token.
   */
  static loadAccessToken () {
    const storageClerk = this.createStorageClerk()

    return storageClerk.get(STORAGE_KEY.ACCESS_TOKEN)
  }

  /**
   * Create an instance of StorageClerk.
   *
   * @returns {StorageClerk} Instance of StorageClerk.
   */
  static createStorageClerk () {
    return StorageClerk.createAsLocal()
  }
}
