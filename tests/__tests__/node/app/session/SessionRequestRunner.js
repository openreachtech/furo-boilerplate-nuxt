import SessionRequestRunner from '~/app/session/SessionRequestRunner.js'

describe('SessionRequestRunner', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#sessionRenewer', () => {
        const cases = [
          {
            label: 'renewer returning null',
            input: {
              sessionRenewer: {
                renewSession: () => null,
              },
              sessionRevoker: {
                revokeSession: () => null,
              },
            },
          },
          {
            label: 'renewer returning a token',
            input: {
              sessionRenewer: {
                renewSession: () => 'token-02',
              },
              sessionRevoker: {
                revokeSession: () => null,
              },
            },
          },
        ]

        test.each(cases)('label: $label', ({ input }) => {
          const runner = new SessionRequestRunner(input)

          expect(runner)
            .toHaveProperty('sessionRenewer', input.sessionRenewer)
        })
      })

      describe('#sessionRevoker', () => {
        const cases = [
          {
            label: 'revoker returning revoked-01',
            input: {
              sessionRenewer: {
                renewSession: () => null,
              },
              sessionRevoker: {
                revokeSession: () => 'revoked-01',
              },
            },
          },
          {
            label: 'revoker returning revoked-02',
            input: {
              sessionRenewer: {
                renewSession: () => null,
              },
              sessionRevoker: {
                revokeSession: () => 'revoked-02',
              },
            },
          },
        ]

        test.each(cases)('label: $label', ({ input }) => {
          const runner = new SessionRequestRunner(input)

          expect(runner)
            .toHaveProperty('sessionRevoker', input.sessionRevoker)
        })
      })
    })
  })
})

describe('SessionRequestRunner', () => {
  describe('.create()', () => {
    describe('should be instance of own class', () => {
      const cases = [
        {
          label: 'renewer returning null',
          input: {
            sessionRenewer: {
              renewSession: () => null,
            },
            sessionRevoker: {
              revokeSession: () => null,
            },
          },
        },
        {
          label: 'renewer returning a token',
          input: {
            sessionRenewer: {
              renewSession: () => 'token-12',
            },
            sessionRevoker: {
              revokeSession: () => null,
            },
          },
        },
      ]

      test.each(cases)('label: $label', ({ input }) => {
        const received = SessionRequestRunner.create(input)

        expect(received)
          .toBeInstanceOf(SessionRequestRunner)
      })
    })
  })
})

describe('SessionRequestRunner', () => {
  describe('#runRequest()', () => {
    describe('to return the capsule when there is no auth failure', () => {
      test('should not renew or revoke', async () => {
        const capsule = {
          isRefreshTokenReused: () => false,
          isUnauthenticated: () => false,
        }

        const launchRequest = jest.fn(async () => capsule)
        const renewSession = jest.fn(async () => 'token')
        const revokeSession = jest.fn(async () => null)

        const runner = SessionRequestRunner.create({
          sessionRenewer: {
            renewSession,
          },
          sessionRevoker: {
            revokeSession,
          },
        })

        const received = await runner.runRequest({
          launchRequest,
        })

        expect(received)
          .toBe(capsule) // same reference
        expect(renewSession)
          .not
          .toHaveBeenCalled()
        expect(revokeSession)
          .not
          .toHaveBeenCalled()
      })
    })

    describe('to revoke on a refresh-token-reuse response', () => {
      test('should revoke without renewing', async () => {
        const capsule = {
          isRefreshTokenReused: () => true,
          isUnauthenticated: () => false,
        }

        const launchRequest = jest.fn(async () => capsule)
        const renewSession = jest.fn(async () => 'token')
        const revokeSession = jest.fn(async () => null)

        const runner = SessionRequestRunner.create({
          sessionRenewer: {
            renewSession,
          },
          sessionRevoker: {
            revokeSession,
          },
        })

        const received = await runner.runRequest({
          launchRequest,
        })

        expect(received)
          .toBe(capsule) // same reference
        expect(revokeSession)
          .toHaveBeenCalledWith()
        expect(renewSession)
          .not
          .toHaveBeenCalled()
      })
    })

    describe('to recover on an unauthenticated response', () => {
      test('should renew and return the recovered capsule', async () => {
        const unauthenticatedCapsule = {
          isRefreshTokenReused: () => false,
          isUnauthenticated: () => true,
        }
        const recoveredCapsule = {
          isRefreshTokenReused: () => false,
          isUnauthenticated: () => false,
        }

        const launchRequest = jest.fn()
          .mockResolvedValueOnce(unauthenticatedCapsule)
          .mockResolvedValueOnce(recoveredCapsule)
        const renewSession = jest.fn(async () => 'fresh-token')
        const revokeSession = jest.fn(async () => null)

        const runner = SessionRequestRunner.create({
          sessionRenewer: {
            renewSession,
          },
          sessionRevoker: {
            revokeSession,
          },
        })

        const received = await runner.runRequest({
          launchRequest,
        })

        expect(received)
          .toBe(recoveredCapsule) // same reference
        expect(renewSession)
          .toHaveBeenCalledWith()
      })
    })
  })
})

describe('SessionRequestRunner', () => {
  describe('#recoverUnauthenticatedRequest()', () => {
    describe('to retry the request once when the renew succeeds', () => {
      test('should return the retried capsule without revoking', async () => {
        const originalCapsule = {
          isUnauthenticated: () => true,
        }
        const retriedCapsule = {
          isUnauthenticated: () => false,
        }

        const launchRequest = jest.fn(async () => retriedCapsule)
        const renewSession = jest.fn(async () => 'fresh-token')
        const revokeSession = jest.fn(async () => null)

        const runner = SessionRequestRunner.create({
          sessionRenewer: {
            renewSession,
          },
          sessionRevoker: {
            revokeSession,
          },
        })

        const received = await runner.recoverUnauthenticatedRequest({
          launchRequest,
          capsule: originalCapsule,
        })

        expect(received)
          .toBe(retriedCapsule) // same reference
        expect(renewSession)
          .toHaveBeenCalledWith()
        expect(revokeSession)
          .not
          .toHaveBeenCalled()
      })
    })

    describe('to revoke and return the original capsule when the renew fails', () => {
      test('should revoke without retrying', async () => {
        const originalCapsule = {
          isUnauthenticated: () => true,
        }

        const launchRequest = jest.fn(async () => null)
        const renewSession = jest.fn(async () => null)
        const revokeSession = jest.fn(async () => null)

        const runner = SessionRequestRunner.create({
          sessionRenewer: {
            renewSession,
          },
          sessionRevoker: {
            revokeSession,
          },
        })

        const received = await runner.recoverUnauthenticatedRequest({
          launchRequest,
          capsule: originalCapsule,
        })

        expect(received)
          .toBe(originalCapsule) // same reference
        expect(revokeSession)
          .toHaveBeenCalledWith()
        expect(launchRequest)
          .not
          .toHaveBeenCalled()
      })
    })
  })
})
