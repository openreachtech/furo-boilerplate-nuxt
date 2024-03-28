import {
  ConstructorSpyGenerator,
} from '~/node_modules/@openreachtech/renchan-test-tools/index'

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

describe('StorageFacade', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
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
        const facade = StorageFacade.create(args)

        expect(facade)
          .toBeInstanceOf(StorageFacade)
      })
    })

    describe('to call constructor', () => {
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
        const DerivedClass = ConstructorSpyGenerator.create({ jest })
          .generateSpyKitClass(StorageFacade)

        const storageTally = globalThis[params.storage]
        const args = {
          storage: storageTally,
        }

        DerivedClass.create(args)

        expect(DerivedClass.__spy__)
          .toHaveBeenCalledWith(args)
      })
    })
  })
})
