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
