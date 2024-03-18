import {
  ConstructorSpyGenerator,
} from '@openreachtech/renchan-test-tools'

import BaseGraphqlPayload from '@/modules/client/BaseGraphqlPayload'

describe('BaseGraphqlPayload', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
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
        const actual = new BaseGraphqlPayload(params)

        expect(actual)
          .toHaveProperty('queryTemplate', params.queryTemplate)
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
        const querySpy = jest.spyOn(BaseGraphqlPayload, 'query', 'get')
          .mockReturnValue(params.queryTemplate)

        const actual = BaseGraphqlPayload.create()

        expect(actual)
          .toBeInstanceOf(BaseGraphqlPayload)

        querySpy.mockRestore()
      })
    })

    describe('to call constructor', () => {
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
        const expected = {
          queryTemplate: params.queryTemplate,
        }

        const querySpy = jest.spyOn(BaseGraphqlPayload, 'query', 'get')
          .mockReturnValue(params.queryTemplate)

        const DerivedClass = ConstructorSpyGenerator.create({ jest })
          .generateSpyKitClass(BaseGraphqlPayload)

        DerivedClass.create()

        expect(DerivedClass.__spy__)
          .toHaveBeenCalledWith(expected)

        querySpy.mockRestore()
      })
    })

    describe('to throw on called directly', () => {
      test('to throw error', () => {
        const expected = 'this function must be inherited'

        expect(() => BaseGraphqlPayload.create())
          .toThrow(expected)
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
            input: {},
          },
          {
            input: {},
          },
        ]

        test.each(args)('input: $input', ({ input }) => {
          const expected = params.queryTemplate

          const querySpy = jest.spyOn(BaseGraphqlPayload, 'query', 'get')
            .mockReturnValue(params.queryTemplate)

          const payload = BaseGraphqlPayload.create()

          const actual = payload.generateQuery({
            input,
          })

          expect(actual)
            .toBe(expected)

          querySpy.mockRestore()
        })

        test('with no input', () => {
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
                query pickUpForumTopics (input: {"pickUpForumTopicId":10001}) {
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
                query pickUpForumTopics (input: {"pickUpForumTopicId":10002}) {
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
                  curriculums (input: {"curriculumId":20001}) {
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
                  curriculums (input: {"curriculumId":20002}) {
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

          const payload = BaseGraphqlPayload.create()

          const actual = payload.generateQuery({
            input,
          })

          expect(actual)
            .toBe(expected)

          querySpy.mockRestore()
        })
      })
    })
  })
})
