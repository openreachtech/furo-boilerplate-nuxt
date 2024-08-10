import BaseGraphqlPayload from '~/modules/client/BaseGraphqlPayload'
import StorageClerk from '~/modules/storage/StorageClerk'

/**
 * Company sponsors query graphql launcher.
 *
 * @template T
 * @template {import('~/modules/client/BaseGraphqlPayload').VariablesType} SV
 * @extends {BaseGraphqlPayload<typeof BaseAppGraphqlPayload, SV>}
 */
export default class BaseAppGraphqlPayload extends BaseGraphqlPayload {
  /**
   * Create an instance of StorageClerk.
   *
   * @returns {StorageClerk} Instance of StorageClerk.
   */
  static createStorageClerk () {
    return StorageClerk.createAsLocal()
  }
}
