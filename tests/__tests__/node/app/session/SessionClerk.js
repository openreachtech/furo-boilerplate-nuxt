import SessionClerk from '~/app/session/SessionClerk.js'

import sessionStore from '~/app/modules/sessionStore.js'

describe('SessionClerk', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#store', () => {
        const cases = [
          {
            params: {
              store: {
                accessToken: 'access-token-01',
                renewingPromise: null,
              },
            },
          },
          {
            params: {
              store: {
                accessToken: null,
                renewingPromise: null,
              },
            },
          },
        ]

        test.each(cases)('accessToken: $params.store.accessToken', ({
          params,
        }) => {
          const clerk = SessionClerk.create(params)

          expect(clerk)
            .toHaveProperty('store', params.store)
        })
      })
    })
  })
})

describe('SessionClerk', () => {
  describe('.create()', () => {
    describe('should be instance of own class', () => {
      const cases = [
        {
          factoryParams: {
            store: {
              accessToken: 'access-token-11',
              renewingPromise: null,
            },
          },
        },
        {
          factoryParams: {
            store: {
              accessToken: 'access-token-12',
              renewingPromise: null,
            },
          },
        },
      ]

      test.each(cases)('accessToken: $factoryParams.store.accessToken', ({
        factoryParams,
      }) => {
        const clerk = SessionClerk.create(factoryParams)

        expect(clerk)
          .toBeInstanceOf(SessionClerk)
      })
    })

    describe('should be called by constructor', () => {
      const cases = [
        {
          factoryParams: {
            store: {
              accessToken: 'access-token-13',
              renewingPromise: null,
            },
          },
        },
        {
          factoryParams: {
            store: {
              accessToken: 'access-token-14',
              renewingPromise: null,
            },
          },
        },
      ]

      test.each(cases)('accessToken: $factoryParams.store.accessToken', ({
        factoryParams,
      }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(SessionClerk)

        SpyClass.create(factoryParams)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(factoryParams)
      })
    })

    describe('should use default store value', () => {
      test('to be the shared singleton', () => {
        const clerk = SessionClerk.create()

        expect(clerk.store)
          .toBe(sessionStore) // same reference
      })
    })
  })
})

describe('SessionClerk', () => {
  describe('#saveToken()', () => {
    describe('with a present token', () => {
      const cases = [
        {
          factoryParams: {
            store: {
              accessToken: null,
              renewingPromise: null,
            },
          },
          params: {
            token: 'access-token-21',
          },
          expected: 'access-token-21',
        },
        {
          factoryParams: {
            store: {
              accessToken: 'access-token-old-22',
              renewingPromise: null,
            },
          },
          params: {
            token: 'access-token-22',
          },
          expected: 'access-token-22',
        },
      ]

      test.each(cases)('token: $params.token', ({
        factoryParams,
        params,
        expected,
      }) => {
        const clerk = SessionClerk.create(factoryParams)

        clerk.saveToken(params)

        expect(factoryParams.store.accessToken)
          .toBe(expected)
      })
    })

    describe('to return true on a present token', () => {
      const cases = [
        {
          factoryParams: {
            store: {
              accessToken: null,
              renewingPromise: null,
            },
          },
          params: {
            token: 'access-token-23',
          },
        },
        {
          factoryParams: {
            store: {
              accessToken: null,
              renewingPromise: null,
            },
          },
          params: {
            token: 'access-token-24',
          },
        },
      ]

      test.each(cases)('token: $params.token', ({
        factoryParams,
        params,
      }) => {
        const clerk = SessionClerk.create(factoryParams)

        const received = clerk.saveToken(params)

        expect(received)
          .toBeTruthy()
      })
    })

    describe('with an empty token', () => {
      const cases = [
        {
          factoryParams: {
            store: {
              accessToken: 'access-token-25',
              renewingPromise: null,
            },
          },
          params: {
            token: null,
          },
        },
        {
          factoryParams: {
            store: {
              accessToken: 'access-token-26',
              renewingPromise: null,
            },
          },
          params: {
            token: '',
          },
        },
      ]

      test.each(cases)('token: $params.token', ({
        factoryParams,
        params,
      }) => {
        const clerk = SessionClerk.create(factoryParams)

        const received = clerk.saveToken(params)

        expect(received)
          .toBeFalsy()
      })
    })

    describe('to clear the store on an empty token', () => {
      const cases = [
        {
          factoryParams: {
            store: {
              accessToken: 'access-token-27',
              renewingPromise: null,
            },
          },
          params: {
            token: null,
          },
        },
        {
          factoryParams: {
            store: {
              accessToken: 'access-token-28',
              renewingPromise: null,
            },
          },
          params: {
            token: '',
          },
        },
      ]

      test.each(cases)('token: $params.token', ({
        factoryParams,
        params,
      }) => {
        const clerk = SessionClerk.create(factoryParams)

        clerk.saveToken(params)

        expect(factoryParams.store.accessToken)
          .toBeNull()
      })
    })
  })
})

describe('SessionClerk', () => {
  describe('#recordToken()', () => {
    describe('to store the token into the store', () => {
      const cases = [
        {
          factoryParams: {
            store: {
              accessToken: null,
              renewingPromise: null,
            },
          },
          params: {
            token: 'access-token-61',
          },
          expected: 'access-token-61',
        },
        {
          factoryParams: {
            store: {
              accessToken: 'access-token-old-62',
              renewingPromise: null,
            },
          },
          params: {
            token: 'access-token-62',
          },
          expected: 'access-token-62',
        },
      ]

      test.each(cases)('token: $params.token', ({
        factoryParams,
        params,
        expected,
      }) => {
        const clerk = SessionClerk.create(factoryParams)

        clerk.recordToken(params)

        expect(factoryParams.store.accessToken)
          .toBe(expected)
      })
    })
  })
})

describe('SessionClerk', () => {
  describe('#clearToken()', () => {
    describe('to set the stored token to null', () => {
      const cases = [
        {
          factoryParams: {
            store: {
              accessToken: 'access-token-31',
              renewingPromise: null,
            },
          },
        },
        {
          factoryParams: {
            store: {
              accessToken: 'access-token-32',
              renewingPromise: null,
            },
          },
        },
      ]

      test.each(cases)('accessToken: $factoryParams.store.accessToken', ({
        factoryParams,
      }) => {
        const clerk = SessionClerk.create(factoryParams)

        clerk.clearToken()

        expect(factoryParams.store.accessToken)
          .toBeNull()
      })
    })
  })
})

describe('SessionClerk', () => {
  describe('#existsToken()', () => {
    describe('with a held token', () => {
      const cases = [
        {
          factoryParams: {
            store: {
              accessToken: 'access-token-41',
              renewingPromise: null,
            },
          },
        },
        {
          factoryParams: {
            store: {
              accessToken: 'access-token-42',
              renewingPromise: null,
            },
          },
        },
      ]

      test.each(cases)('accessToken: $factoryParams.store.accessToken', ({
        factoryParams,
      }) => {
        const clerk = SessionClerk.create(factoryParams)

        const received = clerk.existsToken()

        expect(received)
          .toBeTruthy()
      })
    })

    describe('with no held token', () => {
      const cases = [
        {
          factoryParams: {
            store: {
              accessToken: null,
              renewingPromise: null,
            },
          },
        },
        {
          factoryParams: {
            store: {
              accessToken: null,
              renewingPromise: 'renewing-promise-44',
            },
          },
        },
      ]

      test.each(cases)('renewingPromise: $factoryParams.store.renewingPromise', ({
        factoryParams,
      }) => {
        const clerk = SessionClerk.create(factoryParams)

        const received = clerk.existsToken()

        expect(received)
          .toBeFalsy()
      })
    })
  })
})

describe('SessionClerk', () => {
  describe('#retrieveToken()', () => {
    describe('with a held token', () => {
      const cases = [
        {
          factoryParams: {
            store: {
              accessToken: 'access-token-51',
              renewingPromise: null,
            },
          },
          expected: 'access-token-51',
        },
        {
          factoryParams: {
            store: {
              accessToken: 'access-token-52',
              renewingPromise: null,
            },
          },
          expected: 'access-token-52',
        },
      ]

      test.each(cases)('accessToken: $factoryParams.store.accessToken', ({
        factoryParams,
        expected,
      }) => {
        const clerk = SessionClerk.create(factoryParams)

        const received = clerk.retrieveToken()

        expect(received)
          .toBe(expected)
      })
    })

    describe('with no held token', () => {
      const cases = [
        {
          factoryParams: {
            store: {
              accessToken: null,
              renewingPromise: null,
            },
          },
        },
        {
          factoryParams: {
            store: {
              accessToken: null,
              renewingPromise: 'renewing-promise-54',
            },
          },
        },
      ]

      test.each(cases)('renewingPromise: $factoryParams.store.renewingPromise', ({
        factoryParams,
      }) => {
        const clerk = SessionClerk.create(factoryParams)

        const received = clerk.retrieveToken()

        expect(received)
          .toBeNull()
      })
    })
  })
})
