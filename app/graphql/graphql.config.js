import {
  StorageClerk,
} from '@openreachtech/furo'

import {
  STORAGE_KEY,
} from '~/app/constants.js'

export default {
  /**
   * get: The endpoint URL.
   *
   * @returns {string | null} The endpoint URL.
   */
  get ENDPOINT_URL () {
    const storage = StorageClerk.createAsSession()

    const json = storage.get(STORAGE_KEY.FURO_ENV)

    if (!json) {
      return null
    }

    try {
      const furoEnv = JSON.parse(json)

      return furoEnv
        ?.ENDPOINT_URL
        ?? null
    } catch (error) {
      return null
    }
  },
}
