import {
  ConstructorSpyGenerator,
} from '@openreachtech/renchan-test-tools'

import BaseGraphqlPayload from '@/modules/client/BaseGraphqlPayload'

describe('BaseGraphqlPayload', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      describe('#queryTemplate', () => {
        const cases = [
          {
            params: {
              queryTemplate: `
                query pickUpForumTopics {
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
              queryTemplate: `
                query {
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
            input: null,
            options: {
              mode: 'cors',
            },
          }
          const actual = new BaseGraphqlPayload(args)

          expect(actual)
            .toHaveProperty('queryTemplate', params.queryTemplate)
        })
      })

      describe('#input', () => {
        const cases = [
          {
            params: {
              input: {
                id: 10001,
              },
            },
          },
          {
            params: {
              input: {
                id: 10002,
              },
            },
          },
          {
            params: {
              input: null,
            },
          },
        ]

        test.each(cases)('input: $params.input', ({ params }) => {
          const queryTemplate = `
            query {
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
            input: params.input,
            options: {
              mode: 'cors',
            },
          }
          const actual = new BaseGraphqlPayload(args)

          expect(actual)
            .toHaveProperty('input', params.input)
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

        test.each(cases)('input: $params.input', ({ params }) => {
          const queryTemplate = `
            query {
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
            input: null,
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
  describe('.get:query', () => {
    test('to throw Error', () => {
      const expected = 'this function must be inherited'

      expect(() => BaseGraphqlPayload.query)
        .toThrow(expected)
    })
  })
})

describe('BaseGraphqlPayload', () => {
  describe('.create', () => {
    describe('to return instance of this class', () => {
      const cases = [
        {
          params: {
            input: null,
            options: {
              mode: 'cors',
            },
            queryTemplate: `
              query pickUpForumTopics {
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
            input: {
              id: 10001,
            },
            options: {
              credentials: 'omit',
            },
            queryTemplate: `
              query {
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

      test.each(cases)('input: $params.input', ({ params }) => {
        const querySpy = jest.spyOn(BaseGraphqlPayload, 'query', 'get')
          .mockReturnValue(params.queryTemplate)

        const args = {
          input: params.input,
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
            input: null,
            options: {
              mode: 'cors',
            },
            queryTemplate: `
              query pickUpForumTopics {
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
            input: {
              id: 10001,
            },
            options: {
              credentials: 'omit',
            },
            queryTemplate: `
              query {
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

      test.each(cases)('input: $params.input', ({ params }) => {
        const expected = {
          queryTemplate: params.queryTemplate,
          input: params.input,
          options: params.options,
        }
        const args = {
          input: params.input,
          options: params.options,
        }

        const querySpy = jest.spyOn(BaseGraphqlPayload, 'query', 'get')
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
              input: {
                id: 10001,
              },
              options: {
                mode: 'cors',
              },
            },
          },
          {
            params: {
              input: null,
              options: {
                credentials: 'omit',
              },
            },
          },
        ]

        test.each(cases)('input: $params.input', ({ params }) => {
          const expected = 'this function must be inherited'

          expect(() => BaseGraphqlPayload.create(params))
            .toThrow(expected)
        })
      })
    })
  })
})

describe('BaseGraphqlPayload', () => {
  describe('#generateQuery()', () => {
    describe('query with no input', () => {
      const cases = [
        {
          params: {
            queryTemplate: `
              query pickUpForumTopics {
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
            queryTemplate: `
              query {
                curriculums {
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

      describe.each(cases)('queryTemplate: $params.queryTemplate', ({ params }) => {
        const args = [
          {
            input: {
              id: 10001,
            },
          },
          {
            input: {
              id: 10002,
            },
          },
          {
            input: null,
          },
        ]

        test.each(args)('input: $input', ({ input }) => {
          const expected = params.queryTemplate

          const querySpy = jest.spyOn(BaseGraphqlPayload, 'query', 'get')
            .mockReturnValue(params.queryTemplate)

          const payload = BaseGraphqlPayload.create({
            input,
            options: {
              mode: 'cors',
            },
          })

          const actual = payload.generateQuery()

          expect(actual)
            .toBe(expected)

          querySpy.mockRestore()
        })

        test('with no args of .create()', () => {
          const expected = params.queryTemplate

          const querySpy = jest.spyOn(BaseGraphqlPayload, 'query', 'get')
            .mockReturnValue(params.queryTemplate)

          const payload = BaseGraphqlPayload.create()

          const actual = payload.generateQuery()

          expect(actual)
            .toBe(expected)

          querySpy.mockRestore()
        })
      })
    })

    describe('query with input', () => {
      const cases = [
        {
          params: {
            queryTemplate: `
                query pickUpForumTopics (input: $input) {
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
          inputCases: [
            {
              input: {
                pickUpForumTopicId: 10001,
              },
              expected: `
                query pickUpForumTopics (input: {pickUpForumTopicId:10001}) {
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
            {
              input: {
                pickUpForumTopicId: 10002,
              },
              expected: `
                query pickUpForumTopics (input: {pickUpForumTopicId:10002}) {
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
          ],
        },
        {
          params: {
            queryTemplate: `
                query {
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
            `,
          },
          inputCases: [
            {
              input: {
                curriculumId: 20001,
              },
              expected: `
                query {
                  curriculums (input: {curriculumId:20001}) {
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
            {
              input: {
                curriculumId: 20002,
              },
              expected: `
                query {
                  curriculums (input: {curriculumId:20002}) {
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
          ],
        },
      ]

      describe.each(cases)('queryTemplate: $params.queryTemplate', ({ params, inputCases }) => {
        test.each(inputCases)('input: $input', ({ input, expected }) => {
          const querySpy = jest.spyOn(BaseGraphqlPayload, 'query', 'get')
            .mockReturnValue(params.queryTemplate)

          const payload = BaseGraphqlPayload.create({
            input,
            options: {
              mode: 'cors',
            },
          })

          const actual = payload.generateQuery()

          expect(actual)
            .toBe(expected)

          querySpy.mockRestore()
        })
      })
    })
  })
})

describe('BaseGraphqlPayload', () => {
  describe('#buildHeaders()', () => {
    const queryTemplate = `
      query pickUpForumTopics {
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
          input: null,
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
          input: null,
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
    const queryTemplate = `
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
                input: {
                  curriculumId: 20001,
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
                input: {
                  curriculumId: 20002,
                },
              },
            },
          ]

          test.each(cases)('input: $params.input', ({ params }) => {
            const payload = new BaseGraphqlPayload({
              queryTemplate,
              input: params.input,
            })
            const args = {
              options: params.options,
            }

            const actual = payload.generateFetchRequestOptions(args)

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
                input: {
                  curriculumId: 20001,
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
                input: {
                  curriculumId: 20002,
                },
              },
              expected: new Headers({
                'Content-Type': 'application/json',
                'X-APP-ACCESS-KEY': 'access-key-of-our-application',
              }),
            },
          ]

          test.each(cases)('input: $params.input', ({ params, expected }) => {
            const payload = new BaseGraphqlPayload({
              queryTemplate,
              input: params.input,
            })
            const args = {
              options: params.options,
            }

            const actual = payload.generateFetchRequestOptions(args)

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
              input: params.variables,
            })
            const args = {
              options: params.options,
            }

            const actual = payload.generateFetchRequestOptions(args)

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
                input: {
                  curriculumId: 20001,
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
                input: {
                  curriculumId: 20002,
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
                input: {
                  curriculumId: 20003,
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
                input: {
                  curriculumId: 20004,
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
              input: params.input,
              options: params.options,
            })
            const args = {
              options: params.options,
            }

            const actual = payload.generateFetchRequestOptions(args)

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
      const queryTemplate = `
        query {
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
            input: {
              curriculumId: 20001,
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
            input: {
              curriculumId: 20002,
            },
          },
        },
      ]

      test.each(cases)('url: $params.url', ({ params }) => {
        const payload = new BaseGraphqlPayload({
          queryTemplate,
          input: params.input,
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
      const queryTemplate = `
        query {
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
            input: {
              curriculumId: 20001,
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
            input: {
              curriculumId: 20002,
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
          input: params.input,
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
