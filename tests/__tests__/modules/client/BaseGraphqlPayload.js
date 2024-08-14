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

      describe('#headers', () => {
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

        const cases = [
          {
            params: {
              options: {
                headers: new Headers(),
              },
            },
          },
          {
            params: {
              options: {
                headers: new Headers({
                  'content-type': 'application/json',
                }),
              },
            },
          },
          {
            params: {
              options: {
                headers: {
                  'content-type': 'application/json',
                },
              },
            },
          },
        ]

        test.each(cases)('headers: $params.options.headers', ({ params }) => {
          const args = {
            queryTemplate,
            variables: {},
            options: params.options,
          }
          const actual = new BaseGraphqlPayload(args)

          expect(actual.headers)
            .toBe(params.options.headers) // same reference
        })

        test('without headers parameter', () => {
          const args = {
            queryTemplate,
            variables: {},
            options: {},
          }
          const actual = new BaseGraphqlPayload(args)

          expect(actual)
            .toHaveProperty(
              'headers',
              expect.any(Headers)
            )
        })
      })

      describe('#restOptions', () => {
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

        const cases = [
          {
            params: {
              options: {
                headers: new Headers(),
                mode: 'cors',
              },
            },
            expected: {
              mode: 'cors',
            },
          },
          {
            params: {
              options: {
                headers: new Headers(),
                credentials: 'omit',
              },
            },
            expected: {
              credentials: 'omit',
            },
          },
          {
            params: {
              options: {
                priority: 'high',
              },
            },
            expected: {
              priority: 'high',
            },
          },
        ]

        test.each(cases)('options: $params.options', ({ params, expected }) => {
          const args = {
            queryTemplate,
            variables: {},
            options: params.options,
          }
          const actual = new BaseGraphqlPayload(args)

          expect(actual)
            .toHaveProperty('restOptions', expected)
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
          const expected = {
            headers: new Headers(),
            ...params.options,
          }

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
            .toHaveProperty('options', expected)
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
  describe('.get:fieldHash', () => {
    describe('to be []', () => {
      test('with no arguments', () => {
        const actual = BaseGraphqlPayload.fieldHash

        expect(actual)
          .toEqual({})
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
  describe('.collectBasedHeadersOptions()', () => {
    describe('to be fixed array', () => {
      test('with no arguments', () => {
        const expected = [
          {
            'content-type': 'application/json',
          },
        ]

        const actual = BaseGraphqlPayload.collectBasedHeadersOptions()

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})

describe('BaseGraphqlPayload', () => {
  describe('.collectBasedFetchOptions()', () => {
    describe('to be fixed array', () => {
      test('with no arguments', () => {
        const actual = BaseGraphqlPayload.collectBasedFetchOptions()

        expect(actual)
          .toBeInstanceOf(Array)
        expect(actual)
          .toHaveLength(0)
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
  describe('#createMergedHeaders()', () => {
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

    describe('to be instance of Headers', () => {
      const cases = [
        {
          params: {
            headers: new Headers(),
          },
          expected: new Headers({
            'content-type': 'application/json',
          }),
        },
        {
          params: {
            headers: new Headers({
              'x-app-access-key': 'access-key-of-our-application',
            }),
          },
          expected: new Headers({
            'content-type': 'application/json',
            'x-app-access-key': 'access-key-of-our-application',
          }),
        },
      ]

      test.each(cases)('headers: $params.headers', ({ params, expected }) => {
        const payload = new BaseGraphqlPayload({
          queryTemplate,
          variables: {},
          options: {
            headers: params.headers,
          },
        })

        const actual = payload.createMergedHeaders()

        expect(actual)
          .toBeInstanceOf(Headers)

        expect([...actual.entries()])
          .toEqual([...expected.entries()])
      })
    })
  })
})

describe('BaseGraphqlPayload', () => {
  describe('#generateMergedFetchOptionHash()', () => {
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
                    'x-app-access-key': 'access-key-of-our-application',
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

            const actual = payload.generateMergedFetchOptionHash()

            expect(actual.headers)
              .toBeInstanceOf(Headers)
          })
        })

        describe('to be set return value of created Headers', () => {
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
                'content-type': 'application/json',
              }),
            },
            {
              params: {
                options: {
                  headers: new Headers({
                    'x-app-access-key': 'access-key-of-our-application',
                  }),
                },
                variables: {
                  input: {
                    curriculumId: 20002,
                  },
                },
              },
              expected: new Headers({
                'content-type': 'application/json',
                'x-app-access-key': 'access-key-of-our-application',
              }),
            },
          ]

          test.each(cases)('variables: $params.variables', ({ params, expected }) => {
            const payload = new BaseGraphqlPayload({
              queryTemplate,
              variables: params.variables,
              options: params.options,
            })

            const actual = payload.generateMergedFetchOptionHash()

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

            const actual = payload.generateMergedFetchOptionHash()

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
                method: 'POST',
                body: expect.any(String),
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
                method: 'POST',
                body: expect.any(String),
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
                method: 'POST',
                body: expect.any(String),
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
                method: 'POST',
                body: expect.any(String),
              },
            },
          ]

          test.each(cases)('options: $params.options', ({ params, expected }) => {
            const payload = new BaseGraphqlPayload({
              queryTemplate,
              variables: params.variables,
              options: params.options,
            })

            const actual = payload.generateMergedFetchOptionHash()

            expect(actual)
              .toMatchObject(expected)
          })
        })
      })
    })
  })
})

describe('BaseGraphqlPayload', () => {
  describe('#extractFilteredVariables()', () => {
    describe('to return as is', () => {
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

      /**
       * @type {Array<{
       *   params: {
       *     variables: {
       *       input: {
       *         id: number
       *       }
       *     }
       *   }
       * }>}
       */
      const cases = [
        {
          params: {
            variables: {
              input: {
                id: 10001,
              },
            },
          },
        },
        {
          params: {
            variables: {
              input: {
                id: 10002,
              },
            },
          },
        },
      ]

      test.each(cases)('variables: $params.variables', ({ params }) => {
        const payload = new BaseGraphqlPayload({
          queryTemplate,
          variables: params.variables,
        })

        const actual = payload.extractFilteredVariables()

        expect(actual)
          .toBe(params.variables) // same reference
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
                'x-app-access-key': 'access-key-of-our-application',
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
              'content-type': 'application/json',
            }),
            body: '{"query":"\\n        query {\\n          curriculums(input: {\\"curriculumId\\":20001}) {\\n            curriculums {\\n              id\\n              title\\n            }\\n          }\\n        }"}',
          }),
        },
        {
          params: {
            url: 'https://api.example.com/graphql-admin',
            options: {
              headers: new Headers({
                'x-app-access-key': 'access-key-of-our-application',
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
              'content-type': 'application/json',
              'x-app-access-key': 'access-key-of-our-application',
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
  describe('#isValidVariables()', () => {
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

    /** @extends BaseGraphqlPayload<typeof AlphaPayload, *> */
    class AlphaPayload extends BaseGraphqlPayload {
      /** @override */
      static get document () {
        return queryTemplate
      }

      /** @override */
      static get fieldHash () {
        return {
          input: [
            'email',
            'username',
            'firstName',
            'lastName',
            'password',
          ],
        }
      }
    }

    /** @extends BaseGraphqlPayload<typeof BetaPayload, *> */
    class BetaPayload extends BaseGraphqlPayload {
      /** @override */
      static get document () {
        return queryTemplate
      }

      /** @override */
      static get fieldHash () {
        return {
          products: [
            'customerId',
            'productId',
          ],
          members: [
            'gender',
            'language',
            'minAge',
            'maxAge',
          ],
        }
      }
    }

    /**
     * @type {Array<{
     *   Payload: typeof BaseGraphqlPayload,
     *   truthyCases: Array<import('~/modules/client/BaseGraphqlPayload').VariablesType>,
     *   falsyCases: Array<import('~/modules/client/BaseGraphqlPayload').VariablesType>,
     * }>}
     */
    const cases = [
      {
        Payload: AlphaPayload,
        truthyCases: [
          {
            variables: {
              input: {
                email: 'eucen@example.com',
                username: 'StewEucen',
                firstName: 'Eucen',
                lastName: 'Stew',
                password: 'password$001',
              },
            },
          },
          {
            variables: {
              input: {
                email: 'eucen@example.com',
                username: 'StewEucen',
                // firstName: 'Eucen',
                lastName: 'Stew',
                password: 'password$001',
              },
            },
          },
          {
            variables: {
              input: {
                // email: 'eucen@example.com',
                // username: 'StewEucen',
                // firstName: 'Eucen',
                // lastName: 'Stew',
                // password: 'password$001',
              },
            },
          },
          {
            variables: {
              // input: {
              //   email: 'eucen@example.com',
              //   username: 'StewEucen',
              //   firstName: 'Eucen',
              //   lastName: 'Stew',
              //   password: 'password$001',
              // },
            },
          },
        ],
        falsyCases: [
          {
            variables: {
              input: {
                email: 'eucen@example.com',
                username: 'StewEucen',
                firstName: 'Eucen',
                lastName: 'Stew',
                password: 'password$001',
                extra: 'extra value', // ❌
              },
            },
          },
          {
            variables: {
              input: {
                email: 'eucen@example.com',
                username: 'StewEucen',
                // firstName: 'Eucen',
                lastName: 'Stew',
                password: 'password$001',
                extra: 'extra value', // ❌
              },
            },
          },
          {
            variables: {
              input: {
                // email: 'eucen@example.com',
                // username: 'StewEucen',
                // firstName: 'Eucen',
                // lastName: 'Stew',
                // password: 'password$001',
                extra: 'extra value', // ❌
              },
            },
          },
        ],
      },
      {
        Payload: BetaPayload,
        truthyCases: [
          {
            variables: {
              products: {
                customerId: 10001,
                productId: 20001,
              },
              members: {
                gender: 'male',
                language: 'en',
                minAge: 18,
                maxAge: 65,
              },
            },
          },
          {
            variables: {
              products: {
                customerId: 10001,
                // productId: 20001,
              },
              members: {
                gender: 'male',
                language: 'en',
                minAge: 18,
                maxAge: 65,
              },
            },
          },
          {
            variables: {
              products: {
                customerId: 10001,
                productId: 20001,
              },
              members: {
                // gender: 'male',
                language: 'en',
                minAge: 18,
                maxAge: 65,
              },
            },
          },
          {
            variables: {
              products: {
                // customerId: 10001,
                // productId: 20001,
              },
              members: {
                gender: 'male',
                language: 'en',
                minAge: 18,
                maxAge: 65,
              },
            },
          },
          {
            variables: {
              products: {
                customerId: 10001,
                productId: 20001,
              },
              members: {
                // gender: 'male',
                // language: 'en',
                // minAge: 18,
                // maxAge: 65,
              },
            },
          },
          {
            variables: {
              products: {
                // customerId: 10001,
                // productId: 20001,
              },
              members: {
                // gender: 'male',
                // language: 'en',
                // minAge: 18,
                // maxAge: 65,
              },
            },
          },
          {
            variables: {
              // products: {
              //   customerId: 10001,
              //   productId: 20001,
              // },
              members: {
                gender: 'male',
                language: 'en',
                minAge: 18,
                maxAge: 65,
              },
            },
          },
          {
            variables: {
              products: {
                customerId: 10001,
                productId: 20001,
              },
              // members: {
              //   gender: 'male',
              //   language: 'en',
              //   minAge: 18,
              //   maxAge: 65,
              // },
            },
          },
          {
            variables: {
              // products: {
              //   customerId: 10001,
              //   productId: 20001,
              // },
              // members: {
              //   gender: 'male',
              //   language: 'en',
              //   minAge: 18,
              //   maxAge: 65,
              // },
            },
          },
        ],
        falsyCases: [
          {
            variables: {
              products: {
                customerId: 10001,
                productId: 20001,
                extra: 'extra value', // ❌
              },
              members: {
                gender: 'male',
                language: 'en',
                minAge: 18,
                maxAge: 65,
              },
            },
          },
          {
            variables: {
              products: {
                customerId: 10001,
                productId: 20001,
              },
              members: {
                gender: 'male',
                language: 'en',
                minAge: 18,
                maxAge: 65,
                extra: 'extra value', // ❌
              },
            },
          },
          {
            variables: {
              products: {
                customerId: 10001,
                productId: 20001,
                extra: 'extra value', // ❌
              },
              members: {
                gender: 'male',
                language: 'en',
                minAge: 18,
                maxAge: 65,
                extra: 'extra value', // ❌
              },
            },
          },
          {
            variables: {
              products: {
                customerId: 10001,
                // productId: 20001,
                extra: 'extra value', // ❌
              },
              members: {
                gender: 'male',
                language: 'en',
                minAge: 18,
                maxAge: 65,
              },
            },
          },
          {
            variables: {
              products: {
                customerId: 10001,
                productId: 20001,
              },
              members: {
                gender: 'male',
                // language: 'en',
                minAge: 18,
                maxAge: 65,
                extra: 'extra value', // ❌
              },
            },
          },
          {
            variables: {
              products: {
                // customerId: 10001,
                // productId: 20001,
                extra: 'extra value', // ❌
              },
              members: {
                gender: 'male',
                language: 'en',
                minAge: 18,
                maxAge: 65,
              },
            },
          },
          {
            variables: {
              products: {
                customerId: 10001,
                productId: 20001,
              },
              members: {
                // gender: 'male',
                // language: 'en',
                // minAge: 18,
                // maxAge: 65,
                extra: 'extra value', // ❌
              },
            },
          },
          {
            variables: {
              products: {
                customerId: 10001,
                productId: 20001,
                extra: 'extra value', // ❌
              },
              // members: {
              //   gender: 'male',
              //   language: 'en',
              //   minAge: 18,
              //   maxAge: 65,
              // },
            },
          },
        ],
      },
    ]

    describe.each(cases)('Payload: $Payload.name', ({ Payload, truthyCases, falsyCases }) => {
      describe('to be truthy', () => {
        test.each(truthyCases)('variables: $variables', ({ variables }) => {
          const payload = Payload.create({ variables })

          const actual = payload.isValidVariables()

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        test.each(falsyCases)('variables: $variables', ({ variables }) => {
          const payload = Payload.create({ variables })

          const actual = payload.isValidVariables()

          expect(actual)
            .toBeFalsy()
        })
      })
    })
  })
})

describe('BaseGraphqlPayload', () => {
  describe('#isInvalidVariables()', () => {
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
     * @extends {BaseGraphqlPayload<
     *   typeof AlphaPayload,
     *   {
     *     input: {
     *       email: string
     *       username: string
     *       firstName: string
     *       lastName: string
     *       password: string
     *     }
     *   }
     * >}
     */
    class AlphaPayload extends BaseGraphqlPayload {
      /** @override */
      static get document () {
        return queryTemplate
      }

      /** @override */
      static get fieldHash () {
        return {
          input: [
            'email',
            'username',
            'firstName',
            'lastName',
            'password',
          ],
        }
      }
    }

    /**
     * @extends {BaseGraphqlPayload<
     *   typeof BetaPayload,
     *   {
     *     products: {
     *       customerId: number
     *       productId: number
     *     }
     *     members: {
     *       gender: string
     *       language: string
     *       minAge: number
     *       maxAge: number
     *     }
     *   }
     * >}
     */
    class BetaPayload extends BaseGraphqlPayload {
      /** @override */
      static get document () {
        return queryTemplate
      }

      /** @override */
      static get fieldHash () {
        return {
          products: [
            'customerId',
            'productId',
          ],
          members: [
            'gender',
            'language',
            'minAge',
            'maxAge',
          ],
        }
      }
    }

    /**
     * @type {Array<{
     *   Payload: typeof BaseGraphqlPayload<*, *>,
     *   truthyCases: Array<import('~/modules/client/BaseGraphqlPayload').VariablesType>,
     *   falsyCases: Array<import('~/modules/client/BaseGraphqlPayload').VariablesType>,
     * }>}
     */
    const cases = [
      {
        Payload: AlphaPayload,
        truthyCases: [
          {
            variables: {
              input: {
                email: 'eucen@example.com',
                username: 'StewEucen',
                firstName: 'Eucen',
                lastName: 'Stew',
                password: 'password$001',
                extra: 'extra value', // ❌
              },
            },
          },
          {
            variables: {
              input: {
                email: 'eucen@example.com',
                username: 'StewEucen',
                // firstName: 'Eucen',
                lastName: 'Stew',
                password: 'password$001',
                extra: 'extra value', // ❌
              },
            },
          },
          {
            variables: {
              input: {
                // email: 'eucen@example.com',
                // username: 'StewEucen',
                // firstName: 'Eucen',
                // lastName: 'Stew',
                // password: 'password$001',
                extra: 'extra value', // ❌
              },
            },
          },
        ],
        falsyCases: [
          {
            variables: {
              input: {
                email: 'eucen@example.com',
                username: 'StewEucen',
                firstName: 'Eucen',
                lastName: 'Stew',
                password: 'password$001',
              },
            },
          },
          {
            variables: {
              input: {
                email: 'eucen@example.com',
                username: 'StewEucen',
                // firstName: 'Eucen',
                lastName: 'Stew',
                password: 'password$001',
              },
            },
          },
          {
            variables: {
              input: {
                // email: 'eucen@example.com',
                // username: 'StewEucen',
                // firstName: 'Eucen',
                // lastName: 'Stew',
                // password: 'password$001',
              },
            },
          },
          {
            variables: {
              // input: {
              //   email: 'eucen@example.com',
              //   username: 'StewEucen',
              //   firstName: 'Eucen',
              //   lastName: 'Stew',
              //   password: 'password$001',
              // },
            },
          },
        ],
      },
      {
        Payload: BetaPayload,
        truthyCases: [
          {
            variables: {
              products: {
                customerId: 10001,
                productId: 20001,
                extra: 'extra value', // ❌
              },
              members: {
                gender: 'male',
                language: 'en',
                minAge: 18,
                maxAge: 65,
              },
            },
          },
          {
            variables: {
              products: {
                customerId: 10001,
                productId: 20001,
              },
              members: {
                gender: 'male',
                language: 'en',
                minAge: 18,
                maxAge: 65,
                extra: 'extra value', // ❌
              },
            },
          },
          {
            variables: {
              products: {
                customerId: 10001,
                productId: 20001,
                extra: 'extra value', // ❌
              },
              members: {
                gender: 'male',
                language: 'en',
                minAge: 18,
                maxAge: 65,
                extra: 'extra value', // ❌
              },
            },
          },
          {
            variables: {
              products: {
                customerId: 10001,
                // productId: 20001,
                extra: 'extra value', // ❌
              },
              members: {
                gender: 'male',
                language: 'en',
                minAge: 18,
                maxAge: 65,
              },
            },
          },
          {
            variables: {
              products: {
                customerId: 10001,
                productId: 20001,
              },
              members: {
                gender: 'male',
                // language: 'en',
                minAge: 18,
                maxAge: 65,
                extra: 'extra value', // ❌
              },
            },
          },
          {
            variables: {
              products: {
                // customerId: 10001,
                // productId: 20001,
                extra: 'extra value', // ❌
              },
              members: {
                gender: 'male',
                language: 'en',
                minAge: 18,
                maxAge: 65,
              },
            },
          },
          {
            variables: {
              products: {
                customerId: 10001,
                productId: 20001,
              },
              members: {
                // gender: 'male',
                // language: 'en',
                // minAge: 18,
                // maxAge: 65,
                extra: 'extra value', // ❌
              },
            },
          },
          {
            variables: {
              products: {
                customerId: 10001,
                productId: 20001,
                extra: 'extra value', // ❌
              },
              // members: {
              //   gender: 'male',
              //   language: 'en',
              //   minAge: 18,
              //   maxAge: 65,
              // },
            },
          },
        ],
        falsyCases: [
          {
            variables: {
              products: {
                customerId: 10001,
                productId: 20001,
              },
              members: {
                gender: 'male',
                language: 'en',
                minAge: 18,
                maxAge: 65,
              },
            },
          },
          {
            variables: {
              products: {
                customerId: 10001,
                // productId: 20001,
              },
              members: {
                gender: 'male',
                language: 'en',
                minAge: 18,
                maxAge: 65,
              },
            },
          },
          {
            variables: {
              products: {
                customerId: 10001,
                productId: 20001,
              },
              members: {
                // gender: 'male',
                language: 'en',
                minAge: 18,
                maxAge: 65,
              },
            },
          },
          {
            variables: {
              products: {
                // customerId: 10001,
                // productId: 20001,
              },
              members: {
                gender: 'male',
                language: 'en',
                minAge: 18,
                maxAge: 65,
              },
            },
          },
          {
            variables: {
              products: {
                customerId: 10001,
                productId: 20001,
              },
              members: {
                // gender: 'male',
                // language: 'en',
                // minAge: 18,
                // maxAge: 65,
              },
            },
          },
          {
            variables: {
              products: {
                // customerId: 10001,
                // productId: 20001,
              },
              members: {
                // gender: 'male',
                // language: 'en',
                // minAge: 18,
                // maxAge: 65,
              },
            },
          },
          {
            variables: {
              // products: {
              //   customerId: 10001,
              //   productId: 20001,
              // },
              members: {
                gender: 'male',
                language: 'en',
                minAge: 18,
                maxAge: 65,
              },
            },
          },
          {
            variables: {
              products: {
                customerId: 10001,
                productId: 20001,
              },
              // members: {
              //   gender: 'male',
              //   language: 'en',
              //   minAge: 18,
              //   maxAge: 65,
              // },
            },
          },
          {
            variables: {
              // products: {
              //   customerId: 10001,
              //   productId: 20001,
              // },
              // members: {
              //   gender: 'male',
              //   language: 'en',
              //   minAge: 18,
              //   maxAge: 65,
              // },
            },
          },
        ],
      },
    ]

    describe.each(cases)('Payload: $Payload.name', ({ Payload, truthyCases, falsyCases }) => {
      describe('to be truthy', () => {
        test.each(truthyCases)('variables: $variables', ({ variables }) => {
          const payload = Payload.create({ variables })

          const actual = payload.isInvalidVariables()

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        test.each(falsyCases)('variables: $variables', ({ variables }) => {
          const payload = Payload.create({ variables })

          const actual = payload.isInvalidVariables()

          expect(actual)
            .toBeFalsy()
        })
      })
    })
  })
})
