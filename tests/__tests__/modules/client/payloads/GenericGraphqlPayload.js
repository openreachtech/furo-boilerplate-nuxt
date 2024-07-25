import {
  ConstructorSpyGenerator,
} from '@openreachtech/renchan-test-tools'

import GenericGraphqlPayload from '~/modules/client/payloads/GenericGraphqlPayload'
import BaseGraphqlPayload from '~/modules/client/BaseGraphqlPayload'

describe('GenericGraphqlPayload', () => {
  describe('super class', () => {
    test('to be BaseGraphqlPayload', () => {
      const actual = GenericGraphqlPayload.prototype

      expect(actual)
        .toBeInstanceOf(BaseGraphqlPayload)
    })
  })
})

describe('GenericGraphqlPayload', () => {
  describe('.create', () => {
    describe('to return instance of this class', () => {
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
            variables: {
              input: null,
            },
            options: {
              mode: 'cors',
            },
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
            variables: {
              input: {
                id: 10001,
              },
            },
            options: {
              credentials: 'omit',
            },
          },
        },
      ]

      test.each(cases)('input: $params.input', ({ params }) => {
        const actual = GenericGraphqlPayload.create(params)

        expect(actual)
          .toBeInstanceOf(GenericGraphqlPayload)
      })
    })

    describe('to call constructor', () => {
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
            variables: {
              input: null,
            },
            options: {
              mode: 'cors',
            },
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
            variables: {
              input: {
                id: 10001,
              },
            },
            options: {
              credentials: 'omit',
            },
          },
        },
      ]

      test.each(cases)('input: $params.input', ({ params }) => {
        const querySpy = jest.spyOn(GenericGraphqlPayload, 'query', 'get')
          .mockReturnValue(params.queryTemplate)

        const DerivedClass = ConstructorSpyGenerator.create({ jest })
          .generateSpyKitClass(GenericGraphqlPayload)

        DerivedClass.create(params)

        expect(DerivedClass.__spy__)
          .toHaveBeenCalledWith(params)

        querySpy.mockRestore()
      })
    })
  })
})
