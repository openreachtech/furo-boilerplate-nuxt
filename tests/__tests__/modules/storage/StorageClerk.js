import {
  ConstructorSpyGenerator,
} from '~/node_modules/@openreachtech/renchan-test-tools/index'

import StorageFacade from '@/modules/storage/StorageClerk'

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
  describe('.createAsLocal()', () => {
    describe('to be instance of own class', () => {
      test('with no arguments', () => {
        const facade = StorageFacade.createAsLocal()

        expect(facade)
          .toBeInstanceOf(StorageFacade)
      })
    })

    describe('to call .create()', () => {
      test('with no arguments', () => {
        const expected = {
          storage: globalThis.localStorage,
        }
        const createSpy = jest.spyOn(StorageFacade, 'create')

        StorageFacade.createAsLocal()

        expect(createSpy)
          .toHaveBeenCalledWith(expected)

        createSpy.mockRestore()
      })
    })
  })
})

describe('StorageFacade', () => {
  describe('.createAsSession()', () => {
    describe('to be instance of own class', () => {
      test('with no arguments', () => {
        const facade = StorageFacade.createAsSession()

        expect(facade)
          .toBeInstanceOf(StorageFacade)
      })
    })

    describe('to call .create()', () => {
      test('with no arguments', () => {
        const expected = {
          storage: globalThis.sessionStorage,
        }
        const createSpy = jest.spyOn(StorageFacade, 'create')

        StorageFacade.createAsSession()

        expect(createSpy)
          .toHaveBeenCalledWith(expected)

        createSpy.mockRestore()
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
          storage.clear()
          storage.alpha = '100'
          storage.beta = '200'

          const facade = new StorageFacade({
            storage,
          })

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

describe('StorageFacade', () => {
  describe('#set()', () => {
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

        const facade = new StorageFacade({
          storage,
        })

        const cases = [
          {
            params: {
              value: '100',
            },
            expected: '100',
          },
          {
            params: {
              value: '200',
            },
            expected: '200',
          },
        ]

        test.each(cases)('value: $params.value', ({ params, expected }) => {
          const key = 'alpha'

          facade.set(
            key,
            params.value
          )
          const actualValue = storage[key]

          expect(actualValue)
            .toBe(expected)
        })
      })
    })

    describe('to call #storage.setItem()', () => {
      const cases = [
        {
          params: {
            key: 'alpha',
            value: '100',
          },
        },
        {
          params: {
            key: 'beta',
            value: '200',
          },
        },
      ]

      test.each(cases)('key: $params.kay', ({ params }) => {
        const mockStorage = {
          setItem () {},
        }

        const getItemSpy = jest.spyOn(mockStorage, 'setItem')
          .mockReturnValue(null)
        const facade = new StorageFacade({
          storage: mockStorage,
        })

        facade.set(
          params.key,
          params.value
        )

        expect(getItemSpy)
          .toHaveBeenCalledWith(
            params.key,
            params.value
          )

        getItemSpy.mockRestore()
      })
    })

    describe('to return own instance for method chain', () => {
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

        const facade = new StorageFacade({
          storage,
        })

        const cases = [
          {
            params: {
              value: '100',
            },
            expected: '100',
          },
          {
            params: {
              value: '200',
            },
            expected: '200',
          },
        ]

        test.each(cases)('value: $params.value', ({ params, expected }) => {
          const key = 'beta'

          const actual = facade.set(
            key,
            params.value
          )

          expect(actual)
            .toBe(facade) // same reference
        })
      })
    })
  })
})
