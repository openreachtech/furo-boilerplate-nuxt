import {
  ConstructorSpyGenerator,
} from '@openreachtech/renchan-test-tools'

import BaseGraphqlCapsule from '~/modules/client/BaseGraphqlCapsule'
import BaseGraphqlPayload from '~/modules/client/BaseGraphqlPayload'

describe('BaseGraphqlCapsule', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      const mockResponse = new Response()
      const mockPayload = new BaseGraphqlPayload({
        queryTemplate: /* GraphQL */ `
          query {
            customer {
              id
            }
          }
        `,
        variables: null,
      })

      describe('#rawResponse', () => {
        const cases = [
          {
            params: {
              response: new Response(),
            },
          },
        ]

        test.each(cases)('response: $params.response', ({ params }) => {
          const args = {
            rawResponse: params.response,
            payload: mockPayload,
            result: null,
          }

          const actual = new BaseGraphqlCapsule(args)

          expect(actual)
            .toHaveProperty('rawResponse', params.response)
        })
      })

      describe('#payload', () => {
        const cases = [
          {
            params: {
              payload: new BaseGraphqlPayload({
                queryTemplate: /* GraphQL */ `
                  query {
                    customer {
                      id
                    }
                  }
                `,
                variables: null,
              }),
            },
          },
          {
            params: {
              payload: new BaseGraphqlPayload({
                queryTemplate: /* GraphQL */ `
                  query {
                    admin {
                      id
                    }
                  }
                `,
                variables: null,
              }),
            },
          },
        ]

        test.each(cases)('payload: $params.payload', ({ params }) => {
          const args = {
            rawResponse: mockResponse,
            payload: params.payload,
            result: null,
          }

          const actual = new BaseGraphqlCapsule(args)

          expect(actual)
            .toHaveProperty('payload', params.payload)
        })
      })

      describe('#result', () => {
        /**
         * @type {Array<{
         *   params: {
         *     result: import('~/modules/client/BaseGraphqlCapsule').GraphqlCapsuleResult
         *   }
         * }>}
         */
        const cases = [
          {
            params: {
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
              result: {
                errors: [
                  {
                    message: 'error message-01',
                  },
                  {
                    message: 'error message-02',
                  },
                ],
              },
            },
          },
        ]

        test.each(cases)('result: $params.result', ({ params }) => {
          const args = {
            rawResponse: mockResponse,
            payload: mockPayload,
            result: params.result,
          }

          const actual = new BaseGraphqlCapsule(args)

          expect(actual)
            .toHaveProperty('result', params.result)
        })
      })
    })
  })
})

describe('BaseGraphqlCapsule', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
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
                  id: 10001,
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
                  id: 10002,
                },
              },
            }),
            result: {
              errors: [
                {
                  message: 'error message-01',
                },
                {
                  message: 'error message-02',
                },
              ],
            },
          },
        },
      ]

      test.each(cases)('result: $params.result', ({ params }) => {
        const actual = BaseGraphqlCapsule.create(params)

        expect(actual)
          .toBeInstanceOf(BaseGraphqlCapsule)
      })
    })

    describe('to call constructor', () => {
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
                  id: 10001,
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
                  id: 10002,
                },
              },
            }),
            result: {
              errors: [
                {
                  message: 'error message-01',
                },
                {
                  message: 'error message-02',
                },
              ],
            },
          },
        },
      ]

      test.each(cases)('result: $params.result', ({ params }) => {
        const DerivedClass = ConstructorSpyGenerator.create({ jest })
          .generateSpyKitClass(BaseGraphqlCapsule)

        DerivedClass.create(params)

        expect(DerivedClass.__spy__)
          .toHaveBeenCalledWith(params)
      })
    })
  })
})

describe('BaseGraphqlCapsule', () => {
  describe('.createAsPending()', () => {
    describe('to be instance of own class', () => {
      test('with no args', () => {
        const actual = BaseGraphqlCapsule.createAsPending()

        expect(actual)
          .toBeInstanceOf(BaseGraphqlCapsule)
      })
    })

    describe('to call .create()', () => {
      test('with no args', () => {
        const expectedArgs = {
          rawResponse: null,
          payload: null,
          result: null,
        }

        const createSpy = jest.spyOn(BaseGraphqlCapsule, 'create')

        BaseGraphqlCapsule.createAsPending()

        expect(createSpy)
          .toHaveBeenCalledWith(expectedArgs)
      })
    })
  })
})

describe('BaseGraphqlCapsule', () => {
  describe('.createAsNetworkError()', () => {
    describe('to be instance of own class', () => {
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
        const actual = BaseGraphqlCapsule.createAsNetworkError(args)

        expect(actual)
          .toBeInstanceOf(BaseGraphqlCapsule)
      })
    })

    describe('to call .create()', () => {
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
        const expectedArgs = {
          rawResponse: null,
          payload: null,
          result: null,
        }

        const createSpy = jest.spyOn(BaseGraphqlCapsule, 'create')

        BaseGraphqlCapsule.createAsNetworkError(args)

        expect(createSpy)
          .toHaveBeenCalledWith(expectedArgs)
      })
    })
  })
})

describe('BaseGraphqlCapsule', () => {
  describe('.createAsJsonParseError()', () => {
    describe('to be instance of own class', () => {
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
        const actual = BaseGraphqlCapsule.createAsJsonParseError(args)

        expect(actual)
          .toBeInstanceOf(BaseGraphqlCapsule)
      })
    })

    describe('to call constructor', () => {
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

        const DerivedClass = ConstructorSpyGenerator.create({ jest })
          .generateSpyKitClass(BaseGraphqlCapsule)

        DerivedClass.createAsJsonParseError(args)

        expect(DerivedClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('BaseGraphqlCapsule', () => {
  describe('#isPending()', () => {
    const mockResponse = new Response()
    const mockResult = {
      data: {
        customer: {
          id: 10001,
        },
      },
    }

    describe('to be pending (truthy)', () => {
      const cases = [
        {
          params: {
            rawResponse: null,
            payload: null,
            result: null,
          },
        },
      ]

      test.each(cases)('rawResponse: $params.rawResponse; result: $params.result', ({ params }) => {
        const capsule = new BaseGraphqlCapsule(params)

        const actual = capsule.isPending()

        expect(actual)
          .toBeTruthy()
      })
    })

    describe('to be not pending (falsy)', () => {
      const mockPayload = new BaseGraphqlPayload({
        queryTemplate: /* GraphQL */ `
          query {
            customer {
              id
            }
          }
        `,
        variables: null,
      })

      const cases = [
        {
          params: {
            rawResponse: mockResponse,
            payload: mockPayload,
            result: mockResult,
          },
        },
        {
          params: {
            rawResponse: mockResponse,
            payload: mockPayload,
            result: null,
          },
        },
        {
          params: {
            rawResponse: null,
            payload: mockPayload,
            result: null,
          },
        },
      ]

      test.each(cases)('rawResponse: $params.rawResponse; result: $params.result', ({ params }) => {
        const capsule = new BaseGraphqlCapsule(params)

        const actual = capsule.isPending()

        expect(actual)
          .toBeFalsy()
      })
    })
  })
})

describe('BaseGraphqlCapsule', () => {
  describe('#hasInvalidVariablesError()', () => {
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
          {
            field: 'password',
            body: (it, variables) => {
              return it
                && it.length >= 1
                && it.length <= 16
            },
            message: 'password must be set with at least 1 character and no more than 16 characters',
          },
          {
            field: 'password-confirmation',
            body: (it, variables) => {
              return it
                && it === variables.password
            },
            message: 'passwords do not match.',
          },
        ]
      }
    }

    describe('to has invalid variables error (truthy)', () => {
      const cases = [
        {
          params: {
            variables: {
              input: {
                username: 'John Doe', // ❌
                password: 'password$01',
                'password-confirmation': 'password$01',
              },
            },
          },
        },
        {
          params: {
            variables: {
              input: {
                username: 'Alice',
                password: 'password$01',
                'password-confirmation': 'password$99', // ❌
              },
            },
          },
        },
        {
          params: {
            variables: {
              input: {
                username: 'Alice',
                password: '', // ❌
                'password-confirmation': '', // ❌
              },
            },
          },
        },
      ]

      test.each(cases)('username: $params.variables.input.username', ({ params }) => {
        const targetPayload = DerivedPayload.create({
          variables: params.variables,
        })

        const args = {
          rawResponse: null,
          payload: targetPayload,
          result: null,
        }
        const capsule = new BaseGraphqlCapsule(args)

        const actual = capsule.hasInvalidVariablesError()

        expect(actual)
          .toBeTruthy()
      })
    })

    describe('to has no invalid variables error (falsy)', () => {
      const cases = [
        {
          params: {
            variables: {
              input: {
                username: 'John_Doe',
                password: 'password$01',
                'password-confirmation': 'password$01',
              },
            },
          },
        },
      ]

      test.each(cases)('username: $params.variables.input.username', ({ params }) => {
        const targetPayload = DerivedPayload.create({
          variables: params.variables,
        })

        const args = {
          rawResponse: null,
          payload: targetPayload,
          result: null,
        }
        const capsule = new BaseGraphqlCapsule(args)

        const actual = capsule.hasInvalidVariablesError()

        expect(actual)
          .toBeFalsy()
      })

      test('when payload is null', () => {
        const args = {
          rawResponse: null,
          payload: null,
          result: null,
        }
        const capsule = new BaseGraphqlCapsule(args)

        const actual = capsule.hasInvalidVariablesError()

        expect(actual)
          .toBeFalsy()
      })
    })
  })
})

describe('BaseGraphqlCapsule', () => {
  describe('#hasNetworkError()', () => {
    const mockPayload = new BaseGraphqlPayload({
      queryTemplate: /* GraphQL */ `
        query {
          customer {
            id
          }
        }
      `,
      variables: null,
    })

    describe('to has no rawResponse (truthy)', () => {
      const cases = [
        {
          params: {
            rawResponse: null,
          },
        },
      ]

      test.each(cases)('rawResponse: $params.rawResponse', ({ params }) => {
        const args = {
          rawResponse: params.rawResponse,
          payload: mockPayload,
          result: null,
        }
        const capsule = new BaseGraphqlCapsule(args)

        const actual = capsule.hasNetworkError()

        expect(actual)
          .toBeTruthy()
      })
    })

    describe('to has rawResponse (falsy)', () => {
      const cases = [
        {
          params: {
            rawResponse: new Response(),
          },
        },
      ]

      test.each(cases)('rawResponse: $params.rawResponse', ({ params }) => {
        const args = {
          rawResponse: params.rawResponse,
          payload: mockPayload,
          result: null,
        }
        const capsule = new BaseGraphqlCapsule(args)

        const actual = capsule.hasNetworkError()

        expect(actual)
          .toBeFalsy()
      })
    })
  })
})

describe('BaseGraphqlCapsule', () => {
  describe('#hasJsonParseError()', () => {
    const mockResponse = new Response()
    const mockPayload = new BaseGraphqlPayload({
      queryTemplate: /* GraphQL */ `
        query {
          customer {
            id
          }
        }
      `,
      variables: null,
    })

    describe('when has rawResponse', () => {
      describe('to has no result (truthy)', () => {
        const cases = [
          {
            params: {
              result: null,
            },
          },
        ]

        test.each(cases)('result: $params.result', ({ params }) => {
          const args = {
            rawResponse: mockResponse,
            payload: mockPayload,
            result: params.result,
          }
          const capsule = new BaseGraphqlCapsule(args)

          const actual = capsule.hasJsonParseError()

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to has result (falsy)', () => {
        const cases = [
          {
            params: {
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
              result: {
                errors: [
                  {
                    message: 'error message-01',
                  },
                  {
                    message: 'error message-02',
                  },
                ],
              },
            },
          },
        ]

        test.each(cases)('result: $params.result', ({ params }) => {
          const args = {
            rawResponse: mockResponse,
            payload: mockPayload,
            result: params.result,
          }
          const capsule = new BaseGraphqlCapsule(args)

          const actual = capsule.hasJsonParseError()

          expect(actual)
            .toBeFalsy()
        })
      })
    })

    describe('when has no rawResponse', () => {
      describe('to be falsy always', () => {
        const cases = [
          {
            params: {
              result: null,
            },
          },
          {
            params: {
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
              result: {
                errors: [
                  {
                    message: 'error message-01',
                  },
                  {
                    message: 'error message-02',
                  },
                ],
              },
            },
          },
        ]

        test.each(cases)('result: $params.result', ({ params }) => {
          const args = {
            rawResponse: null,
            payload: mockPayload,
            result: params.result,
          }
          const capsule = new BaseGraphqlCapsule(args)

          const actual = capsule.hasJsonParseError()

          expect(actual)
            .toBeFalsy()
        })
      })
    })
  })
})

describe('BaseGraphqlCapsule', () => {
  describe('#hasQueryError()', () => {
    const mockResponse = new Response()
    const mockPayload = new BaseGraphqlPayload({
      queryTemplate: /* GraphQL */ `
        query {
          customer {
            id
          }
        }
      `,
      variables: null,
    })

    describe('to has errors (truthy)', () => {
      const cases = [
        {
          params: {
            result: {
              errors: [
                {
                  message: 'error message-01',
                },
                {
                  message: 'error message-02',
                },
              ],
            },
          },
        },
        {
          params: {
            result: {
              // Even if empty array, it is considered as query error.
              // Because it is not a normal response, not network error and not json parse error.
              errors: [],
            },
          },
        },
      ]

      test.each(cases)('result: $params.result', ({ params }) => {
        const args = {
          rawResponse: mockResponse,
          payload: mockPayload,
          result: params.result,
        }
        const capsule = new BaseGraphqlCapsule(args)

        const actual = capsule.hasQueryError()

        expect(actual)
          .toBeTruthy()
      })
    })

    describe('to has no errors (falsy)', () => {
      const cases = [
        {
          params: {
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
            result: null, // network error or json parse error, etc.
          },
        },
      ]

      test.each(cases)('result: $params.result', ({ params }) => {
        const args = {
          rawResponse: mockResponse,
          payload: mockPayload,
          result: params.result,
        }
        const capsule = new BaseGraphqlCapsule(args)

        const actual = capsule.hasQueryError()

        expect(actual)
          .toBeFalsy()
      })
    })
  })
})

describe('BaseGraphqlCapsule', () => {
  describe('#hasError()', () => {
    const mockResponse = new Response()
    const mockPayload = new BaseGraphqlPayload({
      queryTemplate: /* GraphQL */ `
        query {
          customer {
            id
          }
        }
      `,
      variables: null,
    })

    describe('to has error (truthy)', () => {
      const cases = [
        // query error
        {
          params: {
            rawResponse: mockResponse,
            result: {
              errors: [
                {
                  message: 'error message-01',
                },
                {
                  message: 'error message-02',
                },
              ],
            },
          },
        },
        // network error
        {
          params: {
            rawResponse: null,
            result: null,
          },
        },
        // JSON parse error
        {
          params: {
            rawResponse: mockResponse,
            result: null,
          },
        },
      ]

      test.each(cases)('rawResponse: $params.rawResponse; result: $params.result', ({ params }) => {
        const args = {
          rawResponse: params.rawResponse,
          payload: mockPayload,
          result: params.result,
        }

        const capsule = new BaseGraphqlCapsule(args)

        const actual = capsule.hasError()

        expect(actual)
          .toBeTruthy()
      })
    })

    describe('to has no error (falsy)', () => {
      const cases = [
        {
          params: {
            rawResponse: mockResponse,
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
            rawResponse: mockResponse,
            result: {},
          },
        },
      ]

      test.each(cases)('rawResponse: $params.rawResponse; result: $params.result', ({ params }) => {
        const args = {
          rawResponse: params.rawResponse,
          payload: mockPayload,
          result: params.result,
        }

        const capsule = new BaseGraphqlCapsule(args)

        const actual = capsule.hasError()

        expect(actual)
          .toBeFalsy()
      })
    })
  })
})

describe('BaseGraphqlCapsule', () => {
  describe('#hasContent()', () => {
    const mockResponse = new Response()
    const mockPayload = new BaseGraphqlPayload({
      queryTemplate: /* GraphQL */ `
        query {
          customer {
            id
          }
        }
      `,
      variables: null,
    })

    describe('to has content (truthy)', () => {
      const cases = [
        {
          params: {
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
            result: {
              data: {
                customer: {
                  id: 10002,
                },
              },
            },
          },
        },
      ]

      test.each(cases)('result: $params.result', ({ params }) => {
        const args = {
          rawResponse: mockResponse,
          payload: mockPayload,
          result: params.result,
        }
        const capsule = new BaseGraphqlCapsule(args)

        const actual = capsule.hasContent()

        expect(actual)
          .toBeTruthy()
      })
    })

    describe('to has no content (falsy)', () => {
      const cases = [
        {
          params: {
            result: {
              errors: [
                {
                  message: 'error message-01',
                },
                {
                  message: 'error message-02',
                },
              ],
            },
          },
        },
        {
          params: {
            result: null, // network error or json parse error, etc.
          },
        },
      ]

      test.each(cases)('result: $params.result', ({ params }) => {
        const args = {
          rawResponse: mockResponse,
          payload: mockPayload,
          result: params.result,
        }
        const capsule = new BaseGraphqlCapsule(args)

        const actual = capsule.hasContent()

        expect(actual)
          .toBeFalsy()
      })
    })
  })
})

describe('BaseGraphqlCapsule', () => {
  describe('#extractErrors()', () => {
    const mockResponse = new Response()
    const mockPayload = new BaseGraphqlPayload({
      queryTemplate: /* GraphQL */ `
        query {
          customer {
            id
          }
        }
      `,
      variables: null,
    })

    describe('when existing errors', () => {
      const cases = [
        {
          params: {
            result: {
              errors: [
                {
                  message: 'error message-01',
                },
                {
                  message: 'error message-02',
                },
              ],
            },
          },
          expected: [
            {
              message: 'error message-01',
            },
            {
              message: 'error message-02',
            },
          ],
        },
        {
          params: {
            result: {
              errors: [
                {
                  message: 'error message-03',
                },
              ],
            },
          },
          expected: [
            {
              message: 'error message-03',
            },
          ],
        },
      ]

      test.each(cases)('result: $params.result', ({ params, expected }) => {
        const args = {
          rawResponse: mockResponse,
          payload: mockPayload,
          result: params.result,
        }
        const capsule = new BaseGraphqlCapsule(args)

        const actual = capsule.extractErrors()

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('to get empty array', () => {
      const cases = [
        {
          params: {
            rawResponse: mockResponse,
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
            rawResponse: mockResponse,
            result: null,
          },
        },
        {
          params: {
            rawResponse: null,
            result: null,
          },
        },
      ]

      test.each(cases)('rawResponse: $params.rawResponse; result: $params.result', ({ params }) => {
        const args = {
          rawResponse: params.rawResponse,
          payload: mockPayload,
          result: params.result,
        }
        const capsule = new BaseGraphqlCapsule(args)

        const actual = capsule.extractErrors()

        expect(actual)
          .toBeInstanceOf(Array)
        expect(actual)
          .toHaveLength(0)
      })
    })
  })
})

describe('BaseGraphqlCapsule', () => {
  describe('#getErrorMessage()', () => {
    const mockResponse = new Response()
    const mockPayload = new BaseGraphqlPayload({
      queryTemplate: /* GraphQL */ `
        query {
          customer {
            id
          }
        }
      `,
      variables: null,
    })

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

    describe('when has error', () => {
      const cases = [
        // on invalid variables error
        {
          params: {
            payload: DerivedPayload.create({
              variables: {
                input: {
                  username: 'John Doe', // ❌
                },
              },
            }),
            rawResponse: null,
            result: null,
          },
          expected: 'Invalid variables',
        },
        // on network error
        {
          params: {
            payload: mockPayload,
            rawResponse: null,
            result: null,
          },
          expected: 'Network error',
        },
        // on JSON parse error
        {
          params: {
            payload: mockPayload,
            rawResponse: mockResponse,
            result: null,
          },
          expected: 'JSON parse error',
        },
        // on query error
        {
          params: {
            payload: mockPayload,
            rawResponse: mockResponse,
            result: {
              errors: [
                {
                  message: 'error message-01',
                },
                {
                  message: 'error message-02',
                },
              ],
            },
          },
          expected: 'error message-01',
        },
        {
          params: {
            payload: mockPayload,
            rawResponse: mockResponse,
            result: {
              errors: [
                {
                  message: 'error message-03',
                },
              ],
            },
          },
          expected: 'error message-03',
        },
        {
          params: {
            payload: mockPayload,
            rawResponse: mockResponse,
            result: {
              errors: [],
            },
          },
          expected: 'Unknown error',
        },
      ]

      test.each(cases)('payload: $params.payload; rawResponse: $params.rawResponse; result: $params.result', ({ params, expected }) => {
        const args = {
          rawResponse: params.rawResponse,
          payload: params.payload,
          result: params.result,
        }
        const capsule = new BaseGraphqlCapsule(args)

        const actual = capsule.getErrorMessage()

        expect(actual)
          .toBe(expected)
      })
    })

    describe('when has no error on post-fetch', () => {
      const cases = [
        {
          params: {
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
            result: {},
          },
        },
      ]

      test.each(cases)('result: $params.result', ({ params }) => {
        const args = {
          rawResponse: mockResponse,
          payload: mockPayload,
          result: params.result,
        }
        const capsule = new BaseGraphqlCapsule(args)

        const actual = capsule.getErrorMessage()

        expect(actual)
          .toBeNull()
      })
    })

    describe('when has no error on pre-fetch', () => {
      test('all args are null', () => {
        const args = {
          rawResponse: null,
          payload: null,
          result: null,
        }
        const capsule = new BaseGraphqlCapsule(args)

        const actual = capsule.getErrorMessage()

        expect(actual)
          .toBeNull()
      })
    })
  })
})

describe('BaseGraphqlCapsule', () => {
  describe('#extractContent()', () => {
    const mockResponse = new Response()
    const mockPayload = new BaseGraphqlPayload({
      queryTemplate: /* GraphQL */ `
        query {
          customer {
            id
          }
        }
      `,
      variables: null,
    })

    describe('when has content', () => {
      const cases = [
        {
          params: {
            result: {
              data: {
                customer: {
                  id: 10001,
                },
              },
            },
          },
          expected: {
            customer: {
              id: 10001,
            },
          },
        },
        {
          params: {
            result: {
              data: {
                customer: {
                  id: 10002,
                },
              },
            },
          },
          expected: {
            customer: {
              id: 10002,
            },
          },
        },
      ]

      test.each(cases)('result: $params.result', ({ params, expected }) => {
        const args = {
          rawResponse: mockResponse,
          payload: mockPayload,
          result: params.result,
        }
        const capsule = new BaseGraphqlCapsule(args)

        const actual = capsule.extractContent()

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('when has no content (returns null)', () => {
      const cases = [
        // on network error
        {
          params: {
            rawResponse: null,
            result: null,
          },
        },
        // on JSON parse error
        {
          params: {
            rawResponse: mockResponse,
            result: null,
          },
        },
        // on query error
        {
          params: {
            rawResponse: mockResponse,
            result: {
              errors: [
                {
                  message: 'error message-01',
                },
              ],
            },
          },
        },
        {
          params: {
            rawResponse: mockResponse,
            result: {},
          },
        },
      ]

      test.each(cases)('rawResponse: $params.rawResponse; result: $params.result', ({ params }) => {
        const args = {
          rawResponse: params.rawResponse,
          payload: mockPayload,
          result: params.result,
        }
        const capsule = new BaseGraphqlCapsule(args)

        const actual = capsule.extractContent()

        expect(actual)
          .toBeNull()
      })
    })
  })
})
