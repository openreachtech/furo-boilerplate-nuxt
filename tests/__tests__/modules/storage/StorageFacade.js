import StorageFacade from '@/modules/storage/StorageFacade'

describe('StorageFacade', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      describe('#storage', () => {
        const cases = [
          {
            params: {
              storage: 'localStorage',
            },
          },
          {
            params: {
              storage: 'sessionStorage',
            },
          },
        ]

        test.each(cases)('storage: $params.storage', ({ params }) => {
          const storageTally = globalThis[params.storage]
          const args = {
            storage: storageTally,
          }
          const facade = new StorageFacade(args)

          expect(facade)
            .toHaveProperty('storage', storageTally)
        })
      })
    })
  })
})
