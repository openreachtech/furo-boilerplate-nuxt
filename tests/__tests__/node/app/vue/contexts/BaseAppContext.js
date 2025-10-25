import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import BaseAppContext from '~/app/vue/contexts/BaseAppContext.js'

describe('BaseAppContext', () => {
  describe('inheritance', () => {
    test('should inherit BaseFuroContext', () => {
      const received = BaseAppContext.prototype

      expect(received)
        .toBeInstanceOf(BaseFuroContext)
    })
  })
})
