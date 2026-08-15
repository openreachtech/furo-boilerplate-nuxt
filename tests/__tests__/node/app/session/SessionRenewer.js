import {
  ref,
} from 'vue'

import SessionRenewer from '~/app/session/SessionRenewer.js'

import SessionStoreClerk from '~/app/session/SessionStoreClerk.js'

import RenewAccessTokenMutationGraphqlLauncher from '~/app/graphql/client/mutations/renewAccessToken/RenewAccessTokenMutationGraphqlLauncher.js'

describe('SessionRenewer', () => {
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
              sessionClerk: {
                saveToken: () => true,
              },
              renewLauncherFactory: {
                create: () => null,
              },
            },
          },
          {
            input: {
              sessionStore: {
                accessToken: ref('access-token-02'),
                renewingPromise: ref(null),
              },
              sessionClerk: {
                saveToken: () => true,
              },
              renewLauncherFactory: {
                create: () => null,
              },
            },
          },
        ]

        test.each(cases)('accessToken: $input.sessionStore.accessToken.value', ({ input }) => {
          const renewer = new SessionRenewer(input)

          expect(renewer)
            .toHaveProperty('sessionStore', input.sessionStore)
        })
      })

      describe('#sessionClerk', () => {
        const cases = [
          {
            input: {
              sessionStore: {
                accessToken: ref('access-token-03'),
                renewingPromise: ref(null),
              },
              sessionClerk: {
                saveToken: () => true,
              },
              renewLauncherFactory: {
                create: () => null,
              },
            },
          },
          {
            input: {
              sessionStore: {
                accessToken: ref('access-token-04'),
                renewingPromise: ref(null),
              },
              sessionClerk: {
                saveToken: () => true,
              },
              renewLauncherFactory: {
                create: () => null,
              },
            },
          },
        ]

        test.each(cases)('accessToken: $input.sessionStore.accessToken.value', ({ input }) => {
          const renewer = new SessionRenewer(input)

          expect(renewer)
            .toHaveProperty('sessionClerk', input.sessionClerk)
        })
      })

      describe('#renewLauncherFactory', () => {
        const cases = [
          {
            input: {
              sessionStore: {
                accessToken: ref('access-token-05'),
                renewingPromise: ref(null),
              },
              sessionClerk: {
                saveToken: () => true,
              },
              renewLauncherFactory: {
                create: () => null,
              },
            },
          },
          {
            input: {
              sessionStore: {
                accessToken: ref('access-token-06'),
                renewingPromise: ref(null),
              },
              sessionClerk: {
                saveToken: () => true,
              },
              renewLauncherFactory: {
                create: () => null,
              },
            },
          },
        ]

        test.each(cases)('accessToken: $input.sessionStore.accessToken.value', ({ input }) => {
          const renewer = new SessionRenewer(input)

          expect(renewer)
            .toHaveProperty('renewLauncherFactory', input.renewLauncherFactory)
        })
      })
    })
  })
})

describe('SessionRenewer', () => {
  describe('.create()', () => {
    describe('should be instance of own class', () => {
      const cases = [
        {
          input: {
            sessionStore: {
              accessToken: ref('access-token-11'),
              renewingPromise: ref(null),
            },
            sessionClerk: {
              saveToken: () => true,
            },
            renewLauncherFactory: {
              create: () => null,
            },
          },
        },
        {
          input: {
            sessionStore: {
              accessToken: ref('access-token-12'),
              renewingPromise: ref(null),
            },
            sessionClerk: {
              saveToken: () => true,
            },
            renewLauncherFactory: {
              create: () => null,
            },
          },
        },
      ]

      test.each(cases)('accessToken: $input.sessionStore.accessToken.value', ({ input }) => {
        const received = SessionRenewer.create(input)

        expect(received)
          .toBeInstanceOf(SessionRenewer)
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
            sessionClerk: {
              saveToken: () => true,
            },
            renewLauncherFactory: {
              create: () => null,
            },
          },
        },
        {
          input: {
            sessionStore: {
              accessToken: ref('access-token-14'),
              renewingPromise: ref(null),
            },
            sessionClerk: {
              saveToken: () => true,
            },
            renewLauncherFactory: {
              create: () => null,
            },
          },
        },
      ]

      test.each(cases)('accessToken: $input.sessionStore.accessToken.value', ({ input }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(SessionRenewer)

        SpyClass.create(input)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(input)
      })
    })

    describe('should use default renewLauncherFactory value', () => {
      const cases = [
        {
          input: {
            sessionStore: {
              accessToken: ref('access-token-15'),
              renewingPromise: ref(null),
            },
            sessionClerk: {
              saveToken: () => true,
            },
          },
        },
        {
          input: {
            sessionStore: {
              accessToken: ref('access-token-16'),
              renewingPromise: ref(null),
            },
            sessionClerk: {
              saveToken: () => true,
            },
          },
        },
      ]

      test.each(cases)('accessToken: $input.sessionStore.accessToken.value', ({ input }) => {
        const received = SessionRenewer.create({
          sessionStore: input.sessionStore,
          sessionClerk: input.sessionClerk,
        })

        expect(received)
          .toHaveProperty('renewLauncherFactory', RenewAccessTokenMutationGraphqlLauncher)
      })
    })
  })
})

describe('SessionRenewer', () => {
  describe('#renewToken()', () => {
    describe('to return the renewed access token', () => {
      const cases = [
        {
          input: {
            sessionStore: {
              accessToken: ref(null),
              renewingPromise: ref(null),
            },
            renewedAccessToken: 'access-token-21',
          },
          expected: 'access-token-21',
        },
        {
          input: {
            sessionStore: {
              accessToken: ref('access-token-old-22'),
              renewingPromise: ref(null),
            },
            renewedAccessToken: 'access-token-22',
          },
          expected: 'access-token-22',
        },
      ]

      test.each(cases)('renewedAccessToken: $input.renewedAccessToken', async ({
        input,
        expected,
      }) => {
        const sessionClerk = SessionStoreClerk.create({
          sessionStore: input.sessionStore,
        })

        const renewLauncherFactory = {
          createPayload: () => ({}),
          create: () => ({
            launchRequest: async () => ({
              accessToken: input.renewedAccessToken,
            }),
          }),
        }

        const renewer = SessionRenewer.create({
          sessionStore: input.sessionStore,
          sessionClerk,
          renewLauncherFactory,
        })

        const received = await renewer.renewToken()

        expect(received)
          .toBe(expected)
      })
    })

    describe('to save the renewed access token', () => {
      const cases = [
        {
          input: {
            sessionStore: {
              accessToken: ref(null),
              renewingPromise: ref(null),
            },
            renewedAccessToken: 'access-token-23',
          },
          expected: 'access-token-23',
        },
        {
          input: {
            sessionStore: {
              accessToken: ref('access-token-old-24'),
              renewingPromise: ref(null),
            },
            renewedAccessToken: 'access-token-24',
          },
          expected: 'access-token-24',
        },
      ]

      test.each(cases)('renewedAccessToken: $input.renewedAccessToken', async ({
        input,
        expected,
      }) => {
        const sessionClerk = SessionStoreClerk.create({
          sessionStore: input.sessionStore,
        })

        const renewLauncherFactory = {
          createPayload: () => ({}),
          create: () => ({
            launchRequest: async () => ({
              accessToken: input.renewedAccessToken,
            }),
          }),
        }

        const renewer = SessionRenewer.create({
          sessionStore: input.sessionStore,
          sessionClerk,
          renewLauncherFactory,
        })

        await renewer.renewToken()

        const received = input.sessionStore.accessToken.value
        expect(received)
          .toBe(expected)
      })
    })

    describe('to return null when renewal fails', () => {
      const cases = [
        {
          input: {
            sessionStore: {
              accessToken: ref('access-token-25'),
              renewingPromise: ref(null),
            },
          },
        },
        {
          input: {
            sessionStore: {
              accessToken: ref('access-token-26'),
              renewingPromise: ref(null),
            },
          },
        },
      ]

      test.each(cases)('accessToken: $input.sessionStore.accessToken.value', async ({ input }) => {
        const sessionClerk = SessionStoreClerk.create({
          sessionStore: input.sessionStore,
        })

        const renewLauncherFactory = {
          createPayload: () => ({}),
          create: () => ({
            launchRequest: async () => ({
              accessToken: null,
            }),
          }),
        }

        const renewer = SessionRenewer.create({
          sessionStore: input.sessionStore,
          sessionClerk,
          renewLauncherFactory,
        })

        const received = await renewer.renewToken()

        expect(received)
          .toBeNull()
      })
    })
  })
})

describe('SessionRenewer', () => {
  describe('#renewSession()', () => {
    describe('to return the renewed access token', () => {
      const cases = [
        {
          input: {
            sessionStore: {
              accessToken: ref(null),
              renewingPromise: ref(null),
            },
            renewedAccessToken: 'access-token-31',
          },
          expected: 'access-token-31',
        },
        {
          input: {
            sessionStore: {
              accessToken: ref(null),
              renewingPromise: ref(null),
            },
            renewedAccessToken: 'access-token-32',
          },
          expected: 'access-token-32',
        },
      ]

      test.each(cases)('renewedAccessToken: $input.renewedAccessToken', async ({
        input,
        expected,
      }) => {
        const sessionClerk = SessionStoreClerk.create({
          sessionStore: input.sessionStore,
        })

        const renewLauncherFactory = {
          createPayload: () => ({}),
          create: () => ({
            launchRequest: async () => ({
              accessToken: input.renewedAccessToken,
            }),
          }),
        }

        const renewer = SessionRenewer.create({
          sessionStore: input.sessionStore,
          sessionClerk,
          renewLauncherFactory,
        })

        const received = await renewer.renewSession()

        expect(received)
          .toBe(expected)
      })
    })

    describe('to renew only once for concurrent callers', () => {
      const cases = [
        {
          input: {
            sessionStore: {
              accessToken: ref(null),
              renewingPromise: ref(null),
            },
            renewedAccessToken: 'access-token-33',
          },
          expected: [
            'access-token-33',
            'access-token-33',
          ],
        },
        {
          input: {
            sessionStore: {
              accessToken: ref(null),
              renewingPromise: ref(null),
            },
            renewedAccessToken: 'access-token-34',
          },
          expected: [
            'access-token-34',
            'access-token-34',
          ],
        },
      ]

      test.each(cases)('renewedAccessToken: $input.renewedAccessToken', async ({
        input,
        expected,
      }) => {
        const sessionClerk = SessionStoreClerk.create({
          sessionStore: input.sessionStore,
        })

        const launchRequestTally = jest.fn(async () => ({
          accessToken: input.renewedAccessToken,
        }))

        const renewLauncherFactory = {
          createPayload: () => ({}),
          create: () => ({
            launchRequest: launchRequestTally,
          }),
        }

        const renewer = SessionRenewer.create({
          sessionStore: input.sessionStore,
          sessionClerk,
          renewLauncherFactory,
        })

        const received = await Promise.all([
          renewer.renewSession(),
          renewer.renewSession(),
        ])

        expect(received)
          .toEqual(expected)
        expect(launchRequestTally)
          .toHaveBeenCalledTimes(1)
      })
    })

    describe('to return the in-flight promise when a renewal is already running', () => {
      const cases = [
        {
          input: {
            sessionStore: {
              accessToken: ref(null),
              renewingPromise: ref(Promise.resolve('access-token-35')),
            },
          },
          label: 'access-token-35',
          expected: 'access-token-35',
        },
        {
          input: {
            sessionStore: {
              accessToken: ref(null),
              renewingPromise: ref(Promise.resolve('access-token-36')),
            },
          },
          label: 'access-token-36',
          expected: 'access-token-36',
        },
      ]

      test.each(cases)('label: $label', async ({
        input,
        expected,
      }) => {
        const sessionClerk = SessionStoreClerk.create({
          sessionStore: input.sessionStore,
        })

        const launchRequestTally = jest.fn(async () => ({
          accessToken: 'access-token-unused',
        }))

        const renewLauncherFactory = {
          createPayload: () => ({}),
          create: () => ({
            launchRequest: launchRequestTally,
          }),
        }

        const renewer = SessionRenewer.create({
          sessionStore: input.sessionStore,
          sessionClerk,
          renewLauncherFactory,
        })

        const received = await renewer.renewSession()

        expect(received)
          .toBe(expected)
        expect(launchRequestTally)
          .not
          .toHaveBeenCalled()
      })
    })
  })
})
