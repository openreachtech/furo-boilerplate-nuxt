import FuroPageContext from '~/app/vue/contexts/FuroPageContext'

describe('FuroPageContext', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#pageNumber', () => {
        const cases = [
          {
            params: {
              pageNumber: 1,
            },
          },
          {
            params: {
              pageNumber: 3,
            },
          },
          {
            params: {
              pageNumber: 5,
            },
          },
        ]

        test.each(cases)('pageNumber: $params.pageNumber', ({ params }) => {
          const args = {
            pageNumber: params.pageNumber,
            searchParams: new URLSearchParams(),
            isCurrent: false,
          }

          const context = new FuroPageContext(args)

          expect(context)
            .toHaveProperty('pageNumber', params.pageNumber)
        })
      })

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
            pageNumber: 1,
            searchParams: params.searchParams,
            isCurrent: false,
          }

          const context = new FuroPageContext(args)

          expect(context)
            .toHaveProperty('searchParams', params.searchParams)
        })
      })

      describe('#isCurrent', () => {
        const cases = [
          {
            params: {
              isCurrent: true,
            },
          },
          {
            params: {
              isCurrent: false,
            },
          },
        ]

        test.each(cases)('isCurrent: $params.isCurrent', ({ params }) => {
          const args = {
            pageNumber: 1,
            searchParams: new URLSearchParams(),
            isCurrent: params.isCurrent,
          }

          const context = new FuroPageContext(args)

          expect(context)
            .toHaveProperty('isCurrent', params.isCurrent)
        })
      })
    })
  })
})

describe('FuroPageContext', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            pageNumber: 1,
            searchParams: new URLSearchParams(),
            isCurrent: true,
          },
        },
        {
          params: {
            pageNumber: 3,
            searchParams: new URLSearchParams({
              alpha: '1',
              beta: '2',
            }),
            isCurrent: false,
          },
        },
        {
          params: {
            pageNumber: 5,
            searchParams: new URLSearchParams({
              gamma: '3',
              delta: '4',
            }),
            // isCurrent: false,
          },
        },
      ]

      test.each(cases)('pageNumber: $params.pageNumber', ({ params }) => {
        const actual = FuroPageContext.create(params)

        expect(actual)
          .toBeInstanceOf(FuroPageContext)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            pageNumber: 1,
            searchParams: new URLSearchParams(),
            isCurrent: true,
          },
          expected: {
            pageNumber: 1,
            searchParams: new URLSearchParams(),
            isCurrent: true,
          },
        },
        {
          params: {
            pageNumber: 3,
            searchParams: new URLSearchParams({
              alpha: '1',
              beta: '2',
            }),
            isCurrent: false,
          },
          expected: {
            pageNumber: 3,
            searchParams: new URLSearchParams({
              alpha: '1',
              beta: '2',
            }),
            isCurrent: false,
          },
        },
        {
          params: {
            pageNumber: 5,
            searchParams: new URLSearchParams({
              gamma: '3',
              delta: '4',
            }),
            // isCurrent: false,
          },
          expected: {
            pageNumber: 5,
            searchParams: new URLSearchParams({
              gamma: '3',
              delta: '4',
            }),
            isCurrent: false,
          },
        },
      ]

      test.each(cases)('pageNumber: $params.pageNumber', ({ params, expected }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(FuroPageContext)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('FuroPageContext', () => {
  describe('#generateHref()', () => {
    describe('to return string', () => {
      const cases = [
        {
          params: {
            pageNumber: 1,
            searchParams: new URLSearchParams(),
          },
          expected: '?page=1',
        },
        {
          params: {
            pageNumber: 3,
            searchParams: new URLSearchParams({
              alpha: '1',
              beta: '2',
            }),
          },
          expected: '?alpha=1&beta=2&page=3',
        },
        {
          params: {
            pageNumber: 5,
            searchParams: new URLSearchParams({
              gamma: '3',
              delta: '4',
            }),
          },
          expected: '?gamma=3&delta=4&page=5',
        },
      ]

      test.each(cases)('pageNumber: $params.pageNumber', ({ params, expected }) => {
        const context = FuroPageContext.create(params)

        const actual = context.generateHref()

        expect(actual)
          .toBe(expected)
      })
    })

    describe('to return null', () => {
      const cases = [
        {
          params: {
            pageNumber: null,
            searchParams: new URLSearchParams(),
          },
        },
        {
          params: {
            pageNumber: null,
            searchParams: new URLSearchParams({
              alpha: '1',
              beta: '2',
            }),
          },
        },
        {
          params: {
            pageNumber: null,
            searchParams: new URLSearchParams({
              gamma: '3',
              delta: '4',
            }),
          },
        },
      ]

      test.each(cases)('pageNumber: $params.pageNumber', ({ params }) => {
        const context = FuroPageContext.create(params)

        const actual = context.generateHref()

        expect(actual)
          .toBeNull()
      })
    })
  })
})

describe('FuroPageContext', () => {
  describe('#generateText()', () => {
    describe('to return string', () => {
      const cases = [
        {
          params: {
            pageNumber: 1,
            searchParams: new URLSearchParams(),
          },
          expected: '1',
        },
        {
          params: {
            pageNumber: 3,
            searchParams: new URLSearchParams({
              alpha: '1',
              beta: '2',
            }),
          },
          expected: '3',
        },
        {
          params: {
            pageNumber: 5,
            searchParams: new URLSearchParams({
              gamma: '3',
              delta: '4',
            }),
          },
          expected: '5',
        },
      ]

      test.each(cases)('pageNumber: $params.pageNumber', ({ params, expected }) => {
        const context = FuroPageContext.create(params)

        const actual = context.generateText()

        expect(actual)
          .toBe(expected)
      })
    })

    describe('to return null', () => {
      const cases = [
        {
          params: {
            pageNumber: null,
            searchParams: new URLSearchParams(),
          },
        },
        {
          params: {
            pageNumber: null,
            searchParams: new URLSearchParams({
              alpha: '1',
              beta: '2',
            }),
          },
        },
        {
          params: {
            pageNumber: null,
            searchParams: new URLSearchParams({
              gamma: '3',
              delta: '4',
            }),
          },
        },
      ]

      test.each(cases)('pageNumber: $params.pageNumber', ({ params }) => {
        const context = FuroPageContext.create(params)

        const actual = context.generateText()

        expect(actual)
          .toBeNull()
      })
    })
  })
})

describe('FuroPageContext', () => {
  describe('#generateControlClasses()', () => {
    describe('to return object', () => {
      const cases = [
        {
          params: {
            pageNumber: 1,
            searchParams: new URLSearchParams(),
            isCurrent: true,
          },
          expected: {
            current: true,
          },
        },
        {
          params: {
            pageNumber: 3,
            searchParams: new URLSearchParams({
              alpha: '1',
              beta: '2',
            }),
            isCurrent: false,
          },
          expected: {
            current: false,
          },
        },
        {
          params: {
            pageNumber: 5,
            searchParams: new URLSearchParams({
              gamma: '3',
              delta: '4',
            }),
            // isCurrent: false,
          },
          expected: {
            current: false,
          },
        },
      ]

      test.each(cases)('pageNumber: $params.pageNumber', ({ params, expected }) => {
        const context = FuroPageContext.create(params)

        const actual = context.generateControlClasses()

        expect(actual)
          .toStrictEqual(expected)
      })
    })
  })
})
