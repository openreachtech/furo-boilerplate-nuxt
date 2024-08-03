import {
  ConstructorSpyGenerator,
} from '@openreachtech/renchan-test-tools'

import BaseGraphqlLauncher from '~/modules/client/BaseGraphqlLauncher'
import BaseGraphqlPayload from '~/modules/client/BaseGraphqlPayload'
import BaseGraphqlCapsule from '~/modules/client/BaseGraphqlCapsule'

describe('BaseGraphqlLauncher', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      describe('#config', () => {
        const cases = [
          {
            params: {
              config: {
                ENDPOINT_URL: 'http://example.com/graphql-customer',
              },
            },
          },
          {
            params: {
              config: {
                ENDPOINT_URL: 'http://example.com/graphql-admin',
              },
            },
          },
        ]

        test.each(cases)('ENDPOINT_URL: $params.config.ENDPOINT_URL', ({ params }) => {
          const launcher = new BaseGraphqlLauncher(params)

          expect(launcher)
            .toHaveProperty('config', params.config)
        })
      })
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            config: {
              ENDPOINT_URL: 'http://example.com/graphql-customer',
            },
          },
        },
        {
          params: {
            config: {
              ENDPOINT_URL: 'http://example.com/graphql-admin',
            },
          },
        },
      ]

      test.each(cases)('ENDPOINT_URL: $params.config.ENDPOINT_URL', ({ params }) => {
        const launcher = BaseGraphqlLauncher.create(params)

        expect(launcher)
          .toBeInstanceOf(BaseGraphqlLauncher)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            config: {
              ENDPOINT_URL: 'http://example.com/graphql-customer',
            },
          },
        },
        {
          params: {
            config: {
              ENDPOINT_URL: 'http://example.com/graphql-admin',
            },
          },
        },
      ]

      test.each(cases)('ENDPOINT_URL: $params.config.ENDPOINT_URL', ({ params }) => {
        const DerivedClass = ConstructorSpyGenerator.create({ jest })
          .generateSpyKitClass(BaseGraphqlLauncher)

        DerivedClass.create(params)

        expect(DerivedClass.__spy__)
          .toHaveBeenCalledWith(params)
      })
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('#get:Ctor', () => {
    describe('to be own class', () => {
      const cases = [
        {
          params: {
            config: {
              ENDPOINT_URL: 'http://example.com/graphql-customer',
            },
          },
        },
        {
          params: {
            config: {
              ENDPOINT_URL: 'http://example.com/graphql-admin',
            },
          },
        },
      ]

      test.each(cases)('ENDPOINT_URL: $params.config.ENDPOINT_URL', ({ params }) => {
        const launcher = BaseGraphqlLauncher.create(params)

        expect(launcher.Ctor)
          .toBe(BaseGraphqlLauncher)
      })
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('.get:Payload', () => {
    test('to throw', () => {
      expect(() => BaseGraphqlLauncher.Payload)
        .toThrow('this function must be inherited')
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('.get:Capsule', () => {
    test('to throw', () => {
      expect(() => BaseGraphqlLauncher.Capsule)
        .toThrow('this function must be inherited')
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('.createResultCapsuleAsPending()', () => {
    describe('to be instance of BaseGraphqlCapsule', () => {
      const cases = [
        {
          params: {
            CapsuleClass: class AlphaCapsule extends BaseGraphqlCapsule {},
          },
        },
        {
          params: {
            CapsuleClass: class BetaCapsule extends BaseGraphqlCapsule {},
          },
        },
      ]

      test.each(cases)('Capsule: $params.CapsuleClass.name', ({ params }) => {
        const CapsuleSpy = jest.spyOn(BaseGraphqlLauncher, 'Capsule', 'get')
          .mockReturnValue(params.CapsuleClass)

        const capsule = BaseGraphqlLauncher.createResultCapsuleAsPending()

        expect(capsule)
          .toBeInstanceOf(params.CapsuleClass)

        CapsuleSpy.mockRestore()
      })
    })

    describe('to call Capsule factory method', () => {
      const cases = [
        {
          params: {
            CapsuleClass: class AlphaCapsule extends BaseGraphqlCapsule {},
          },
        },
        {
          params: {
            CapsuleClass: class BetaCapsule extends BaseGraphqlCapsule {},
          },
        },
      ]

      test.each(cases)('Capsule: $params.CapsuleClass.name', ({ params }) => {
        const expected = {
          rawResponse: null,
          payload: null,
          result: null,
        }

        const CapsuleSpy = jest.spyOn(BaseGraphqlLauncher, 'Capsule', 'get')
          .mockReturnValue(params.CapsuleClass)
        const createSpy = jest.spyOn(params.CapsuleClass, 'create')

        BaseGraphqlLauncher.createResultCapsuleAsPending(params)

        expect(createSpy)
          .toHaveBeenCalledWith(expected)

        CapsuleSpy.mockRestore()
        createSpy.mockRestore()
      })
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('.createResultCapsuleAsInvalidVariablesError()', () => {
    describe('to be instance of BaseGraphqlCapsule', () => {
      const capsuleCases = [
        {
          params: {
            CapsuleClass: class AlphaCapsule extends BaseGraphqlCapsule {},
          },
        },
        {
          params: {
            CapsuleClass: class BetaCapsule extends BaseGraphqlCapsule {},
          },
        },
      ]

      describe.each(capsuleCases)('Capsule: $params.CapsuleClass.name', ({ params }) => {
        const cases = [
          {
            args: {
              payload: new BaseGraphqlPayload({
                queryTemplate: /* GraphQL */ `
                  query {
                    customer: {
                      id
                    }
                  }
                }`,
                variables: null,
              }),
            },
          },
          {
            args: {
              payload: new BaseGraphqlPayload({
                queryTemplate: /* GraphQL */ `
                  query {
                    admin: {
                      id
                    }
                  }
                }`,
                variables: null,
              }),
            },
          },
        ]

        test.each(cases)('payload: $args.payload', ({ args }) => {
          const CapsuleSpy = jest.spyOn(BaseGraphqlLauncher, 'Capsule', 'get')
            .mockReturnValue(params.CapsuleClass)

          const currentArgs = {
            payload: args.payload,
          }

          const capsule = BaseGraphqlLauncher.createResultCapsuleAsInvalidVariablesError(currentArgs)

          expect(capsule)
            .toBeInstanceOf(params.CapsuleClass)

          CapsuleSpy.mockRestore()
        })
      })
    })

    describe('to call Capsule factory method', () => {
      const capsuleCases = [
        {
          params: {
            CapsuleClass: class AlphaCapsule extends BaseGraphqlCapsule {},
          },
        },
        {
          params: {
            CapsuleClass: class BetaCapsule extends BaseGraphqlCapsule {},
          },
        },
      ]

      describe.each(capsuleCases)('Capsule: $params.CapsuleClass.name', ({ params }) => {
        const cases = [
          {
            args: {
              payload: new BaseGraphqlPayload({
                queryTemplate: /* GraphQL */ `
                  query {
                    customer: {
                      id
                    }
                  }
                }`,
                variables: null,
              }),
            },
          },
          {
            args: {
              payload: new BaseGraphqlPayload({
                queryTemplate: /* GraphQL */ `
                  query {
                    admin: {
                      id
                    }
                  }
                }`,
                variables: null,
              }),
            },
          },
        ]

        test.each(cases)('payload: $args.payload', ({ args }) => {
          const expected = {
            rawResponse: null,
            payload: args.payload,
            result: null,
          }

          const CapsuleSpy = jest.spyOn(BaseGraphqlLauncher, 'Capsule', 'get')
            .mockReturnValue(params.CapsuleClass)
          const createSpy = jest.spyOn(params.CapsuleClass, 'create')

          const currentArgs = {
            payload: args.payload,
          }

          BaseGraphqlLauncher.createResultCapsuleAsInvalidVariablesError(currentArgs)

          expect(createSpy)
            .toHaveBeenCalledWith(expected)

          CapsuleSpy.mockRestore()
          createSpy.mockRestore()
        })
      })
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('.createResultCapsuleAsNetworkError()', () => {
    describe('to be instance of BaseGraphqlCapsule', () => {
      const capsuleCases = [
        {
          params: {
            CapsuleClass: class AlphaCapsule extends BaseGraphqlCapsule {},
          },
        },
        {
          params: {
            CapsuleClass: class BetaCapsule extends BaseGraphqlCapsule {},
          },
        },
      ]

      describe.each(capsuleCases)('Capsule: $params.CapsuleClass.name', ({ params }) => {
        const cases = [
          {
            args: {
              payload: new BaseGraphqlPayload({
                queryTemplate: /* GraphQL */ `
                  query {
                    customer: {
                      id
                    }
                  }
                }`,
                variables: null,
              }),
            },
          },
          {
            args: {
              payload: new BaseGraphqlPayload({
                queryTemplate: /* GraphQL */ `
                  query {
                    admin: {
                      id
                    }
                  }
                }`,
                variables: null,
              }),
            },
          },
        ]

        test.each(cases)('payload: $args.payload', ({ args }) => {
          const CapsuleSpy = jest.spyOn(BaseGraphqlLauncher, 'Capsule', 'get')
            .mockReturnValue(params.CapsuleClass)

          const currentArgs = {
            payload: args.payload,
          }

          const capsule = BaseGraphqlLauncher.createResultCapsuleAsNetworkError(currentArgs)

          expect(capsule)
            .toBeInstanceOf(params.CapsuleClass)

          CapsuleSpy.mockRestore()
        })
      })
    })

    describe('to call Capsule factory method', () => {
      const capsuleCases = [
        {
          params: {
            CapsuleClass: class AlphaCapsule extends BaseGraphqlCapsule {},
          },
        },
        {
          params: {
            CapsuleClass: class BetaCapsule extends BaseGraphqlCapsule {},
          },
        },
      ]

      describe.each(capsuleCases)('Capsule: $params.CapsuleClass.name', ({ params }) => {
        const cases = [
          {
            args: {
              payload: new BaseGraphqlPayload({
                queryTemplate: /* GraphQL */ `
                  query {
                    customer: {
                      id
                    }
                  }
                }`,
                variables: null,
              }),
            },
          },
          {
            args: {
              payload: new BaseGraphqlPayload({
                queryTemplate: /* GraphQL */ `
                  query {
                    admin: {
                      id
                    }
                  }
                }`,
                variables: null,
              }),
            },
          },
        ]

        test.each(cases)('payload: $args.payload', ({ args }) => {
          const expected = {
            rawResponse: null,
            payload: args.payload,
            result: null,
          }

          const CapsuleSpy = jest.spyOn(BaseGraphqlLauncher, 'Capsule', 'get')
            .mockReturnValue(params.CapsuleClass)
          const createSpy = jest.spyOn(params.CapsuleClass, 'create')

          const currentArgs = {
            payload: args.payload,
          }

          BaseGraphqlLauncher.createResultCapsuleAsNetworkError(currentArgs)

          expect(createSpy)
            .toHaveBeenCalledWith(expected)

          CapsuleSpy.mockRestore()
          createSpy.mockRestore()
        })
      })
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('.createResultCapsuleAsJsonParseError()', () => {
    describe('to be instance of BaseGraphqlCapsule', () => {
      const capsuleCases = [
        {
          params: {
            CapsuleClass: class AlphaCapsule extends BaseGraphqlCapsule {},
          },
        },
        {
          params: {
            CapsuleClass: class BetaCapsule extends BaseGraphqlCapsule {},
          },
        },
      ]

      describe.each(capsuleCases)('Capsule: $params.CapsuleClass.name', ({ params }) => {
        const cases = [
          {
            args: {
              rawResponse: new Response(),
              payload: new BaseGraphqlPayload({
                queryTemplate: /* GraphQL */ `
                  query {
                    customer: {
                      id
                    }
                  }
                }`,
                variables: null,
              }),
            },
          },
          {
            args: {
              rawResponse: new Response(),
              payload: new BaseGraphqlPayload({
                queryTemplate: /* GraphQL */ `
                  query {
                    admin: {
                      id
                    }
                  }
                }`,
                variables: null,
              }),
            },
          },
        ]

        test.each(cases)('payload: $args.payload', ({ args }) => {
          const CapsuleSpy = jest.spyOn(BaseGraphqlLauncher, 'Capsule', 'get')
            .mockReturnValue(params.CapsuleClass)

          const currentArgs = {
            rawResponse: args.rawResponse,
            payload: args.payload,
          }

          const capsule = BaseGraphqlLauncher.createResultCapsuleAsJsonParseError(currentArgs)

          expect(capsule)
            .toBeInstanceOf(params.CapsuleClass)

          CapsuleSpy.mockRestore()
        })
      })
    })

    describe('to call Capsule factory method', () => {
      const capsuleCases = [
        {
          params: {
            CapsuleClass: class AlphaCapsule extends BaseGraphqlCapsule {},
          },
        },
        {
          params: {
            CapsuleClass: class BetaCapsule extends BaseGraphqlCapsule {},
          },
        },
      ]

      describe.each(capsuleCases)('Capsule: $params.CapsuleClass.name', ({ params }) => {
        const cases = [
          {
            args: {
              rawResponse: new Response(),
              payload: new BaseGraphqlPayload({
                queryTemplate: /* GraphQL */ `
                  query {
                    customer: {
                      id
                    }
                  }
                }`,
                variables: null,
              }),
            },
          },
          {
            args: {
              rawResponse: new Response(),
              payload: new BaseGraphqlPayload({
                queryTemplate: /* GraphQL */ `
                  query {
                    admin: {
                      id
                    }
                  }
                }`,
                variables: null,
              }),
            },
          },
        ]

        test.each(cases)('payload: $args.payload', ({ args }) => {
          const expected = {
            rawResponse: args.rawResponse,
            payload: args.payload,
            result: null,
          }

          const CapsuleSpy = jest.spyOn(BaseGraphqlLauncher, 'Capsule', 'get')
            .mockReturnValue(params.CapsuleClass)
          const createSpy = jest.spyOn(params.CapsuleClass, 'create')

          const currentArgs = {
            rawResponse: args.rawResponse,
            payload: args.payload,
          }

          BaseGraphqlLauncher.createResultCapsuleAsJsonParseError(currentArgs)

          expect(createSpy)
            .toHaveBeenCalledWith(expected)

          CapsuleSpy.mockRestore()
          createSpy.mockRestore()
        })
      })
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('#createPayload()', () => {
    const config = {
      ENDPOINT_URL: 'http://example.com/graphql-customer',
    }

    describe('to be instance of Payload', () => {
      const cases = [
        {
          params: {
            Payload: class CustomerPayload extends BaseGraphqlPayload {
              /** @inheritdoc */
              static get document () {
                return `query {
                  customer (input: $input) {
                    id
                  }
                }`
              }
            },
            variables: {
              input: {
                id: 10001,
              },
            },
            options: {
              mode: 'cors',
            },
          },
        },
        {
          params: {
            Payload: class AdminPayload extends BaseGraphqlPayload {
              /** @inheritdoc */
              static get document () {
                return `query {
                  admin (input: $input) {
                    id
                  }
                }`
              }
            },
            variables: {},
            options: {
              credentials: 'omit',
            },
          },
        },
      ]

      test.each(cases)('Payload: $params.Payload.name', ({ params }) => {
        const expected = {
          variables: params.variables,
          options: params.options,
        }

        const PayloadSpy = jest.spyOn(BaseGraphqlLauncher, 'Payload', 'get')
          .mockReturnValue(params.Payload)
        const createSpy = jest.spyOn(params.Payload, 'create')

        const launcher = BaseGraphqlLauncher.create({
          config,
        })
        const args = {
          variables: params.variables,
          options: params.options,
        }

        const payload = launcher.createPayload(args)

        expect(payload)
          .toBeInstanceOf(params.Payload)

        expect(createSpy)
          .toHaveBeenCalledWith(expected)

        PayloadSpy.mockRestore()
      })
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('.get:fetch', () => {
    test('to be fixed value', () => {
      const actual = BaseGraphqlLauncher.fetch

      expect(actual)
        .toBe(fetch) // same reference
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('#get:endpointUrl', () => {
    const cases = [
      {
        params: {
          config: {
            ENDPOINT_URL: 'http://example.com/graphql-customer',
          },
        },
        expected: 'http://example.com/graphql-customer',
      },
      {
        params: {
          config: {
            ENDPOINT_URL: 'http://example.com/graphql-admin',
          },
        },
        expected: 'http://example.com/graphql-admin',
      },
    ]

    test.each(cases)('ENDPOINT_URL: $params.config.ENDPOINT_URL', ({ params, expected }) => {
      const launcher = BaseGraphqlLauncher.create(params)

      const actual = launcher.endpointUrl

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('.createResultCapsule()', () => {
    describe('to be instance of BaseGraphqlCapsule', () => {
      const MockGraphqlCapsule = class extends BaseGraphqlCapsule {}

      const cases = [
        {
          params: {
            rawResponse: new Response(),
            payload: new BaseGraphqlPayload({
              queryTemplate: /* GraphQL */ `
                query {
                  customer {
                    id
                  }
                }
              `,
              variables: {
                input: {
                  customerId: 10001,
                },
              },
            }),
            result: {
              data: {
                customer: {
                  id: 10001,
                },
              },
            },
          },
        },
        {
          params: {
            rawResponse: new Response(),
            payload: new BaseGraphqlPayload({
              queryTemplate: /* GraphQL */ `
                query {
                  admin {
                    id
                  }
                }
              `,
              variables: {
                input: {
                  adminId: 20001,
                },
              },
            }),
            result: {
              data: {
                admin: {
                  id: 20001,
                },
              },
            },
          },
        },
      ]

      test.each(cases)('result: $params.result', ({ params }) => {
        const CapsuleSpy = jest.spyOn(BaseGraphqlLauncher, 'Capsule', 'get')
          .mockReturnValue(MockGraphqlCapsule)

        const capsule = BaseGraphqlLauncher.createResultCapsule(params)

        expect(capsule)
          .toBeInstanceOf(BaseGraphqlCapsule)

        CapsuleSpy.mockRestore()
      })
    })

    describe('to call Capsule factory method', () => {
      const MockGraphqlCapsule = class extends BaseGraphqlCapsule {}

      const cases = [
        {
          params: {
            rawResponse: new Response(),
            payload: new BaseGraphqlPayload({
              queryTemplate: /* GraphQL */ `
                query {
                  customer {
                    id
                  }
                }
              `,
              variables: {
                input: {
                  customerId: 10001,
                },
              },
            }),
            result: {
              data: {
                customer: {
                  id: 10001,
                },
              },
            },
          },
        },
        {
          params: {
            rawResponse: new Response(),
            payload: new BaseGraphqlPayload({
              queryTemplate: /* GraphQL */ `
                query {
                  admin {
                    id
                  }
                }
              `,
              variables: {
                input: {
                  adminId: 20001,
                },
              },
            }),
            result: {
              data: {
                admin: {
                  id: 20001,
                },
              },
            },
          },
        },
      ]

      test.each(cases)('result: $params.result', ({ params }) => {
        const CapsuleSpy = jest.spyOn(BaseGraphqlLauncher, 'Capsule', 'get')
          .mockReturnValue(MockGraphqlCapsule)
        const createSpy = jest.spyOn(MockGraphqlCapsule, 'create')

        BaseGraphqlLauncher.createResultCapsule(params)

        expect(createSpy)
          .toHaveBeenCalledWith(params)

        CapsuleSpy.mockRestore()
        createSpy.mockRestore()
      })
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('#invokeFetchQuery()', () => {
    describe('to return response', () => {
      const customerQueryTemplate = /* GraphQL */ `
        query {
          customer {
            id
          }
        }
      }`
      const adminQueryTemplate = /* GraphQL */ `
        query {
          admin {
            id
          }
        }
      `

      const cases = [
        {
          params: {
            endpointUrl: 'http://example.com/graphql-customer',
            payload: new BaseGraphqlPayload({
              queryTemplate: customerQueryTemplate,
              variables: null,
            }),
            options: {
              headers: new Headers({
                'x-access-token': 'access-token-01',
              }),
            },
          },
          tally: {
            request: new Request('http://example.com/graphql-customer', {
              method: 'POST',
              headers: new Headers({
                'content-type': 'application/json',
                'x-access-token': 'access-token-01',
              }),
              body: JSON.stringify({
                query: customerQueryTemplate,
              }),
            }),
          },
        },
        {
          params: {
            endpointUrl: 'http://example.com/graphql-admin',
            payload: new BaseGraphqlPayload({
              queryTemplate: adminQueryTemplate,
              variables: null,
            }),
            options: {
              headers: new Headers({
                'content-type': 'application/json',
                'x-access-token': 'access-token-02',
              }),
            },
          },
          tally: {
            request: new Request('http://example.com/graphql-admin', {
              method: 'POST',
              headers: new Headers({
                'content-type': 'application/json',
                'x-access-token': 'access-token-02',
              }),
              body: JSON.stringify({
                query: adminQueryTemplate,
              }),
            }),
          },
        },
      ]

      test.each(cases)('endpointUrl: $params.request.endpointUrl', async ({ params, tally }) => {
        const responseTally = new Response()

        const createFetchRequestSpy = jest.spyOn(params.payload, 'createFetchRequest')
          .mockReturnValue(tally.request)
        const fetchSpy = jest.spyOn(globalThis, 'fetch')
          .mockResolvedValue(responseTally)

        const launcher = BaseGraphqlLauncher.create({
          config: {
            ENDPOINT_URL: params.endpointUrl,
          },
        })
        const args = {
          payload: params.payload,
          options: params.options,
        }

        const actual = await launcher.invokeFetchQuery(args)

        expect(actual)
          .toBe(responseTally) // same instance
        expect(fetchSpy)
          .toHaveBeenCalledWith(tally.request)

        createFetchRequestSpy.mockRestore()
        fetchSpy.mockRestore()
      })
    })

    describe('to throw on fetch', () => {
      const customerQueryTemplate = /* GraphQL */ `
        query {
          customer {
            id
          }
        }
      }`
      const adminQueryTemplate = /* GraphQL */ `
        query {
          admin {
            id
          }
        }
      `

      const cases = [
        {
          params: {
            endpointUrl: 'http://example.com/graphql-customer',
            payload: new BaseGraphqlPayload({
              queryTemplate: customerQueryTemplate,
              variables: null,
            }),
            options: {
              headers: new Headers({
                'x-access-token': 'access-token-01',
              }),
            },
          },
          tally: {
            request: new Request('http://example.com/graphql-customer', {
              method: 'POST',
              headers: new Headers({
                'content-type': 'application/json',
                'x-access-token': 'access-token-01',
              }),
              body: JSON.stringify({
                query: customerQueryTemplate,
              }),
            }),
          },
        },
        {
          params: {
            endpointUrl: 'http://example.com/graphql-admin',
            payload: new BaseGraphqlPayload({
              queryTemplate: adminQueryTemplate,
              variables: null,
            }),
            options: {
              headers: new Headers({
                'content-type': 'application/json',
                'x-access-token': 'access-token-02',
              }),
            },
          },
          tally: {
            request: new Request('http://example.com/graphql-admin', {
              method: 'POST',
              headers: new Headers({
                'content-type': 'application/json',
                'x-access-token': 'access-token-02',
              }),
              body: JSON.stringify({
                query: adminQueryTemplate,
              }),
            }),
          },
        },
      ]

      test.each(cases)('endpointUrl: $params.request.endpointUrl', async ({ params, tally }) => {
        const createFetchRequestSpy = jest.spyOn(params.payload, 'createFetchRequest')
          .mockReturnValue(tally.request)
        const fetchSpy = jest.spyOn(globalThis, 'fetch')
          .mockRejectedValue(new Error('Network Error'))

        const launcher = BaseGraphqlLauncher.create({
          config: {
            ENDPOINT_URL: params.endpointUrl,
          },
        })
        const args = {
          payload: params.payload,
          options: params.options,
        }

        const actual = await launcher.invokeFetchQuery(args)

        expect(actual)
          .toBeNull()
        expect(fetchSpy)
          .toHaveBeenCalledWith(tally.request)

        createFetchRequestSpy.mockRestore()
        fetchSpy.mockRestore()
      })
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('#generateFetchResult()', () => {
    describe('to be parsed JSON object', () => {
      const cases = [
        {
          params: {
            response: new Response(`{
              "data": {
                "customer": {
                  "id": 10001
                }
              }
            }`),
          },
          expected: {
            data: {
              customer: {
                id: 10001,
              },
            },
          },
        },
        {
          params: {
            response: new Response(`{
              "data": {
                "customer": {
                  "id": 10002
                }
              }
            }`),
          },
          expected: {
            data: {
              customer: {
                id: 10002,
              },
            },
          },
        },
        {
          params: {
            response: new Response(`{
              "errors": [
                {
                  "message": "Error message 01"
                },
                {
                  "message": "Error message 02"
                }
              ]
            }`),
          },
          expected: {
            errors: [
              {
                message: 'Error message 01',
              },
              {
                message: 'Error message 02',
              },
            ],
          },
        },
        {
          params: {
            response: new Response(`{
              "errors": [
                {
                  "message": "Error message 03"
                }
              ]
            }`),
          },
          expected: {
            errors: [
              {
                message: 'Error message 03',
              },
            ],
          },
        },
      ]

      test.each(cases)('response: $params.response', async ({ params, expected }) => {
        const launcher = BaseGraphqlLauncher.create({
          config: {
            ENDPOINT_URL: 'http://example.com/graphql-customer',
          },
        })

        const actual = await launcher.generateFetchResult(params)

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('on JSON parsed error', () => {
      const cases = [
        {
          params: {
            response: new Response(`{
              "data": {
                "customer": {
                  "id": 10001
                }
              }
            }}`), // ERROR: last } is doubled
          },
        },
        {
          params: {
            response: new Response(`{
              "data": {
                "customer": {
                  "id": 10002
                }
              }
            }}`), // ERROR: last } is doubled
          },
        },
        {
          params: {
            response: new Response(`{
              "errors": [
                {
                  "message": "Error message 01"
                },
                {
                  "message": "Error message 02"
                }
              ]
            }}`), // ERROR: last } is doubled
          },
        },
        {
          params: {
            response: new Response(`{
              "errors": [
                {
                  "message": "Error message 03"
                }
              ]
            }}`), // ERROR: last } is doubled
          },
        },
      ]

      test.each(cases)('response: $params.response', async ({ params }) => {
        const launcher = BaseGraphqlLauncher.create({
          config: {
            ENDPOINT_URL: 'http://example.com/graphql-admin',
          },
        })

        const actual = await launcher.generateFetchResult(params)

        expect(actual)
          .toBeNull()
      })
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('#launchRequest()', () => {
    describe('to return result capsule on success', () => {
      const graphqlConfig = {
        ENDPOINT_URL: 'http://example.com/graphql-customer',
      }

      const cases = [
        {
          params: {
            endpointUrl: 'http://example.com/graphql-customer',
            payload: new BaseGraphqlPayload({
              queryTemplate: /* GraphQL */ `
                query CustomerQuery ($input: CustomerSearchInput!) {
                  customer (input: $input) {
                    id
                  }
                }
              `,
              variables: {
                input: {
                  id: 10001,
                },
              },
              options: {
                headers: new Headers({
                  'x-access-token': 'access-token-01',
                }),
              },
            }),
            /** @extends {BaseGraphqlCapsule<typeof BaseGraphqlCapsule>} */
            Capsule: class CustomerCapsule extends BaseGraphqlCapsule {},
          },
          tally: {
            response: new Response(`{
              "data": {
                "customer": {
                  "id": 10001
                }
              }
            }`),
          },
          expected: {
            customer: {
              id: 10001,
            },
          },
        },
        {
          params: {
            endpointUrl: 'http://example.com/graphql-admin',
            payload: new BaseGraphqlPayload({
              queryTemplate: /* GraphQL */ `
                query {
                  admin {
                    id
                  }
                }
              `,
              variables: {},
              options: {
                headers: new Headers({
                  'x-access-token': 'access-token-02',
                }),
              },
            }),
            /** @extends {BaseGraphqlCapsule<typeof BaseGraphqlCapsule>} */
            Capsule: class AdminCapsule extends BaseGraphqlCapsule {},
          },
          tally: {
            response: new Response(`{
              "data": {
                "admin": {
                  "id": 20001
                }
              }
            }`),
          },
          expected: {
            admin: {
              id: 20001,
            },
          },
        },
      ]

      test.each(cases)('endpointUrl: $params.endpointUrl', async ({
        params,
        tally,
        expected,
      }) => {
        const fetchSpy = jest.spyOn(globalThis, 'fetch')
          .mockResolvedValue(tally.response)
        const CapsuleSpy = jest.spyOn(BaseGraphqlLauncher, 'Capsule', 'get')
          .mockReturnValue(params.Capsule)

        const launcher = BaseGraphqlLauncher.create({
          config: graphqlConfig,
        })
        const args = {
          payload: params.payload,
        }

        const actual = await launcher.launchRequest(args)

        expect(actual)
          .toBeInstanceOf(params.Capsule)
        expect(actual.extractContent())
          .toEqual(expected)

        fetchSpy.mockRestore()
        CapsuleSpy.mockRestore()
      })
    })

    describe('to return Invalid variables error capsule', () => {
      /** @extends {BaseGraphqlCapsule<typeof DerivedCapsule, *>} */
      class DerivedCapsule extends BaseGraphqlCapsule {}

      /** @extends BaseGraphqlPayload<typeof DerivedPayload> */
      class DerivedPayload extends BaseGraphqlPayload {
        /** @override */
        static get document () {
          return /* GraphQL */ `
            query {
              customer {
                id
              }
            }
          `
        }

        /** @override */
        static get validators () {
          return [
            {
              field: 'username',
              body: (it, variables) => it,
              message: 'username must be set',
            },
            {
              field: 'username',
              body: (it, variables) => /^\w+$/.test(it),
              message: 'username must be alphanumeric',
            },
          ]
        }
      }

      test('to not call #invokeFetchQuery() with invalid variables', async () => {
        const launcher = BaseGraphqlLauncher.create({
          config: {
            ENDPOINT_URL: 'http://example.com/graphql-customer',
          },
        })
        const invalidVariablesPayload = DerivedPayload.create({
          variables: {
            input: {
              username: 'John Doe', // ❌
            },
          },
        })

        const expectedCapsule = DerivedCapsule.create({
          rawResponse: null,
          payload: invalidVariablesPayload,
          result: null,
        })

        const createResultCapsuleAsInvalidVariablesErrorSpy = jest.spyOn(BaseGraphqlLauncher, 'createResultCapsuleAsInvalidVariablesError')
        const invokeFetchQuerySpy = jest.spyOn(launcher, 'invokeFetchQuery')
          .mockRejectedValue(null)
        const CapsuleSpy = jest.spyOn(BaseGraphqlLauncher, 'Capsule', 'get')
          .mockReturnValue(DerivedCapsule)

        const args = {
          payload: invalidVariablesPayload,
        }

        const actual = await launcher.launchRequest(args)

        expect(actual)
          .toEqual(expectedCapsule)

        expect(createResultCapsuleAsInvalidVariablesErrorSpy)
          .toHaveBeenCalledWith(args)
        expect(invokeFetchQuerySpy)
          .not
          .toHaveBeenCalledWith()

        createResultCapsuleAsInvalidVariablesErrorSpy.mockRestore()
        invokeFetchQuerySpy.mockRestore()
        CapsuleSpy.mockRestore()
      })
    })

    describe('to return Network error capsule', () => {
      const cases = [
        {
          params: {
            endpointUrl: 'http://example.com/graphql-customer',
            payload: new BaseGraphqlPayload({
              queryTemplate: /* GraphQL */ `
                query CustomerQuery ($input: CustomerSearchInput!) {
                  customer (input: $input) {
                    id
                  }
                }
              `,
              variables: {
                input: {
                  id: 10001,
                },
              },
              options: {
                headers: new Headers({
                  'x-access-token': 'access-token-01',
                }),
              },
            }),
            /** @extends {BaseGraphqlCapsule<typeof BaseGraphqlCapsule>} */
            Capsule: class CustomerCapsule extends BaseGraphqlCapsule {},
          },
        },
        {
          params: {
            endpointUrl: 'http://example.com/graphql-admin',
            payload: new BaseGraphqlPayload({
              queryTemplate: /* GraphQL */ `
                query {
                  admin {
                    id
                  }
                }
              `,
              variables: {
                input: null,
              },
              options: {
                headers: new Headers({
                  'x-access-token': 'access-token-02',
                }),
              },
            }),
            /** @extends {BaseGraphqlCapsule<typeof BaseGraphqlCapsule>} */
            Capsule: class AdminCapsule extends BaseGraphqlCapsule {},
          },
        },
      ]

      test.each(cases)('endpointUrl: $params.endpointUrl', async ({ params }) => {
        const fetchSpy = jest.spyOn(globalThis, 'fetch')
          .mockRejectedValue(new Error('Network Error'))
        const CapsuleSpy = jest.spyOn(BaseGraphqlLauncher, 'Capsule', 'get')
          .mockReturnValue(params.Capsule)

        const launcher = BaseGraphqlLauncher.create({
          config: {
            ENDPOINT_URL: params.endpointUrl,
          },
        })
        const args = {
          payload: params.payload,
        }

        const actual = await launcher.launchRequest(args)

        expect(actual)
          .toBeInstanceOf(params.Capsule)
        expect(actual)
          .toHaveProperty('rawResponse', null)
        expect(actual.extractContent())
          .toBeNull()

        fetchSpy.mockRestore()
        CapsuleSpy.mockRestore()
      })
    })

    describe('to return JSON parse error capsule', () => {
      const cases = [
        {
          params: {
            endpointUrl: 'http://example.com/graphql-customer',
            payload: new BaseGraphqlPayload({
              queryTemplate: /* GraphQL */ `
                query CustomerQuery ($input: CustomerSearchInput!) {
                  customer (input: $input) {
                    id
                  }
                }
              `,
              variables: {
                input: {
                  id: 10001,
                },
              },
              options: {
                headers: new Headers({
                  'x-access-token': 'access-token-01',
                }),
              },
            }),
            /** @extends {BaseGraphqlCapsule<typeof BaseGraphqlCapsule>} */
            Capsule: class CustomerCapsule extends BaseGraphqlCapsule {},
          },
          tally: {
            response: new Response(`{
              "data": {
                "customer": {
                  "id": 10001
                }
              }
            }}`), // ERROR: last } is doubled
          },
        },
        {
          params: {
            endpointUrl: 'http://example.com/graphql-admin',
            payload: new BaseGraphqlPayload({
              queryTemplate: /* GraphQL */ `
                query {
                  admin {
                    id
                  }
                }
              `,
              variables: {
                input: null,
              },
              options: {
                headers: new Headers({
                  'x-access-token': 'access-token-02',
                }),
              },
            }),
            /** @extends {BaseGraphqlCapsule<typeof BaseGraphqlCapsule>} */
            Capsule: class AdminCapsule extends BaseGraphqlCapsule {},
          },
          tally: {
            response: new Response(`{
              "data": {
                "admin": {
                  "id": 20001
                }
              }
            }}`), // ERROR: last } is doubled
          },
        },
      ]

      test.each(cases)('endpointUrl: $params.endpointUrl', async ({
        params,
        tally,
      }) => {
        const fetchSpy = jest.spyOn(globalThis, 'fetch')
          .mockResolvedValue(tally.response)
        const CapsuleSpy = jest.spyOn(BaseGraphqlLauncher, 'Capsule', 'get')
          .mockReturnValue(params.Capsule)

        const launcher = BaseGraphqlLauncher.create({
          config: {
            ENDPOINT_URL: params.endpointUrl,
          },
        })
        const args = {
          payload: params.payload,
        }

        const actual = await launcher.launchRequest(args)

        expect(actual)
          .toBeInstanceOf(params.Capsule)
        expect(actual.extractContent())
          .toBeNull()

        fetchSpy.mockRestore()
        CapsuleSpy.mockRestore()
      })
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('#launchRequestWithVariables()', () => {
    describe('to return result capsule on success', () => {
      const graphqlConfig = {
        ENDPOINT_URL: 'http://example.com/graphql-customer',
      }

      const cases = [
        {
          params: {
            endpointUrl: 'http://example.com/graphql-customer',
            variables: {
              input: {
                id: 10001,
              },
            },
            options: {
              headers: new Headers({
                'x-access-token': 'access-token-01',
              }),
            },
            Payload: class CustomerPayload extends BaseGraphqlPayload {
              /** @inheritdoc */
              static get document () {
                return /* GraphQL */ `
                query CustomerQuery ($input: CustomerSearchInput!) {
                  customer (input: $input) {
                    id
                  }
                }`
              }
            },
            Capsule: class CustomerCapsule extends BaseGraphqlCapsule {},
          },
          tally: {
            response: new Response(`{
              "data": {
                "customer": {
                  "id": 10001
                }
              }
            }`),
          },
          expected: {
            customer: {
              id: 10001,
            },
          },
        },
        {
          params: {
            endpointUrl: 'http://example.com/graphql-admin',
            variables: {},
            options: {
              headers: new Headers({
                'x-access-token': 'access-token-02',
              }),
            },
            Payload: class AdminPayload extends BaseGraphqlPayload {
              /** @inheritdoc */
              static get document () {
                return /* GraphQL */ `
                query {
                  admin {
                    id
                  }
                }`
              }
            },
            Capsule: class AdminCapsule extends BaseGraphqlCapsule {},
          },
          tally: {
            response: new Response(`{
              "data": {
                "admin": {
                  "id": 20001
                }
              }
            }`),
          },
          expected: {
            admin: {
              id: 20001,
            },
          },
        },
      ]

      test.each(cases)('endpointUrl: $params.endpointUrl', async ({
        params,
        tally,
        expected,
      }) => {
        const PayloadSpy = jest.spyOn(BaseGraphqlLauncher, 'Payload', 'get')
          .mockReturnValue(params.Payload)
        const fetchSpy = jest.spyOn(globalThis, 'fetch')
          .mockResolvedValue(tally.response)
        const CapsuleSpy = jest.spyOn(BaseGraphqlLauncher, 'Capsule', 'get')
          .mockReturnValue(params.Capsule)

        const launcher = BaseGraphqlLauncher.create({
          config: graphqlConfig,
        })
        const args = {
          variables: params.variables,
          options: params.options,
        }

        const actual = await launcher.launchRequestWithVariables(args)

        expect(actual)
          .toBeInstanceOf(params.Capsule)
        expect(actual.extractContent())
          .toEqual(expected)

        PayloadSpy.mockRestore()
        fetchSpy.mockRestore()
        CapsuleSpy.mockRestore()
      })
    })

    describe('to return Network error capsule', () => {
      const cases = [
        {
          params: {
            endpointUrl: 'http://example.com/graphql-customer',
            variables: {
              input: {
                id: 10001,
              },
            },
            options: {
              headers: new Headers({
                'x-access-token': 'access-token-01',
              }),
            },
            Payload: class CustomerPayload extends BaseGraphqlPayload {
              /** @inheritdoc */
              static get document () {
                return /* GraphQL */ `
                query CustomerQuery ($input: CustomerSearchInput!) {
                  customer (input: $input) {
                    id
                  }
                }`
              }
            },
            Capsule: class CustomerCapsule extends BaseGraphqlCapsule {},
          },
        },
        {
          params: {
            endpointUrl: 'http://example.com/graphql-admin',
            variables: {
              input: null,
            },
            options: {
              headers: new Headers({
                'x-access-token': 'access-token-02',
              }),
            },
            Payload: class AdminPayload extends BaseGraphqlPayload {
              /** @inheritdoc */
              static get document () {
                return /* GraphQL */ `
                query {
                  admin {
                    id
                  }
                }`
              }
            },
            Capsule: class AdminCapsule extends BaseGraphqlCapsule {},
          },
        },
      ]

      test.each(cases)('endpointUrl: $params.endpointUrl', async ({ params }) => {
        const PayloadSpy = jest.spyOn(BaseGraphqlLauncher, 'Payload', 'get')
          .mockReturnValue(params.Payload)
        const fetchSpy = jest.spyOn(globalThis, 'fetch')
          .mockRejectedValue(new Error('Network Error'))
        const CapsuleSpy = jest.spyOn(BaseGraphqlLauncher, 'Capsule', 'get')
          .mockReturnValue(params.Capsule)

        const launcher = BaseGraphqlLauncher.create({
          config: {
            ENDPOINT_URL: params.endpointUrl,
          },
        })
        const args = {
          input: params.input,
          options: params.options,
        }

        const actual = await launcher.launchRequestWithVariables(args)

        expect(actual)
          .toBeInstanceOf(params.Capsule)
        expect(actual)
          .toHaveProperty('rawResponse', null)
        expect(actual.extractContent())
          .toBeNull()

        PayloadSpy.mockRestore()
        fetchSpy.mockRestore()
        CapsuleSpy.mockRestore()
      })
    })

    describe('to return JSON parse error capsule', () => {
      const cases = [
        {
          params: {
            endpointUrl: 'http://example.com/graphql-customer',
            variables: {
              input: {
                id: 10001,
              },
            },
            options: {
              headers: new Headers({
                'x-access-token': 'access-token-01',
              }),
            },
            Payload: class CustomerPayload extends BaseGraphqlPayload {
              /** @inheritdoc */
              static get document () {
                return /* GraphQL */ `
                query CustomerQuery ($input: CustomerSearchInput!) {
                  customer (input: $input) {
                    id
                  }
                }`
              }
            },
            Capsule: class CustomerCapsule extends BaseGraphqlCapsule {},
          },
          tally: {
            response: new Response(`{
              "data": {
                "customer": {
                  "id": 10001
                }
              }
            }}`), // ERROR: last } is doubled
          },
        },
        {
          params: {
            endpointUrl: 'http://example.com/graphql-admin',
            variables: {
              input: null,
            },
            options: {
              headers: new Headers({
                'x-access-token': 'access-token-02',
              }),
            },
            Payload: class AdminPayload extends BaseGraphqlPayload {
              /** @inheritdoc */
              static get document () {
                return /* GraphQL */ `
                query {
                  admin {
                    id
                  }
                }`
              }
            },
            Capsule: class AdminCapsule extends BaseGraphqlCapsule {},
          },
          tally: {
            response: new Response(`{
              "data": {
                "admin": {
                  "id": 20001
                }
              }
            }}`), // ERROR: last } is doubled
          },
        },
      ]

      test.each(cases)('endpointUrl: $params.endpointUrl', async ({
        params,
        tally,
      }) => {
        const PayloadSpy = jest.spyOn(BaseGraphqlLauncher, 'Payload', 'get')
          .mockReturnValue(params.Payload)
        const fetchSpy = jest.spyOn(globalThis, 'fetch')
          .mockResolvedValue(tally.response)
        const CapsuleSpy = jest.spyOn(BaseGraphqlLauncher, 'Capsule', 'get')
          .mockReturnValue(params.Capsule)

        const launcher = BaseGraphqlLauncher.create({
          config: {
            ENDPOINT_URL: params.endpointUrl,
          },
        })
        const args = {
          input: params.input,
          options: params.options,
        }

        const actual = await launcher.launchRequestWithVariables(args)

        expect(actual)
          .toBeInstanceOf(params.Capsule)
        expect(actual.extractContent())
          .toBeNull()

        PayloadSpy.mockRestore()
        fetchSpy.mockRestore()
        CapsuleSpy.mockRestore()
      })
    })

    describe('to call other members', () => {
      const graphqlConfig = {
        ENDPOINT_URL: 'http://example.com/graphql-customer',
      }

      class DerivedGraphqlPayload extends BaseGraphqlPayload {
        /** @inheritdoc */
        static get document () {
          return /* GraphQL */ `
          query DerivedQuery {
            derived {
              id
            }
          }`
        }
      }

      class DerivedGraphqlCapsule extends BaseGraphqlCapsule {

      }

      describe('for #updateOptions()', () => {
        const cases = [
          {
            params: {
              variables: {
                id: 10001,
              },
              options: {
                headers: new Headers({
                  'x-access-token': 'access-token-01',
                }),
                mode: 'cors',
              },
            },
          },
          {
            params: {
              variables: {
                id: 10002,
              },
              options: {
                headers: new Headers({
                  'x-access-token': 'access-token-02',
                }),
                credentials: 'omit',
              },
            },
          },
        ]

        test.each(cases)('variables: $params.variables', async ({ params }) => {
          const PayloadSpy = jest.spyOn(BaseGraphqlLauncher, 'Payload', 'get')
            .mockReturnValue(DerivedGraphqlPayload)
          const CapsuleSpy = jest.spyOn(BaseGraphqlLauncher, 'Capsule', 'get')
            .mockReturnValue(DerivedGraphqlCapsule)

          const launcher = BaseGraphqlLauncher.create({
            config: graphqlConfig,
          })
          const updateOptionsSpy = jest.spyOn(launcher, 'updateOptions')
          const invokeFetchQuerySpy = jest.spyOn(launcher, 'invokeFetchQuery')
            .mockResolvedValue(new Response())

          const expected = {
            options: params.options,
          }

          await launcher.launchRequestWithVariables(params)

          expect(updateOptionsSpy)
            .toHaveBeenCalledWith(expected)

          PayloadSpy.mockRestore()
          CapsuleSpy.mockRestore()

          updateOptionsSpy.mockRestore()
          invokeFetchQuerySpy.mockRestore()
        })
      })

      describe('for #createPayload()', () => {
        const cases = [
          {
            params: {
              variables: {
                id: 10001,
              },
              options: {
                headers: new Headers({
                  'x-access-token': 'access-token-01',
                }),
                mode: 'cors',
              },
            },
            expected: {
              variables: {
                id: 10001,
              },
              options: {
                headers: expect.any(Headers),
                mode: 'cors',
              },
            },
          },
          {
            params: {
              variables: {
                id: 10002,
              },
              options: {
                headers: new Headers({
                  'x-access-token': 'access-token-02',
                }),
                credentials: 'omit',
              },
            },
            expected: {
              variables: {
                id: 10002,
              },
              options: {
                headers: expect.any(Headers),
                credentials: 'omit',
              },
            },
          },
        ]

        test.each(cases)('variables: $params.variables', async ({ params, expected }) => {
          const PayloadSpy = jest.spyOn(BaseGraphqlLauncher, 'Payload', 'get')
            .mockReturnValue(DerivedGraphqlPayload)
          const CapsuleSpy = jest.spyOn(BaseGraphqlLauncher, 'Capsule', 'get')
            .mockReturnValue(DerivedGraphqlCapsule)

          const launcher = BaseGraphqlLauncher.create({
            config: graphqlConfig,
          })

          const createPayloadSpy = jest.spyOn(launcher, 'createPayload')
          const invokeFetchQuerySpy = jest.spyOn(launcher, 'invokeFetchQuery')
            .mockResolvedValue(new Response())

          await launcher.launchRequestWithVariables(params)

          expect(createPayloadSpy)
            .toHaveBeenCalledWith(expected)

          PayloadSpy.mockRestore()
          CapsuleSpy.mockRestore()

          createPayloadSpy.mockRestore()
          invokeFetchQuerySpy.mockRestore()
        })
      })
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('#updateHeaders()', () => {
    describe('to return given options as is', () => {
      const cases = [
        {
          params: {
            headers: new Headers({
              'x-access-token': 'access-token-01',
            }),
          },
        },
        {
          params: {
            headers: new Headers(),
          },
        },
      ]

      test.each(cases)('headers: $params.headers', ({ params }) => {
        const launcher = BaseGraphqlLauncher.create({
          config: {
            ENDPOINT_URL: 'http://example.com/graphql-customer',
          },
        })

        const actual = launcher.updateHeaders(params)

        expect(actual)
          .toBe(params.headers) // same reference
      })
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('#updateOptions()', () => {
    describe('to return generated options', () => {
      describe('with options includes Headers', () => {
        const cases = [
          {
            params: {
              options: {
                headers: new Headers({
                  'x-access-token': 'access-token-01',
                }),
                mode: 'cors',
              },
            },
            expected: {
              headers: expect.any(Headers),
              mode: 'cors',
            },
          },
          {
            params: {
              options: {
                headers: new Headers({
                  'x-access-token': 'access-token-02',
                }),
                credentials: 'omit',
              },
            },
            expected: {
              headers: expect.any(Headers),
              credentials: 'omit',
            },
          },
          {
            params: {
              options: {
                headers: new Headers({
                  'x-access-token': 'access-token-03',
                }),
                priority: 'high',
              },
            },
            expected: {
              headers: expect.any(Headers),
              priority: 'high',
            },
          },
          {
            params: {
              options: {
                headers: new Headers({
                  'x-access-token': 'access-token-04',
                }),
              },
            },
            expected: {
              headers: expect.any(Headers),
            },
          },
        ]

        test.each(cases)('options: $params.options', ({ params, expected }) => {
          const launcher = BaseGraphqlLauncher.create({
            config: {
              ENDPOINT_URL: 'http://example.com/graphql-customer',
            },
          })

          const actual = launcher.updateOptions(params)

          expect(actual)
            .toMatchObject(expected)
        })
      })

      describe('with options not include Headers', () => {
        const cases = [
          {
            params: {
              options: {
                mode: 'cors',
              },
            },
          },
          {
            params: {
              options: {
                credentials: 'omit',
              },
            },
          },
          {
            params: {
              options: {
                priority: 'high',
              },
            },
          },
          {
            params: {
              options: {},
            },
          },
        ]

        test.each(cases)('options: $params.options', ({ params }) => {
          const launcher = BaseGraphqlLauncher.create({
            config: {
              ENDPOINT_URL: 'http://example.com/graphql-customer',
            },
          })

          const actual = launcher.updateOptions(params)

          expect(actual)
            .toMatchObject(params.options)
          expect(actual)
            .toHaveProperty('headers', expect.any(Headers))
        })
      })
    })

    describe('to call other members', () => {
      describe('with options includes Headers', () => {
        const cases = [
          {
            params: {
              options: {
                headers: new Headers({
                  'x-access-token': 'access-token-01',
                }),
                mode: 'cors',
              },
            },
          },
          {
            params: {
              options: {
                headers: new Headers({
                  'x-access-token': 'access-token-02',
                }),
                credentials: 'omit',
              },
            },
          },
          {
            params: {
              options: {
                headers: new Headers({
                  'x-access-token': 'access-token-03',
                }),
                priority: 'high',
              },
            },
          },
          {
            params: {
              options: {
                headers: new Headers({
                  'x-access-token': 'access-token-04',
                }),
              },
            },
          },
        ]

        test.each(cases)('options: $params.options', ({ params }) => {
          const launcher = BaseGraphqlLauncher.create({
            config: {
              ENDPOINT_URL: 'http://example.com/graphql-customer',
            },
          })
          const headersTally = params.options.headers
          const updateHeadersSpy = jest.spyOn(launcher, 'updateHeaders')

          const expected = {
            headers: headersTally,
          }

          const actual = launcher.updateOptions(params)

          expect(updateHeadersSpy)
            .toHaveBeenCalledWith(expected)
          expect(actual.headers)
            .toBe(headersTally) // same reference

          updateHeadersSpy.mockRestore()
        })
      })

      describe('with options not include Headers', () => {
        const cases = [
          {
            params: {
              options: {
                mode: 'cors',
              },
            },
          },
          {
            params: {
              options: {
                credentials: 'omit',
              },
            },
          },
          {
            params: {
              options: {
                priority: 'high',
              },
            },
          },
          {
            params: {
              options: {},
            },
          },
        ]

        test.each(cases)('options: $params.options', ({ params }) => {
          const launcher = BaseGraphqlLauncher.create({
            config: {
              ENDPOINT_URL: 'http://example.com/graphql-customer',
            },
          })
          const headersTally = new Headers()
          const updateHeadersSpy = jest.spyOn(launcher, 'updateHeaders')
            .mockReturnValue(headersTally)
          const expected = {
            headers: headersTally,
          }

          const actual = launcher.updateOptions(params)

          expect(updateHeadersSpy)
            .toHaveBeenCalledWith(expected)
          expect(actual.headers)
            .toBe(headersTally) // same reference

          updateHeadersSpy.mockRestore()
        })
      })
    })
  })
})
