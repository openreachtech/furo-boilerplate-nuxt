import {
  ref,
} from 'vue'

import SessionStoreClerk from '~/app/session/SessionStoreClerk.js'

describe('SessionStoreClerk', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#sessionStore', () => {
        const cases = [
          {
            input: {
              sessionStore: {
                accessToken: ref('access-token-01'),
                renewingPromise: ref(null),
              },
            },
          },
          {
            input: {
              sessionStore: {
                accessToken: ref('access-token-02'),
                renewingPromise: ref(null),
              },
            },
          },
        ]

        test.each(cases)('accessToken: $input.sessionStore.accessToken.value', ({ input }) => {
          const clerk = new SessionStoreClerk(input)

          expect(clerk)
            .toHaveProperty('sessionStore', input.sessionStore)
        })
      })
    })
  })
})

describe('SessionStoreClerk', () => {
  describe('.create()', () => {
    describe('should be instance of own class', () => {
      const cases = [
        {
          input: {
            sessionStore: {
              accessToken: ref('access-token-11'),
              renewingPromise: ref(null),
            },
          },
        },
        {
          input: {
            sessionStore: {
              accessToken: ref('access-token-12'),
              renewingPromise: ref(null),
            },
          },
        },
      ]

      test.each(cases)('accessToken: $input.sessionStore.accessToken.value', ({ input }) => {
        const received = SessionStoreClerk.create(input)

        expect(received)
          .toBeInstanceOf(SessionStoreClerk)
      })
    })

    describe('should be called by constructor', () => {
      const cases = [
        {
          input: {
            sessionStore: {
              accessToken: ref('access-token-13'),
              renewingPromise: ref(null),
            },
          },
        },
        {
          input: {
            sessionStore: {
              accessToken: ref('access-token-14'),
              renewingPromise: ref(null),
            },
          },
        },
      ]

      test.each(cases)('accessToken: $input.sessionStore.accessToken.value', ({ input }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(SessionStoreClerk)

        SpyClass.create(input)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(input)
      })
    })
  })
})

describe('SessionStoreClerk', () => {
  describe('#saveToken()', () => {
    describe('to sessionStore a present token', () => {
      const cases = [
        {
          input: {
            sessionStore: {
              accessToken: ref(null),
              renewingPromise: ref(null),
            },
            token: 'access-token-21',
          },
          expected: 'access-token-21',
        },
        {
          input: {
            sessionStore: {
              accessToken: ref('access-token-old-22'),
              renewingPromise: ref(null),
            },
            token: 'access-token-22',
          },
          expected: 'access-token-22',
        },
      ]

      test.each(cases)('token: $input.token', ({
        input,
        expected,
      }) => {
        const clerk = SessionStoreClerk.create({
          sessionStore: input.sessionStore,
        })

        clerk.saveToken({
          token: input.token,
        })

        const received = input.sessionStore.accessToken.value
        expect(received)
          .toBe(expected)
      })
    })

    describe('to return true on a present token', () => {
      const cases = [
        {
          input: {
            sessionStore: {
              accessToken: ref(null),
              renewingPromise: ref(null),
            },
            token: 'access-token-23',
          },
        },
        {
          input: {
            sessionStore: {
              accessToken: ref(null),
              renewingPromise: ref(null),
            },
            token: 'access-token-24',
          },
        },
      ]

      test.each(cases)('token: $input.token', ({ input }) => {
        const clerk = SessionStoreClerk.create({
          sessionStore: input.sessionStore,
        })

        const received = clerk.saveToken({
          token: input.token,
        })

        expect(received)
          .toBeTruthy()
      })
    })

    describe('to return false on an empty token', () => {
      const cases = [
        {
          input: {
            sessionStore: {
              accessToken: ref('access-token-25'),
              renewingPromise: ref(null),
            },
            token: null,
          },
        },
        {
          input: {
            sessionStore: {
              accessToken: ref('access-token-26'),
              renewingPromise: ref(null),
            },
            token: '',
          },
        },
      ]

      test.each(cases)('token: $input.token', ({ input }) => {
        const clerk = SessionStoreClerk.create({
          sessionStore: input.sessionStore,
        })

        const received = clerk.saveToken({
          token: input.token,
        })

        expect(received)
          .toBeFalsy()
      })
    })

    describe('to clear the sessionStore on an empty token', () => {
      const cases = [
        {
          input: {
            sessionStore: {
              accessToken: ref('access-token-27'),
              renewingPromise: ref(null),
            },
            token: null,
          },
        },
        {
          input: {
            sessionStore: {
              accessToken: ref('access-token-28'),
              renewingPromise: ref(null),
            },
            token: '',
          },
        },
      ]

      test.each(cases)('token: $input.token', ({ input }) => {
        const clerk = SessionStoreClerk.create({
          sessionStore: input.sessionStore,
        })

        clerk.saveToken({
          token: input.token,
        })

        const received = input.sessionStore.accessToken.value
        expect(received)
          .toBeNull()
      })
    })
  })
})

describe('SessionStoreClerk', () => {
  describe('#recordToken()', () => {
    describe('to sessionStore the token into the sessionStore', () => {
      const cases = [
        {
          input: {
            sessionStore: {
              accessToken: ref(null),
              renewingPromise: ref(null),
            },
            token: 'access-token-31',
          },
          expected: 'access-token-31',
        },
        {
          input: {
            sessionStore: {
              accessToken: ref('access-token-old-32'),
              renewingPromise: ref(null),
            },
            token: 'access-token-32',
          },
          expected: 'access-token-32',
        },
      ]

      test.each(cases)('token: $input.token', ({
        input,
        expected,
      }) => {
        const clerk = SessionStoreClerk.create({
          sessionStore: input.sessionStore,
        })

        clerk.recordToken({
          token: input.token,
        })

        const received = input.sessionStore.accessToken.value
        expect(received)
          .toBe(expected)
      })
    })
  })
})

describe('SessionStoreClerk', () => {
  describe('#clearToken()', () => {
    describe('to set the sessionStored token to null', () => {
      const cases = [
        {
          input: {
            sessionStore: {
              accessToken: ref('access-token-41'),
              renewingPromise: ref(null),
            },
          },
        },
        {
          input: {
            sessionStore: {
              accessToken: ref('access-token-42'),
              renewingPromise: ref(null),
            },
          },
        },
      ]

      test.each(cases)('accessToken: $input.sessionStore.accessToken.value', ({ input }) => {
        const clerk = SessionStoreClerk.create({
          sessionStore: input.sessionStore,
        })

        clerk.clearToken()

        const received = input.sessionStore.accessToken.value
        expect(received)
          .toBeNull()
      })
    })
  })
})

describe('SessionStoreClerk', () => {
  describe('#retrieveToken()', () => {
    describe('to be the sessionStored token', () => {
      const cases = [
        {
          input: {
            sessionStore: {
              accessToken: ref('access-token-51'),
              renewingPromise: ref(null),
            },
          },
          expected: 'access-token-51',
        },
        {
          input: {
            sessionStore: {
              accessToken: ref('access-token-52'),
              renewingPromise: ref(null),
            },
          },
          expected: 'access-token-52',
        },
      ]

      test.each(cases)('accessToken: $input.sessionStore.accessToken.value', ({
        input,
        expected,
      }) => {
        const clerk = SessionStoreClerk.create({
          sessionStore: input.sessionStore,
        })

        const received = clerk.retrieveToken()

        expect(received)
          .toBe(expected)
      })
    })

    describe('to be null when no token is held', () => {
      const cases = [
        {
          input: {
            sessionStore: {
              accessToken: ref(null),
              renewingPromise: ref(null),
            },
          },
        },
        {
          input: {
            sessionStore: {
              accessToken: ref(null),
              renewingPromise: ref('renewing-promise-54'),
            },
          },
        },
      ]

      test.each(cases)('renewingPromise: $input.sessionStore.renewingPromise.value', ({ input }) => {
        const clerk = SessionStoreClerk.create({
          sessionStore: input.sessionStore,
        })

        const received = clerk.retrieveToken()

        expect(received)
          .toBeNull()
      })
    })
  })
})

describe('SessionStoreClerk', () => {
  describe('#existsToken()', () => {
    describe('to be truthy when a token is held', () => {
      const cases = [
        {
          input: {
            sessionStore: {
              accessToken: ref('access-token-61'),
              renewingPromise: ref(null),
            },
          },
        },
        {
          input: {
            sessionStore: {
              accessToken: ref('access-token-62'),
              renewingPromise: ref(null),
            },
          },
        },
      ]

      test.each(cases)('accessToken: $input.sessionStore.accessToken.value', ({ input }) => {
        const clerk = SessionStoreClerk.create({
          sessionStore: input.sessionStore,
        })

        const received = clerk.existsToken()

        expect(received)
          .toBeTruthy()
      })
    })

    describe('to be falsy when no token is held', () => {
      const cases = [
        {
          input: {
            sessionStore: {
              accessToken: ref(null),
              renewingPromise: ref(null),
            },
          },
        },
        {
          input: {
            sessionStore: {
              accessToken: ref(null),
              renewingPromise: ref('renewing-promise-64'),
            },
          },
        },
      ]

      test.each(cases)('renewingPromise: $input.sessionStore.renewingPromise.value', ({ input }) => {
        const clerk = SessionStoreClerk.create({
          sessionStore: input.sessionStore,
        })

        const received = clerk.existsToken()

        expect(received)
          .toBeFalsy()
      })
    })
  })
})
