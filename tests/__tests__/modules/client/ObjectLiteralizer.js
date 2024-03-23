import {
  ConstructorSpyGenerator,
} from '@openreachtech/renchan-test-tools'

import ObjectLiteralizer from '@/modules/client/ObjectLiteralizer'

describe('ObjectLiteralizer', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      describe('#source', () => {
        const cases = [
          {
            params: {
              source: {},
            },
          },
          {
            params: {
              source: {
                alpha: 1,
              },
            },
          },
          {
            params: {
              source: {
                alpha: 11,
                beta: 22,
              },
            },
          },
          {
            params: {
              source: {
                alpha: {
                  beta: 222,
                  gamma: 333,
                },
              },
            },
          },
          {
            params: {
              source: {
                alpha: {
                  beta: 222,
                  gamma: {
                    delta: 444,
                    epsilon: 555,
                  },
                },
              },
            },
          },
          {
            params: {
              source: {
                alpha: [
                  'first string',
                  'second string',
                  'third string',
                ],
                beta: [
                  {
                    gamma: 1001,
                    delta: 1002,
                  },
                  {
                    gamma: 1003,
                    delta: 1004,
                  },
                ],
              },
            },
          },
        ]

        test.each(cases)('source: $params.source', ({ params }) => {
          const objectLiteralizer = new ObjectLiteralizer(params)

          expect(objectLiteralizer)
            .toHaveProperty('source', params.source)
        })
      })
    })
  })
})

describe('ObjectLiteralizer', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            source: {},
          },
        },
        {
          params: {
            source: {
              alpha: 1,
            },
          },
        },
        {
          params: {
            source: {
              alpha: 11,
              beta: 22,
            },
          },
        },
        {
          params: {
            source: {
              alpha: {
                beta: 222,
                gamma: 333,
              },
            },
          },
        },
        {
          params: {
            source: {
              alpha: {
                beta: 222,
                gamma: {
                  delta: 444,
                  epsilon: 555,
                },
              },
            },
          },
        },
        {
          params: {
            source: {
              alpha: [
                'first string',
                'second string',
                'third string',
              ],
              beta: [
                {
                  id: 1001,
                  title: 'title-1',
                },
                {
                  id: 1002,
                  title: 'title-2',
                },
              ],
            },
          },
        },
      ]

      test.each(cases)('source: $params.source', ({ params }) => {
        const objectLiteralizer = ObjectLiteralizer.create(params)

        expect(objectLiteralizer)
          .toBeInstanceOf(ObjectLiteralizer)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            source: {},
          },
        },
        {
          params: {
            source: {
              alpha: 1,
            },
          },
        },
        {
          params: {
            source: {
              alpha: 11,
              beta: 22,
            },
          },
        },
        {
          params: {
            source: {
              alpha: {
                beta: 222,
                gamma: 333,
              },
            },
          },
        },
        {
          params: {
            source: {
              alpha: {
                beta: 222,
                gamma: {
                  delta: 444,
                  epsilon: 555,
                },
              },
            },
          },
        },
        {
          params: {
            source: {
              alpha: [
                'first string',
                'second string',
                'third string',
              ],
              beta: [
                {
                  id: 1001,
                  title: 'title-1',
                },
                {
                  id: 1002,
                  title: 'title-2',
                },
              ],
            },
          },
        },
      ]

      test.each(cases)('source: $params.source', ({ params }) => {
        const DerivedClass = ConstructorSpyGenerator.create({ jest })
          .generateSpyKitClass(ObjectLiteralizer)

        DerivedClass.create(params)

        expect(DerivedClass.__spy__)
          .toHaveBeenCalledWith(params)
      })
    })
  })
})

describe('ObjectLiteralizer', () => {
  describe('#isUnliteralizable()', () => {
    describe('when source is unliteralizable (return truthy)', () => {
      const cases = [
        {
          params: {
            sources: undefined,
          },
        },
        {
          params: {
            sources: 10000000000n,
          },
        },
        {
          params: {
            sources: Symbol('symbol'),
          },
        },
        {
          params: {
            sources: () => {},
          },
        },
        {
          params: {
            sources () { return 999 },
          },
        },
      ]
        .concat([
          {
            params: {
              sources: {
                alpha: undefined,
              },
            },
          },
          {
            params: {
              sources: {
                alpha: 10000000000n,
              },
            },
          },
          {
            params: {
              sources: {
                alpha: Symbol('symbol'),
              },
            },
          },
          {
            params: {
              sources: {
                alpha: () => {},
              },
            },
          },
          {
            params: {
              sources: {
                alpha () { return 999 },
              },
            },
          },
        ])

      test.each(cases)('source: $params.source', ({ params }) => {
        const literalizer = new ObjectLiteralizer(params)

        const actual = literalizer.isUnliteralizable(params.source)

        expect(actual)
          .toBeTruthy()
      })
    })

    describe('when source is not unliteralizable (return falsy)', () => {
      const cases = [
        {
          params: {
            source: {},
          },
        },
        {
          params: {
            source: {
              alpha: 1,
            },
          },
        },
        {
          params: {
            source: {
              alpha: 11,
              beta: 22,
            },
          },
        },
        {
          params: {
            source: {
              alpha: {
                beta: 222,
                gamma: 333,
              },
            },
          },
        },
        {
          params: {
            source: {
              alpha: {
                beta: 222,
                gamma: {
                  delta: 444,
                  epsilon: 555,
                },
              },
            },
          },
        },
        {
          params: {
            source: {
              alpha: [
                'first string',
                'second string',
                'third string',
              ],
              beta: [
                {
                  gamma: 1001,
                  delta: 1002,
                },
                {
                  gamma: 1003,
                  delta: 1004,
                },
              ],
            },
          },
        },
      ]

      test.each(cases)('source: $params.source', ({ params }) => {
        const literalizer = new ObjectLiteralizer(params)

        const actual = literalizer.isUnliteralizable(params.source)

        expect(actual)
          .toBeFalsy()
      })
    })
  })
})
