import FuroTabContext from '~/app/vue/contexts/FuroTabContext'

describe('FuroTabContext', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#tabKey', () => {
        const cases = [
          {
            params: {
              tabKey: 'alpha',
            },
          },
          {
            params: {
              tabKey: 'beta',
            },
          },
          {
            params: {
              tabKey: 'gamma',
            },
          },
        ]

        test.each(cases)('tabKey: $params.tabKey', ({ params }) => {
          const args = {
            tabKey: params.tabKey,
            label: 'Test Tab',
          }

          const context = new FuroTabContext(args)

          expect(context)
            .toHaveProperty('tabKey', params.tabKey)
        })
      })

      describe('#label', () => {
        const cases = [
          {
            params: {
              label: 'Alpha',
            },
          },
          {
            params: {
              label: 'Beta',
            },
          },
          {
            params: {
              label: 'Gamma',
            },
          },
        ]

        test.each(cases)('label: $params.label', ({ params }) => {
          const args = {
            tabKey: 'test-tab',
            label: params.label,
          }

          const context = new FuroTabContext(args)

          expect(context)
            .toHaveProperty('label', params.label)
        })
      })
    })
  })
})

describe('FuroTabContext', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            tabKey: 'alpha',
            label: 'Alpha',
          },
        },
        {
          params: {
            tabKey: 'beta',
            label: 'Beta',
          },
        },
        {
          params: {
            tabKey: 'gamma',
            label: 'Gamma',
          },
        },
      ]

      test.each(cases)('tabKey: $params.tabKey', ({ params }) => {
        const actual = FuroTabContext.create(params)

        expect(actual)
          .toBeInstanceOf(FuroTabContext)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            tabKey: 'alpha',
            label: 'Alpha',
          },
          expected: {
            tabKey: 'alpha',
            label: 'Alpha',
          },
        },
        {
          params: {
            tabKey: 'beta',
            label: 'Beta',
          },
          expected: {
            tabKey: 'beta',
            label: 'Beta',
          },
        },
        {
          params: {
            tabKey: 'gamma',
            label: 'Gamma',
          },
          expected: {
            tabKey: 'gamma',
            label: 'Gamma',
          },
        },
      ]

      test.each(cases)('tabKey: $params.tabKey', ({ params, expected }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(FuroTabContext)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('FuroTabContext', () => {
  describe('#isTargetTab()', () => {
    const cases = [
      {
        params: {
          context: {
            tabKey: 'alpha',
            label: 'Alpha',
          },
        },
        truthyCases: [
          { tabKey: 'alpha' },
        ],
        falsyCases: [
          { tabKey: 'beta' },
          { tabKey: 'gamma' },
        ],
      },
      {
        params: {
          context: {
            tabKey: 'beta',
            label: 'Beta',
          },
        },
        truthyCases: [
          { tabKey: 'beta' },
        ],
        falsyCases: [
          { tabKey: 'alpha' },
          { tabKey: 'gamma' },
        ],
      },
      {
        params: {
          context: {
            tabKey: 'gamma',
            label: 'Gamma',
          },
        },
        truthyCases: [
          { tabKey: 'gamma' },
        ],
        falsyCases: [
          { tabKey: 'alpha' },
          { tabKey: 'beta' },
        ],
      },
    ]

    describe.each(cases)('tabKey: $params.context.tabKey', ({ params, truthyCases, falsyCases }) => {
      const context = FuroTabContext.create(params.context)

      describe('to be truthy', () => {
        test.each(truthyCases)('tabKey: $tabKey', ({ tabKey }) => {
          const actual = context.isTargetTab({
            tabKey,
          })

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        test.each(falsyCases)('tabKey: $tabKey', ({ tabKey }) => {
          const actual = context.isTargetTab({
            tabKey,
          })

          expect(actual)
            .toBeFalsy()
        })
      })
    })
  })
})
