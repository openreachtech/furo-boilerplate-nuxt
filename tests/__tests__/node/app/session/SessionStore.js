import SessionStore from '~/app/session/SessionStore.js'

describe('SessionStore', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#accessToken', () => {
        const cases = [
          {
            input: {
              accessToken: 'access-token-01',
              renewingPromise: null,
            },
          },
          {
            input: {
              accessToken: 'access-token-02',
              renewingPromise: null,
            },
          },
        ]

        test.each(cases)('accessToken: $input.accessToken', ({ input }) => {
          const store = new SessionStore(input)

          expect(store)
            .toHaveProperty('accessToken', input.accessToken)
        })
      })

      describe('#renewingPromise', () => {
        const cases = [
          {
            input: {
              accessToken: 'access-token-01',
              renewingPromise: Promise.resolve('renewed-token-01'),
            },
          },
          {
            input: {
              accessToken: 'access-token-02',
              renewingPromise: Promise.resolve('renewed-token-02'),
            },
          },
        ]

        test.each(cases)('accessToken: $input.accessToken', ({ input }) => {
          const store = new SessionStore(input)

          expect(store)
            .toHaveProperty('renewingPromise', input.renewingPromise) // same reference
        })
      })
    })
  })
})

describe('SessionStore', () => {
  describe('.create()', () => {
    describe('should be instance of own class', () => {
      const cases = [
        {
          input: {
            accessToken: 'access-token-11',
            renewingPromise: null,
          },
        },
        {
          input: {
            accessToken: 'access-token-12',
            renewingPromise: null,
          },
        },
      ]

      test.each(cases)('accessToken: $input.accessToken', ({ input }) => {
        const received = SessionStore.create(input)

        expect(received)
          .toBeInstanceOf(SessionStore)
      })
    })

    describe('should be called by constructor', () => {
      const cases = [
        {
          input: {
            accessToken: 'access-token-13',
            renewingPromise: null,
          },
        },
        {
          input: {
            accessToken: 'access-token-14',
            renewingPromise: null,
          },
        },
      ]

      test.each(cases)('accessToken: $input.accessToken', ({ input }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(SessionStore)

        SpyClass.create(input)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(input)
      })
    })

    describe('should use default accessToken value', () => {
      test('to be null when omitted', () => {
        const store = SessionStore.create({
          renewingPromise: null,
        })

        expect(store)
          .toHaveProperty('accessToken', null)
      })
    })

    describe('should use default renewingPromise value', () => {
      test('to be null when omitted', () => {
        const store = SessionStore.create({
          accessToken: 'access-token-21',
        })

        expect(store)
          .toHaveProperty('renewingPromise', null)
      })
    })
  })
})
