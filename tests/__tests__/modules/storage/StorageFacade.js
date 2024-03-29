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

describe('StorageFacade', () => {
  describe('#get()', () => {
    describe('to be set value', () => {
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

      describe.each(cases)('storage: $params.storage', ({ params }) => {
        const storage = globalThis[params.storage]
        storage.clear()
        storage.alpha = '100'
        storage.beta = '200'

        const facade = new StorageFacade({
          storage,
        })

        const cases = [
          {
            params: {
              key: 'alpha',
            },
            expected: '100',
          },
          {
            params: {
              key: 'beta',
            },
            expected: '200',
          },
        ]

        test.each(cases)('key: $params.key', ({ params, expected }) => {
          const actual = facade.get(params.key)

          expect(actual)
            .toBe(expected)
        })
      })
    })

    describe('to call #storage.getItem()', () => {
      const cases = [
        {
          params: {
            key: 'alpha',
          },
        },
        {
          params: {
            key: 'beta',
          },
        },
      ]

      test.each(cases)('key: $params.kay', ({ params }) => {
        const mockStorage = {
          getItem () {},
        }

        const getItemSpy = jest.spyOn(mockStorage, 'getItem')
          .mockReturnValue(null)
        const facade = new StorageFacade({
          storage: mockStorage,
        })

        facade.get(params.key)

        expect(getItemSpy)
          .toHaveBeenCalledWith(params.key)

        getItemSpy.mockRestore()
      })
    })
  })
})
