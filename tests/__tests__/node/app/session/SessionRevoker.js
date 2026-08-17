import SessionRevoker from '~/app/session/SessionRevoker.js'

import SignOutMutationGraphqlLauncher from '~/app/graphql/client/mutations/signOut/SignOutMutationGraphqlLauncher.js'

describe('SessionRevoker', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#sessionClerk', () => {
        const cases = [
          {
            input: {
              sessionClerk: {
                clearToken: () => null,
              },
              launcherFactory: {
                create: () => null,
              },
            },
          },
          {
            input: {
              sessionClerk: {
                clearToken: () => false,
              },
              launcherFactory: {
                create: () => null,
              },
            },
          },
        ]

        test.each(cases)('sessionClerk: $input.sessionClerk', ({ input }) => {
          const revoker = new SessionRevoker(input)

          expect(revoker)
            .toHaveProperty('sessionClerk', input.sessionClerk)
        })
      })

      describe('#launcherFactory', () => {
        const cases = [
          {
            input: {
              sessionClerk: {
                clearToken: () => null,
              },
              launcherFactory: {
                create: () => 'launcher-01',
              },
            },
          },
          {
            input: {
              sessionClerk: {
                clearToken: () => null,
              },
              launcherFactory: {
                create: () => 'launcher-02',
              },
            },
          },
        ]

        test.each(cases)('launcherFactory: $input.launcherFactory', ({ input }) => {
          const revoker = new SessionRevoker(input)

          expect(revoker)
            .toHaveProperty('launcherFactory', input.launcherFactory)
        })
      })
    })
  })
})

describe('SessionRevoker', () => {
  describe('.create()', () => {
    describe('should be instance of own class', () => {
      const cases = [
        {
          input: {
            sessionClerk: {
              clearToken: () => null,
            },
            launcherFactory: {
              create: () => null,
            },
          },
        },
        {
          input: {
            sessionClerk: {
              clearToken: () => null,
            },
            launcherFactory: {
              create: () => null,
            },
          },
        },
      ]

      test.each(cases)('sessionClerk: $input.sessionClerk', ({ input }) => {
        const received = SessionRevoker.create(input)

        expect(received)
          .toBeInstanceOf(SessionRevoker)
      })
    })

    describe('should use default launcherFactory value', () => {
      const cases = [
        {
          input: {
            sessionClerk: {
              clearToken: () => null,
            },
          },
        },
        {
          input: {
            sessionClerk: {
              clearToken: () => false,
            },
          },
        },
      ]

      test.each(cases)('sessionClerk: $input.sessionClerk', ({ input }) => {
        const received = SessionRevoker.create({
          sessionClerk: input.sessionClerk,
        })

        expect(received)
          .toHaveProperty('launcherFactory', SignOutMutationGraphqlLauncher)
      })
    })
  })
})

describe('SessionRevoker', () => {
  describe('#revokeSession()', () => {
    describe('to revoke on the server before dropping the token', () => {
      test('should call launchRequest then clearToken', async () => {
        const calls = []

        const sessionClerk = {
          clearToken: () => {
            calls.push('clearToken')
          },
        }

        const launcherFactory = {
          createPayload: () => ({}),
          create: () => ({
            launchRequest: async () => {
              calls.push('launchRequest')

              return {}
            },
          }),
        }

        const revoker = SessionRevoker.create({
          sessionClerk,
          launcherFactory,
        })

        await revoker.revokeSession()

        const received = calls
        expect(received)
          .toEqual([
            'launchRequest',
            'clearToken',
          ])
      })
    })
  })
})

describe('SessionRevoker', () => {
  describe('#buildSignOutPayload()', () => {
    describe('to build the payload with credentials included', () => {
      test('should call createPayload with the sign-out options', () => {
        const createPayloadTally = jest.fn(() => ({}))

        const launcherFactory = {
          createPayload: createPayloadTally,
          create: () => ({
            launchRequest: async () => ({}),
          }),
        }

        const revoker = SessionRevoker.create({
          sessionClerk: {
            clearToken: () => null,
          },
          launcherFactory,
        })

        revoker.buildSignOutPayload()

        expect(createPayloadTally)
          .toHaveBeenCalledWith({
            variables: {},
            options: {
              credentials: 'include',
            },
          })
      })
    })
  })
})
