import {
  ref,
} from 'vue'

import FuroTabLayoutContext from '~/app/vue/contexts/FuroTabLayoutContext.js'

import BaseFuroContext from '~/app/vue/contexts/BaseFuroContext.js'
import FuroTabContext from '~/app/vue/contexts/FuroTabContext.js'

describe('FuroTabLayoutContext', () => {
  describe('super class', () => {
    test('to be instance of BaseFuroContext', () => {
      const actual = FuroTabLayoutContext.prototype

      expect(actual)
        .toBeInstanceOf(BaseFuroContext)
    })
  })
})

describe('FuroTabLayoutContext', () => {
  describe('constructor', () => {
    const propsMock = {
      tabs: [
        { tabKey: 'alpha', label: 'Alpha' },
        { tabKey: 'beta', label: 'Beta' },
        { tabKey: 'gamma', label: 'Gamma' },
      ],
      activeTabKey: 'alpha',
    }
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    describe('to keep properties', () => {
      describe('#tabElementsRef', () => {
        const alphaTabElement = document.createElement('div')
        const betaTabElement = document.createElement('div')
        const gammaTabElement = document.createElement('div')

        const cases = [
          {
            params: {
              tabElementsRef: ref([
                alphaTabElement,
                betaTabElement,
                gammaTabElement,
              ]),
            },
          },
          {
            params: {
              tabElementsRef: ref([
                betaTabElement,
                gammaTabElement,
              ]),
            },
          },
          {
            params: {
              tabElementsRef: ref([
                gammaTabElement,
              ]),
            },
          },
          {
            params: {
              tabElementsRef: ref([]),
            },
          },
        ]

        test.each(cases)('tabElementsRef: $params.tabElementsRef', ({ params }) => {
          const args = {
            props: propsMock,
            componentContext: componentContextMock,
            tabElementsRef: params.tabElementsRef,
            tabContexts: [],
            activeTabKey: null,
          }

          const context = new FuroTabLayoutContext(args)

          expect(context)
            .toHaveProperty('tabElementsRef', params.tabElementsRef)
        })
      })
    })

    describe('to keep properties', () => {
      describe('#tabContexts', () => {
        const cases = [
          {
            params: {
              tabContexts: [
                FuroTabContext.create({ tabKey: 'alpha', label: 'Alpha' }),
                FuroTabContext.create({ tabKey: 'beta', label: 'Beta' }),
                FuroTabContext.create({ tabKey: 'gamma', label: 'Gamma' }),
              ],
            },
          },
          {
            params: {
              tabContexts: [
                FuroTabContext.create({ tabKey: 'alpha', label: 'Alpha' }),
                FuroTabContext.create({ tabKey: 'beta', label: 'Beta' }),
              ],
            },
          },
          {
            params: {
              tabContexts: [
                FuroTabContext.create({ tabKey: 'alpha', label: 'Alpha' }),
              ],
            },
          },
          {
            params: {
              tabContexts: [],
            },
          },
        ]

        test.each(cases)('tabContexts: $params.tabContexts', ({ params }) => {
          const args = {
            props: propsMock,
            componentContext: componentContextMock,
            tabElementsRef: ref([]),
            tabContexts: params.tabContexts,
            activeTabKey: null,
          }

          const context = new FuroTabLayoutContext(args)

          expect(context)
            .toHaveProperty('tabContexts', params.tabContexts)
        })
      })
    })

    describe('#activeTabKey', () => {
      const cases = [
        {
          params: {
            activeTabKey: 'alpha',
          },
        },
        {
          params: {
            activeTabKey: 'beta',
          },
        },
        {
          params: {
            activeTabKey: 'gamma',
          },
        },
        {
          params: {
            activeTabKey: null,
          },
        },
      ]

      test.each(cases)('activeTabKey: $params.activeTabKey', ({ params }) => {
        const args = {
          props: propsMock,
          componentContext: componentContextMock,
          tabElementsRef: ref([]),
          tabContexts: [],
          activeTabKey: params.activeTabKey,
        }

        const context = new FuroTabLayoutContext(args)

        expect(context)
          .toHaveProperty('activeTabKey', params.activeTabKey)
      })
    })
  })
})

describe('FuroTabLayoutContext', () => {
  describe('.create()', () => {
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            props: {
              tabs: [
                { tabKey: 'gamma', label: 'Gamma' },
                { tabKey: 'alpha', label: 'Alpha' },
                { tabKey: 'beta', label: 'Beta' },
              ],
            },
          },
        },
        {
          params: {
            props: {
              tabs: [
                { tabKey: 'alpha', label: 'Alpha' },
                { tabKey: 'beta', label: 'Beta' },
              ],
            },
          },
        },
        {
          params: {
            props: {
              tabs: [
                { tabKey: 'alpha', label: 'Alpha' },
              ],
            },
          },
        },
      ]

      test.each(cases)('tabs length: $params.props.tabs.length', ({ params }) => {
        const args = {
          props: params.props,
          componentContext: componentContextMock,
          tabElementsRef: ref([]),
        }
        const actual = FuroTabLayoutContext.create(args)

        expect(actual)
          .toBeInstanceOf(FuroTabLayoutContext)
      })
    })

    describe('to call constructor', () => {
      const alphaTabElement = document.createElement('div')
      const betaTabElement = document.createElement('div')
      const gammaTabElement = document.createElement('div')

      const cases = [
        {
          params: {
            props: {
              tabs: [
                { tabKey: 'gamma', label: 'Gamma' },
                { tabKey: 'alpha', label: 'Alpha' },
                { tabKey: 'beta', label: 'Beta' },
              ],
              activeTabKey: 'alpha',
            },
            componentContext: componentContextMock,
            tabElementsRef: ref([
              alphaTabElement,
              betaTabElement,
              gammaTabElement,
            ]),
          },
          expected: {
            props: {
              tabs: [
                { tabKey: 'gamma', label: 'Gamma' },
                { tabKey: 'alpha', label: 'Alpha' },
                { tabKey: 'beta', label: 'Beta' },
              ],
              activeTabKey: 'alpha',
            },
            componentContext: componentContextMock,
            tabElementsRef: ref([
              alphaTabElement,
              betaTabElement,
              gammaTabElement,
            ]),
            tabContexts: [
              FuroTabContext.create({ tabKey: 'gamma', label: 'Gamma' }),
              FuroTabContext.create({ tabKey: 'alpha', label: 'Alpha' }),
              FuroTabContext.create({ tabKey: 'beta', label: 'Beta' }),
            ],
            activeTabKey: 'alpha',
          },
        },
        {
          params: {
            props: {
              tabs: [
                { tabKey: 'alpha', label: 'Alpha' },
                { tabKey: 'beta', label: 'Beta' },
              ],
              activeTabKey: 'beta',
            },
            componentContext: componentContextMock,
            tabElementsRef: ref([
              betaTabElement,
              gammaTabElement,
            ]),
          },
          expected: {
            props: {
              tabs: [
                { tabKey: 'alpha', label: 'Alpha' },
                { tabKey: 'beta', label: 'Beta' },
              ],
              activeTabKey: 'beta',
            },
            componentContext: componentContextMock,
            tabElementsRef: ref([
              betaTabElement,
              gammaTabElement,
            ]),
            tabContexts: [
              FuroTabContext.create({ tabKey: 'alpha', label: 'Alpha' }),
              FuroTabContext.create({ tabKey: 'beta', label: 'Beta' }),
            ],
            activeTabKey: 'beta',
          },
        },
        {
          params: {
            props: {
              tabs: [
                { tabKey: 'alpha', label: 'Alpha' },
              ],
              // activeTabKey: 'alpha,
            },
            componentContext: componentContextMock,
            tabElementsRef: ref([
              gammaTabElement,
            ]),
          },
          expected: {
            props: {
              tabs: [
                { tabKey: 'alpha', label: 'Alpha' },
              ],
              // activeTabKey: 'alpha,
            },
            componentContext: componentContextMock,
            tabElementsRef: ref([
              gammaTabElement,
            ]),
            tabContexts: [
              FuroTabContext.create({ tabKey: 'alpha', label: 'Alpha' }),
            ],
            activeTabKey: null,
          },
        },
      ]

      test.each(cases)('tabs length: $params.props.tabs.length', ({ params, expected }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(FuroTabLayoutContext)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('FuroTabLayoutContext', () => {
  describe('.createTabContexts()', () => {
    const cases = [
      {
        params: {
          tab: {
            tabKey: 'alpha',
            label: 'Alpha',
          },
        },
        expected: FuroTabContext.create({
          tabKey: 'alpha',
          label: 'Alpha',
        }),
      },
      {
        params: {
          tab: {
            tabKey: 'beta',
            label: 'Beta',
          },
        },
        expected: FuroTabContext.create({
          tabKey: 'beta',
          label: 'Beta',
        }),
      },
    ]

    test.each(cases)('tab: $params.tab', ({ params, expected }) => {
      const actual = FuroTabLayoutContext.createTabContexts(params)

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('FuroTabLayoutContext', () => {
  describe('#get:tabElements', () => {
    const propsMock = {
      tabs: [
        { tabKey: 'alpha', label: 'Alpha' },
        { tabKey: 'beta', label: 'Beta' },
        { tabKey: 'gamma', label: 'Gamma' },
      ],
      activeTabKey: 'alpha',
    }
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    const alphaTabElement = document.createElement('div')
    const betaTabElement = document.createElement('div')
    const gammaTabElement = document.createElement('div')

    const cases = [
      {
        params: {
          tabElementsRef: ref([
            alphaTabElement,
            betaTabElement,
            gammaTabElement,
          ]),
        },
        expected: [
          alphaTabElement,
          betaTabElement,
          gammaTabElement,
        ],
      },
      {
        params: {
          tabElementsRef: ref([
            betaTabElement,
            gammaTabElement,
          ]),
        },
        expected: [
          betaTabElement,
          gammaTabElement,
        ],
      },
      {
        params: {
          tabElementsRef: ref([
            gammaTabElement,
          ]),
        },
        expected: [
          gammaTabElement,
        ],
      },
      {
        params: {
          tabElementsRef: ref([]),
        },
        expected: [],
      },
    ]

    test.each(cases)('tabElementsRef: $params.tabElementsRef', ({ params, expected }) => {
      const args = {
        props: propsMock,
        componentContext: componentContextMock,
        tabElementsRef: params.tabElementsRef,
        tabContexts: [],
        activeTabKey: null,
      }

      const context = new FuroTabLayoutContext(args)

      const actual = context.tabElements

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('FuroTabLayoutContext', () => {
  describe('#isActiveTab()', () => {
    const propsMock = {
      tabs: [
        { tabKey: 'alpha', label: 'Alpha' },
        { tabKey: 'beta', label: 'Beta' },
        { tabKey: 'gamma', label: 'Gamma' },
      ],
      activeTabKey: 'alpha',
    }
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    const cases = [
      {
        params: {
          activeTabKey: 'alpha',
        },
        truthyCases: [
          { tabKey: 'alpha' },
        ],
        falsyCases: [
          { tabKey: 'beta' },
          { tabKey: 'gamma' },
        ],
      },
    ]

    describe.each(cases)('activeTabKey: $params.activeTabKey', ({ params, truthyCases, falsyCases }) => {
      const args = {
        props: propsMock,
        componentContext: componentContextMock,
        tabElementsRef: ref([]),
        tabContexts: [],
        activeTabKey: params.activeTabKey,
      }

      const context = new FuroTabLayoutContext(args)

      describe('to be truthy', () => {
        test.each(truthyCases)('tabKey: $tabKey', ({ tabKey }) => {
          const actual = context.isActiveTab({
            tabKey,
          })

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        test.each(falsyCases)('tabKey: $tabKey', ({ tabKey }) => {
          const actual = context.isActiveTab({
            tabKey,
          })

          expect(actual)
            .toBeFalsy()
        })
      })
    })
  })
})

describe('FuroTabLayoutContext', () => {
  describe('#onClickTab()', () => {
    const alphaElement = document.createElement('div')
    const betaElement = document.createElement('div')
    const gammaElement = document.createElement('div')

    const tabElements = [
      alphaElement,
      betaElement,
      gammaElement,
    ]

    const propsMock = {
      tabs: [
        { tabKey: 'alpha', label: 'Alpha' },
        { tabKey: 'beta', label: 'Beta' },
        { tabKey: 'gamma', label: 'Gamma' },
      ],
      activeTabKey: 'alpha',
    }
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    const context = new FuroTabLayoutContext({
      props: propsMock,
      componentContext: componentContextMock,
      tabElementsRef: ref(tabElements),
      tabContexts: [],
      activeTabKey: null,
    })

    describe('on click alpha tab', () => {
      const expected = 'active'

      const args = {
        event: {
          target: alphaElement,
        },
      }

      test('to call #remove()', () => {
        const alphaRemoveSpy = jest.spyOn(alphaElement['classList'], 'remove')
        const betaRemoveSpy = jest.spyOn(betaElement['classList'], 'remove')
        const gammaRemoveSpy = jest.spyOn(gammaElement['classList'], 'remove')

        context.onClickTab(args)

        expect(alphaRemoveSpy)
          .toHaveBeenCalledWith(expected)
        expect(betaRemoveSpy)
          .toHaveBeenCalledWith(expected)
        expect(gammaRemoveSpy)
          .toHaveBeenCalledWith(expected)
      })

      test('to call #add()', () => {
        const alphaAddSpy = jest.spyOn(alphaElement['classList'], 'add')
        const betaAddSpy = jest.spyOn(betaElement['classList'], 'add')
        const gammaAddSpy = jest.spyOn(gammaElement['classList'], 'add')

        context.onClickTab(args)

        expect(alphaAddSpy)
          .toHaveBeenCalledWith(expected)
        expect(betaAddSpy)
          .not
          .toHaveBeenCalledWith(expected)
        expect(gammaAddSpy)
          .not
          .toHaveBeenCalledWith(expected)
      })
    })

    describe('on click beta tab', () => {
      const expected = 'active'

      const args = {
        event: {
          target: betaElement,
        },
      }

      test('to call #remove()', () => {
        const alphaRemoveSpy = jest.spyOn(alphaElement['classList'], 'remove')
        const betaRemoveSpy = jest.spyOn(betaElement['classList'], 'remove')
        const gammaRemoveSpy = jest.spyOn(gammaElement['classList'], 'remove')

        context.onClickTab(args)

        expect(alphaRemoveSpy)
          .toHaveBeenCalledWith(expected)
        expect(betaRemoveSpy)
          .toHaveBeenCalledWith(expected)
        expect(gammaRemoveSpy)
          .toHaveBeenCalledWith(expected)
      })

      test('to call #add()', () => {
        const alphaAddSpy = jest.spyOn(alphaElement['classList'], 'add')
        const betaAddSpy = jest.spyOn(betaElement['classList'], 'add')
        const gammaAddSpy = jest.spyOn(gammaElement['classList'], 'add')

        context.onClickTab(args)

        expect(alphaAddSpy)
          .not
          .toHaveBeenCalledWith(expected)
        expect(betaAddSpy)
          .toHaveBeenCalledWith(expected)
        expect(gammaAddSpy)
          .not
          .toHaveBeenCalledWith(expected)
      })
    })

    describe('on click gamma tab', () => {
      const expected = 'active'

      const args = {
        event: {
          target: gammaElement,
        },
      }

      test('to call #remove()', () => {
        const alphaRemoveSpy = jest.spyOn(alphaElement['classList'], 'remove')
        const betaRemoveSpy = jest.spyOn(betaElement['classList'], 'remove')
        const gammaRemoveSpy = jest.spyOn(gammaElement['classList'], 'remove')

        context.onClickTab(args)

        expect(alphaRemoveSpy)
          .toHaveBeenCalledWith(expected)
        expect(betaRemoveSpy)
          .toHaveBeenCalledWith(expected)
        expect(gammaRemoveSpy)
          .toHaveBeenCalledWith(expected)
      })

      test('to call #add()', () => {
        const alphaAddSpy = jest.spyOn(alphaElement['classList'], 'add')
        const betaAddSpy = jest.spyOn(betaElement['classList'], 'add')
        const gammaAddSpy = jest.spyOn(gammaElement['classList'], 'add')

        context.onClickTab(args)

        expect(alphaAddSpy)
          .not
          .toHaveBeenCalledWith(expected)
        expect(betaAddSpy)
          .not
          .toHaveBeenCalledWith(expected)
        expect(gammaAddSpy)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})
