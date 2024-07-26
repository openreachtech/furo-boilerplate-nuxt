import {
  ConstructorSpyGenerator,
} from '@openreachtech/renchan-test-tools'

import ObjectLiteralizer from '~/modules/client/ObjectLiteralizer'

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

describe('ObjectLiteralizer', () => {
  describe('#isValueToStringify()', () => {
    describe('when source is stringify target (return truthy)', () => {
      const cases = [
        {
          params: {
            source: null,
          },
        },
        {
          params: {
            source: new Date(),
          },
        },
        {
          params: {
            source: new (class DerivedClass {})(),
          },
        },
      ]

      test.each(cases)('source: $params.source', ({ params }) => {
        const literalizer = new ObjectLiteralizer(params)

        const actual = literalizer.isValueToStringify(params.source)

        expect(actual)
          .toBeTruthy()
      })
    })

    describe('when source is not stringify target (return falsy)', () => {
      const cases = [
        {
          params: {
            source: {
              alpha: 1,
            },
          },
        },
        {
          params: {
            source: [
              'first string',
              'second string',
              'third string',
            ],
          },
        },
      ]

      test.each(cases)('source: $params.source', ({ params }) => {
        const literalizer = new ObjectLiteralizer(params)

        const actual = literalizer.isValueToStringify(params.source)

        expect(actual)
          .toBeFalsy()
      })
    })
  })
})

describe('ObjectLiteralizer', () => {
  describe('#literalizeArray()', () => {
    const cases = [
      {
        params: {
          source: [],
        },
        expected: {
          result: '[]',
          calledTimes: 0,
        },
      },
      {
        params: {
          source: [
            'first string',
            'second string',
            'third string',
          ],
        },
        expected: {
          result: '["first string","second string","third string"]',
          calledTimes: 3,
        },
      },
      {
        params: {
          source: [
            1,
            2,
            3,
            4,
          ],
        },
        expected: {
          result: '[1,2,3,4]',
          calledTimes: 4,
        },
      },
      {
        params: {
          source: [
            {
              alpha: 1,
              beta: 2,
            },
            {
              alpha: 11,
              beta: 22,
            },
            {
              alpha: 111,
              beta: 222,
            },
          ],
        },
        expected: {
          result: '[{alpha:1,beta:2},{alpha:11,beta:22},{alpha:111,beta:222}]',
          calledTimes: 9, // 3 + 2 * 3
        },
      },
      {
        params: {
          source: [
            {
              alpha: 1,
              beta: [
                'first string',
                'second string',
                'third string',
                'fourth string',
              ],
              gamma: true,
            },
            {
              alpha: 11,
              beta: [
                'fifth string',
                'sixth string',
                'seventh string',
              ],
              gamma: false,
            },
          ],
        },

        expected: {
          result: '[{alpha:1,beta:["first string","second string","third string","fourth string"],gamma:true},{alpha:11,beta:["fifth string","sixth string","seventh string"],gamma:false}]',
          calledTimes: 15, // 2 + 3 * 2 + [4] + [3]
        },
      },
    ]

    test.each(cases)('source: $params.source', ({ params, expected }) => {
      const objectLiteralizer = new ObjectLiteralizer(params)

      const literalizeSpy = jest.spyOn(objectLiteralizer, 'literalize')

      const result = objectLiteralizer.literalizeArray(params.source)

      expect(result)
        .toBe(expected.result)
      expect(literalizeSpy)
        .toHaveBeenCalledTimes(expected.calledTimes)

      literalizeSpy.mockRestore()
    })
  })
})

describe('ObjectLiteralizer', () => {
  describe('#literalizeObject()', () => {
    const cases = [
      {
        params: {
          source: {},
        },
        expected: {
          result: '{}',
          calledTimes: 0,
        },
      },
      {
        params: {
          source: {
            alpha: 1,
          },
        },
        expected: {
          result: '{alpha:1}',
          calledTimes: 1,
        },
      },
      {
        params: {
          source: {
            alpha: 11,
            beta: 22,
          },
        },
        expected: {
          result: '{alpha:11,beta:22}',
          calledTimes: 2,
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
        expected: {
          result: '{alpha:{beta:222,gamma:333}}',
          calledTimes: 3,
        },
      },
      {
        params: {
          source: {
            alpha: 'first string',
            beta: 'second string',
            gamma: 'third string',
          },
        },
        expected: {
          result: '{alpha:"first string",beta:"second string",gamma:"third string"}',
          calledTimes: 3,
        },
      },
    ]

    test.each(cases)('source: $params.source', ({ params, expected }) => {
      const objectLiteralizer = new ObjectLiteralizer(params)

      const literalizeSpy = jest.spyOn(objectLiteralizer, 'literalize')

      const result = objectLiteralizer.literalizeObject(params.source)

      expect(result)
        .toBe(expected.result)
      expect(literalizeSpy)
        .toHaveBeenCalledTimes(expected.calledTimes)

      literalizeSpy.mockRestore()
    })
  })
})

describe('ObjectLiteralizer', () => {
  describe('#literalize()', () => {
    describe('when source is object', () => {
      const cases = [
        {
          params: {
            source: {},
          },
          expected: '{}',
        },
        {
          params: {
            source: {
              alpha: 1,
            },
          },
          expected: '{alpha:1}',
        },
        {
          params: {
            source: {
              alpha: 11,
              beta: 22,
            },
          },
          expected: '{alpha:11,beta:22}',
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
          expected: '{alpha:{beta:222,gamma:333}}',
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
          expected: '{alpha:{beta:222,gamma:{delta:444,epsilon:555}}}',
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
          expected: '{alpha:["first string","second string","third string"],beta:[{id:1001,title:"title-1"},{id:1002,title:"title-2"}]}',
        },
      ]

      test.each(cases)('source: $params.source', ({ params, expected }) => {
        const objectLiteralizer = new ObjectLiteralizer(params)

        const result = objectLiteralizer.literalize()

        expect(result)
          .toBe(expected)
      })
    })

    describe('when source is primitive', () => {
      const cases = [
        {
          params: {
            source: 123,
          },
          expected: '123',
        },
        {
          params: {
            source: 1000.456,
          },
          expected: '1000.456',
        },
        {
          params: {
            source: 'string',
          },
          expected: '"string"',
        },
        {
          params: {
            source: true,
          },
          expected: 'true',
        },
        {
          params: {
            source: false,
          },
          expected: 'false',
        },
      ]

      test.each(cases)('source: $params.source', ({ params, expected }) => {
        const objectLiteralizer = new ObjectLiteralizer(params)

        const result = objectLiteralizer.literalize()

        expect(result)
          .toBe(expected)
      })
    })

    describe('when source includes Date', () => {
      const cases = [
        {
          params: {
            source: new Date('2021-01-21T01:00:00.001Z'),
          },
          expected: '"2021-01-21T01:00:00.001Z"',
        },
        {
          params: {
            source: {
              savedAt: new Date('2021-02-22T02:00:00.002Z'),
            },
          },
          expected: '{savedAt:"2021-02-22T02:00:00.002Z"}',
        },
      ]

      test.each(cases)('source: $params.source', ({ params, expected }) => {
        const objectLiteralizer = new ObjectLiteralizer(params)

        const result = objectLiteralizer.literalize()

        expect(result)
          .toBe(expected)
      })
    })

    describe('to throw when source includes unliteralizable value', () => {
      const cases = [
        {
          params: {
            source: undefined, // undefined
          },
        },
        {
          params: {
            source: 1000n, // bigint
          },
        },
        {
          params: {
            source: Symbol('symbol'), // symbol
          },
        },
        {
          params: {
            source: () => {}, // function
          },
        },
        {
          params: {
            source () {}, // function
          },
        },
      ]

      test.each(cases)('source: $params.source', ({ params, expected }) => {
        const objectLiteralizer = new ObjectLiteralizer(params)

        expect(() => objectLiteralizer.literalize())
          .toThrow(new Error('Target value includes unliteralizable value'))
      })
    })
  })
})
