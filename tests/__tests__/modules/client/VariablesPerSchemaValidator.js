import {
  ConstructorSpyGenerator,
} from '@openreachtech/renchan-test-tools'

import VariablesPerSchemaValidator from '~/modules/client/VariablesPerSchemaValidator'
import FieldValidator from '~/modules/client/FieldValidator'

describe('VariablesPerSchemaValidator', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      describe('#variables', () => {
        const cases = [
          {
            args: {
              variables: {
                username: 'Alice',
              },
            },
          },
          {
            args: {
              variables: {
                password: 'password$001',
              },
            },
          },
          {
            args: {
              variables: {
                email: 'info@example.com',
              },
            },
          },
        ]

        test.each(cases)('variables: $args.variables', ({ args }) => {
          const constructorArgs = {
            variables: args.variables,
            validators: [],
          }

          const actual = new VariablesPerSchemaValidator(constructorArgs)

          expect(actual)
            .toHaveProperty('variables', args.variables)
          expect(actual.variables)
            .toBe(args.variables) // same reference
        })
      })

      describe('#validators', () => {
        const cases = [
          {
            args: {
              validators: [
                FieldValidator.create({
                  field: 'username',
                  body: () => true,
                  message: 'error message 001',
                }),
                FieldValidator.create({
                  field: 'username',
                  body: () => true,
                  message: 'error message 002',
                }),
              ],
            },
          },
          {
            args: {
              validators: [
                FieldValidator.create({
                  field: 'password',
                  body: () => true,
                  message: 'error message 003',
                }),
                FieldValidator.create({
                  field: 'password',
                  body: () => true,
                  message: 'error message 004',
                }),
              ],
            },
          },
          {
            args: {
              validators: [
                FieldValidator.create({
                  field: 'email',
                  body: () => true,
                  message: 'error message 005',
                }),
                FieldValidator.create({
                  field: 'email',
                  body: () => true,
                  message: 'error message 006',
                }),
              ],
            },
          },
          {
            args: {
              validators: [],
            },
          },
        ]

        test.each(cases)('message: $args.message', ({ args }) => {
          const constructorArgs = {
            variables: {
              password: 'password$001',
              email: 'info@example.com',
              bio: 'Because I am Stew Eucen.',
            },
            validators: args.validators,
          }

          const actual = new VariablesPerSchemaValidator(constructorArgs)

          expect(actual)
            .toHaveProperty('validators', args.validators)
          expect(actual.validators)
            .toBe(args.validators) // same reference
        })
      })
    })
  })
})

describe('VariablesPerSchemaValidator', () => {
  describe('.create()', () => {
    const cases = [
      {
        args: {
          field: 'username',
          variables: {
            username: 'Alice',
          },
          validators: [
            FieldValidator.create({
              field: 'username',
              body: () => true,
              message: 'error message 001',
            }),
            FieldValidator.create({
              field: 'username',
              body: () => true,
              message: 'error message 002',
            }),
          ],
        },
      },
      {
        args: {
          field: 'password',
          variables: {
            password: 'password$001',
          },
          validators: [
            FieldValidator.create({
              field: 'password',
              body: () => true,
              message: 'error message 003',
            }),
            FieldValidator.create({
              field: 'password',
              body: () => true,
              message: 'error message 004',
            }),
          ],
        },
      },
      {
        args: {
          field: 'email',
          variables: {
            email: 'info@example.com',
          },
          validators: [
            FieldValidator.create({
              field: 'email',
              body: () => true,
              message: 'error message 005',
            }),
            FieldValidator.create({
              field: 'email',
              body: () => true,
              message: 'error message 006',
            }),
          ],
        },
      },
      {
        args: {
          field: 'bio',
          variables: {
            bio: 'Because I am Stew Eucen.',
          },
          validators: [],
        },
      },
    ]

    describe('to be instance of own class', () => {
      test.each(cases)('field: $params.field', ({ args }) => {
        const actual = VariablesPerSchemaValidator.create(args)

        expect(actual)
          .toBeInstanceOf(VariablesPerSchemaValidator)
      })
    })

    describe('to call constructor', () => {
      test.each(cases)('field: $args.field', ({ args }) => {
        const DerivedClass = ConstructorSpyGenerator.create({ jest })
          .generateSpyKitClass(VariablesPerSchemaValidator)

        DerivedClass.create(args)

        expect(DerivedClass.__spy__)
          .toHaveBeenCalledWith(args)
      })
    })
  })
})

describe('VariablesPerSchemaValidator', () => {
  describe('#extractFieldNames()', () => {
    const cases = [
      {
        args: {
          variables: {
            username: 'Alice',
            password: 'password$001',
            email: 'info@example.com',
          },
          validators: [],
        },
        expected: [
          'username',
          'password',
          'email',
        ],
      },
      {
        args: {
          variables: {
            password: 'password$001',
            'password-confirmation': 'password$001',
          },
          validators: [],
        },
        expected: [
          'password',
          'password-confirmation',
        ],
      },
    ]

    test.each(cases)('variables: $args.variables', ({ args, expected }) => {
      const validator = VariablesPerSchemaValidator.create(args)

      const actual = validator.extractFieldNames()

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('VariablesPerSchemaValidator', () => {
  describe('#extractValidators()', () => {
    const cases = [
      {
        args: {
          variables: {
            username: 'Alice',
            password: 'password$001',
            email: 'info@example.com',
            bio: 'Because I am Stew Eucen.',
          },
          validators: [
            FieldValidator.create({
              field: 'username',
              body: () => true,
              message: 'error message 001',
            }),
            FieldValidator.create({
              field: 'username',
              body: () => true,
              message: 'error message 002',
            }),
            FieldValidator.create({
              field: 'password',
              body: () => true,
              message: 'error message 003',
            }),
            FieldValidator.create({
              field: 'email',
              body: () => true,
              message: 'error message 004',
            }),
          ],
        },
        fieldCases: [
          {
            field: 'username',
            expected: [
              FieldValidator.create({
                field: 'username',
                body: expect.any(Function),
                message: 'error message 001',
              }),
              FieldValidator.create({
                field: 'username',
                body: expect.any(Function),
                message: 'error message 002',
              }),
            ],
          },
          {
            field: 'password',
            expected: [
              FieldValidator.create({
                field: 'password',
                body: expect.any(Function),
                message: 'error message 003',
              }),
            ],
          },
          {
            field: 'email',
            expected: [
              FieldValidator.create({
                field: 'email',
                body: expect.any(Function),
                message: 'error message 004',
              }),
            ],
          },
          {
            field: 'bio',
            expected: [],
          },
        ],
      },
      {
        args: {
          variables: {
            password: 'password$001',
            'password-confirmation': 'password$001',
          },
          validators: [
            FieldValidator.create({
              field: 'password',
              body: () => true,
              message: 'error message 001',
            }),
            FieldValidator.create({
              field: 'password-confirmation',
              body: () => true,
              message: 'error message 002',
            }),
          ],
        },
        fieldCases: [
          {
            field: 'password',
            expected: [
              FieldValidator.create({
                field: 'password',
                body: expect.any(Function),
                message: 'error message 001',
              }),
            ],
          },
          {
            field: 'password-confirmation',
            expected: [
              FieldValidator.create({
                field: 'password-confirmation',
                body: expect.any(Function),
                message: 'error message 002',
              }),
            ],
          },
        ],
      },
      {
        args: {
          variables: {
            alpha: 1,
            beta: 2,
          },
          validators: [],
        },
        fieldCases: [
          {
            field: 'alpha',
            expected: [],
          },
          {
            field: 'beta',
            expected: [],
          },
        ],
      },
    ]

    describe.each(cases)('variables: $args.variables', ({ args, fieldCases }) => {
      const validator = VariablesPerSchemaValidator.create(args)

      test.each(fieldCases)('field: $field', ({ field, expected }) => {
        const actual = validator.extractValidators({
          field,
        })

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})

describe('VariablesPerSchemaValidator', () => {
  describe('#isValid()', () => {
    /**
     * @type {Array<{
     *   args: {
     *     validators: Array<import('~/modules/client/FieldValidator').default>
     *   }
     *   truthyCases: Array<{
     *     variables: Record<string, any>
     *   }>
     *   falsyCases: Array<{
     *     variables: Record<string, any>
     *   }>
     * }>}
     */
    const cases = [
      {
        args: {
          validators: [
            FieldValidator.create({
              field: 'username',
              body: (it, variables) => it,
              message: 'username is required',
            }),
            FieldValidator.create({
              field: 'username',
              body: (it, variables) =>
                it
                && it.length >= 1
                && it.length <= 8,
              message: 'username length 1 - 8 characters',
            }),
            FieldValidator.create({
              field: 'password',
              body: (it, variables) => it,
              message: 'password is required',
            }),
          ],
        },
        truthyCases: [
          {
            variables: {
              username: 'Alice',
              password: 'pass01',
            },
          },
          {
            variables: {
              username: 'Bob',
              password: 'pass002',
            },
          },
          {
            variables: {
              username: 'Charlie',
              password: 'pass0003',
            },
          },
        ],
        falsyCases: [
          {
            variables: {
              username: '',
              password: 'pass0004',
            },
          },
          {
            variables: {
              username: 'David',
              password: '',
            },
          },
          {
            variables: {
              username: '',
              password: '',
            },
          },
        ],
      },
      {
        args: {
          validators: [
            FieldValidator.create({
              field: 'password',
              body: (it, variables) => it,
              message: 'password is required',
            }),
            FieldValidator.create({
              field: 'password-confirmation',
              body: (it, variables) => it === variables.password,
              message: 'password confirmation must be the same as password',
            }),
          ],
        },
        truthyCases: [
          {
            variables: {
              password: 'pass0006',
              'password-confirmation': 'pass0006',
            },
          },
          {
            variables: {
              password: 'pass0007',
              'password-confirmation': 'pass0007',
            },
          },
        ],
        falsyCases: [
          {
            variables: {
              password: 'pass0008',
              'password-confirmation': 'miss0008',
            },
          },
          {
            variables: {
              password: 'pass0009',
              'password-confirmation': '',
            },
          },
          {
            variables: {
              password: '',
              'password-confirmation': 'miss0010',
            },
          },
        ],
      },
    ]

    describe.each(cases)('validators: $args.validators.length', ({ args, truthyCases, falsyCases }) => {
      describe('to be truthy', () => {
        test.each(truthyCases)('variables: $variables', ({ variables }) => {
          const validator = VariablesPerSchemaValidator.create({
            variables,
            validators: args.validators,
          })

          const actual = validator.isValid()

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        test.each(falsyCases)('variables: $variables', ({ variables }) => {
          const validator = VariablesPerSchemaValidator.create({
            variables,
            validators: args.validators,
          })

          const actual = validator.isValid()

          expect(actual)
            .toBeFalsy()
        })
      })
    })
  })
})

describe('VariablesPerSchemaValidator', () => {
  describe('#isInvalid()', () => {
    /**
     * @type {Array<{
     *   args: {
     *     validators: Array<import('~/modules/client/FieldValidator').default>
     *   }
     *   truthyCases: Array<{
     *     variables: Record<string, any>
     *   }>
     *   falsyCases: Array<{
     *     variables: Record<string, any>
     *   }>
     * }>}
     */
    const cases = [
      {
        args: {
          validators: [
            FieldValidator.create({
              field: 'username',
              body: (it, variables) => it,
              message: 'username is required',
            }),
            FieldValidator.create({
              field: 'username',
              body: (it, variables) =>
                it
                && it.length >= 1
                && it.length <= 8,
              message: 'username length 1 - 8 characters',
            }),
            FieldValidator.create({
              field: 'password',
              body: (it, variables) => it,
              message: 'password is required',
            }),
          ],
        },
        truthyCases: [
          {
            variables: {
              username: '',
              password: 'pass0004',
            },
          },
          {
            variables: {
              username: 'David',
              password: '',
            },
          },
          {
            variables: {
              username: '',
              password: '',
            },
          },
        ],
        falsyCases: [
          {
            variables: {
              username: 'Alice',
              password: 'pass01',
            },
          },
          {
            variables: {
              username: 'Bob',
              password: 'pass002',
            },
          },
          {
            variables: {
              username: 'Charlie',
              password: 'pass0003',
            },
          },
        ],
      },
      {
        args: {
          validators: [
            FieldValidator.create({
              field: 'password',
              body: (it, variables) => it,
              message: 'password is required',
            }),
            FieldValidator.create({
              field: 'password-confirmation',
              body: (it, variables) => it === variables.password,
              message: 'password confirmation must be the same as password',
            }),
          ],
        },
        truthyCases: [
          {
            variables: {
              password: 'pass0008',
              'password-confirmation': 'miss0008',
            },
          },
          {
            variables: {
              password: 'pass0009',
              'password-confirmation': '',
            },
          },
          {
            variables: {
              password: '',
              'password-confirmation': 'miss0010',
            },
          },
        ],
        falsyCases: [
          {
            variables: {
              password: 'pass0006',
              'password-confirmation': 'pass0006',
            },
          },
          {
            variables: {
              password: 'pass0007',
              'password-confirmation': 'pass0007',
            },
          },
        ],
      },
    ]

    describe.each(cases)('validators: $args.validators.length', ({ args, truthyCases, falsyCases }) => {
      describe('to be truthy', () => {
        test.each(truthyCases)('variables: $variables', ({ variables }) => {
          const validator = VariablesPerSchemaValidator.create({
            variables,
            validators: args.validators,
          })

          const actual = validator.isInvalid()

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        test.each(falsyCases)('variables: $variables', ({ variables }) => {
          const validator = VariablesPerSchemaValidator.create({
            variables,
            validators: args.validators,
          })

          const actual = validator.isInvalid()

          expect(actual)
            .toBeFalsy()
        })
      })
    })
  })
})

describe('VariablesPerSchemaValidator', () => {
  describe('#getAllMessages()', () => {
    /**
     * @type {Array<{
     *   args: {
     *     validators: Array<import('~/modules/client/FieldValidator').default>
     *   }
     *   fieldCases: Array<{
     *     field: string
     *     variables: Record<string, any>
     *     expected: Array<string>
     *   }>
     * }>}
     */
    const cases = [
      {
        args: {
          validators: [
            FieldValidator.create({
              field: 'username',
              body: (it, variables) => it,
              message: 'username is required',
            }),
            FieldValidator.create({
              field: 'username',
              body: (it, variables) =>
                it
                && it.length >= 1
                && it.length <= 8,
              message: 'username length 1 - 8 characters',
            }),
            FieldValidator.create({
              field: 'username',
              body: (it, variables) => {
                return !it
                  || /^\w+$/.test(it)
              },
              message: 'username must be alphanumeric',
            }),
            FieldValidator.create({
              field: 'password',
              body: (it, variables) => it,
              message: 'password is required',
            }),
          ],
        },
        fieldCases: [
          {
            field: 'username',
            variables: {
              username: 'Alice',
              password: 'pass0004',
            },
            expected: [],
          },
          {
            field: 'username',
            variables: {
              username: '',
              password: 'pass0004',
            },
            expected: [
              'username is required',
              'username length 1 - 8 characters',
            ],
          },
          {
            field: 'username',
            variables: {
              username: 'John Doe',
              password: 'pass0004',
            },
            expected: [
              'username must be alphanumeric',
            ],
          },
          {
            field: 'password',
            variables: {
              username: '',
              password: '',
            },
            expected: [
              'password is required',
            ],
          },
        ],
      },
      {
        args: {
          validators: [
            FieldValidator.create({
              field: 'password',
              body: (it, variables) => it,
              message: 'password is required',
            }),
            FieldValidator.create({
              field: 'password-confirmation',
              body: (it, variables) => {
                return !it
                  || it === variables.password
              },
              message: 'password confirmation must be the same as password',
            }),
          ],
        },
        fieldCases: [
          {
            field: 'password',
            variables: {
              password: 'pass0008',
              'password-confirmation': 'miss0008',
            },
            expected: [],
          },
          {
            field: 'password',
            variables: {
              password: '',
              'password-confirmation': '',
            },
            expected: [
              'password is required',
            ],
          },
          {
            field: 'password-confirmation',
            variables: {
              password: 'pass0008',
              'password-confirmation': 'miss0008',
            },
            expected: [
              'password confirmation must be the same as password',
            ],
          },
          {
            field: 'password-confirmation',
            variables: {
              password: '',
              'password-confirmation': '',
            },
            expected: [],
          },
        ],
      },
    ]

    describe.each(cases)('validators: $args.validators.length', ({ args, fieldCases }) => {
      test.each(fieldCases)('[$#] field: $field', ({ field, variables, expected }) => {
        const validator = VariablesPerSchemaValidator.create({
          variables,
          validators: args.validators,
        })

        const actual = validator.getAllMessages({
          field,
        })

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})

describe('VariablesPerSchemaValidator', () => {
  describe('#getOneMessage()', () => {
    /**
     * @type {Array<{
     *   args: {
     *     validators: Array<import('~/modules/client/FieldValidator').default>
     *   }
     *   fieldCases: Array<{
     *     field: string
     *     variables: Record<string, any>
     *     expected: string | null
     *   }>
     * }>}
     */
    const cases = [
      {
        args: {
          validators: [
            FieldValidator.create({
              field: 'username',
              body: (it, variables) => it,
              message: 'username is required',
            }),
            FieldValidator.create({
              field: 'username',
              body: (it, variables) =>
                it
                && it.length >= 1
                && it.length <= 8,
              message: 'username length 1 - 8 characters',
            }),
            FieldValidator.create({
              field: 'username',
              body: (it, variables) => {
                return !it
                  || /^\w+$/.test(it)
              },
              message: 'username must be alphanumeric',
            }),
            FieldValidator.create({
              field: 'password',
              body: (it, variables) => it,
              message: 'password is required',
            }),
          ],
        },
        fieldCases: [
          {
            field: 'username',
            variables: {
              username: 'Alice',
              password: 'pass0004',
            },
            expected: null,
          },
          {
            field: 'username',
            variables: {
              username: '',
              password: 'pass0004',
            },
            expected: 'username is required',
          },
          {
            field: 'username',
            variables: {
              username: 'John Doe',
              password: 'pass0004',
            },
            expected: 'username must be alphanumeric',
          },
          {
            field: 'password',
            variables: {
              username: '',
              password: '',
            },
            expected: 'password is required',
          },
        ],
      },
      {
        args: {
          validators: [
            FieldValidator.create({
              field: 'password',
              body: (it, variables) => it,
              message: 'password is required',
            }),
            FieldValidator.create({
              field: 'password-confirmation',
              body: (it, variables) => {
                return !it
                  || it === variables.password
              },
              message: 'password confirmation must be the same as password',
            }),
          ],
        },
        fieldCases: [
          {
            field: 'password',
            variables: {
              password: 'pass0008',
              'password-confirmation': 'miss0008',
            },
            expected: null,
          },
          {
            field: 'password',
            variables: {
              password: '',
              'password-confirmation': '',
            },
            expected: 'password is required',
          },
          {
            field: 'password-confirmation',
            variables: {
              password: 'pass0008',
              'password-confirmation': 'miss0008',
            },
            expected: 'password confirmation must be the same as password',
          },
          {
            field: 'password-confirmation',
            variables: {
              password: '',
              'password-confirmation': '',
            },
            expected: null,
          },
        ],
      },
    ]

    describe.each(cases)('validators: $args.validators.length', ({ args, fieldCases }) => {
      test.each(fieldCases)('[$#] field: $field', ({ field, variables, expected }) => {
        const validator = VariablesPerSchemaValidator.create({
          variables,
          validators: args.validators,
        })

        const actual = validator.getOneMessage({
          field,
        })

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})

describe('VariablesPerSchemaValidator', () => {
  describe('#isValidField()', () => {
    /**
     * @type {Array<{
     *   args: {
     *     validators: Array<import('~/modules/client/FieldValidator').default>
     *   }
     *   fieldCases: Array<{
     *     field: string
     *     variables: Record<string, any>
     *     expected: boolean
     *   }>
     * }>}
     */
    const cases = [
      {
        args: {
          validators: [
            FieldValidator.create({
              field: 'username',
              body: (it, variables) => it,
              message: 'username is required',
            }),
            FieldValidator.create({
              field: 'username',
              body: (it, variables) =>
                it
                && it.length >= 1
                && it.length <= 8,
              message: 'username length 1 - 8 characters',
            }),
            FieldValidator.create({
              field: 'username',
              body: (it, variables) => {
                return !it
                  || /^\w+$/.test(it)
              },
              message: 'username must be alphanumeric',
            }),
            FieldValidator.create({
              field: 'password',
              body: (it, variables) => it,
              message: 'password is required',
            }),
          ],
        },
        fieldCases: [
          {
            field: 'username',
            variables: {
              username: 'Alice',
              password: 'pass0004',
            },
            expected: true,
          },
          {
            field: 'username',
            variables: {
              username: '',
              password: 'pass0004',
            },
            expected: false,
          },
          {
            field: 'username',
            variables: {
              username: 'John Doe',
              password: 'pass0004',
            },
            expected: false,
          },
          {
            field: 'password',
            variables: {
              username: '',
              password: '',
            },
            expected: false,
          },
        ],
      },
      {
        args: {
          validators: [
            FieldValidator.create({
              field: 'password',
              body: (it, variables) => it,
              message: 'password is required',
            }),
            FieldValidator.create({
              field: 'password-confirmation',
              body: (it, variables) => {
                return !it
                  || it === variables.password
              },
              message: 'password confirmation must be the same as password',
            }),
          ],
        },
        fieldCases: [
          {
            field: 'password',
            variables: {
              password: 'pass0008',
              'password-confirmation': 'miss0008',
            },
            expected: true,
          },
          {
            field: 'password',
            variables: {
              password: '',
              'password-confirmation': '',
            },
            expected: false,
          },
          {
            field: 'password-confirmation',
            variables: {
              password: 'pass0008',
              'password-confirmation': 'miss0008',
            },
            expected: false,
          },
          {
            field: 'password-confirmation',
            variables: {
              password: '',
              'password-confirmation': '',
            },
            expected: true,
          },
        ],
      },
    ]

    describe.each(cases)('validators: $args.validators.length', ({ args, fieldCases }) => {
      test.each(fieldCases)('[$#] field: $field', ({ field, variables, expected }) => {
        const validator = VariablesPerSchemaValidator.create({
          variables,
          validators: args.validators,
        })

        const actual = validator.isValidField({
          field,
        })

        expect(actual)
          .toBe(expected)
      })
    })
  })
})
