import {
  ConstructorSpyGenerator,
} from '@openreachtech/renchan-test-tools'

import VariablesValidator from '~/modules/validators/ValueHashValidator'
import FieldValidator from '~/modules/client/FieldValidator'

describe('VariablesValidator', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      describe('#valueHash', () => {
        const cases = [
          {
            args: {
              valueHash: {
                username: 'Alice',
              },
            },
          },
          {
            args: {
              valueHash: {
                password: 'password$001',
              },
            },
          },
          {
            args: {
              valueHash: {
                email: 'info@example.com',
              },
            },
          },
        ]

        test.each(cases)('valueHash: $args.valueHash', ({ args }) => {
          const constructorArgs = {
            valueHash: args.valueHash,
            validators: [],
          }

          const actual = new VariablesValidator(constructorArgs)

          expect(actual)
            .toHaveProperty('valueHash', args.valueHash)
          expect(actual.valueHash)
            .toBe(args.valueHash) // same reference
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
            valueHash: {
              password: 'password$001',
              email: 'info@example.com',
              bio: 'Because I am Stew Eucen.',
            },
            validators: args.validators,
          }

          const actual = new VariablesValidator(constructorArgs)

          expect(actual)
            .toHaveProperty('validators', args.validators)
          expect(actual.validators)
            .toBe(args.validators) // same reference
        })
      })
    })
  })
})

describe('VariablesValidator', () => {
  describe('.create()', () => {
    const cases = [
      {
        args: {
          field: 'username',
          valueHash: {
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
          valueHash: {
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
          valueHash: {
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
          valueHash: {
            bio: 'Because I am Stew Eucen.',
          },
          validators: [],
        },
      },
    ]

    describe('to be instance of own class', () => {
      test.each(cases)('field: $params.field', ({ args }) => {
        const actual = VariablesValidator.create(args)

        expect(actual)
          .toBeInstanceOf(VariablesValidator)
      })
    })

    describe('to call constructor', () => {
      test.each(cases)('field: $args.field', ({ args }) => {
        const DerivedClass = ConstructorSpyGenerator.create({ jest })
          .generateSpyKitClass(VariablesValidator)

        DerivedClass.create(args)

        expect(DerivedClass.__spy__)
          .toHaveBeenCalledWith(args)
      })
    })
  })
})

describe('VariablesValidator', () => {
  describe('#extractFieldNames()', () => {
    const cases = [
      {
        args: {
          valueHash: {
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
          valueHash: {
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

    test.each(cases)('valueHash: $args.valueHash', ({ args, expected }) => {
      const validator = VariablesValidator.create(args)

      const actual = validator.extractFieldNames()

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('VariablesValidator', () => {
  describe('#extractValidators()', () => {
    const cases = [
      {
        args: {
          valueHash: {
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
          valueHash: {
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
          valueHash: {
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

    describe.each(cases)('valueHash: $args.valueHash', ({ args, fieldCases }) => {
      const validator = VariablesValidator.create(args)

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

describe('VariablesValidator', () => {
  describe('#isValid()', () => {
    /**
     * @type {Array<{
     *   args: {
     *     validators: Array<import('~/modules/client/FieldValidator').default>
     *   }
     *   truthyCases: Array<{
     *     valueHash: Record<string, any>
     *   }>
     *   falsyCases: Array<{
     *     valueHash: Record<string, any>
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
            valueHash: {
              username: 'Alice',
              password: 'pass01',
            },
          },
          {
            valueHash: {
              username: 'Bob',
              password: 'pass002',
            },
          },
          {
            valueHash: {
              username: 'Charlie',
              password: 'pass0003',
            },
          },
        ],
        falsyCases: [
          {
            valueHash: {
              username: '',
              password: 'pass0004',
            },
          },
          {
            valueHash: {
              username: 'David',
              password: '',
            },
          },
          {
            valueHash: {
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
            valueHash: {
              password: 'pass0006',
              'password-confirmation': 'pass0006',
            },
          },
          {
            valueHash: {
              password: 'pass0007',
              'password-confirmation': 'pass0007',
            },
          },
        ],
        falsyCases: [
          {
            valueHash: {
              password: 'pass0008',
              'password-confirmation': 'miss0008',
            },
          },
          {
            valueHash: {
              password: 'pass0009',
              'password-confirmation': '',
            },
          },
          {
            valueHash: {
              password: '',
              'password-confirmation': 'miss0010',
            },
          },
        ],
      },
    ]

    describe.each(cases)('validators: $args.validators.length', ({ args, truthyCases, falsyCases }) => {
      describe('to be truthy', () => {
        test.each(truthyCases)('valueHash: $valueHash', ({ valueHash }) => {
          const validator = VariablesValidator.create({
            valueHash,
            validators: args.validators,
          })

          const actual = validator.isValid()

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        test.each(falsyCases)('valueHash: $valueHash', ({ valueHash }) => {
          const validator = VariablesValidator.create({
            valueHash,
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

describe('VariablesValidator', () => {
  describe('#isInvalid()', () => {
    /**
     * @type {Array<{
     *   args: {
     *     validators: Array<import('~/modules/client/FieldValidator').default>
     *   }
     *   truthyCases: Array<{
     *     valueHash: Record<string, any>
     *   }>
     *   falsyCases: Array<{
     *     valueHash: Record<string, any>
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
            valueHash: {
              username: '',
              password: 'pass0004',
            },
          },
          {
            valueHash: {
              username: 'David',
              password: '',
            },
          },
          {
            valueHash: {
              username: '',
              password: '',
            },
          },
        ],
        falsyCases: [
          {
            valueHash: {
              username: 'Alice',
              password: 'pass01',
            },
          },
          {
            valueHash: {
              username: 'Bob',
              password: 'pass002',
            },
          },
          {
            valueHash: {
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
            valueHash: {
              password: 'pass0008',
              'password-confirmation': 'miss0008',
            },
          },
          {
            valueHash: {
              password: 'pass0009',
              'password-confirmation': '',
            },
          },
          {
            valueHash: {
              password: '',
              'password-confirmation': 'miss0010',
            },
          },
        ],
        falsyCases: [
          {
            valueHash: {
              password: 'pass0006',
              'password-confirmation': 'pass0006',
            },
          },
          {
            valueHash: {
              password: 'pass0007',
              'password-confirmation': 'pass0007',
            },
          },
        ],
      },
    ]

    describe.each(cases)('validators: $args.validators.length', ({ args, truthyCases, falsyCases }) => {
      describe('to be truthy', () => {
        test.each(truthyCases)('valueHash: $valueHash', ({ valueHash }) => {
          const validator = VariablesValidator.create({
            valueHash,
            validators: args.validators,
          })

          const actual = validator.isInvalid()

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        test.each(falsyCases)('valueHash: $valueHash', ({ valueHash }) => {
          const validator = VariablesValidator.create({
            valueHash,
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

describe('VariablesValidator', () => {
  describe('#getAllMessages()', () => {
    /**
     * @type {Array<{
     *   args: {
     *     validators: Array<import('~/modules/client/FieldValidator').default>
     *   }
     *   fieldCases: Array<{
     *     field: string
     *     valueHash: Record<string, any>
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
            valueHash: {
              username: 'Alice',
              password: 'pass0004',
            },
            expected: [],
          },
          {
            field: 'username',
            valueHash: {
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
            valueHash: {
              username: 'John Doe',
              password: 'pass0004',
            },
            expected: [
              'username must be alphanumeric',
            ],
          },
          {
            field: 'password',
            valueHash: {
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
            valueHash: {
              password: 'pass0008',
              'password-confirmation': 'miss0008',
            },
            expected: [],
          },
          {
            field: 'password',
            valueHash: {
              password: '',
              'password-confirmation': '',
            },
            expected: [
              'password is required',
            ],
          },
          {
            field: 'password-confirmation',
            valueHash: {
              password: 'pass0008',
              'password-confirmation': 'miss0008',
            },
            expected: [
              'password confirmation must be the same as password',
            ],
          },
          {
            field: 'password-confirmation',
            valueHash: {
              password: '',
              'password-confirmation': '',
            },
            expected: [],
          },
        ],
      },
    ]

    describe.each(cases)('validators: $args.validators.length', ({ args, fieldCases }) => {
      test.each(fieldCases)('[$#] field: $field', ({ field, valueHash, expected }) => {
        const validator = VariablesValidator.create({
          valueHash,
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

describe('VariablesValidator', () => {
  describe('#getOneMessage()', () => {
    /**
     * @type {Array<{
     *   args: {
     *     validators: Array<import('~/modules/client/FieldValidator').default>
     *   }
     *   fieldCases: Array<{
     *     field: string
     *     valueHash: Record<string, any>
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
            valueHash: {
              username: 'Alice',
              password: 'pass0004',
            },
            expected: null,
          },
          {
            field: 'username',
            valueHash: {
              username: '',
              password: 'pass0004',
            },
            expected: 'username is required',
          },
          {
            field: 'username',
            valueHash: {
              username: 'John Doe',
              password: 'pass0004',
            },
            expected: 'username must be alphanumeric',
          },
          {
            field: 'password',
            valueHash: {
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
            valueHash: {
              password: 'pass0008',
              'password-confirmation': 'miss0008',
            },
            expected: null,
          },
          {
            field: 'password',
            valueHash: {
              password: '',
              'password-confirmation': '',
            },
            expected: 'password is required',
          },
          {
            field: 'password-confirmation',
            valueHash: {
              password: 'pass0008',
              'password-confirmation': 'miss0008',
            },
            expected: 'password confirmation must be the same as password',
          },
          {
            field: 'password-confirmation',
            valueHash: {
              password: '',
              'password-confirmation': '',
            },
            expected: null,
          },
        ],
      },
    ]

    describe.each(cases)('validators: $args.validators.length', ({ args, fieldCases }) => {
      test.each(fieldCases)('[$#] field: $field', ({ field, valueHash, expected }) => {
        const validator = VariablesValidator.create({
          valueHash,
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

describe('VariablesValidator', () => {
  describe('#isValidField()', () => {
    /**
     * @type {Array<{
     *   args: {
     *     validators: Array<import('~/modules/client/FieldValidator').default>
     *   }
     *   fieldCases: Array<{
     *     field: string
     *     valueHash: Record<string, any>
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
            valueHash: {
              username: 'Alice',
              password: 'pass0004',
            },
            expected: true,
          },
          {
            field: 'username',
            valueHash: {
              username: '',
              password: 'pass0004',
            },
            expected: false,
          },
          {
            field: 'username',
            valueHash: {
              username: 'John Doe',
              password: 'pass0004',
            },
            expected: false,
          },
          {
            field: 'password',
            valueHash: {
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
            valueHash: {
              password: 'pass0008',
              'password-confirmation': 'miss0008',
            },
            expected: true,
          },
          {
            field: 'password',
            valueHash: {
              password: '',
              'password-confirmation': '',
            },
            expected: false,
          },
          {
            field: 'password-confirmation',
            valueHash: {
              password: 'pass0008',
              'password-confirmation': 'miss0008',
            },
            expected: false,
          },
          {
            field: 'password-confirmation',
            valueHash: {
              password: '',
              'password-confirmation': '',
            },
            expected: true,
          },
        ],
      },
    ]

    describe.each(cases)('validators: $args.validators.length', ({ args, fieldCases }) => {
      test.each(fieldCases)('[$#] field: $field', ({ field, valueHash, expected }) => {
        const validator = VariablesValidator.create({
          valueHash,
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

describe('VariablesValidator', () => {
  describe('#isInvalidField()', () => {
    /**
     * @type {Array<{
     *   args: {
     *     validators: Array<import('~/modules/client/FieldValidator').default>
     *   }
     *   fieldCases: Array<{
     *     field: string
     *     valueHash: Record<string, any>
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
            valueHash: {
              username: 'Alice',
              password: 'pass0004',
            },
            expected: false,
          },
          {
            field: 'username',
            valueHash: {
              username: '',
              password: 'pass0004',
            },
            expected: true,
          },
          {
            field: 'username',
            valueHash: {
              username: 'John Doe',
              password: 'pass0004',
            },
            expected: true,
          },
          {
            field: 'password',
            valueHash: {
              username: '',
              password: '',
            },
            expected: true,
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
            valueHash: {
              password: 'pass0008',
              'password-confirmation': 'miss0008',
            },
            expected: false,
          },
          {
            field: 'password',
            valueHash: {
              password: '',
              'password-confirmation': '',
            },
            expected: true,
          },
          {
            field: 'password-confirmation',
            valueHash: {
              password: 'pass0008',
              'password-confirmation': 'miss0008',
            },
            expected: true,
          },
          {
            field: 'password-confirmation',
            valueHash: {
              password: '',
              'password-confirmation': '',
            },
            expected: false,
          },
        ],
      },
    ]

    describe.each(cases)('validators: $args.validators.length', ({ args, fieldCases }) => {
      test.each(fieldCases)('[$#] field: $field', ({ field, valueHash, expected }) => {
        const validator = VariablesValidator.create({
          valueHash,
          validators: args.validators,
        })

        const actual = validator.isInvalidField({
          field,
        })

        expect(actual)
          .toBe(expected)
      })
    })
  })
})
