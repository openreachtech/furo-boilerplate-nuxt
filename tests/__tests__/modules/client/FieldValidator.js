import {
  ConstructorSpyGenerator,
} from '@openreachtech/renchan-test-tools'

import FieldValidator from '~/modules/client/FieldValidator'

describe('FieldValidator', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      describe('#field', () => {
        const cases = [
          {
            args: {
              field: 'customer',
            },
            expected: 'customer',
          },
          {
            args: {
              field: 'message',
            },
            expected: 'message',
          },
        ]

        test.each(cases)('field: $args.field', ({ args, expected }) => {
          const constructorArgs = {
            field: args.field,
            body: () => true,
          }

          const actual = new FieldValidator(constructorArgs)

          expect(actual)
            .toHaveProperty('field', expected)
        })
      })

      describe('#body', () => {
        const cases = [
          {
            args: {
              field: 'customer',
              body: () => true,
            },
          },
          {
            args: {
              field: 'customer',
              body: () => false,
            },
          },
        ]

        test.each(cases)('field: $args.field', ({ args }) => {
          const constructorArgs = {
            field: args.field,
            body: args.body,
          }

          const actual = new FieldValidator(constructorArgs)

          expect(actual)
            .toHaveProperty('body', args.body)
          expect(actual.body)
            .toBe(args.body) // same reference
        })
      })

      describe('#message', () => {
        const cases = [
          {
            args: {
              message: 'error message',
            },
            expected: 'error message',
          },
          {
            args: {
              message: 'error message-01',
            },
            expected: 'error message-01',
          },
        ]

        test.each(cases)('message: $args.message', ({ args, expected }) => {
          const constructorArgs = {
            field: 'extra',
            body: () => true,
            message: args.message,
          }

          const actual = new FieldValidator(constructorArgs)

          expect(actual)
            .toHaveProperty('message', expected)
        })
      })
    })
  })
})

describe('FieldValidator', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            field: 'customer',
            body: () => true,
          },
        },
        {
          params: {
            field: 'message',
            body: () => false,
          },
        },
      ]

      test.each(cases)('field: $params.field', ({ params }) => {
        const actual = FieldValidator.create(params)

        expect(actual)
          .toBeInstanceOf(FieldValidator)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          args: {
            field: 'customer',
            body: () => true,
          },
        },
        {
          args: {
            field: 'message',
            body: () => false,
          },
        },
      ]

      test.each(cases)('field: $args.field', ({ args }) => {
        const DerivedClass = ConstructorSpyGenerator.create({ jest })
          .generateSpyKitClass(FieldValidator)

        DerivedClass.create(args)

        expect(DerivedClass.__spy__)
          .toHaveBeenCalledWith(args)
      })
    })
  })
})

describe('FieldValidator', () => {
  describe('#accepts()', () => {
    describe('to be truthy', () => {
      const cases = [
        {
          args: {
            field: 'customer',
            body: () => true,
          },
          fieldCases: [
            { field: 'customer' },
          ],
        },
        {
          args: {
            field: 'message',
            body: () => false,
          },
          fieldCases: [
            { field: 'message' },
          ],
        },
      ]

      describe.each(cases)('field: $args.field', ({ args, fieldCases }) => {
        const validator = FieldValidator.create(args)

        test.each(fieldCases)('field: $field', ({ field }) => {
          const actual = validator.accepts({ field })

          expect(actual)
            .toBeTruthy()
        })
      })
    })

    describe('to be falsy', () => {
      const cases = [
        {
          args: {
            field: 'customer',
            body: () => true,
          },
          fieldCases: [
            { field: 'notCustomer' },
            { field: 'extraCustomer' },
          ],
        },
        {
          args: {
            field: 'message',
            body: () => false,
          },
          fieldCases: [
            { field: 'notMessage' },
            { field: 'extraMessage' },
          ],
        },
      ]

      describe.each(cases)('field: $args.field', ({ args, fieldCases }) => {
        const validator = FieldValidator.create(args)

        test.each(fieldCases)('field: $field', ({ field }) => {
          const actual = validator.accepts({ field })

          expect(actual)
            .toBeFalsy()
        })
      })
    })
  })
})

describe('FieldValidator', () => {
  describe('#rejects()', () => {
    describe('to be truthy', () => {
      const cases = [
        {
          args: {
            field: 'customer',
            body: () => true,
          },
          fieldCases: [
            { field: 'notCustomer' },
            { field: 'extraCustomer' },
          ],
        },
        {
          args: {
            field: 'message',
            body: () => false,
          },
          fieldCases: [
            { field: 'notMessage' },
            { field: 'extraMessage' },
          ],
        },
      ]

      describe.each(cases)('field: $args.field', ({ args, fieldCases }) => {
        const validator = FieldValidator.create(args)

        test.each(fieldCases)('field: $field', ({ field }) => {
          const actual = validator.rejects({ field })

          expect(actual)
            .toBeTruthy()
        })
      })
    })

    describe('to be falsy', () => {
      const cases = [
        {
          args: {
            field: 'customer',
            body: () => true,
          },
          fieldCases: [
            { field: 'customer' },
          ],
        },
        {
          args: {
            field: 'message',
            body: () => false,
          },
          fieldCases: [
            { field: 'message' },
          ],
        },
      ]

      describe.each(cases)('field: $args.field', ({ args, fieldCases }) => {
        const validator = FieldValidator.create(args)

        test.each(fieldCases)('field: $field', ({ field }) => {
          const actual = validator.rejects({ field })

          expect(actual)
            .toBeFalsy()
        })
      })
    })
  })
})

describe('FieldValidator', () => {
  describe('#isValid()', () => {
    /**
     * @type {Array<{
     *   args: {
     *     field: string
     *     body: (
     *       it: any,
     *       variables: {
     *         [key: string]: any
     *       }) => boolean
     *     message?: string | null
     *   }
     *   truthyCases: Array<{
     *     target: any
     *     variables: {
     *       [key: string]: any
     *     }
     *   }>
     *   falsyCases: Array<{
     *     target: any
     *     variables: {
     *       [key: string]: any
     *     }
     *   }>
     * }>} cases - Test cases.
     */
    const cases = [
      {
        args: {
          field: 'username',
          body: (it, variables) => it,
        },
        truthyCases: [
          {
            target: 'alpha',
            variables: {},
          },
          {
            target: 'beta',
            variables: {},
          },
        ],
        falsyCases: [
          {
            target: '',
            variables: {},
          },
          {
            target: null,
            variables: {},
          },
          {
            target: undefined,
            variables: {},
          },
        ],
      },
      {
        args: {
          field: 'password',
          body: (it, variables) =>
            it
            && it === variables.passwordConfirmation
          ,
        },
        truthyCases: [
          {
            target: 'alpha',
            variables: {
              passwordConfirmation: 'alpha',
            },
          },
          {
            target: 'beta',
            variables: {
              passwordConfirmation: 'beta',
            },
          },
        ],
        falsyCases: [
          {
            target: 'alpha',
            variables: {
              passwordConfirmation: 'notAlpha',
            },
          },
          {
            target: 'beta',
            variables: {
              passwordConfirmation: 'notBeta',
            },
          },
          {
            target: '',
            variables: {
              passwordConfirmation: '',
            },
          },
          {
            target: null,
            variables: {
              passwordConfirmation: null,
            },
          },
          {
            target: undefined,
            variables: {
              passwordConfirmation: undefined,
            },
          },
        ],
      },
    ]

    describe.each(cases)('field: $args.field', ({ args, truthyCases, falsyCases }) => {
      const validator = FieldValidator.create(args)

      describe('to be truthy', () => {
        test.each(truthyCases)('target: $target', ({ target, variables }) => {
          const actual = validator.isValid({
            target,
            variables,
          })

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        test.each(falsyCases)('target: $target', ({ target, variables }) => {
          const actual = validator.isValid({
            target,
            variables,
          })

          expect(actual)
            .toBeFalsy()
        })
      })
    })
  })
})

describe('FieldValidator', () => {
  describe('#isInvalid()', () => {
    /**
     * @type {Array<{
     *   args: {
     *     field: string
     *     body: (
     *       it: any,
     *       variables: {
     *         [key: string]: any
     *       }) => boolean
     *     message?: string | null
     *   }
     *   truthyCases: Array<{
     *     target: any
     *     variables: {
     *       [key: string]: any
     *     }
     *   }>
     *   falsyCases: Array<{
     *     target: any
     *     variables: {
     *       [key: string]: any
     *     }
     *   }>
     * }>} cases - Test cases.
     */
    const cases = [
      {
        args: {
          field: 'username',
          body: (it, variables) => it,
        },
        truthyCases: [
          {
            target: '',
            variables: {},
          },
          {
            target: null,
            variables: {},
          },
          {
            target: undefined,
            variables: {},
          },
        ],
        falsyCases: [
          {
            target: 'alpha',
            variables: {},
          },
          {
            target: 'beta',
            variables: {},
          },
        ],
      },
      {
        args: {
          field: 'password',
          body: (it, variables) =>
            it
            && it === variables.passwordConfirmation
          ,
        },
        truthyCases: [
          {
            target: 'alpha',
            variables: {
              passwordConfirmation: 'notAlpha',
            },
          },
          {
            target: 'beta',
            variables: {
              passwordConfirmation: 'notBeta',
            },
          },
          {
            target: '',
            variables: {
              passwordConfirmation: '',
            },
          },
          {
            target: null,
            variables: {
              passwordConfirmation: null,
            },
          },
          {
            target: undefined,
            variables: {
              passwordConfirmation: undefined,
            },
          },
        ],
        falsyCases: [
          {
            target: 'alpha',
            variables: {
              passwordConfirmation: 'alpha',
            },
          },
          {
            target: 'beta',
            variables: {
              passwordConfirmation: 'beta',
            },
          },
        ],
      },
    ]

    describe.each(cases)('field: $args.field', ({ args, truthyCases, falsyCases }) => {
      const validator = FieldValidator.create(args)

      describe('to be truthy', () => {
        test.each(truthyCases)('target: $target', ({ target, variables }) => {
          const actual = validator.isInvalid({
            target,
            variables,
          })

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        test.each(falsyCases)('target: $target', ({ target, variables }) => {
          const actual = validator.isInvalid({
            target,
            variables,
          })

          expect(actual)
            .toBeFalsy()
        })
      })
    })
  })
})

describe('FieldValidator', () => {
  describe('#getMessage()', () => {
    describe('to return #message', () => {
      const cases = [
        {
          args: {
            field: 'username',
            body: () => true,
            message: 'error message 01',
          },
          expected: 'error message 01',
        },
        {
          args: {
            field: 'password',
            body: () => false,
            message: 'error message-02',
          },
          expected: 'error message-02',
        },
        {
          args: {
            field: 'gender',
            body: () => false,
          },
          expected: null,
        },
      ]

      test.each(cases)('message: $args.message', ({ args, expected }) => {
        const validator = FieldValidator.create(args)

        const actual = validator.getMessage()

        expect(actual)
          .toBe(expected)
      })
    })
  })
})
