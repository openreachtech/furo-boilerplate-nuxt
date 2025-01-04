import FuroPaginationContext from '~/app/vue/contexts/FuroPaginationContext.js'

import BaseFuroContext from '~/app/vue/contexts/BaseFuroContext.js'
import FuroPageContext from '~/app/vue/contexts/FuroPageContext.js'

describe('FuroPaginationContext', () => {
  describe('super class', () => {
    test('to be BaseFuroContext', () => {
      const actual = FuroPaginationContext.prototype

      expect(actual)
        .toBeInstanceOf(BaseFuroContext)
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      const propsMock = {}
      const componentContextMock = {
        attrs: {},
        emit: () => {},
        expose: () => {},
        slots: {},
      }

      describe('#searchParams', () => {
        const cases = [
          {
            params: {
              searchParams: new URLSearchParams(),
            },
          },
          {
            params: {
              searchParams: new URLSearchParams({
                alpha: '1',
                beta: '2',
              }),
            },
          },
          {
            params: {
              searchParams: new URLSearchParams({
                gamma: '3',
                delta: '4',
              }),
            },
          },
        ]

        test.each(cases)('searchParams: $params.searchParams', ({ params }) => {
          const args = {
            props: propsMock,
            componentContext: componentContextMock,
            searchParams: params.searchParams,
            pageKey: 'page',
            currentPage: 1,
            maxPageRange: 5,
            lastPage: 10,
          }

          const context = new FuroPaginationContext(args)

          expect(context)
            .toHaveProperty('searchParams', params.searchParams)
        })
      })

      describe('#pageKey', () => {
        const cases = [
          {
            params: {
              pageKey: 'page',
            },
          },
          {
            params: {
              pageKey: 'pg',
            },
          },
          {
            params: {
              pageKey: 'p',
            },
          },
        ]

        test.each(cases)('pageKey: $params.pageKey', ({ params }) => {
          const args = {
            props: propsMock,
            componentContext: componentContextMock,
            searchParams: new URLSearchParams(),
            currentPage: 7,
            maxPageRange: 5,
            lastPage: 10,
            pageKey: params.pageKey,
          }

          const context = new FuroPaginationContext(args)

          expect(context)
            .toHaveProperty('pageKey', params.pageKey)
        })
      })

      describe('#currentPage', () => {
        const cases = [
          {
            params: {
              currentPage: 1,
            },
          },
          {
            params: {
              currentPage: 3,
            },
          },
          {
            params: {
              currentPage: 5,
            },
          },
        ]

        test.each(cases)('currentPage: $params.currentPage', ({ params }) => {
          const args = {
            props: propsMock,
            componentContext: componentContextMock,
            searchParams: new URLSearchParams(),
            pageKey: 'page',
            currentPage: params.currentPage,
            maxPageRange: 5,
            lastPage: 10,
          }

          const context = new FuroPaginationContext(args)

          expect(context)
            .toHaveProperty('currentPage', params.currentPage)
        })
      })

      describe('#maxPageRange', () => {
        const cases = [
          {
            params: {
              maxPageRange: 3,
            },
          },
          {
            params: {
              maxPageRange: 5,
            },
          },
          {
            params: {
              maxPageRange: 7,
            },
          },
        ]

        test.each(cases)('maxPageRange: $params.maxPageRange', ({ params }) => {
          const args = {
            props: propsMock,
            componentContext: componentContextMock,
            searchParams: new URLSearchParams(),
            pageKey: 'page',
            currentPage: 1,
            maxPageRange: params.maxPageRange,
            lastPage: 10,
          }

          const context = new FuroPaginationContext(args)

          expect(context)
            .toHaveProperty('maxPageRange', params.maxPageRange)
        })
      })

      describe('#lastPage', () => {
        const cases = [
          {
            params: {
              lastPage: 1,
            },
          },
          {
            params: {
              lastPage: 3,
            },
          },
          {
            params: {
              lastPage: 5,
            },
          },
        ]

        test.each(cases)('lastPage: $params.lastPage', ({ params }) => {
          const args = {
            props: propsMock,
            componentContext: componentContextMock,
            searchParams: new URLSearchParams(),
            pageKey: 'page',
            currentPage: 1,
            maxPageRange: 5,
            lastPage: params.lastPage,
          }

          const context = new FuroPaginationContext(args)

          expect(context)
            .toHaveProperty('lastPage', params.lastPage)
        })
      })
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            props: {
              pagination: {
                limit: 10,
                totalRecords: 50,
              },
              pageKey: 'pg',
            },
            componentContext: {
              attrs: {},
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            searchParams: new URLSearchParams(),
            maxPageRange: 3,
          },
        },
        {
          params: {
            props: {
              pagination: {
                limit: 20,
                totalRecords: 60,
              },
              pageKey: 'p',
            },
            componentContext: {
              attrs: {},
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            searchParams: new URLSearchParams({
              alpha: '1',
              beta: '2',
            }),
            maxPageRange: 5,
          },
        },
        {
          params: {
            props: {
              pagination: {
                limit: 30,
                totalRecords: 70,
              },
              // pageKey: 'page',
            },
            componentContext: {
              attrs: {},
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            searchParams: new URLSearchParams({
              gamma: '3',
              delta: '4',
            }),
            maxPageRange: 7,
          },
        },
      ]

      test.each(cases)('currentPage: $params.currentPage', ({ params }) => {
        const actual = FuroPaginationContext.create(params)

        expect(actual)
          .toBeInstanceOf(FuroPaginationContext)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            props: {
              pagination: {
                limit: 10,
                totalRecords: 100,
              },
              pageKey: 'page',
              maxPageRange: 3,
            },
            componentContext: {
              attrs: {
                alpha: 1,
              },
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            searchParams: new URLSearchParams(),
          },
          expected: {
            props: {
              pagination: {
                limit: 10,
                totalRecords: 100,
              },
              pageKey: 'page',
              maxPageRange: 3,
            },
            componentContext: {
              attrs: {
                alpha: 1,
              },
              emit: expect.any(Function),
              expose: expect.any(Function),
              slots: {},
            },
            searchParams: new URLSearchParams(),
            pageKey: 'page',
            currentPage: 1,
            maxPageRange: 3,
            lastPage: 10,
          },
        },
        {
          params: {
            props: {
              pagination: {
                limit: 20,
                totalRecords: 101,
              },
              pageKey: 'pg',
              // maxPageRange: 5,
            },
            componentContext: {
              attrs: {
                beta: 2,
              },
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            searchParams: new URLSearchParams({
              pg: '2',
              alpha: '1',
              beta: '2',
            }),
          },
          expected: {
            props: {
              pagination: {
                limit: 20,
                totalRecords: 101,
              },
              pageKey: 'pg',
              // maxPageRange: 5,
            },
            componentContext: {
              attrs: {
                beta: 2,
              },
              emit: expect.any(Function),
              expose: expect.any(Function),
              slots: {},
            },
            searchParams: new URLSearchParams({
              pg: '2',
              alpha: '1',
              beta: '2',
            }),
            pageKey: 'pg',
            currentPage: 2,
            maxPageRange: 5, // default value
            lastPage: 6,
          },
        },
        {
          params: {
            props: {
              pagination: {
                limit: 30,
                totalRecords: 102,
              },
              pageKey: 'p',
              maxPageRange: 7,
            },
            componentContext: {
              attrs: {
                gamma: 3,
              },
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            searchParams: new URLSearchParams({
              p: '3', // eslint-disable-line id-length
              gamma: '3',
              delta: '4',
            }),
          },
          expected: {
            props: {
              pagination: {
                limit: 30,
                totalRecords: 102,
              },
              pageKey: 'p',
              maxPageRange: 7,
            },
            componentContext: {
              attrs: {
                gamma: 3,
              },
              emit: expect.any(Function),
              expose: expect.any(Function),
              slots: {},
            },
            searchParams: new URLSearchParams({
              p: '3', // eslint-disable-line id-length
              gamma: '3',
              delta: '4',
            }),
            pageKey: 'p',
            currentPage: 3,
            maxPageRange: 7,
            lastPage: 4,
          },
        },
        {
          params: {
            props: {
              pagination: {
                limit: 40,
                totalRecords: 103,
              },
              maxPageRange: 9,
              // pageKey: undefined,
            },
            componentContext: {
              attrs: {
                delta: 4,
              },
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            searchParams: new URLSearchParams({
              page: '4',
              epsilon: '5',
              zeta: '6',
            }),
          },
          expected: {
            props: {
              pagination: {
                limit: 40,
                totalRecords: 103,
              },
              maxPageRange: 9,
              // pageKey: undefined,
            },
            componentContext: {
              attrs: {
                delta: 4,
              },
              emit: expect.any(Function),
              expose: expect.any(Function),
              slots: {},
            },
            searchParams: new URLSearchParams({
              page: '4',
              epsilon: '5',
              zeta: '6',
            }),
            pageKey: 'page', // default value
            currentPage: 4,
            maxPageRange: 9,
            lastPage: 3,
          },
        },
      ]

      test.each(cases)('currentPage: $params.currentPage', ({ params, expected }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(FuroPaginationContext)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('.extractCurrentPage()', () => {
    const cases = [
      {
        params: {
          pageKey: 'page',
        },
        searchParamsCases: [
          {
            searchParams: new URLSearchParams(),
            expected: 1,
          },
          {
            searchParams: new URLSearchParams({
              page: '1',
            }),
            expected: 1,
          },
          {
            searchParams: new URLSearchParams({
              page: '3',
            }),
            expected: 3,
          },
          {
            searchParams: new URLSearchParams({
              page: 'string',
            }),
            expected: 1,
          },
          {
            searchParams: new URLSearchParams({
              pg: '10',
            }),
            expected: 1,
          },
        ],
      },
      {
        params: {
          pageKey: 'pg',
        },
        searchParamsCases: [
          {
            searchParams: new URLSearchParams(),
            expected: 1,
          },
          {
            searchParams: new URLSearchParams({
              pg: '1',
            }),
            expected: 1,
          },
          {
            searchParams: new URLSearchParams({
              pg: '3',
            }),
            expected: 3,
          },
          {
            searchParams: new URLSearchParams({
              pg: '5',
            }),
            expected: 5,
          },
          {
            searchParams: new URLSearchParams({
              pg: 'string',
            }),
            expected: 1,
          },
          {
            searchParams: new URLSearchParams({
              page: '10',
            }),
            expected: 1,
          },
        ],
      },
    ]

    describe.each(cases)('pageKey: $params.pageKey', ({ params, searchParamsCases }) => {
      test.each(searchParamsCases)('searchParams: $searchParams', ({ searchParams, expected }) => {
        const args = {
          searchParams,
          pageKey: params.pageKey,
        }

        const actual = FuroPaginationContext.extractCurrentPage(args)

        expect(actual)
          .toBe(expected)
      })
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('.calculateLastPage()', () => {
    const cases = [
      {
        params: {
          limit: 5,
        },
        totalRecordsCases: [
          { totalRecords: 1, expected: 1 },
          { totalRecords: 3, expected: 1 },
          { totalRecords: 5, expected: 1 },
          { totalRecords: 6, expected: 2 },
          { totalRecords: 10, expected: 2 },
          { totalRecords: 11, expected: 3 },
          { totalRecords: 15, expected: 3 },
          { totalRecords: 50, expected: 10 },
          { totalRecords: 100, expected: 20 },
          { totalRecords: 150, expected: 30 },
        ],
      },
      {
        params: {
          limit: 10,
        },
        totalRecordsCases: [
          { totalRecords: 1, expected: 1 },
          { totalRecords: 5, expected: 1 },
          { totalRecords: 10, expected: 1 },
          { totalRecords: 11, expected: 2 },
          { totalRecords: 20, expected: 2 },
          { totalRecords: 21, expected: 3 },
          { totalRecords: 30, expected: 3 },
          { totalRecords: 50, expected: 5 },
          { totalRecords: 100, expected: 10 },
          { totalRecords: 150, expected: 15 },
        ],
      },
    ]

    describe.each(cases)('limit: $params.limit', ({ params, totalRecordsCases }) => {
      test.each(totalRecordsCases)('totalRecords: $totalRecords', ({ totalRecords, expected }) => {
        const args = {
          limit: params.limit,
          totalRecords,
        }

        const actual = FuroPaginationContext.calculateLastPage(args)

        expect(actual)
          .toBe(expected)
      })
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#calculateRangeStartedPage()', () => {
    const propsMock = {}
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    describe('with (lastPage > maxPageRange)', () => {
      const cases = [
        {
          params: {
            maxPageRange: 5,
          },
          lastPageCases: [
            {
              lastPage: 6, // max starting page: 2
              currentPageCases: [
                { currentPage: 1, expected: 1 },
                { currentPage: 2, expected: 1 },
                { currentPage: 3, expected: 1 },
                { currentPage: 4, expected: 2 },
                { currentPage: 5, expected: 2 },
                { currentPage: 6, expected: 2 },
              ],
            },
            {
              lastPage: 7, // max starting page: 3
              currentPageCases: [
                { currentPage: 1, expected: 1 },
                { currentPage: 2, expected: 1 },
                { currentPage: 3, expected: 1 },
                { currentPage: 4, expected: 2 },
                { currentPage: 5, expected: 3 },
                { currentPage: 6, expected: 3 },
                { currentPage: 7, expected: 3 },
              ],
            },
            {
              lastPage: 8, // max starting page: 4
              currentPageCases: [
                { currentPage: 1, expected: 1 },
                { currentPage: 2, expected: 1 },
                { currentPage: 3, expected: 1 },
                { currentPage: 4, expected: 2 },
                { currentPage: 5, expected: 3 },
                { currentPage: 6, expected: 4 },
                { currentPage: 7, expected: 4 },
                { currentPage: 8, expected: 4 },
              ],
            },
            {
              lastPage: 9, // max starting page: 5
              currentPageCases: [
                { currentPage: 1, expected: 1 },
                { currentPage: 2, expected: 1 },
                { currentPage: 3, expected: 1 },
                { currentPage: 4, expected: 2 },
                { currentPage: 5, expected: 3 },
                { currentPage: 6, expected: 4 },
                { currentPage: 7, expected: 5 },
                { currentPage: 8, expected: 5 },
                { currentPage: 9, expected: 5 },
              ],
            },
            {
              lastPage: 10, // max starting page: 6
              currentPageCases: [
                { currentPage: 1, expected: 1 },
                { currentPage: 2, expected: 1 },
                { currentPage: 3, expected: 1 },
                { currentPage: 4, expected: 2 },
                { currentPage: 5, expected: 3 },
                { currentPage: 6, expected: 4 },
                { currentPage: 7, expected: 5 },
                { currentPage: 8, expected: 6 },
                { currentPage: 9, expected: 6 },
                { currentPage: 10, expected: 6 },
              ],
            },
            {
              lastPage: 11, // max starting page: 7
              currentPageCases: [
                { currentPage: 1, expected: 1 },
                { currentPage: 2, expected: 1 },
                { currentPage: 3, expected: 1 },
                { currentPage: 4, expected: 2 },
                { currentPage: 5, expected: 3 },
                { currentPage: 6, expected: 4 },
                { currentPage: 7, expected: 5 },
                { currentPage: 8, expected: 6 },
                { currentPage: 9, expected: 7 },
                { currentPage: 10, expected: 7 },
                { currentPage: 11, expected: 7 },
              ],
            },
          ],
        },
        {
          params: {
            maxPageRange: 3,
          },
          lastPageCases: [
            {
              lastPage: 4, // max starting page: 2
              currentPageCases: [
                { currentPage: 1, expected: 1 },
                { currentPage: 2, expected: 1 },
                { currentPage: 3, expected: 2 },
                { currentPage: 4, expected: 2 },
              ],
            },
            {
              lastPage: 5, // max starting page: 3
              currentPageCases: [
                { currentPage: 1, expected: 1 },
                { currentPage: 2, expected: 1 },
                { currentPage: 3, expected: 2 },
                { currentPage: 4, expected: 3 },
                { currentPage: 5, expected: 3 },
              ],
            },
            {
              lastPage: 6, // max starting page: 4
              currentPageCases: [
                { currentPage: 1, expected: 1 },
                { currentPage: 2, expected: 1 },
                { currentPage: 3, expected: 2 },
                { currentPage: 4, expected: 3 },
                { currentPage: 5, expected: 4 },
                { currentPage: 6, expected: 4 },
              ],
            },
            {
              lastPage: 7, // max starting page: 5
              currentPageCases: [
                { currentPage: 1, expected: 1 },
                { currentPage: 2, expected: 1 },
                { currentPage: 3, expected: 2 },
                { currentPage: 4, expected: 3 },
                { currentPage: 5, expected: 4 },
                { currentPage: 6, expected: 5 },
                { currentPage: 7, expected: 5 },
              ],
            },
          ],
        },
      ]

      describe.each(cases)('maxPageRange: $params.maxPageRange', ({ params, lastPageCases }) => {
        describe.each(lastPageCases)('lastPage: $lastPage', ({ lastPage, currentPageCases }) => {
          test.each(currentPageCases)('currentPage: $currentPage', ({ currentPage, expected }) => {
            const args = {
              props: propsMock,
              componentContext: componentContextMock,
              searchParams: new URLSearchParams(),
              pageKey: 'pg',
              maxPageRange: params.maxPageRange,
              currentPage,
              lastPage,
            }

            const context = new FuroPaginationContext(args)

            const actual = context.calculateRangeStartedPage()

            expect(actual)
              .toBe(expected)
          })
        })
      })
    })

    describe('with (lastPage <= maxPageRange)', () => {
      const cases = [
        {
          params: {
            maxPageRange: 5,
          },
          lastPageCases: [
            {
              lastPage: 5,
              currentPageCases: [
                { currentPage: 1 },
                { currentPage: 2 },
                { currentPage: 3 },
                { currentPage: 4 },
                { currentPage: 5 },
              ],
            },
            {
              lastPage: 4,
              currentPageCases: [
                { currentPage: 1 },
                { currentPage: 2 },
                { currentPage: 3 },
                { currentPage: 4 },
              ],
            },
            {
              lastPage: 3,
              currentPageCases: [
                { currentPage: 1 },
                { currentPage: 2 },
                { currentPage: 3 },
              ],
            },
            {
              lastPage: 2,
              currentPageCases: [
                { currentPage: 1 },
                { currentPage: 2 },
              ],
            },
            {
              lastPage: 1,
              currentPageCases: [
                { currentPage: 1 },
              ],
            },
          ],
        },
        {
          params: {
            maxPageRange: 3,
          },
          lastPageCases: [
            {
              lastPage: 3,
              currentPageCases: [
                { currentPage: 1 },
                { currentPage: 2 },
                { currentPage: 3 },
              ],
            },
            {
              lastPage: 2,
              currentPageCases: [
                { currentPage: 1 },
                { currentPage: 2 },
              ],
            },
            {
              lastPage: 1,
              currentPageCases: [
                { currentPage: 1 },
              ],
            },
          ],
        },
      ]

      describe.each(cases)('maxPageRange: $params.maxPageRange', ({ params, lastPageCases }) => {
        describe.each(lastPageCases)('lastPage: $lastPage', ({ lastPage, currentPageCases }) => {
          test.each(currentPageCases)('currentPage: $currentPage', ({ currentPage }) => {
            const expected = 1

            const args = {
              props: propsMock,
              componentContext: componentContextMock,
              searchParams: new URLSearchParams(),
              pageKey: 'pg',
              maxPageRange: params.maxPageRange,
              currentPage,
              lastPage,
            }

            const context = new FuroPaginationContext(args)

            const actual = context.calculateRangeStartedPage()

            expect(actual)
              .toBe(expected)
          })
        })
      })
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#generateRangePages()', () => {
    const propsMock = {}
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    describe('with (lastPage > maxPageRange)', () => {
      const cases = [
        {
          params: {
            maxPageRange: 5,
          },
          lastPageCases: [
            {
              lastPage: 6, // max starting page: 2
              currentPageCases: [
                { currentPage: 1, expected: [1, 2, 3, 4, 5] },
                { currentPage: 2, expected: [1, 2, 3, 4, 5] },
                { currentPage: 3, expected: [1, 2, 3, 4, 5] },
                { currentPage: 4, expected: [2, 3, 4, 5, 6] },
                { currentPage: 5, expected: [2, 3, 4, 5, 6] },
                { currentPage: 6, expected: [2, 3, 4, 5, 6] },
              ],
            },
            {
              lastPage: 7, // max starting page: 3
              currentPageCases: [
                { currentPage: 1, expected: [1, 2, 3, 4, 5] },
                { currentPage: 2, expected: [1, 2, 3, 4, 5] },
                { currentPage: 3, expected: [1, 2, 3, 4, 5] },
                { currentPage: 4, expected: [2, 3, 4, 5, 6] },
                { currentPage: 5, expected: [3, 4, 5, 6, 7] },
                { currentPage: 6, expected: [3, 4, 5, 6, 7] },
                { currentPage: 7, expected: [3, 4, 5, 6, 7] },
              ],
            },
            {
              lastPage: 8, // max starting page: 4
              currentPageCases: [
                { currentPage: 1, expected: [1, 2, 3, 4, 5] },
                { currentPage: 2, expected: [1, 2, 3, 4, 5] },
                { currentPage: 3, expected: [1, 2, 3, 4, 5] },
                { currentPage: 4, expected: [2, 3, 4, 5, 6] },
                { currentPage: 5, expected: [3, 4, 5, 6, 7] },
                { currentPage: 6, expected: [4, 5, 6, 7, 8] },
                { currentPage: 7, expected: [4, 5, 6, 7, 8] },
                { currentPage: 8, expected: [4, 5, 6, 7, 8] },
              ],
            },
            {
              lastPage: 9, // max starting page: 5
              currentPageCases: [
                { currentPage: 1, expected: [1, 2, 3, 4, 5] },
                { currentPage: 2, expected: [1, 2, 3, 4, 5] },
                { currentPage: 3, expected: [1, 2, 3, 4, 5] },
                { currentPage: 4, expected: [2, 3, 4, 5, 6] },
                { currentPage: 5, expected: [3, 4, 5, 6, 7] },
                { currentPage: 6, expected: [4, 5, 6, 7, 8] },
                { currentPage: 7, expected: [5, 6, 7, 8, 9] },
                { currentPage: 8, expected: [5, 6, 7, 8, 9] },
                { currentPage: 9, expected: [5, 6, 7, 8, 9] },
              ],
            },
            {
              lastPage: 10, // max starting page: 6
              currentPageCases: [
                { currentPage: 1, expected: [1, 2, 3, 4, 5] },
                { currentPage: 2, expected: [1, 2, 3, 4, 5] },
                { currentPage: 3, expected: [1, 2, 3, 4, 5] },
                { currentPage: 4, expected: [2, 3, 4, 5, 6] },
                { currentPage: 5, expected: [3, 4, 5, 6, 7] },
                { currentPage: 6, expected: [4, 5, 6, 7, 8] },
                { currentPage: 7, expected: [5, 6, 7, 8, 9] },
                { currentPage: 8, expected: [6, 7, 8, 9, 10] },
                { currentPage: 9, expected: [6, 7, 8, 9, 10] },
                { currentPage: 10, expected: [6, 7, 8, 9, 10] },
              ],
            },
            {
              lastPage: 11, // max starting page: 7
              currentPageCases: [
                { currentPage: 1, expected: [1, 2, 3, 4, 5] },
                { currentPage: 2, expected: [1, 2, 3, 4, 5] },
                { currentPage: 3, expected: [1, 2, 3, 4, 5] },
                { currentPage: 4, expected: [2, 3, 4, 5, 6] },
                { currentPage: 5, expected: [3, 4, 5, 6, 7] },
                { currentPage: 6, expected: [4, 5, 6, 7, 8] },
                { currentPage: 7, expected: [5, 6, 7, 8, 9] },
                { currentPage: 8, expected: [6, 7, 8, 9, 10] },
                { currentPage: 9, expected: [7, 8, 9, 10, 11] },
                { currentPage: 10, expected: [7, 8, 9, 10, 11] },
                { currentPage: 11, expected: [7, 8, 9, 10, 11] },
              ],
            },
          ],
        },
        {
          params: {
            maxPageRange: 3,
          },
          lastPageCases: [
            {
              lastPage: 4, // max starting page: 2
              currentPageCases: [
                { currentPage: 1, expected: [1, 2, 3] },
                { currentPage: 2, expected: [1, 2, 3] },
                { currentPage: 3, expected: [2, 3, 4] },
                { currentPage: 4, expected: [2, 3, 4] },
              ],
            },
            {
              lastPage: 5, // max starting page: 3
              currentPageCases: [
                { currentPage: 1, expected: [1, 2, 3] },
                { currentPage: 2, expected: [1, 2, 3] },
                { currentPage: 3, expected: [2, 3, 4] },
                { currentPage: 4, expected: [3, 4, 5] },
                { currentPage: 5, expected: [3, 4, 5] },
              ],
            },
            {
              lastPage: 6, // max starting page: 4
              currentPageCases: [
                { currentPage: 1, expected: [1, 2, 3] },
                { currentPage: 2, expected: [1, 2, 3] },
                { currentPage: 3, expected: [2, 3, 4] },
                { currentPage: 4, expected: [3, 4, 5] },
                { currentPage: 5, expected: [4, 5, 6] },
                { currentPage: 6, expected: [4, 5, 6] },
              ],
            },
            {
              lastPage: 7, // max starting page: 5
              currentPageCases: [
                { currentPage: 1, expected: [1, 2, 3] },
                { currentPage: 2, expected: [1, 2, 3] },
                { currentPage: 3, expected: [2, 3, 4] },
                { currentPage: 4, expected: [3, 4, 5] },
                { currentPage: 5, expected: [4, 5, 6] },
                { currentPage: 6, expected: [5, 6, 7] },
                { currentPage: 7, expected: [5, 6, 7] },
              ],
            },
          ],
        },
      ]

      describe.each(cases)('maxPageRange: $params.maxPageRange', ({ params, lastPageCases }) => {
        describe.each(lastPageCases)('lastPage: $lastPage', ({ lastPage, currentPageCases }) => {
          test.each(currentPageCases)('currentPage: $currentPage', ({ currentPage, expected }) => {
            const args = {
              props: propsMock,
              componentContext: componentContextMock,
              searchParams: new URLSearchParams(),
              pageKey: 'pg',
              maxPageRange: params.maxPageRange,
              currentPage,
              lastPage,
            }

            const context = new FuroPaginationContext(args)

            const actual = context.generateRangePages()

            expect(actual)
              .toEqual(expected)
          })
        })
      })
    })

    describe('with (lastPage <= maxPageRange)', () => {
      const cases = [
        {
          params: {
            maxPageRange: 5,
          },
          lastPageCases: [
            {
              lastPage: 5,
              expected: [1, 2, 3, 4, 5],
              currentPageCases: [
                { currentPage: 1 },
                { currentPage: 2 },
                { currentPage: 3 },
                { currentPage: 4 },
                { currentPage: 5 },
              ],
            },
            {
              lastPage: 4,
              expected: [1, 2, 3, 4],
              currentPageCases: [
                { currentPage: 1 },
                { currentPage: 2 },
                { currentPage: 3 },
                { currentPage: 4 },
              ],
            },
            {
              lastPage: 3,
              expected: [1, 2, 3],
              currentPageCases: [
                { currentPage: 1 },
                { currentPage: 2 },
                { currentPage: 3 },
              ],
            },
            {
              lastPage: 2,
              expected: [1, 2],
              currentPageCases: [
                { currentPage: 1 },
                { currentPage: 2 },
              ],
            },
            {
              lastPage: 1,
              expected: [1],
              currentPageCases: [
                { currentPage: 1 },
              ],
            },
          ],
        },
        {
          params: {
            maxPageRange: 3,
          },
          lastPageCases: [
            {
              lastPage: 3,
              expected: [1, 2, 3],
              currentPageCases: [
                { currentPage: 1 },
                { currentPage: 2 },
                { currentPage: 3 },
              ],
            },
            {
              lastPage: 2,
              expected: [1, 2],
              currentPageCases: [
                { currentPage: 1 },
                { currentPage: 2 },
              ],
            },
            {
              lastPage: 1,
              expected: [1],
              currentPageCases: [
                { currentPage: 1 },
              ],
            },
          ],
        },
      ]

      describe.each(cases)('maxPageRange: $params.maxPageRange', ({ params, lastPageCases }) => {
        describe.each(lastPageCases)('lastPage: $lastPage', ({ lastPage, expected, currentPageCases }) => {
          test.each(currentPageCases)('currentPage: $currentPage', ({ currentPage }) => {
            const args = {
              props: propsMock,
              componentContext: componentContextMock,
              searchParams: new URLSearchParams(),
              pageKey: 'pg',
              maxPageRange: params.maxPageRange,
              currentPage,
              lastPage,
            }

            const context = new FuroPaginationContext(args)

            const actual = context.generateRangePages()

            expect(actual)
              .toEqual(expected)
          })
        })
      })
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#createRangePages()', () => {
    const propsMock = {}
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    const cases = [
      {
        params: {
          searchParams: new URLSearchParams(),
          pageKey: 'page',
          currentPage: 1,
          rangePages: [1, 2, 3],
        },
        expected: [
          FuroPageContext.create({
            pageNumber: 1,
            searchParams: new URLSearchParams(),
            pageKey: 'page',
            isCurrent: true,
          }),
          FuroPageContext.create({
            pageNumber: 2,
            searchParams: new URLSearchParams(),
            pageKey: 'page',
            isCurrent: false,
          }),
          FuroPageContext.create({
            pageNumber: 3,
            searchParams: new URLSearchParams(),
            pageKey: 'page',
            isCurrent: false,
          }),
        ],
      },
      {
        params: {
          searchParams: new URLSearchParams(),
          pageKey: 'pg',
          currentPage: 2,
          rangePages: [1, 2, 3],
        },
        expected: [
          FuroPageContext.create({
            pageNumber: 1,
            searchParams: new URLSearchParams(),
            pageKey: 'pg',
            isCurrent: false,
          }),
          FuroPageContext.create({
            pageNumber: 2,
            searchParams: new URLSearchParams(),
            pageKey: 'pg',
            isCurrent: true,
          }),
          FuroPageContext.create({
            pageNumber: 3,
            searchParams: new URLSearchParams(),
            pageKey: 'pg',
            isCurrent: false,
          }),
        ],
      },
      {
        params: {
          searchParams: new URLSearchParams(),
          pageKey: 'p',
          currentPage: 3,
          rangePages: [1, 2, 3],
        },
        expected: [
          FuroPageContext.create({
            pageNumber: 1,
            searchParams: new URLSearchParams(),
            pageKey: 'p',
            isCurrent: false,
          }),
          FuroPageContext.create({
            pageNumber: 2,
            searchParams: new URLSearchParams(),
            pageKey: 'p',
            isCurrent: false,
          }),
          FuroPageContext.create({
            pageNumber: 3,
            searchParams: new URLSearchParams(),
            pageKey: 'p',
            isCurrent: true,
          }),
        ],
      },
    ]

    test.each(cases)('currentPage: $params.currentPage', ({ params, expected }) => {
      const args = {
        props: propsMock,
        componentContext: componentContextMock,
        searchParams: params.searchParams,
        pageKey: params.pageKey,
        currentPage: params.currentPage,
        maxPageRange: params.rangePages.length,
        lastPage: 10,
      }
      const context = new FuroPaginationContext(args)

      const actual = context.createRangePages({
        rangePages: params.rangePages,
      })

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#createPreviousPage()', () => {
    const propsMock = {}
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    const cases = [
      {
        params: {
          searchParams: new URLSearchParams(),
          pageKey: 'page',
          currentPage: 1,
        },
        expected: FuroPageContext.create({
          pageNumber: 0,
          searchParams: new URLSearchParams(),
          pageKey: 'page',
        }),
      },
      {
        params: {
          searchParams: new URLSearchParams({
            alpha: '111',
          }),
          pageKey: 'pg',
          currentPage: 2,
        },
        expected: FuroPageContext.create({
          pageNumber: 1,
          searchParams: new URLSearchParams({
            alpha: '111',
          }),
          pageKey: 'pg',
        }),
      },
      {
        params: {
          searchParams: new URLSearchParams({
            beta: '222',
          }),
          pageKey: 'p',
          currentPage: 3,
        },
        expected: FuroPageContext.create({
          pageNumber: 2,
          searchParams: new URLSearchParams({
            beta: '222',
          }),
          pageKey: 'p',
        }),
      },
    ]

    test.each(cases)('currentPage: $params.currentPage', ({ params, expected }) => {
      const args = {
        props: propsMock,
        componentContext: componentContextMock,
        searchParams: params.searchParams,
        pageKey: params.pageKey,
        currentPage: params.currentPage,
        maxPageRange: 5,
        lastPage: 10,
      }
      const context = new FuroPaginationContext(args)

      const actual = context.createPreviousPage()

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#createNextPage()', () => {
    const propsMock = {}
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    const cases = [
      {
        params: {
          searchParams: new URLSearchParams(),
          pageKey: 'page',
          lastPage: 10,
        },
        currentPageCases: [
          {
            currentPage: 1,
            expected: FuroPageContext.create({
              pageNumber: 2,
              searchParams: new URLSearchParams(),
              pageKey: 'page',
            }),
          },
          {
            currentPage: 9,
            expected: FuroPageContext.create({
              pageNumber: 10,
              searchParams: new URLSearchParams(),
              pageKey: 'page',
            }),
          },
          {
            currentPage: 10,
            expected: FuroPageContext.create({
              pageNumber: null,
              searchParams: new URLSearchParams(),
              pageKey: 'page',
            }),
          },
        ],
      },
      {
        params: {
          searchParams: new URLSearchParams({
            alpha: '111',
          }),
          pageKey: 'pg',
          lastPage: 100,
        },
        currentPageCases: [
          {
            currentPage: 98,
            expected: FuroPageContext.create({
              pageNumber: 99,
              searchParams: new URLSearchParams({
                alpha: '111',
              }),
              pageKey: 'pg',
            }),
          },
          {
            currentPage: 99,
            expected: FuroPageContext.create({
              pageNumber: 100,
              searchParams: new URLSearchParams({
                alpha: '111',
              }),
              pageKey: 'pg',
            }),
          },
          {
            currentPage: 100,
            expected: FuroPageContext.create({
              pageNumber: null,
              searchParams: new URLSearchParams({
                alpha: '111',
              }),
              pageKey: 'pg',
            }),
          },
        ],
      },
    ]

    describe.each(cases)('lastPage: $params.lastPage', ({ params, currentPageCases }) => {
      test.each(currentPageCases)('currentPage: $currentPage', ({ currentPage, expected }) => {
        const args = {
          props: propsMock,
          componentContext: componentContextMock,
          searchParams: params.searchParams,
          pageKey: params.pageKey,
          currentPage,
          maxPageRange: 5,
          lastPage: params.lastPage,
        }
        const context = new FuroPaginationContext(args)

        const actual = context.createNextPage()

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#createFirstPage()', () => {
    const propsMock = {}
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    const cases = [
      {
        params: {
          searchParams: new URLSearchParams(),
          pageKey: 'page',
        },
        expected: FuroPageContext.create({
          pageNumber: 1,
          searchParams: new URLSearchParams(),
          pageKey: 'page',
        }),
      },
      {
        params: {
          searchParams: new URLSearchParams({
            alpha: '111',
          }),
          pageKey: 'pg',
        },
        expected: FuroPageContext.create({
          pageNumber: 1,
          searchParams: new URLSearchParams({
            alpha: '111',
          }),
          pageKey: 'pg',
        }),
      },
      {
        params: {
          searchParams: new URLSearchParams({
            beta: '222',
          }),
          pageKey: 'p',
        },
        expected: FuroPageContext.create({
          pageNumber: 1,
          searchParams: new URLSearchParams({
            beta: '222',
          }),
          pageKey: 'p',
        }),
      },
    ]

    test.each(cases)('searchParams: $params.searchParams', ({ params, expected }) => {
      const args = {
        props: propsMock,
        componentContext: componentContextMock,
        searchParams: params.searchParams,
        pageKey: params.pageKey,
        currentPage: 1,
        maxPageRange: 5,
        lastPage: 10,
      }
      const context = new FuroPaginationContext(args)

      const actual = context.createFirstPage()

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#createLastPage()', () => {
    const propsMock = {}
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    const cases = [
      {
        params: {
          searchParams: new URLSearchParams(),
          pageKey: 'page',
          lastPage: 10,
        },
        expected: FuroPageContext.create({
          pageNumber: 10,
          searchParams: new URLSearchParams(),
          pageKey: 'page',
        }),
      },
      {
        params: {
          searchParams: new URLSearchParams({
            alpha: '111',
          }),
          pageKey: 'pg',
          lastPage: 100,
        },
        expected: FuroPageContext.create({
          pageNumber: 100,
          searchParams: new URLSearchParams({
            alpha: '111',
          }),
          pageKey: 'pg',
        }),
      },
      {
        params: {
          searchParams: new URLSearchParams({
            beta: '222',
          }),
          pageKey: 'p',
          lastPage: 1000,
        },
        expected: FuroPageContext.create({
          pageNumber: 1000,
          searchParams: new URLSearchParams({
            beta: '222',
          }),
          pageKey: 'p',
        }),
      },
    ]

    test.each(cases)('lastPage: $params.lastPage', ({ params, expected }) => {
      const args = {
        props: propsMock,
        componentContext: componentContextMock,
        searchParams: params.searchParams,
        pageKey: params.pageKey,
        currentPage: 1,
        maxPageRange: 5,
        lastPage: params.lastPage,
      }
      const context = new FuroPaginationContext(args)

      const actual = context.createLastPage()

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#isDisabledPreviousPage()', () => {
    const propsMock = {}
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    describe('to be truthy', () => {
      const cases = [
        {
          params: {
            currentPage: 1,
          },
        },
      ]

      test.each(cases)('currentPage: $params.currentPage', ({ params }) => {
        const args = {
          props: propsMock,
          componentContext: componentContextMock,
          searchParams: new URLSearchParams(),
          pageKey: 'pg',
          currentPage: params.currentPage,
          maxPageRange: 5,
          lastPage: 10,
        }
        const context = new FuroPaginationContext(args)

        const actual = context.isDisabledPreviousPage()

        expect(actual)
          .toBeTruthy()
      })
    })

    describe('to be falsy', () => {
      const cases = [
        {
          params: {
            currentPage: 2,
          },
        },
        {
          params: {
            currentPage: 3,
          },
        },
      ]

      test.each(cases)('currentPage: $params.currentPage', ({ params }) => {
        const args = {
          props: propsMock,
          componentContext: componentContextMock,
          searchParams: new URLSearchParams(),
          pageKey: 'pg',
          currentPage: params.currentPage,
          maxPageRange: 5,
          lastPage: 10,
        }
        const context = new FuroPaginationContext(args)

        const actual = context.isDisabledPreviousPage()

        expect(actual)
          .toBeFalsy()
      })
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#isDisabledNextPage()', () => {
    const propsMock = {}
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    const cases = [
      {
        params: {
          lastPage: 10,
        },
        truthyCases: [
          { currentPage: 10 },
        ],
        falsyCases: [
          { currentPage: 9 },
          { currentPage: 8 },
          { currentPage: 7 },
          { currentPage: 6 },
          { currentPage: 5 },
          { currentPage: 4 },
          { currentPage: 3 },
          { currentPage: 2 },
          { currentPage: 1 },
        ],
      },
      {
        params: {
          lastPage: 5,
        },
        truthyCases: [
          { currentPage: 5 },
        ],
        falsyCases: [
          { currentPage: 4 },
          { currentPage: 3 },
          { currentPage: 2 },
          { currentPage: 1 },
        ],
      },
    ]

    describe.each(cases)('lastPage: $params.lastPage', ({ params, truthyCases, falsyCases }) => {
      describe('to be truthy', () => {
        test.each(truthyCases)('currentPage: $currentPage', ({ currentPage }) => {
          const args = {
            props: propsMock,
            componentContext: componentContextMock,
            searchParams: new URLSearchParams(),
            pageKey: 'pg',
            currentPage,
            maxPageRange: 5,
            lastPage: params.lastPage,
          }
          const context = new FuroPaginationContext(args)

          const actual = context.isDisabledNextPage()

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        test.each(falsyCases)('currentPage: $currentPage', ({ currentPage }) => {
          const args = {
            props: propsMock,
            componentContext: componentContextMock,
            searchParams: new URLSearchParams(),
            pageKey: 'pg',
            currentPage,
            maxPageRange: 5,
            lastPage: params.lastPage,
          }
          const context = new FuroPaginationContext(args)

          const actual = context.isDisabledNextPage()

          expect(actual)
            .toBeFalsy()
        })
      })
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#isHiddenFirstPage()', () => {
    const propsMock = {}
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    describe('to be truthy', () => {
      const cases = [
        {
          params: {
            rangePages: [1, 2, 3],
          },
        },
        {
          params: {
            rangePages: [1, 2, 3, 4, 5],
          },
        },
      ]

      test.each(cases)('rangePages: $params.rangePages', ({ params }) => {
        const args = {
          props: propsMock,
          componentContext: componentContextMock,
          searchParams: new URLSearchParams(),
          pageKey: 'pg',
          currentPage: 3,
          maxPageRange: 5,
          lastPage: 10,
        }
        const context = new FuroPaginationContext(args)

        jest.spyOn(context, 'generateRangePages')
          .mockReturnValue(params.rangePages)

        const actual = context.isHiddenFirstPage()

        expect(actual)
          .toBeTruthy()
      })
    })

    describe('to be falsy', () => {
      const cases = [
        {
          params: {
            rangePages: [2, 3, 4],
          },
        },
        {
          params: {
            rangePages: [2, 3, 4, 5, 6],
          },
        },
      ]

      test.each(cases)('rangePages: $params.rangePages', ({ params }) => {
        const args = {
          props: propsMock,
          componentContext: componentContextMock,
          searchParams: new URLSearchParams(),
          pageKey: 'pg',
          currentPage: 3,
          maxPageRange: 5,
          lastPage: 10,
        }
        const context = new FuroPaginationContext(args)

        jest.spyOn(context, 'generateRangePages')
          .mockReturnValue(params.rangePages)

        const actual = context.isHiddenFirstPage()

        expect(actual)
          .toBeFalsy()
      })
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#isHiddenLastPage()', () => {
    const propsMock = {}
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    const cases = [
      {
        params: {
          lastPage: 10,
        },
        truthyCases: [
          { rangePages: [6, 7, 8, 9, 10] },
          { rangePages: [8, 9, 10] },
        ],
        falsyCases: [
          { rangePages: [5, 6, 7, 8, 9] },
          { rangePages: [7, 8, 9] },
        ],
      },
      {
        params: {
          lastPage: 111,
        },
        truthyCases: [
          { rangePages: [107, 108, 109, 110, 111] },
          { rangePages: [109, 110, 111] },
        ],
        falsyCases: [
          { rangePages: [106, 107, 108, 109, 110] },
          { rangePages: [108, 109, 110] },
        ],
      },
    ]

    describe.each(cases)('lastPage: $params.lastPage', ({ params, truthyCases, falsyCases }) => {
      describe('to be truthy', () => {
        test.each(truthyCases)('rangePages: $rangePages', ({ rangePages }) => {
          const args = {
            props: propsMock,
            componentContext: componentContextMock,
            searchParams: new URLSearchParams(),
            pageKey: 'pg',
            currentPage: 3,
            maxPageRange: 5,
            lastPage: params.lastPage,
          }
          const context = new FuroPaginationContext(args)

          jest.spyOn(context, 'generateRangePages')
            .mockReturnValue(rangePages)

          const actual = context.isHiddenLastPage()

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        test.each(falsyCases)('rangePages: $rangePages', ({ rangePages }) => {
          const args = {
            props: propsMock,
            componentContext: componentContextMock,
            searchParams: new URLSearchParams(),
            pageKey: 'pg',
            currentPage: 3,
            maxPageRange: 5,
            lastPage: params.lastPage,
          }
          const context = new FuroPaginationContext(args)

          jest.spyOn(context, 'generateRangePages')
            .mockReturnValue(rangePages)

          const actual = context.isHiddenLastPage()

          expect(actual)
            .toBeFalsy()
        })
      })
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#isHiddenFirstPageDash()', () => {
    const propsMock = {}
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    describe('to be truthy', () => {
      const cases = [
        {
          params: {
            rangePages: [1, 2, 3],
          },
        },
        {
          params: {
            rangePages: [2, 3, 4],
          },
        },
        {
          params: {
            rangePages: [1, 2, 3, 4, 5],
          },
        },
        {
          params: {
            rangePages: [2, 3, 4, 5, 6],
          },
        },
      ]

      test.each(cases)('rangePages: $params.rangePages', ({ params }) => {
        const args = {
          props: propsMock,
          componentContext: componentContextMock,
          searchParams: new URLSearchParams(),
          pageKey: 'pg',
          currentPage: 3,
          maxPageRange: 5,
          lastPage: 10,
        }
        const context = new FuroPaginationContext(args)

        jest.spyOn(context, 'generateRangePages')
          .mockReturnValue(params.rangePages)

        const actual = context.isHiddenFirstPageDash()

        expect(actual)
          .toBeTruthy()
      })
    })

    describe('to be falsy', () => {
      const cases = [
        {
          params: {
            rangePages: [3, 4, 5],
          },
        },
        {
          params: {
            rangePages: [3, 4, 5, 6, 7],
          },
        },
      ]

      test.each(cases)('rangePages: $params.rangePages', ({ params }) => {
        const args = {
          props: propsMock,
          componentContext: componentContextMock,
          searchParams: new URLSearchParams(),
          pageKey: 'pg',
          currentPage: 3,
          maxPageRange: 5,
          lastPage: 10,
        }
        const context = new FuroPaginationContext(args)

        jest.spyOn(context, 'generateRangePages')
          .mockReturnValue(params.rangePages)

        const actual = context.isHiddenFirstPageDash()

        expect(actual)
          .toBeFalsy()
      })
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#isHiddenLastPageDash()', () => {
    const propsMock = {}
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    const cases = [
      {
        params: {
          lastPage: 10,
        },
        truthyCases: [
          { rangePages: [5, 6, 7, 8, 9] },
          { rangePages: [7, 8, 9] },
        ],
        falsyCases: [
          { rangePages: [4, 5, 6, 7, 8] },
          { rangePages: [6, 7, 8] },
        ],
      },
      {
        params: {
          lastPage: 111,
        },
        truthyCases: [
          { rangePages: [106, 107, 108, 109, 110] },
          { rangePages: [108, 109, 110] },
        ],
        falsyCases: [
          { rangePages: [105, 106, 107, 108, 109] },
          { rangePages: [107, 108, 109] },
        ],
      },
    ]

    describe.each(cases)('lastPage: $params.lastPage', ({ params, truthyCases, falsyCases }) => {
      describe('to be truthy', () => {
        test.each(truthyCases)('rangePages: $rangePages', ({ rangePages }) => {
          const args = {
            props: propsMock,
            componentContext: componentContextMock,
            searchParams: new URLSearchParams(),
            pageKey: 'pg',
            currentPage: 3,
            maxPageRange: 5,
            lastPage: params.lastPage,
          }
          const context = new FuroPaginationContext(args)

          jest.spyOn(context, 'generateRangePages')
            .mockReturnValue(rangePages)

          const actual = context.isHiddenLastPageDash()

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        test.each(falsyCases)('rangePages: $rangePages', ({ rangePages }) => {
          const args = {
            props: propsMock,
            componentContext: componentContextMock,
            searchParams: new URLSearchParams(),
            pageKey: 'pg',
            currentPage: 3,
            maxPageRange: 5,
            lastPage: params.lastPage,
          }
          const context = new FuroPaginationContext(args)

          jest.spyOn(context, 'generateRangePages')
            .mockReturnValue(rangePages)

          const actual = context.isHiddenLastPageDash()

          expect(actual)
            .toBeFalsy()
        })
      })
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#generateControlClasses()', () => {
    const propsMock = {}
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    const cases = [
      {
        params: {
          isDisabledPreviousPage: true,
          isDisabledNextPage: true,
          isHiddenFirstPage: true,
          isHiddenLastPage: true,
          isHiddenFirstPageDash: true,
          isHiddenLastPageDash: false,
        },
        expected: {
          'disabled-previous': true,
          'disabled-next': true,
          'hidden-first': true,
          'hidden-last': true,
          'hidden-first-dash': true,
          'hidden-last-dash': false,
        },
      },
      {
        params: {
          isDisabledPreviousPage: true,
          isDisabledNextPage: true,
          isHiddenFirstPage: true,
          isHiddenLastPage: true,
          isHiddenFirstPageDash: false,
          isHiddenLastPageDash: true,
        },
        expected: {
          'disabled-previous': true,
          'disabled-next': true,
          'hidden-first': true,
          'hidden-last': true,
          'hidden-first-dash': false,
          'hidden-last-dash': true,
        },
      },
      {
        params: {
          isDisabledPreviousPage: true,
          isDisabledNextPage: true,
          isHiddenFirstPage: true,
          isHiddenLastPage: false,
          isHiddenFirstPageDash: true,
          isHiddenLastPageDash: true,
        },
        expected: {
          'disabled-previous': true,
          'disabled-next': true,
          'hidden-first': true,
          'hidden-last': false,
          'hidden-first-dash': true,
          'hidden-last-dash': true,
        },
      },
      {
        params: {
          isDisabledPreviousPage: true,
          isDisabledNextPage: true,
          isHiddenFirstPage: false,
          isHiddenLastPage: true,
          isHiddenFirstPageDash: true,
          isHiddenLastPageDash: true,
        },
        expected: {
          'disabled-previous': true,
          'disabled-next': true,
          'hidden-first': false,
          'hidden-last': true,
          'hidden-first-dash': true,
          'hidden-last-dash': true,
        },
      },
      {
        params: {
          isDisabledPreviousPage: true,
          isDisabledNextPage: false,
          isHiddenFirstPage: true,
          isHiddenLastPage: true,
          isHiddenFirstPageDash: true,
          isHiddenLastPageDash: true,
        },
        expected: {
          'disabled-previous': true,
          'disabled-next': false,
          'hidden-first': true,
          'hidden-last': true,
          'hidden-first-dash': true,
          'hidden-last-dash': true,
        },
      },
      {
        params: {
          isDisabledPreviousPage: false,
          isDisabledNextPage: true,
          isHiddenFirstPage: true,
          isHiddenLastPage: true,
          isHiddenFirstPageDash: true,
          isHiddenLastPageDash: true,
        },
        expected: {
          'disabled-previous': false,
          'disabled-next': true,
          'hidden-first': true,
          'hidden-last': true,
          'hidden-first-dash': true,
          'hidden-last-dash': true,
        },
      },
    ]

    test.each(cases)('params: $params', ({ params, expected }) => {
      const args = {
        props: propsMock,
        componentContext: componentContextMock,
        searchParams: new URLSearchParams(),
        pageKey: 'pg',
        currentPage: 3,
        maxPageRange: 5,
        lastPage: 10,
      }
      const context = new FuroPaginationContext(args)

      jest.spyOn(context, 'isDisabledPreviousPage')
        .mockReturnValue(params.isDisabledPreviousPage)
      jest.spyOn(context, 'isDisabledNextPage')
        .mockReturnValue(params.isDisabledNextPage)
      jest.spyOn(context, 'isHiddenFirstPage')
        .mockReturnValue(params.isHiddenFirstPage)
      jest.spyOn(context, 'isHiddenLastPage')
        .mockReturnValue(params.isHiddenLastPage)
      jest.spyOn(context, 'isHiddenFirstPageDash')
        .mockReturnValue(params.isHiddenFirstPageDash)
      jest.spyOn(context, 'isHiddenLastPageDash')
        .mockReturnValue(params.isHiddenLastPageDash)

      const actual = context.generateControlClasses()

      expect(actual)
        .toEqual(expected)
    })
  })
})
