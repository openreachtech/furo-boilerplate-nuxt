import SessionRequestAuthorizer from '~/app/session/SessionRequestAuthorizer.js'

describe('SessionRequestAuthorizer', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#sessionClerk', () => {
        const cases = [
          {
            label: 'clerk returning null',
            input: {
              sessionClerk: {
                retrieveToken: () => null,
              },
            },
          },
          {
            label: 'clerk returning a token',
            input: {
              sessionClerk: {
                retrieveToken: () => 'token-02',
              },
            },
          },
        ]

        test.each(cases)('label: $label', ({ input }) => {
          const authorizer = new SessionRequestAuthorizer(input)

          expect(authorizer)
            .toHaveProperty('sessionClerk', input.sessionClerk)
        })
      })
    })
  })
})

describe('SessionRequestAuthorizer', () => {
  describe('.create()', () => {
    describe('should be instance of own class', () => {
      const cases = [
        {
          label: 'clerk returning null',
          input: {
            sessionClerk: {
              retrieveToken: () => null,
            },
          },
        },
        {
          label: 'clerk returning a token',
          input: {
            sessionClerk: {
              retrieveToken: () => 'token-12',
            },
          },
        },
      ]

      test.each(cases)('label: $label', ({ input }) => {
        const received = SessionRequestAuthorizer.create(input)

        expect(received)
          .toBeInstanceOf(SessionRequestAuthorizer)
      })
    })
  })
})

describe('SessionRequestAuthorizer', () => {
  describe('#buildAuthenticatedRequestArguments()', () => {
    describe('to attach the access-token header when a token is held', () => {
      const cases = [
        {
          factoryParams: {
            sessionClerk: {
              retrieveToken: () => 'token-aaa',
            },
          },
          params: {
            requestArguments: {
              variables: {
                id: 1,
              },
            },
          },
          expected: {
            variables: {
              id: 1,
            },
            options: {
              headers: {
                'x-renchan-access-token': 'token-aaa',
              },
            },
          },
        },
        {
          factoryParams: {
            sessionClerk: {
              retrieveToken: () => 'token-aaa',
            },
          },
          params: {
            requestArguments: {
              variables: {
                id: 2,
              },
              options: {
                headers: {
                  'x-existing-header': 'keep-me',
                },
              },
            },
          },
          expected: {
            variables: {
              id: 2,
            },
            options: {
              headers: {
                'x-existing-header': 'keep-me',
                'x-renchan-access-token': 'token-aaa',
              },
            },
          },
        },
      ]

      test.each(cases)('requestArguments.variables.id: $params.requestArguments.variables.id', ({
        factoryParams,
        params,
        expected,
      }) => {
        const authorizer = SessionRequestAuthorizer.create(factoryParams)

        const actual = authorizer.buildAuthenticatedRequestArguments(params)

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('should return the request arguments unchanged when no token is held', () => {
      const cases = [
        {
          factoryParams: {
            sessionClerk: {
              retrieveToken: () => null,
            },
          },
          params: {
            requestArguments: {
              variables: {
                id: 9,
              },
            },
          },
        },
        {
          factoryParams: {
            sessionClerk: {
              retrieveToken: () => '',
            },
          },
          params: {
            requestArguments: {
              variables: {
                id: 10,
              },
              options: {
                headers: {
                  'x-existing-header': 'leave-me',
                },
              },
            },
          },
        },
      ]

      test.each(cases)('requestArguments.variables.id: $params.requestArguments.variables.id', ({
        factoryParams,
        params,
      }) => {
        const authorizer = SessionRequestAuthorizer.create(factoryParams)

        const actual = authorizer.buildAuthenticatedRequestArguments(params)

        expect(actual)
          .toBe(params.requestArguments) // same reference
      })
    })
  })
})

describe('SessionRequestAuthorizer', () => {
  describe('#buildOptionsWithToken()', () => {
    describe('to merge the access-token header into the options', () => {
      const cases = [
        {
          factoryParams: {
            sessionClerk: {
              retrieveToken: () => null,
            },
          },
          params: {
            options: {
              credentials: 'include',
            },
            token: 'token-11',
          },
          expected: {
            credentials: 'include',
            headers: {
              'x-renchan-access-token': 'token-11',
            },
          },
        },
        {
          factoryParams: {
            sessionClerk: {
              retrieveToken: () => null,
            },
          },
          params: {
            options: {
              headers: {
                'x-existing-header': 'keep-me',
              },
            },
            token: 'token-22',
          },
          expected: {
            headers: {
              'x-existing-header': 'keep-me',
              'x-renchan-access-token': 'token-22',
            },
          },
        },
      ]

      test.each(cases)('token: $params.token', ({
        factoryParams,
        params,
        expected,
      }) => {
        const authorizer = SessionRequestAuthorizer.create(factoryParams)

        const actual = authorizer.buildOptionsWithToken(params)

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})

describe('SessionRequestAuthorizer', () => {
  describe('#extractHeaders()', () => {
    describe('to return the existing headers', () => {
      const cases = [
        {
          label: 'a single header',
          factoryParams: {
            sessionClerk: {
              retrieveToken: () => null,
            },
          },
          params: {
            options: {
              headers: {
                'x-single-header': 'value-01',
              },
            },
          },
          expected: {
            'x-single-header': 'value-01',
          },
        },
        {
          label: 'two headers',
          factoryParams: {
            sessionClerk: {
              retrieveToken: () => null,
            },
          },
          params: {
            options: {
              headers: {
                'x-first-header': 'value-02',
                'x-second-header': 'value-03',
              },
            },
          },
          expected: {
            'x-first-header': 'value-02',
            'x-second-header': 'value-03',
          },
        },
      ]

      test.each(cases)('label: $label', ({
        factoryParams,
        params,
        expected,
      }) => {
        const authorizer = SessionRequestAuthorizer.create(factoryParams)

        const actual = authorizer.extractHeaders(params)

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('should return an empty object when the options carry no headers', () => {
      const cases = [
        {
          label: 'empty options',
          factoryParams: {
            sessionClerk: {
              retrieveToken: () => null,
            },
          },
          params: {
            options: {},
          },
          expected: {},
        },
        {
          label: 'options without headers',
          factoryParams: {
            sessionClerk: {
              retrieveToken: () => null,
            },
          },
          params: {
            options: {
              credentials: 'include',
            },
          },
          expected: {},
        },
      ]

      test.each(cases)('label: $label', ({
        factoryParams,
        params,
        expected,
      }) => {
        const authorizer = SessionRequestAuthorizer.create(factoryParams)

        const actual = authorizer.extractHeaders(params)

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})
