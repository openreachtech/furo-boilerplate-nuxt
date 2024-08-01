import {
  ConstructorSpyGenerator,
} from '@openreachtech/renchan-test-tools'

import BaseGraphqlPayload from '~/modules/client/BaseGraphqlPayload'

describe('BaseGraphqlPayload', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      describe('#queryTemplate', () => {
        const cases = [
          {
            params: {
              queryTemplate: /* GraphQL */ `
                query PickUpForumTopicsQuery {
                  pickUpForumTopics {
                    pickUpForumTopics {
                      id
                      forumCategory {
                        id
                        name
                      }
                      name
                      descriptionHtml
                      proposer {
                        customerId
                        username
                        avatarUrl
                        customerRoles {
                          id
                          name
                        }
                      }
                      proposedAt
                      editedAt
                      totalForumPost
                      latestForumPostPostedAt
                    }
                  }
                }
              `,
            },
          },
          {
            params: {
              queryTemplate: /* GraphQL */ `
                query CurriculumsQuery ($input: CurriculumsSearchInput!) {
                  curriculums(input: $input) {
                    curriculums {
                      id
                      title
                      description
                      thumbnailUrl
                      postedAt
                    }
                    pagination {
                      limit
                      offset
                      sort {
                        targetColumn
                        orderBy
                      }
                      totalRecords
                    }
                  }
                }
              `,
            },
          },
        ]

        test.each(cases)('queryTemplate: $params.queryTemplate', ({ params }) => {
          const args = {
            queryTemplate: params.queryTemplate,
            variables: {},
            options: {
              mode: 'cors',
            },
          }
          const actual = new BaseGraphqlPayload(args)

          expect(actual)
            .toHaveProperty('queryTemplate', params.queryTemplate)
        })
      })

      describe('#variables', () => {
        const cases = [
          {
            params: {
              variables: {
                id: 10001,
              },
            },
          },
          {
            params: {
              variables: {
                id: 10002,
              },
            },
          },
          {
            params: {
              variables: {},
            },
          },
        ]

        test.each(cases)('variables: $params.variables', ({ params }) => {
          const queryTemplate = /* GraphQL */ `
            query CurriculumsQuery ($input: CurriculumsSearchInput!) {
              curriculums (input: $input) {
                curriculums {
                  id
                  title
                  description
                  thumbnailUrl
                  postedAt
                }
                pagination {
                  limit
                  offset
                  sort {
                    targetColumn
                    orderBy
                  }
                  totalRecords
                }
              }
            }
          `
          const args = {
            queryTemplate,
            variables: params.variables,
            options: {
              mode: 'cors',
            },
          }
          const actual = new BaseGraphqlPayload(args)

          expect(actual)
            .toHaveProperty('variables', params.variables)
        })
      })

      describe('#options', () => {
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
        ]

        test.each(cases)('options: $params.options', ({ params }) => {
          const queryTemplate = /* GraphQL */ `
            query CurriculumsQuery ($input: CurriculumsSearchInput!) {
              curriculums (input: $input) {
                curriculums {
                  id
                  title
                  description
                  thumbnailUrl
                  postedAt
                }
                pagination {
                  limit
                  offset
                  sort {
                    targetColumn
                    orderBy
                  }
                  totalRecords
                }
              }
            }
          `
          const args = {
            queryTemplate,
            variables: {},
            options: params.options,
          }
          const actual = new BaseGraphqlPayload(args)

          expect(actual)
            .toHaveProperty('options', params.options)
        })
      })
    })
  })
})

describe('BaseGraphqlPayload', () => {
  describe('.get:document', () => {
    test('to throw Error', () => {
      const expected = 'this function must be inherited'

      expect(() => BaseGraphqlPayload.document)
        .toThrow(expected)
    })
  })
})

describe('BaseGraphqlPayload', () => {
  describe('.get:validators', () => {
    describe('to be []', () => {
      test('with no arguments', () => {
        const actual = BaseGraphqlPayload.validators

        expect(actual)
          .toBeInstanceOf(Array)
        expect(actual)
          .toHaveLength(0)
      })
    })
  })
})

describe('BaseGraphqlPayload', () => {
  describe('.create', () => {
    describe('to return instance of this class', () => {
      const cases = [
        {
          params: {
            variables: {},
            options: {
              mode: 'cors',
            },
            queryTemplate: /* GraphQL */ `
              query PickUpForumTopicsQuery {
                pickUpForumTopics {
                  pickUpForumTopics {
                    id
                    forumCategory {
                      id
                      name
                    }
                    name
                    descriptionHtml
                    proposer {
                      customerId
                      username
                      avatarUrl
                      customerRoles {
                        id
                        name
                      }
                    }
                    proposedAt
                    editedAt
                    totalForumPost
                    latestForumPostPostedAt
                  }
                }
              }
            `,
          },
        },
        {
          params: {
            variables: {
              input: {
                id: 10001,
              },
            },
            options: {
              credentials: 'omit',
            },
            queryTemplate: /* GraphQL */ `
              query CurriculumsQuery ($input: CurriculumsSearchInput!) {
                curriculums(input: $input) {
                  curriculums {
                    id
                    title
                    description
                    thumbnailUrl
                    postedAt
                  }
                  pagination {
                    limit
                    offset
                    sort {
                      targetColumn
                      orderBy
                    }
                    totalRecords
                  }
                }
              }
            `,
          },
        },
      ]

      test.each(cases)('variables: $params.variables', ({ params }) => {
        const querySpy = jest.spyOn(BaseGraphqlPayload, 'document', 'get')
          .mockReturnValue(params.queryTemplate)

        const args = {
          variables: params.variables,
          options: params.options,
        }
        const actual = BaseGraphqlPayload.create(args)

        expect(actual)
          .toBeInstanceOf(BaseGraphqlPayload)

        querySpy.mockRestore()
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            variables: {},
            options: {
              mode: 'cors',
            },
            queryTemplate: /* GraphQL */ `
              query PickUpForumTopicsQuery {
                pickUpForumTopics {
                  pickUpForumTopics {
                    id
                    forumCategory {
                      id
                      name
                    }
                    name
                    descriptionHtml
                    proposer {
                      customerId
                      username
                      avatarUrl
                      customerRoles {
                        id
                        name
                      }
                    }
                    proposedAt
                    editedAt
                    totalForumPost
                    latestForumPostPostedAt
                  }
                }
              }
            `,
          },
        },
        {
          params: {
            variables: {
              input: {
                id: 10001,
              },
            },
            options: {
              credentials: 'omit',
            },
            queryTemplate: /* GraphQL */ `
              query CurriculumsQuery ($input: CurriculumsSearchInput!) {
                curriculums(input: $input) {
                  curriculums {
                    id
                    title
                    description
                    thumbnailUrl
                    postedAt
                  }
                  pagination {
                    limit
                    offset
                    sort {
                      targetColumn
                      orderBy
                    }
                    totalRecords
                  }
                }
              }
            `,
          },
        },
      ]

      test.each(cases)('variables: $params.variables', ({ params }) => {
        const expected = {
          queryTemplate: params.queryTemplate,
          variables: params.variables,
          options: params.options,
        }
        const args = {
          variables: params.variables,
          options: params.options,
        }

        const querySpy = jest.spyOn(BaseGraphqlPayload, 'document', 'get')
          .mockReturnValue(params.queryTemplate)

        const DerivedClass = ConstructorSpyGenerator.create({ jest })
          .generateSpyKitClass(BaseGraphqlPayload)

        DerivedClass.create(args)

        expect(DerivedClass.__spy__)
          .toHaveBeenCalledWith(expected)

        querySpy.mockRestore()
      })
    })

    describe('to throw on called directly', () => {
      describe('to throw error', () => {
        const cases = [
          {
            params: {
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
              variables: {},
              options: {
                credentials: 'omit',
              },
            },
          },
        ]

        test.each(cases)('variables: $params.variables', ({ params }) => {
          const expected = 'this function must be inherited'

          expect(() => BaseGraphqlPayload.create(params))
            .toThrow(expected)
        })
      })
    })
  })
})

describe('BaseGraphqlPayload', () => {
  describe('#get:Ctor', () => {
    describe('to be own class', () => {
      const cases = [
        {
          params: {
            variables: {},
            queryTemplate: /* GraphQL */ `
              query PickUpForumTopicsQuery {
                pickUpForumTopics {
                  pickUpForumTopics {
                    id
                    forumCategory {
                      id
                      name
                    }
                    name
                    descriptionHtml
                    proposer {
                      customerId
                      username
                      avatarUrl
                      customerRoles {
                        id
                        name
                      }
                    }
                    proposedAt
                    editedAt
                    totalForumPost
                    latestForumPostPostedAt
                  }
                }
              }
            `,
          },
        },
        {
          params: {
            variables: {
              input: {
                id: 10001,
              },
            },
            queryTemplate: /* GraphQL */ `
              query CurriculumsQuery ($input: CurriculumsSearchInput!) {
                curriculums(input: $input) {
                  curriculums {
                    id
                    title
                    description
                    thumbnailUrl
                    postedAt
                  }
                  pagination {
                    limit
                    offset
                    sort {
                      targetColumn
                      orderBy
                    }
                    totalRecords
                  }
                }
              }
            `,
          },
        },
      ]

      test.each(cases)('variables: $params.variables', ({ params }) => {
        const payload = new BaseGraphqlPayload(params)

        expect(payload.Ctor)
          .toBe(BaseGraphqlPayload)
      })
    })
  })
})

describe('BaseGraphqlPayload', () => {
  describe('#buildHeaders()', () => {
    const queryTemplate = /* GraphQL */ `
      query PickUpForumTopicsQuery {
        pickUpForumTopics {
          pickUpForumTopics {
            id
            forumCategory {
              id
              name
            }
            name
            descriptionHtml
            proposer {
              customerId
              username
              avatarUrl
              customerRoles {
                id
                name
              }
            }
            proposedAt
            editedAt
            totalForumPost
            latestForumPostPostedAt
          }
        }
      }
    `

    describe('to be instance of Headers for Fetch API', () => {
      const cases = [
        {
          params: {
            headers: new Headers(),
          },
        },
        {
          params: {
            headers: new Headers({
              'Content-Type': 'application/json',
              'X-APP-ACCESS-KEY': 'access-key-of-our-application',
            }),
          },
        },
        {
          params: {
            headers: new Headers({
              'Content-Type': 'application/json',
            }),
          },
        },
        {
          params: {
            headers: new Headers({
              'Content-Type': 'ext/html',
            }),
          },
        },
      ]

      test.each(cases)('Content-Type: $params.headers', ({ params }) => {
        const payload = new BaseGraphqlPayload({
          queryTemplate,
          variables: {},
        })

        const actual = payload.buildHeaders(params)

        expect(actual)
          .toBeInstanceOf(Headers)
        expect(actual)
          .not
          .toBe(params.headers) // not same reference
      })
    })

    describe('to set "Content-Type" as "application/json"', () => {
      const cases = [
        {
          params: {
            headers: new Headers(),
          },
          expected: new Headers({
            'Content-Type': 'application/json',
          }),
        },
        {
          params: {
            headers: new Headers({
              'Content-Type': 'application/json',
              'X-APP-ACCESS-KEY': 'access-key-of-our-application',
            }),
          },
          expected: new Headers({
            'Content-Type': 'application/json',
            'X-APP-ACCESS-KEY': 'access-key-of-our-application',
          }),
        },
        {
          params: {
            headers: new Headers({
              'Content-Type': 'application/json',
            }),
          },
          expected: new Headers({
            'Content-Type': 'application/json',
          }),
        },
        {
          params: {
            headers: new Headers({
              'Content-Type': 'text/html',
              'X-APP-SECRET-KEY': 'secret-key-of-our-application',
            }),
          },
          expected: new Headers({
            'Content-Type': 'application/json',
            'X-APP-SECRET-KEY': 'secret-key-of-our-application',
          }),
        },
      ]

      test.each(cases)('Content-Type: $params.headers', ({ params, expected }) => {
        const payload = new BaseGraphqlPayload({
          queryTemplate,
          variables: {},
        })

        const actual = payload.buildHeaders(params)

        expect(actual)
          .toEqual(expected)
        expect(actual)
          .not
          .toBe(params.headers) // not same reference
      })
    })
  })
})

describe('BaseGraphqlPayload', () => {
  describe('#generateFetchRequestOptions()', () => {
    const queryTemplate = /* GraphQL */ `
                query CurriculumsQuery ($input: CurriculumsInput!) {
                  curriculums (input: $input) {
                    curriculums {
                      id
                      title
                    }
                  }
                }`

    describe('to be return object', () => {
      describe('for headers property', () => {
        describe('to be instanceof Headers', () => {
          const cases = [
            {
              params: {
                options: {
                  mode: 'cors',
                },
                variables: {
                  input: {
                    curriculumId: 20001,
                  },
                },
              },
            },
            {
              params: {
                options: {
                  headers: new Headers({
                    'X-APP-ACCESS-KEY': 'access-key-of-our-application',
                  }),
                },
                variables: {
                  input: {
                    curriculumId: 20002,
                  },
                },
              },
            },
          ]

          test.each(cases)('variables: $params.variables', ({ params }) => {
            const payload = new BaseGraphqlPayload({
              queryTemplate,
              variables: params.variables,
              options: params.options,
            })

            const actual = payload.generateFetchRequestOptions()

            expect(actual.headers)
              .toBeInstanceOf(Headers)
          })
        })

        describe('to be set return value of #buildHeaders()', () => {
          const cases = [
            {
              params: {
                options: {
                  mode: 'cors',
                },
                variables: {
                  input: {
                    curriculumId: 20001,
                  },
                },
              },
              expected: new Headers({
                'Content-Type': 'application/json',
              }),
            },
            {
              params: {
                options: {
                  headers: new Headers({
                    'X-APP-ACCESS-KEY': 'access-key-of-our-application',
                  }),
                },
                variables: {
                  input: {
                    curriculumId: 20002,
                  },
                },
              },
              expected: new Headers({
                'Content-Type': 'application/json',
                'X-APP-ACCESS-KEY': 'access-key-of-our-application',
              }),
            },
          ]

          test.each(cases)('variables: $params.variables', ({ params, expected }) => {
            const payload = new BaseGraphqlPayload({
              queryTemplate,
              variables: params.variables,
              options: params.options,
            })

            const actual = payload.generateFetchRequestOptions()

            expect(actual)
              .toHaveProperty('headers', expect.any(Headers))

            expect([...actual.headers.entries()])
              .toEqual(
                expect.arrayContaining([...expected.entries()])
              )
          })
        })
      })

      describe('for body property', () => {
        describe('to be set JSON string generated from #generateQuery()', () => {
          const cases = [
            {
              params: {
                options: {
                  mode: 'cors',
                },
                variables: {
                  input: {
                    curriculumId: 20001,
                  },
                },
              },
              expected: '{"query":"\\n                query CurriculumsQuery ($input: CurriculumsInput!) {\\n                  curriculums (input: $input) {\\n                    curriculums {\\n                      id\\n                      title\\n                    }\\n                  }\\n                }","variables":{"input":{"curriculumId":20001}}}',
            },
            {
              params: {
                options: {},
                variables: {
                  input: {
                    curriculumId: 20002,
                  },
                },
              },
              expected: '{"query":"\\n                query CurriculumsQuery ($input: CurriculumsInput!) {\\n                  curriculums (input: $input) {\\n                    curriculums {\\n                      id\\n                      title\\n                    }\\n                  }\\n                }","variables":{"input":{"curriculumId":20002}}}',
            },
          ]

          test.each(cases)('input: $params.input', ({ params, expected }) => {
            const payload = new BaseGraphqlPayload({
              queryTemplate,
              variables: params.variables,
              options: params.options,
            })

            const actual = payload.generateFetchRequestOptions()

            expect(actual.body)
              .toBe(expected)
          })
        })
      })

      describe('for extra property', () => {
        describe('to be set by options parameter', () => {
          const cases = [
            {
              params: {
                variables: {
                  input: {
                    curriculumId: 20001,
                  },
                },
                options: {
                  mode: 'cors',
                },
              },
              expected: {
                mode: 'cors',
              },
            },
            {
              params: {
                variables: {
                  input: {
                    curriculumId: 20002,
                  },
                },
                options: {
                  credentials: 'include',
                },
              },
              expected: {
                credentials: 'include',
              },
            },
            {
              params: {
                variables: {
                  input: {
                    curriculumId: 20003,
                  },
                },
                options: {
                  cache: 'no-cache',
                },
              },
              expected: {
                cache: 'no-cache',
              },
            },
            {
              params: {
                variables: {
                  input: {
                    curriculumId: 20004,
                  },
                },
                options: {
                  redirect: 'follow',
                },
              },
              expected: {
                redirect: 'follow',
              },
            },
          ]

          test.each(cases)('options: $params.options', ({ params, expected }) => {
            const payload = new BaseGraphqlPayload({
              queryTemplate,
              variables: params.variables,
              options: params.options,
            })

            const actual = payload.generateFetchRequestOptions()

            expect(actual)
              .toMatchObject(expected)
          })
        })
      })
    })
  })
})

describe('BaseGraphqlPayload', () => {
  describe('#createFetchRequest()', () => {
    describe('to be instance of Request', () => {
      const queryTemplate = /* GraphQL */ `
        query CurriculumsQuery ($input: CurriculumsSearchInput!) {
          curriculums(input: $input) {
            curriculums {
              id
              title
            }
          }
        }
      `

      const cases = [
        {
          params: {
            url: 'https://api.example.com/graphql-customer',
            options: {
              mode: 'cors',
            },
            variables: {
              input: {
                curriculumId: 20001,
              },
            },
          },
        },
        {
          params: {
            url: 'https://api.example.com/graphql-admin',
            options: {
              headers: new Headers({
                'X-APP-ACCESS-KEY': 'access-key-of-our-application',
              }),
            },
            variables: {
              input: {
                curriculumId: 20002,
              },
            },
          },
        },
      ]

      test.each(cases)('url: $params.url', ({ params }) => {
        const payload = new BaseGraphqlPayload({
          queryTemplate,
          variables: params.variables,
          options: params.options,
        })
        const args = {
          url: params.url,
        }

        const actual = payload.createFetchRequest(args)

        expect(actual)
          .toBeInstanceOf(Request)
      })
    })

    describe('to equal Request value', () => {
      const queryTemplate = /* GraphQL */ `
        query CurriculumsQuery ($input: CurriculumsSearchInput!) {
          curriculums(input: $input) {
            curriculums {
              id
              title
            }
          }
        }
      `

      const cases = [
        {
          params: {
            url: 'https://api.example.com/graphql-customer',
            options: {
              mode: 'cors',
            },
            variables: {
              input: {
                curriculumId: 20001,
              },
            },
          },
          expected: new Request('https://api.example.com/graphql-customer', {
            method: 'POST',
            headers: new Headers({
              'Content-Type': 'application/json',
            }),
            body: '{"query":"\\n        query {\\n          curriculums(input: {\\"curriculumId\\":20001}) {\\n            curriculums {\\n              id\\n              title\\n            }\\n          }\\n        }"}',
          }),
        },
        {
          params: {
            url: 'https://api.example.com/graphql-admin',
            options: {
              headers: new Headers({
                'X-APP-ACCESS-KEY': 'access-key-of-our-application',
              }),
            },
            variables: {
              input: {
                curriculumId: 20002,
              },
            },
          },
          expected: new Request('https://api.example.com/graphql-admin', {
            method: 'POST',
            headers: new Headers({
              'Content-Type': 'application/json',
              'X-APP-ACCESS-KEY': 'access-key-of-our-application',
            }),
            body: '{"query":"\\n        query {\\n          curriculums(input: {\\"curriculumId\\":20002}) {\\n            curriculums {\\n              id\\n              title\\n            }\\n          }\\n        }"}',
          }),
        },
      ]

      test.each(cases)('url: $params.url', ({ params }) => {
        const payload = new BaseGraphqlPayload({
          queryTemplate,
          variables: params.variables,
          options: params.options,
        })
        const args = {
          url: params.url,
        }

        const actual = payload.createFetchRequest(args)

        expect(actual)
          .toBeInstanceOf(Request)
      })
    })
  })
})

describe('BaseGraphqlPayload', () => {
  describe('#resolveValidatorHash()', () => {
    describe('to return as is for object hash validators', () => {
      const queryTemplate = /* GraphQL */ `
        query CurriculumsQuery ($input: CurriculumsSearchInput!) {
          curriculums(input: $input) {
            curriculums {
              id
              title
            }
          }
        }
      `

      /**
       * @type {Array<{
       *   args: {
       *     validators: {
       *       [group: string]: Array<import('~/modules/client/BaseGraphqlPayload').ValidatorOptionsType>
       *     }
       *   }
       * }>}
       */
      const cases = [
        {
          args: {
            validators: {
              input: [
                { field: 'username', body: (it, variables) => it },
                { field: 'username', body: (it, variables) => it && it.length >= 1 && it.length <= 8 },
                { field: 'password', body: (it, variables) => it },
              ],
            },
          },
        },
        {
          args: {
            validators: {
              alphaInput: [
                { field: 'invite-code', body: (it, variables) => it && it.length === 16 },
              ],
              betaInput: [
                { field: 'hidden-secret', body: (it, variables) => it && it.length === 32 },
              ],
            },
          },
        },
      ]

      test.each(cases)('validators: $args.validators', ({ args }) => {
        const payload = new BaseGraphqlPayload({
          queryTemplate,
          variables: {},
        })

        const actual = payload.resolveValidatorHash({
          validators: args.validators,
        })

        expect(actual)
          .toEqual(args.validators)
      })
    })

    describe('to return mapped by #variables', () => {
      const queryTemplate = /* GraphQL */ `
        query CurriculumsQuery ($input: CurriculumsSearchInput!) {
          curriculums(input: $input) {
            curriculums {
              id
              title
            }
          }
        }
      `

      /**
       * @type {Array<{
       *   args: {
       *     variables: import('~/modules/client/BaseGraphqlPayload').VariablesType
       *     validators: Array<import('~/modules/client/BaseGraphqlPayload').ValidatorOptionsType>
       *   }
       *   expected: import('~/modules/client/BaseGraphqlPayload').ValidatorHashType
       * }>}
       */
      const cases = [
        {
          args: {
            variables: {
              alphaInput: {
                username: 'Alice',
                password: 'password$001',
              },
              betaInput: {
                username: 'Bob',
                password: 'password$002',
              },
            },
            validators: [
              { field: 'username', message: 'message 001', body: (it, variables) => it },
              { field: 'username', message: 'message 002', body: (it, variables) => it && it.length >= 1 && it.length <= 8 },
              { field: 'password', message: 'message 003', body: (it, variables) => it },
            ],
          },
          expected: {
            alphaInput: [
              expect.objectContaining({ field: 'username', message: 'message 001' }),
              expect.objectContaining({ field: 'username', message: 'message 002' }),
              expect.objectContaining({ field: 'password', message: 'message 003' }),
            ],
            betaInput: [
              expect.objectContaining({ field: 'username', message: 'message 001' }),
              expect.objectContaining({ field: 'username', message: 'message 002' }),
              expect.objectContaining({ field: 'password', message: 'message 003' }),
            ],
          },
        },
        {
          args: {
            variables: {
              alphaInput: {
                'invite-code': '1234567890abcdef',
              },
              betaInput: {
                'invite-code': '1234567890abcdef',
              },
            },
            validators: [
              { field: 'invite-code', body: (it, variables) => it && it.length === 16 },
              { field: 'hidden-secret', body: (it, variables) => it && it.length === 32 },
            ],
          },
          expected: {
            alphaInput: [
              expect.objectContaining({ field: 'invite-code' }),
              expect.objectContaining({ field: 'hidden-secret' }),
            ],
            betaInput: [
              expect.objectContaining({ field: 'invite-code' }),
              expect.objectContaining({ field: 'hidden-secret' }),
            ],
          },
        },
      ]

      test.each(cases)('variables: $args.variables', ({ args, expected }) => {
        const payload = new BaseGraphqlPayload({
          queryTemplate,
          variables: args.variables,
        })

        const actual = payload.resolveValidatorHash({
          validators: args.validators,
        })

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})
