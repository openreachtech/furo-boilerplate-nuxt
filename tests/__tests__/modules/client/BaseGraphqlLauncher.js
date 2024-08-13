import {
  ConstructorSpyGenerator,
} from '@openreachtech/renchan-test-tools'

import BaseGraphqlLauncher from '~/modules/client/BaseGraphqlLauncher'
import BaseGraphqlPayload from '~/modules/client/BaseGraphqlPayload'
import BaseGraphqlCapsule, {
  LAUNCH_ABORTED_REASON,
} from '~/modules/client/BaseGraphqlCapsule'

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
  describe('.get:Launcher', () => {
    test('to be own', () => {
      const actual = BaseGraphqlLauncher.Launcher

      expect(actual)
        .toBe(BaseGraphqlLauncher) // same reference
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
  describe('.createCapsuleAsPending()', () => {
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

        const capsule = BaseGraphqlLauncher.createCapsuleAsPending()

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

        BaseGraphqlLauncher.createCapsuleAsPending(params)

        expect(createSpy)
          .toHaveBeenCalledWith(expected)

        CapsuleSpy.mockRestore()
        createSpy.mockRestore()
      })
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('.createCapsuleAsInvalidVariablesError()', () => {
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

          const capsule = BaseGraphqlLauncher.createCapsuleAsInvalidVariablesError(currentArgs)

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
            abortedReason: LAUNCH_ABORTED_REASON.INVALID_VARIABLES,
          }

          const CapsuleSpy = jest.spyOn(BaseGraphqlLauncher, 'Capsule', 'get')
            .mockReturnValue(params.CapsuleClass)
          const createSpy = jest.spyOn(params.CapsuleClass, 'create')

          const currentArgs = {
            payload: args.payload,
          }

          BaseGraphqlLauncher.createCapsuleAsInvalidVariablesError(currentArgs)

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
  describe('.createCapsuleAsAbortedByHooks()', () => {
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

          const capsule = BaseGraphqlLauncher.createCapsuleAsAbortedByHooks(currentArgs)

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
          {
            args: {
              payload: new BaseGraphqlPayload({
                queryTemplate: /* GraphQL */ `
                  query {
                    unknown: {
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
            abortedReason: LAUNCH_ABORTED_REASON.BEFORE_REQUEST_HOOK,
          }

          const CapsuleSpy = jest.spyOn(BaseGraphqlLauncher, 'Capsule', 'get')
            .mockReturnValue(params.CapsuleClass)
          const createSpy = jest.spyOn(params.CapsuleClass, 'create')

          const currentArgs = {
            payload: args.payload,
          }

          BaseGraphqlLauncher.createCapsuleAsAbortedByHooks(currentArgs)

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
  describe('.createCapsuleAsNetworkError()', () => {
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

          const capsule = BaseGraphqlLauncher.createCapsuleAsNetworkError(currentArgs)

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

          BaseGraphqlLauncher.createCapsuleAsNetworkError(currentArgs)

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
  describe('.createCapsuleAsJsonParseError()', () => {
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

          const capsule = BaseGraphqlLauncher.createCapsuleAsJsonParseError(currentArgs)

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

          BaseGraphqlLauncher.createCapsuleAsJsonParseError(currentArgs)

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
  describe('.createPayload()', () => {
    describe('to be instance of Payload', () => {
      const cases = [
        {
          params: {
            /** @extends {BaseGraphqlPayload<*, *>} */
            Payload: class CustomerPayload extends BaseGraphqlPayload {
              /** @inheritdoc */
              static get document () {
                return /* GraphQL */ `query {
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
            /** @extends {BaseGraphqlPayload<*, *>} */
            Payload: class AdminPayload extends BaseGraphqlPayload {
              /** @inheritdoc */
              static get document () {
                return /* GraphQL */ `query {
                  admin (input: $input) {
                    id
                  }
                }`
              }
            },
            variables: {
              input: {
                id: 20001,
              },
            },
          },
        },
      ]

      test.each(cases)('Payload: $params.Payload.name', ({ params }) => {
        const expected = {
          variables: params.variables,
        }

        const PayloadSpy = jest.spyOn(BaseGraphqlLauncher, 'Payload', 'get')
          .mockReturnValue(params.Payload)
        const createSpy = jest.spyOn(params.Payload, 'create')

        const args = {
          variables: params.variables,
        }

        const payload = BaseGraphqlLauncher.createPayload(args)

        expect(payload)
          .toBeInstanceOf(params.Payload)

        expect(createSpy)
          .toHaveBeenCalledWith(expected)

        PayloadSpy.mockRestore()
        createSpy.mockRestore()
      })
    })
  })
})

describe('BaseGraphqlLauncher', () => {
  describe('.createCapsule()', () => {
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
        {
          params: {
            rawResponse: new Response(),
            payload: new BaseGraphqlPayload({
              queryTemplate: /* GraphQL */ `
                query {
                  user {
                    id
                  }
                }
              `,
              variables: {
                input: {
                  userId: 30001,
                },
              },
            }),
            result: {
              data: {
                user: {
                  id: 30001,
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
                  unknown {
                    id
                  }
                }
              `,
              variables: {
                input: {
                  unknownId: 40001,
                },
              },
            }),
            result: {
              data: {
                user: {
                  id: 40001,
                },
              },
            },
          },
        },
      ]

      test.each(cases)('result: $params.result', ({ params }) => {
        const CapsuleSpy = jest.spyOn(BaseGraphqlLauncher, 'Capsule', 'get')
          .mockReturnValue(MockGraphqlCapsule)

        const capsule = BaseGraphqlLauncher.createCapsule(params)

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
            abortedReason: LAUNCH_ABORTED_REASON.INVALID_VARIABLES,
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
            abortedReason: LAUNCH_ABORTED_REASON.BEFORE_REQUEST_HOOK,
          },
        },
        {
          params: {
            rawResponse: new Response(),
            payload: new BaseGraphqlPayload({
              queryTemplate: /* GraphQL */ `
                query {
                  unknown {
                    id
                  }
                }
              `,
              variables: {
                input: {
                  unknownId: 40001,
                },
              },
            }),
            result: {
              data: {
                unknown: {
                  id: 40001,
                },
              },
            },
            abortedReason: LAUNCH_ABORTED_REASON.UNKNOWN,
          },
        },
        {
          params: {
            rawResponse: new Response(),
            payload: new BaseGraphqlPayload({
              queryTemplate: /* GraphQL */ `
                query {
                  user {
                    id
                  }
                }
              `,
              variables: {
                input: {
                  userId: 30001,
                },
              },
            }),
            result: {
              data: {
                user: {
                  id: 30001,
                },
              },
            },
            // abortedReason: LAUNCH_ABORTED_REASON.NONE,
          },
        },
      ]

      test.each(cases)('result: $params.result', ({ params }) => {
        const CapsuleSpy = jest.spyOn(BaseGraphqlLauncher, 'Capsule', 'get')
          .mockReturnValue(MockGraphqlCapsule)
        const createSpy = jest.spyOn(MockGraphqlCapsule, 'create')

        BaseGraphqlLauncher.createCapsule(params)

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

        static get fieldHash () {
          return {
            input: [
              'username',
              'password',
            ],
          }
        }

        /** @override */
        static get validators () {
          return [
            {
              field: 'username',
              ok: (it, valueHash) => it,
              message: 'username must be set',
            },
            {
              field: 'username',
              ok: (it, valueHash) => /^\w+$/.test(it),
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
              username: 'JohnDoe',
              password: 'password$01',
              extra: 'extra value', // ❌
            },
          },
        })

        const expectedCapsule = DerivedCapsule.create({
          rawResponse: null,
          payload: invalidVariablesPayload,
          result: null,
          abortedReason: LAUNCH_ABORTED_REASON.INVALID_VARIABLES,
        })

        const createCapsuleAsInvalidVariablesErrorSpy = jest.spyOn(BaseGraphqlLauncher, 'createCapsuleAsInvalidVariablesError')
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

        expect(createCapsuleAsInvalidVariablesErrorSpy)
          .toHaveBeenCalledWith(args)
        expect(invokeFetchQuerySpy)
          .not
          .toHaveBeenCalledWith()

        createCapsuleAsInvalidVariablesErrorSpy.mockRestore()
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
            /** @extends {BaseGraphqlPayload<*, *>} */
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
            /** @extends {BaseGraphqlCapsule<*, *>} */
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
            variables: {
              input: {
                id: 20001,
              },
            },
            options: {
              headers: new Headers({
                'x-access-token': 'access-token-02',
              }),
            },
            /** @extends {BaseGraphqlPayload<*, *>} */
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
            /** @extends {BaseGraphqlCapsule<*, *>} */
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

    describe('to return aborted hooks capsule', () => {
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
            /** @extends {BaseGraphqlPayload<*, *>} */
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
            /** @extends {BaseGraphqlCapsule<*, *>} */
            Capsule: class CustomerCapsule extends BaseGraphqlCapsule {},
          },
        },
        {
          params: {
            endpointUrl: 'http://example.com/graphql-admin',
            variables: {
              input: {
                id: 20001,
              },
            },
            options: {
              headers: new Headers({
                'x-access-token': 'access-token-02',
              }),
            },
            /** @extends {BaseGraphqlPayload<*, *>} */
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
            /** @extends {BaseGraphqlCapsule<*, *>} */
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
          variables: params.variables,
          options: params.options,
          hooks: {
            beforeRequest: async _ => true,
          },
        }

        const actual = await launcher.launchRequestWithVariables(args)

        expect(actual)
          .toBeInstanceOf(params.Capsule)
        expect(actual)
          .toHaveProperty('rawResponse', null)
        expect(actual)
          .toHaveProperty('abortedReason', LAUNCH_ABORTED_REASON.BEFORE_REQUEST_HOOK)
        expect(actual.extractContent())
          .toBeNull()

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
            /** @extends {BaseGraphqlPayload<*, *>} */
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
            /** @extends {BaseGraphqlCapsule<*, *>} */
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
            /** @extends {BaseGraphqlPayload<*, *>} */
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
            /** @extends {BaseGraphqlCapsule<*, *>} */
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
            /** @extends {BaseGraphqlPayload<*, *>} */
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
            /** @extends {BaseGraphqlCapsule<*, *>} */
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
            /** @extends {BaseGraphqlPayload<*, *>} */
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
            /** @extends {BaseGraphqlCapsule<*, *>} */
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

      /** @extends {BaseGraphqlPayload<*, *>} */
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

      /** @extends {BaseGraphqlCapsule<*, *>} */
      class DerivedGraphqlCapsule extends BaseGraphqlCapsule {

      }

      describe('for .createPayload()', () => {
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

          const createPayloadSpy = jest.spyOn(BaseGraphqlLauncher, 'createPayload')
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

    describe('to call hooks', () => {
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
            /** @extends {BaseGraphqlPayload<*, *>} */
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
            /** @extends {BaseGraphqlCapsule<*, *>} */
            Capsule: class CustomerCapsule extends BaseGraphqlCapsule {},
            hooks: {
              beforeRequest: async () => true,
              afterRequest: async () => {},
            },
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
            /** @extends {BaseGraphqlPayload<*, *>} */
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
            /** @extends {BaseGraphqlCapsule<*, *>} */
            Capsule: class AdminCapsule extends BaseGraphqlCapsule {},
            hooks: {
              beforeRequest: async () => false,
              afterRequest: async () => {},
            },
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

        const beforeRequestSpy = jest.spyOn(params.hooks, 'beforeRequest')
        const afterRequestSpy = jest.spyOn(params.hooks, 'afterRequest')

        const launcher = BaseGraphqlLauncher.create({
          config: {
            ENDPOINT_URL: params.endpointUrl,
          },
        })
        const args = {
          variables: params.variables,
          options: params.options,
          hooks: params.hooks,
        }

        const actual = await launcher.launchRequestWithVariables(args)

        expect(beforeRequestSpy)
          .toHaveBeenCalledWith(expect.any(params.Payload))
        expect(afterRequestSpy)
          .toHaveBeenCalledWith(expect.any(params.Capsule))

        expect(actual)
          .toBeInstanceOf(params.Capsule)
        expect(actual)
          .toHaveProperty('rawResponse', null)
        expect(actual.extractContent())
          .toBeNull()

        PayloadSpy.mockRestore()
        fetchSpy.mockRestore()
        CapsuleSpy.mockRestore()

        beforeRequestSpy.mockRestore()
        afterRequestSpy.mockRestore()
      })
    })
  })
})
