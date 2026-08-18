import SessionGatekeeper from '~/app/session/SessionGatekeeper.js'

describe('SessionGatekeeper', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#sessionClerk', () => {
        const cases = [
          {
            label: 'clerk with a token',
            input: {
              sessionClerk: {
                existsToken: () => true,
              },
              sessionRenewer: {
                renewSession: () => null,
              },
            },
          },
          {
            label: 'clerk without a token',
            input: {
              sessionClerk: {
                existsToken: () => false,
              },
              sessionRenewer: {
                renewSession: () => null,
              },
            },
          },
        ]

        test.each(cases)('label: $label', ({ input }) => {
          const gatekeeper = new SessionGatekeeper(input)

          expect(gatekeeper)
            .toHaveProperty('sessionClerk', input.sessionClerk)
        })
      })

      describe('#sessionRenewer', () => {
        const cases = [
          {
            label: 'renewer returning null',
            input: {
              sessionClerk: {
                existsToken: () => false,
              },
              sessionRenewer: {
                renewSession: () => null,
              },
            },
          },
          {
            label: 'renewer returning a token',
            input: {
              sessionClerk: {
                existsToken: () => false,
              },
              sessionRenewer: {
                renewSession: () => 'token-02',
              },
            },
          },
        ]

        test.each(cases)('label: $label', ({ input }) => {
          const gatekeeper = new SessionGatekeeper(input)

          expect(gatekeeper)
            .toHaveProperty('sessionRenewer', input.sessionRenewer)
        })
      })
    })
  })
})

describe('SessionGatekeeper', () => {
  describe('.create()', () => {
    describe('should be instance of own class', () => {
      const cases = [
        {
          label: 'clerk with a token',
          input: {
            sessionClerk: {
              existsToken: () => true,
            },
            sessionRenewer: {
              renewSession: () => null,
            },
          },
        },
        {
          label: 'clerk without a token',
          input: {
            sessionClerk: {
              existsToken: () => false,
            },
            sessionRenewer: {
              renewSession: () => 'token-12',
            },
          },
        },
      ]

      test.each(cases)('label: $label', ({ input }) => {
        const received = SessionGatekeeper.create(input)

        expect(received)
          .toBeInstanceOf(SessionGatekeeper)
      })
    })
  })
})

describe('SessionGatekeeper', () => {
  describe('#establishesSession()', () => {
    describe('to pass through without renewing when a token is already held', () => {
      test('should return true and not renew', async () => {
        const renewSession = jest.fn(async () => null)

        const gatekeeper = SessionGatekeeper.create({
          sessionClerk: {
            existsToken: () => true,
          },
          sessionRenewer: {
            renewSession,
          },
        })

        const actual = await gatekeeper.establishesSession()

        expect(actual)
          .toBeTruthy()
        expect(renewSession)
          .not
          .toHaveBeenCalled()
      })
    })

    describe('to renew when no token is held and the renew succeeds', () => {
      test('should renew and return true', async () => {
        const renewSession = jest.fn(async () => 'fresh-token')

        const gatekeeper = SessionGatekeeper.create({
          sessionClerk: {
            existsToken: () => false,
          },
          sessionRenewer: {
            renewSession,
          },
        })

        const actual = await gatekeeper.establishesSession()

        expect(actual)
          .toBeTruthy()
        expect(renewSession)
          .toHaveBeenCalledWith()
      })
    })

    describe('to return false when no token is held and the renew fails', () => {
      test('should renew and return false', async () => {
        const renewSession = jest.fn(async () => null)

        const gatekeeper = SessionGatekeeper.create({
          sessionClerk: {
            existsToken: () => false,
          },
          sessionRenewer: {
            renewSession,
          },
        })

        const actual = await gatekeeper.establishesSession()

        expect(actual)
          .toBeFalsy()
        expect(renewSession)
          .toHaveBeenCalledWith()
      })
    })
  })
})
