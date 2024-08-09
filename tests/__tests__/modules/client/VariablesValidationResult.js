import {
  ConstructorSpyGenerator,
} from '@openreachtech/renchan-test-tools'

import VariablesValidationResult from '~/modules/client/VariablesValidationResult'

import VariablesPerSchemaValidator from '~/modules/client/VariablesPerSchemaValidator'
import FieldValidator from '~/modules/client/FieldValidator'

describe('VariablesValidationResult', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      describe('#variables', () => {
        const cases = [
          {
            args: {
              validatorHash: {
                input: VariablesPerSchemaValidator.create({
                  variables: {
                    username: 'Alice',
                  },
                  validators: [],
                }),
              },
            },
          },
          {
            args: {
              validatorHash: {
                input: VariablesPerSchemaValidator.create({
                  variables: {
                    password: 'password$001',
                  },
                  validators: [],
                }),
              },
            },
          },
          {
            args: {
              validatorHash: {
                input: VariablesPerSchemaValidator.create({
                  variables: {
                    email: 'www@example.com',
                  },
                  validators: [],
                }),
              },
            },
          },
        ]

        test.each(cases)('variables: $args.validatorHash.input.variables', ({ args }) => {
          const actual = new VariablesValidationResult(args)

          expect(actual)
            .toHaveProperty('validatorHash', args.validatorHash)
        })
      })
    })
  })
})

describe('VariablesValidationResult', () => {
  describe('.create()', () => {
    const cases = [
      {
        args: {
          validatorHash: {
            input: VariablesPerSchemaValidator.create({
              variables: {
                username: 'Alice',
              },
              validators: [],
            }),
          },
        },
      },
      {
        args: {
          validatorHash: {
            input: VariablesPerSchemaValidator.create({
              variables: {
                password: 'password$001',
              },
              validators: [],
            }),
          },
        },
      },
      {
        args: {
          validatorHash: {
            input: VariablesPerSchemaValidator.create({
              variables: {
                email: 'www@example.com',
              },
              validators: [],
            }),
          },
        },
      },
    ]

    describe('to be instance of own class', () => {
      test.each(cases)('variables: $args.validatorHash.input.variables', ({ args }) => {
        const actual = VariablesValidationResult.create(args)

        expect(actual)
          .toBeInstanceOf(VariablesValidationResult)
      })
    })

    describe('to call constructor', () => {
      test.each(cases)('variables: $args.validatorHash.input.variables', ({ args }) => {
        const DerivedClass = ConstructorSpyGenerator.create({ jest })
          .generateSpyKitClass(VariablesValidationResult)

        DerivedClass.create(args)

        expect(DerivedClass.__spy__)
          .toHaveBeenCalledWith(args)
      })
    })
  })
})

describe('VariablesValidationResult', () => {
  describe('#get:valid', () => {
    const alphaValidators = [
      FieldValidator.create({
        field: 'username',
        ok: (it, valueHash) => it,
        message: 'username is required',
      }),
      FieldValidator.create({
        field: 'username',
        ok: (it, valueHash) =>
          it
          && it.length >= 1
          && it.length <= 8,
        message: 'username length 1 - 8 characters',
      }),
      FieldValidator.create({
        field: 'username',
        ok: (it, valueHash) => {
          return !it
            || /^\w+$/.test(it)
        },
        message: 'username must be alphanumeric',
      }),
      FieldValidator.create({
        field: 'password',
        ok: (it, valueHash) => it,
        message: 'password is required',
      }),
      FieldValidator.create({
        field: 'bio',
        ok: (it, valueHash) => !(
          [
            'ace',
            'deuce',
          ].some(word => it.includes(word))
        ),
        message: 'bio must not include banned words',
      }),
    ]

    const betaValidators = [
      FieldValidator.create({
        field: 'email',
        ok: (it, valueHash) => it,
        message: 'email is required',
      }),
      FieldValidator.create({
        field: 'email',
        ok: (it, valueHash) => {
          return !it
            || /^[^@]+@[^@]+\.[^@]+$/.test(it)
        },
        message: 'email must be valid',
      }),
      FieldValidator.create({
        field: 'password',
        ok: (it, valueHash) => it,
        message: 'password is required',
      }),
      FieldValidator.create({
        field: 'password-confirmation',
        ok: (it, valueHash) => it,
        message: 'password confirmation is required',
      }),
      FieldValidator.create({
        field: 'password-confirmation',
        ok: (it, valueHash) => it === valueHash.password,
        message: 'password confirmation must match password',
      }),
    ]

    const firstValidators = [
      FieldValidator.create({
        field: 'bio',
        ok: (it, valueHash) => !it.includes('$'),
        message: 'bio must not include `$`',
      }),
    ]

    const secondValidators = [
      FieldValidator.create({
        field: 'bio',
        ok: (it, valueHash) => !it.includes('%'),
        message: 'bio must not include `%`',
      }),
    ]

    /**
     * @type {Array<{
    *   title: string
    *   args: {
    *     validatorHash: Record<string, VariablesPerSchemaValidator>
    *   }
    *   fieldCases: Array<{
    *     field: string
    *     expected: boolean
    *   }>
    *   schemaFieldCases: Array<{
    *     schema: string
    *     field: string
    *     expected: boolean
    *   }>
    * }>}
    */
    const cases = [
      // with alphaValidators
      {
        title: 'Alice - by alphaValidators',
        args: {
          validatorHash: {
            input: VariablesPerSchemaValidator.create({
              variables: {
                username: 'Alice',
                password: 'password$001',
                bio: 'Alice is ace',
              },
              validators: alphaValidators,
            }),
          },
        },
        fieldCases: [
          { field: 'username', expected: true },
          { field: 'password', expected: true },
          { field: 'bio', expected: false },
        ],
        schemaFieldCases: [
          { schema: '$input', field: 'username', expected: true },
          { schema: '$input', field: 'password', expected: true },
          { schema: '$input', field: 'bio', expected: false },
        ],
      },
      {
        title: 'John Doe - by alphaValidators',
        args: {
          validatorHash: {
            group: VariablesPerSchemaValidator.create({
              variables: {
                username: 'John Doe',
                password: '',
                bio: 'Betty is me',
              },
              validators: alphaValidators,
            }),
          },
        },
        fieldCases: [
          { field: 'username', expected: false },
          { field: 'password', expected: false },
          { field: 'bio', expected: true },
        ],
        schemaFieldCases: [
          { schema: '$group', field: 'username', expected: false },
          { schema: '$group', field: 'password', expected: false },
          { schema: '$group', field: 'bio', expected: true },
        ],
      },
      {
        title: '$dollars - by alphaValidators',
        args: {
          validatorHash: {
            firstSchema: VariablesPerSchemaValidator.create({
              variables: {
                username: '$dollars',
                password: 'password$002',
                bio: '$dollars is deuce',
              },
              validators: alphaValidators,
            }),
          },
        },
        fieldCases: [
          { field: 'username', expected: false },
          { field: 'password', expected: true },
          { field: 'bio', expected: false },
        ],
        schemaFieldCases: [
          { schema: '$firstSchema', field: 'username', expected: false },
          { schema: '$firstSchema', field: 'password', expected: true },
          { schema: '$firstSchema', field: 'bio', expected: false },
        ],
      },

      // with betaValidators
      {
        title: 'email:www@example.com - by betaValidators',
        args: {
          validatorHash: {
            firstInput: VariablesPerSchemaValidator.create({
              variables: {
                email: 'www@example.com',
                password: 'password$001',
                'password-confirmation': 'password$001',
              },
              validators: betaValidators,
            }),
          },
        },
        fieldCases: [
          { field: 'email', expected: true },
          { field: 'password', expected: true },
          { field: 'password-confirmation', expected: true },
        ],
        schemaFieldCases: [
          { schema: '$firstInput', field: 'email', expected: true },
          { schema: '$firstInput', field: 'password', expected: true },
          { schema: '$firstInput', field: 'password-confirmation', expected: true },
        ],
      },
      {
        title: 'email:www@example - by betaValidators',
        args: {
          validatorHash: {
            secondInput: VariablesPerSchemaValidator.create({
              variables: {
                email: 'www@example',
                password: 'password$001',
                'password-confirmation': 'password$001',
              },
              validators: betaValidators,
            }),
          },
        },
        fieldCases: [
          { field: 'email', expected: false },
          { field: 'password', expected: true },
          { field: 'password-confirmation', expected: true },
        ],
        schemaFieldCases: [
          { schema: '$secondInput', field: 'email', expected: false },
          { schema: '$secondInput', field: 'password', expected: true },
          { schema: '$secondInput', field: 'password-confirmation', expected: true },
        ],
      },
      {
        title: 'email:info@example.com - by betaValidators',
        args: {
          validatorHash: {
            thirdInput: VariablesPerSchemaValidator.create({
              variables: {
                email: 'info@example.com',
                password: 'password$002',
                'password-confirmation': 'password%002',
              },
              validators: betaValidators,
            }),
          },
        },
        fieldCases: [
          { field: 'email', expected: true },
          { field: 'password', expected: true },
          { field: 'password-confirmation', expected: false },
        ],
        schemaFieldCases: [
          { schema: '$thirdInput', field: 'email', expected: true },
          { schema: '$thirdInput', field: 'password', expected: true },
          { schema: '$thirdInput', field: 'password-confirmation', expected: false },
        ],
      },

      // with firstValidators and secondValidators
      {
        title: 'bio:Hello, World! [$] - by firstValidators and secondValidators',
        args: {
          validatorHash: {
            firstGroup: VariablesPerSchemaValidator.create({
              variables: {
                bio: 'Hello, World! [$]',
              },
              validators: firstValidators,
            }),
            secondGroup: VariablesPerSchemaValidator.create({
              variables: {
                bio: 'Hello, World! [$]',
              },
              validators: secondValidators,
            }),
          },
        },
        fieldCases: [
          { field: 'bio', expected: false },
        ],
        schemaFieldCases: [
          { schema: '$firstGroup', field: 'bio', expected: false },
          { schema: '$secondGroup', field: 'bio', expected: true },
        ],
      },
      {
        title: 'bio:Hello, World [%] - by firstValidators and secondValidators',
        args: {
          validatorHash: {
            thirdGroup: VariablesPerSchemaValidator.create({
              variables: {
                bio: 'Hello, World [%]',
              },
              validators: firstValidators,
            }),
            fourthGroup: VariablesPerSchemaValidator.create({
              variables: {
                bio: 'Hello, World [%]',
              },
              validators: secondValidators,
            }),
          },
        },
        fieldCases: [
          { field: 'bio', expected: true },
        ],
        schemaFieldCases: [
          { schema: '$thirdGroup', field: 'bio', expected: true },
          { schema: '$fourthGroup', field: 'bio', expected: false },
        ],
      },
    ]

    describe.each(cases)('title: $title', ({ title, args, fieldCases, schemaFieldCases }) => {
      const result = new VariablesValidationResult(args)

      test.each(fieldCases)('field: $field', ({ field, expected }) => {
        const actual = result.valid[field]

        expect(actual)
          .toBe(expected)
      })

      test.each(schemaFieldCases)('schema - field: $schema - $field', ({ schema, field, expected }) => {
        const actual = result.valid[schema][field]

        expect(actual)
          .toBe(expected)
      })
    })
  })
})

describe('VariablesValidationResult', () => {
  describe('#get:invalid', () => {
    const alphaValidators = [
      FieldValidator.create({
        field: 'username',
        ok: (it, valueHash) => it,
        message: 'username is required',
      }),
      FieldValidator.create({
        field: 'username',
        ok: (it, valueHash) =>
          it
          && it.length >= 1
          && it.length <= 8,
        message: 'username length 1 - 8 characters',
      }),
      FieldValidator.create({
        field: 'username',
        ok: (it, valueHash) => {
          return !it
            || /^\w+$/.test(it)
        },
        message: 'username must be alphanumeric',
      }),
      FieldValidator.create({
        field: 'password',
        ok: (it, valueHash) => it,
        message: 'password is required',
      }),
      FieldValidator.create({
        field: 'bio',
        ok: (it, valueHash) => !(
          [
            'ace',
            'deuce',
          ].some(word => it.includes(word))
        ),
        message: 'bio must not include banned words',
      }),
    ]

    const betaValidators = [
      FieldValidator.create({
        field: 'email',
        ok: (it, valueHash) => it,
        message: 'email is required',
      }),
      FieldValidator.create({
        field: 'email',
        ok: (it, valueHash) => {
          return !it
            || /^[^@]+@[^@]+\.[^@]+$/.test(it)
        },
        message: 'email must be valid',
      }),
      FieldValidator.create({
        field: 'password',
        ok: (it, valueHash) => it,
        message: 'password is required',
      }),
      FieldValidator.create({
        field: 'password-confirmation',
        ok: (it, valueHash) => it,
        message: 'password confirmation is required',
      }),
      FieldValidator.create({
        field: 'password-confirmation',
        ok: (it, valueHash) => it === valueHash.password,
        message: 'password confirmation must match password',
      }),
    ]

    const firstValidators = [
      FieldValidator.create({
        field: 'bio',
        ok: (it, valueHash) => !it.includes('$'),
        message: 'bio must not include `$`',
      }),
    ]

    const secondValidators = [
      FieldValidator.create({
        field: 'bio',
        ok: (it, valueHash) => !it.includes('%'),
        message: 'bio must not include `%`',
      }),
    ]

    /**
     * @type {Array<{
    *   title: string
    *   args: {
    *     validatorHash: Record<string, VariablesPerSchemaValidator>
    *   }
    *   fieldCases: Array<{
    *     field: string
    *     expected: boolean
    *   }>
    *   schemaFieldCases: Array<{
    *     schema: string
    *     field: string
    *     expected: boolean
    *   }>
    * }>}
    */
    const cases = [
      // with alphaValidators
      {
        title: 'Alice - by alphaValidators',
        args: {
          validatorHash: {
            input: VariablesPerSchemaValidator.create({
              variables: {
                username: 'Alice',
                password: 'password$001',
                bio: 'Alice is ace',
              },
              validators: alphaValidators,
            }),
          },
        },
        fieldCases: [
          { field: 'username', expected: false },
          { field: 'password', expected: false },
          { field: 'bio', expected: true },
        ],
        schemaFieldCases: [
          { schema: '$input', field: 'username', expected: false },
          { schema: '$input', field: 'password', expected: false },
          { schema: '$input', field: 'bio', expected: true },
        ],
      },
      {
        title: 'John Doe - by alphaValidators',
        args: {
          validatorHash: {
            group: VariablesPerSchemaValidator.create({
              variables: {
                username: 'John Doe',
                password: '',
                bio: 'Betty is me',
              },
              validators: alphaValidators,
            }),
          },
        },
        fieldCases: [
          { field: 'username', expected: true },
          { field: 'password', expected: true },
          { field: 'bio', expected: false },
        ],
        schemaFieldCases: [
          { schema: '$group', field: 'username', expected: true },
          { schema: '$group', field: 'password', expected: true },
          { schema: '$group', field: 'bio', expected: false },
        ],
      },
      {
        title: '$dollars - by alphaValidators',
        args: {
          validatorHash: {
            firstSchema: VariablesPerSchemaValidator.create({
              variables: {
                username: '$dollars',
                password: 'password$002',
                bio: '$dollars is deuce',
              },
              validators: alphaValidators,
            }),
          },
        },
        fieldCases: [
          { field: 'username', expected: true },
          { field: 'password', expected: false },
          { field: 'bio', expected: true },
        ],
        schemaFieldCases: [
          { schema: '$firstSchema', field: 'username', expected: true },
          { schema: '$firstSchema', field: 'password', expected: false },
          { schema: '$firstSchema', field: 'bio', expected: true },
        ],
      },

      // with betaValidators
      {
        title: 'email:www@example.com - by betaValidators',
        args: {
          validatorHash: {
            firstInput: VariablesPerSchemaValidator.create({
              variables: {
                email: 'www@example.com',
                password: 'password$001',
                'password-confirmation': 'password$001',
              },
              validators: betaValidators,
            }),
          },
        },
        fieldCases: [
          { field: 'email', expected: false },
          { field: 'password', expected: false },
          { field: 'password-confirmation', expected: false },
        ],
        schemaFieldCases: [
          { schema: '$firstInput', field: 'email', expected: false },
          { schema: '$firstInput', field: 'password', expected: false },
          { schema: '$firstInput', field: 'password-confirmation', expected: false },
        ],
      },
      {
        title: 'email:www@example - by betaValidators',
        args: {
          validatorHash: {
            secondInput: VariablesPerSchemaValidator.create({
              variables: {
                email: 'www@example',
                password: 'password$001',
                'password-confirmation': 'password$001',
              },
              validators: betaValidators,
            }),
          },
        },
        fieldCases: [
          { field: 'email', expected: true },
          { field: 'password', expected: false },
          { field: 'password-confirmation', expected: false },
        ],
        schemaFieldCases: [
          { schema: '$secondInput', field: 'email', expected: true },
          { schema: '$secondInput', field: 'password', expected: false },
          { schema: '$secondInput', field: 'password-confirmation', expected: false },
        ],
      },
      {
        title: 'email:info@example.com - by betaValidators',
        args: {
          validatorHash: {
            thirdInput: VariablesPerSchemaValidator.create({
              variables: {
                email: 'info@example.com',
                password: 'password$002',
                'password-confirmation': 'password%002',
              },
              validators: betaValidators,
            }),
          },
        },
        fieldCases: [
          { field: 'email', expected: false },
          { field: 'password', expected: false },
          { field: 'password-confirmation', expected: true },
        ],
        schemaFieldCases: [
          { schema: '$thirdInput', field: 'email', expected: false },
          { schema: '$thirdInput', field: 'password', expected: false },
          { schema: '$thirdInput', field: 'password-confirmation', expected: true },
        ],
      },

      // with firstValidators and secondValidators
      {
        title: 'bio:Hello, World! [$] - by firstValidators and secondValidators',
        args: {
          validatorHash: {
            firstGroup: VariablesPerSchemaValidator.create({
              variables: {
                bio: 'Hello, World! [$]',
              },
              validators: firstValidators,
            }),
            secondGroup: VariablesPerSchemaValidator.create({
              variables: {
                bio: 'Hello, World! [$]',
              },
              validators: secondValidators,
            }),
          },
        },
        fieldCases: [
          { field: 'bio', expected: true },
        ],
        schemaFieldCases: [
          { schema: '$firstGroup', field: 'bio', expected: true },
          { schema: '$secondGroup', field: 'bio', expected: false },
        ],
      },
      {
        title: 'bio:Hello, World [%] - by firstValidators and secondValidators',
        args: {
          validatorHash: {
            thirdGroup: VariablesPerSchemaValidator.create({
              variables: {
                bio: 'Hello, World [%]',
              },
              validators: firstValidators,
            }),
            fourthGroup: VariablesPerSchemaValidator.create({
              variables: {
                bio: 'Hello, World [%]',
              },
              validators: secondValidators,
            }),
          },
        },
        fieldCases: [
          { field: 'bio', expected: false },
        ],
        schemaFieldCases: [
          { schema: '$thirdGroup', field: 'bio', expected: false },
          { schema: '$fourthGroup', field: 'bio', expected: true },
        ],
      },
    ]

    describe.each(cases)('title: $title', ({ title, args, fieldCases, schemaFieldCases }) => {
      const result = new VariablesValidationResult(args)

      test.each(fieldCases)('field: $field', ({ field, expected }) => {
        const actual = result.invalid[field]

        expect(actual)
          .toBe(expected)
      })

      test.each(schemaFieldCases)('schema - field: $schema - $field', ({ schema, field, expected }) => {
        const actual = result.invalid[schema][field]

        expect(actual)
          .toBe(expected)
      })
    })
  })
})

describe('VariablesValidationResult', () => {
  describe('#get:messages', () => {
    const alphaValidators = [
      FieldValidator.create({
        field: 'username',
        ok: (it, valueHash) => it,
        message: 'username is required',
      }),
      FieldValidator.create({
        field: 'username',
        ok: (it, valueHash) =>
          it
          && it.length >= 1
          && it.length <= 8,
        message: 'username length 1 - 8 characters',
      }),
      FieldValidator.create({
        field: 'username',
        ok: (it, valueHash) => {
          return !it
            || /^\w+$/.test(it)
        },
        message: 'username must be alphanumeric',
      }),
      FieldValidator.create({
        field: 'password',
        ok: (it, valueHash) => it,
        message: 'password is required',
      }),
      FieldValidator.create({
        field: 'bio',
        ok: (it, valueHash) => !(
          [
            'ace',
            'deuce',
          ].some(word => it.includes(word))
        ),
        message: 'bio must not include banned words',
      }),
    ]

    const betaValidators = [
      FieldValidator.create({
        field: 'email',
        ok: (it, valueHash) => it,
        message: 'email is required',
      }),
      FieldValidator.create({
        field: 'email',
        ok: (it, valueHash) => {
          return !it
            || /^[^@]+@[^@]+\.[^@]+$/.test(it)
        },
        message: 'email must be valid',
      }),
      FieldValidator.create({
        field: 'password',
        ok: (it, valueHash) => it,
        message: 'password is required',
      }),
      FieldValidator.create({
        field: 'password-confirmation',
        ok: (it, valueHash) => it,
        message: 'password confirmation is required',
      }),
      FieldValidator.create({
        field: 'password-confirmation',
        ok: (it, valueHash) => it === valueHash.password,
        message: 'password confirmation must match password',
      }),
    ]

    const firstValidators = [
      FieldValidator.create({
        field: 'bio',
        ok: (it, valueHash) => !it.includes('$'),
        message: 'bio must not include `$`',
      }),
    ]

    const secondValidators = [
      FieldValidator.create({
        field: 'bio',
        ok: (it, valueHash) => !it.includes('%'),
        message: 'bio must not include `%`',
      }),
    ]

    /**
     * @type {Array<{
    *   title: string
    *   args: {
    *     validatorHash: Record<string, VariablesPerSchemaValidator>
    *   }
    *   fieldCases: Array<{
    *     field: string
    *     expected: Array<string>
    *   }>
    *   schemaFieldCases: Array<{
    *     schema: string
    *     field: string
    *     expected: Array<string>
    *   }>
    * }>}
    */
    const cases = [
      // with alphaValidators
      {
        title: 'Alice - by alphaValidators',
        args: {
          validatorHash: {
            input: VariablesPerSchemaValidator.create({
              variables: {
                username: 'Alice',
                password: 'password$001',
                bio: 'Alice is ace',
              },
              validators: alphaValidators,
            }),
          },
        },
        fieldCases: [
          {
            field: 'username',
            expected: [],
          },
          {
            field: 'password',
            expected: [],
          },
          {
            field: 'bio',
            expected: [
              'bio must not include banned words',
            ],
          },
        ],
        schemaFieldCases: [
          {
            schema: '$input',
            field: 'username',
            expected: [],
          },
          {
            schema: '$input',
            field: 'password',
            expected: [],
          },
          {
            schema: '$input',
            field: 'bio',
            expected: [
              'bio must not include banned words',
            ],
          },
        ],
      },
      {
        title: 'John Doe - by alphaValidators',
        args: {
          validatorHash: {
            group: VariablesPerSchemaValidator.create({
              variables: {
                username: 'John Doe',
                password: '',
                bio: 'Betty is me',
              },
              validators: alphaValidators,
            }),
          },
        },
        fieldCases: [
          {
            field: 'username',
            expected: [
              'username must be alphanumeric',
            ],
          },
          {
            field: 'password',
            expected: [
              'password is required',
            ],
          },
          {
            field: 'bio',
            expected: [],
          },
        ],
        schemaFieldCases: [
          {
            schema: '$group',
            field: 'username',
            expected: [
              'username must be alphanumeric',
            ],
          },
          {
            schema: '$group',
            field: 'password',
            expected: [
              'password is required',
            ],
          },
          {
            schema: '$group',
            field: 'bio',
            expected: [],
          },
        ],
      },
      {
        title: '$dollars - by alphaValidators',
        args: {
          validatorHash: {
            firstSchema: VariablesPerSchemaValidator.create({
              variables: {
                username: '$dollars',
                password: 'password$002',
                bio: '$dollars is deuce',
              },
              validators: alphaValidators,
            }),
          },
        },
        fieldCases: [
          {
            field: 'username',
            expected: [
              'username must be alphanumeric',
            ],
          },
          {
            field: 'password',
            expected: [],
          },
          {
            field: 'bio',
            expected: [
              'bio must not include banned words',
            ],
          },
        ],
        schemaFieldCases: [
          {
            schema: '$firstSchema',
            field: 'username',
            expected: [
              'username must be alphanumeric',
            ],
          },
          {
            schema: '$firstSchema',
            field: 'password',
            expected: [],
          },
          {
            schema: '$firstSchema',
            field: 'bio',
            expected: [
              'bio must not include banned words',
            ],
          },
        ],
      },

      // with betaValidators
      {
        title: 'email:www@example.com - by betaValidators',
        args: {
          validatorHash: {
            firstInput: VariablesPerSchemaValidator.create({
              variables: {
                email: 'www@example.com',
                password: 'password$001',
                'password-confirmation': 'password$001',
              },
              validators: betaValidators,
            }),
          },
        },
        fieldCases: [
          {
            field: 'email',
            expected: [],
          },
          {
            field: 'password',
            expected: [],
          },
          {
            field: 'password-confirmation',
            expected: [],
          },
        ],
        schemaFieldCases: [
          {
            schema: '$firstInput',
            field: 'email',
            expected: [],
          },
          {
            schema: '$firstInput',
            field: 'password',
            expected: [],
          },
          {
            schema: '$firstInput',
            field: 'password-confirmation',
            expected: [],
          },
        ],
      },
      {
        title: 'email:www@example - by betaValidators',
        args: {
          validatorHash: {
            secondInput: VariablesPerSchemaValidator.create({
              variables: {
                email: 'www@example',
                password: 'password$001',
                'password-confirmation': 'password$001',
              },
              validators: betaValidators,
            }),
          },
        },
        fieldCases: [
          {
            field: 'email',
            expected: [
              'email must be valid',
            ],
          },
          {
            field: 'password',
            expected: [],
          },
          {
            field: 'password-confirmation',
            expected: [],
          },
        ],
        schemaFieldCases: [
          {
            schema: '$secondInput',
            field: 'email',
            expected: [
              'email must be valid',
            ],
          },
          {
            schema: '$secondInput',
            field: 'password',
            expected: [],
          },
          {
            schema: '$secondInput',
            field: 'password-confirmation',
            expected: [],
          },
        ],
      },
      {
        title: 'email:info@example.com - by betaValidators',
        args: {
          validatorHash: {
            thirdInput: VariablesPerSchemaValidator.create({
              variables: {
                email: 'info@example.com',
                password: 'password$002',
                'password-confirmation': 'password%002',
              },
              validators: betaValidators,
            }),
          },
        },
        fieldCases: [
          {
            field: 'email',
            expected: [],
          },
          {
            field: 'password',
            expected: [],
          },
          {
            field: 'password-confirmation',
            expected: [
              'password confirmation must match password',
            ],
          },
        ],
        schemaFieldCases: [
          {
            schema: '$thirdInput',
            field: 'email',
            expected: [],
          },
          {
            schema: '$thirdInput',
            field: 'password',
            expected: [],
          },
          {
            schema: '$thirdInput',
            field: 'password-confirmation',
            expected: [
              'password confirmation must match password',
            ],
          },
        ],
      },

      // with firstValidators and secondValidators
      {
        title: 'bio:Hello, World! [$] - by firstValidators and secondValidators',
        args: {
          validatorHash: {
            firstGroup: VariablesPerSchemaValidator.create({
              variables: {
                bio: 'Hello, World! [$]',
              },
              validators: firstValidators,
            }),
            secondGroup: VariablesPerSchemaValidator.create({
              variables: {
                bio: 'Hello, World! [$]',
              },
              validators: secondValidators,
            }),
          },
        },
        fieldCases: [
          {
            field: 'bio',
            expected: [
              'bio must not include `$`',
            ],
          },
        ],
        schemaFieldCases: [
          {
            schema: '$firstGroup',
            field: 'bio',
            expected: [
              'bio must not include `$`',
            ],
          },
          {
            schema: '$secondGroup',
            field: 'bio',
            expected: [],
          },
        ],
      },
      {
        title: 'bio:Hello, World [%] - by firstValidators and secondValidators',
        args: {
          validatorHash: {
            thirdGroup: VariablesPerSchemaValidator.create({
              variables: {
                bio: 'Hello, World [%]',
              },
              validators: firstValidators,
            }),
            fourthGroup: VariablesPerSchemaValidator.create({
              variables: {
                bio: 'Hello, World [%]',
              },
              validators: secondValidators,
            }),
          },
        },
        fieldCases: [
          {
            field: 'bio',
            expected: [],
          },
        ],
        schemaFieldCases: [
          {
            schema: '$thirdGroup',
            field: 'bio',
            expected: [],
          },
          {
            schema: '$fourthGroup',
            field: 'bio',
            expected: [
              'bio must not include `%`',
            ],
          },
        ],
      },
    ]

    describe.each(cases)('title: $title', ({ title, args, fieldCases, schemaFieldCases }) => {
      const result = new VariablesValidationResult(args)

      test.each(fieldCases)('field: $field', ({ field, expected }) => {
        const actual = result.messages[field]

        expect(actual)
          .toEqual(expected)
      })

      test.each(schemaFieldCases)('schema - field: $schema - $field', ({ schema, field, expected }) => {
        const actual = result.messages[schema][field]

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})

describe('VariablesValidationResult', () => {
  describe('#get:message', () => {
    const alphaValidators = [
      FieldValidator.create({
        field: 'username',
        ok: (it, valueHash) => it,
        message: 'username is required',
      }),
      FieldValidator.create({
        field: 'username',
        ok: (it, valueHash) =>
          it
          && it.length >= 1
          && it.length <= 8,
        message: 'username length 1 - 8 characters',
      }),
      FieldValidator.create({
        field: 'username',
        ok: (it, valueHash) => {
          return !it
            || /^\w+$/.test(it)
        },
        message: 'username must be alphanumeric',
      }),
      FieldValidator.create({
        field: 'password',
        ok: (it, valueHash) => it,
        message: 'password is required',
      }),
      FieldValidator.create({
        field: 'bio',
        ok: (it, valueHash) => !(
          [
            'ace',
            'deuce',
          ].some(word => it.includes(word))
        ),
        message: 'bio must not include banned words',
      }),
    ]

    const betaValidators = [
      FieldValidator.create({
        field: 'email',
        ok: (it, valueHash) => it,
        message: 'email is required',
      }),
      FieldValidator.create({
        field: 'email',
        ok: (it, valueHash) => {
          return !it
            || /^[^@]+@[^@]+\.[^@]+$/.test(it)
        },
        message: 'email must be valid',
      }),
      FieldValidator.create({
        field: 'password',
        ok: (it, valueHash) => it,
        message: 'password is required',
      }),
      FieldValidator.create({
        field: 'password-confirmation',
        ok: (it, valueHash) => it,
        message: 'password confirmation is required',
      }),
      FieldValidator.create({
        field: 'password-confirmation',
        ok: (it, valueHash) => it === valueHash.password,
        message: 'password confirmation must match password',
      }),
    ]

    const firstValidators = [
      FieldValidator.create({
        field: 'bio',
        ok: (it, valueHash) => !it.includes('$'),
        message: 'bio must not include `$`',
      }),
    ]

    const secondValidators = [
      FieldValidator.create({
        field: 'bio',
        ok: (it, valueHash) => !it.includes('%'),
        message: 'bio must not include `%`',
      }),
    ]

    /**
     * @type {Array<{
    *   title: string
    *   args: {
    *     validatorHash: Record<string, VariablesPerSchemaValidator>
    *   }
    *   fieldCases: Array<{
    *     field: string
    *     expected: string | null
    *   }>
    *   schemaFieldCases: Array<{
    *     schema: string
    *     field: string
    *     expected: string | null
    *   }>
    * }>}
    */
    const cases = [
      // with alphaValidators
      {
        title: 'Alice - by alphaValidators',
        args: {
          validatorHash: {
            input: VariablesPerSchemaValidator.create({
              variables: {
                username: 'Alice',
                password: 'password$001',
                bio: 'Alice is ace',
              },
              validators: alphaValidators,
            }),
          },
        },
        fieldCases: [
          {
            field: 'username',
            expected: null,
          },
          {
            field: 'password',
            expected: null,
          },
          {
            field: 'bio',
            expected: 'bio must not include banned words',
          },
        ],
        schemaFieldCases: [
          {
            schema: '$input',
            field: 'username',
            expected: null,
          },
          {
            schema: '$input',
            field: 'password',
            expected: null,
          },
          {
            schema: '$input',
            field: 'bio',
            expected: 'bio must not include banned words',
          },
        ],
      },
      {
        title: 'John Doe - by alphaValidators',
        args: {
          validatorHash: {
            group: VariablesPerSchemaValidator.create({
              variables: {
                username: 'John Doe',
                password: '',
                bio: 'Betty is me',
              },
              validators: alphaValidators,
            }),
          },
        },
        fieldCases: [
          {
            field: 'username',
            expected: 'username must be alphanumeric',
          },
          {
            field: 'password',
            expected: 'password is required',
          },
          {
            field: 'bio',
            expected: null,
          },
        ],
        schemaFieldCases: [
          {
            schema: '$group',
            field: 'username',
            expected: 'username must be alphanumeric',
          },
          {
            schema: '$group',
            field: 'password',
            expected: 'password is required',
          },
          {
            schema: '$group',
            field: 'bio',
            expected: null,
          },
        ],
      },
      {
        title: '$dollars - by alphaValidators',
        args: {
          validatorHash: {
            firstSchema: VariablesPerSchemaValidator.create({
              variables: {
                username: '$dollars',
                password: 'password$002',
                bio: '$dollars is deuce',
              },
              validators: alphaValidators,
            }),
          },
        },
        fieldCases: [
          {
            field: 'username',
            expected: 'username must be alphanumeric',
          },
          {
            field: 'password',
            expected: null,
          },
          {
            field: 'bio',
            expected: 'bio must not include banned words',
          },
        ],
        schemaFieldCases: [
          {
            schema: '$firstSchema',
            field: 'username',
            expected: 'username must be alphanumeric',
          },
          {
            schema: '$firstSchema',
            field: 'password',
            expected: null,
          },
          {
            schema: '$firstSchema',
            field: 'bio',
            expected: 'bio must not include banned words',
          },
        ],
      },

      // with betaValidators
      {
        title: 'email:www@example.com - by betaValidators',
        args: {
          validatorHash: {
            firstInput: VariablesPerSchemaValidator.create({
              variables: {
                email: 'www@example.com',
                password: 'password$001',
                'password-confirmation': 'password$001',
              },
              validators: betaValidators,
            }),
          },
        },
        fieldCases: [
          {
            field: 'email',
            expected: null,
          },
          {
            field: 'password',
            expected: null,
          },
          {
            field: 'password-confirmation',
            expected: null,
          },
        ],
        schemaFieldCases: [
          {
            schema: '$firstInput',
            field: 'email',
            expected: null,
          },
          {
            schema: '$firstInput',
            field: 'password',
            expected: null,
          },
          {
            schema: '$firstInput',
            field: 'password-confirmation',
            expected: null,
          },
        ],
      },
      {
        title: 'email:www@example - by betaValidators',
        args: {
          validatorHash: {
            secondInput: VariablesPerSchemaValidator.create({
              variables: {
                email: 'www@example',
                password: 'password$001',
                'password-confirmation': 'password$001',
              },
              validators: betaValidators,
            }),
          },
        },
        fieldCases: [
          {
            field: 'email',
            expected: 'email must be valid',
          },
          {
            field: 'password',
            expected: null,
          },
          {
            field: 'password-confirmation',
            expected: null,
          },
        ],
        schemaFieldCases: [
          {
            schema: '$secondInput',
            field: 'email',
            expected: 'email must be valid',
          },
          {
            schema: '$secondInput',
            field: 'password',
            expected: null,
          },
          {
            schema: '$secondInput',
            field: 'password-confirmation',
            expected: null,
          },
        ],
      },
      {
        title: 'email:info@example.com - by betaValidators',
        args: {
          validatorHash: {
            thirdInput: VariablesPerSchemaValidator.create({
              variables: {
                email: 'info@example.com',
                password: 'password$002',
                'password-confirmation': 'password%002',
              },
              validators: betaValidators,
            }),
          },
        },
        fieldCases: [
          {
            field: 'email',
            expected: null,
          },
          {
            field: 'password',
            expected: null,
          },
          {
            field: 'password-confirmation',
            expected: 'password confirmation must match password',
          },
        ],
        schemaFieldCases: [
          {
            schema: '$thirdInput',
            field: 'email',
            expected: null,
          },
          {
            schema: '$thirdInput',
            field: 'password',
            expected: null,
          },
          {
            schema: '$thirdInput',
            field: 'password-confirmation',
            expected: 'password confirmation must match password',
          },
        ],
      },

      // with firstValidators and secondValidators
      {
        title: 'bio:Hello, World! [$] - by firstValidators and secondValidators',
        args: {
          validatorHash: {
            firstGroup: VariablesPerSchemaValidator.create({
              variables: {
                bio: 'Hello, World! [$]',
              },
              validators: firstValidators,
            }),
            secondGroup: VariablesPerSchemaValidator.create({
              variables: {
                bio: 'Hello, World! [$]',
              },
              validators: secondValidators,
            }),
          },
        },
        fieldCases: [
          {
            field: 'bio',
            expected: 'bio must not include `$`',
          },
        ],
        schemaFieldCases: [
          {
            schema: '$firstGroup',
            field: 'bio',
            expected: 'bio must not include `$`',
          },
          {
            schema: '$secondGroup',
            field: 'bio',
            expected: null,
          },
        ],
      },
      {
        title: 'bio:Hello, World [%] - by firstValidators and secondValidators',
        args: {
          validatorHash: {
            thirdGroup: VariablesPerSchemaValidator.create({
              variables: {
                bio: 'Hello, World [%]',
              },
              validators: firstValidators,
            }),
            fourthGroup: VariablesPerSchemaValidator.create({
              variables: {
                bio: 'Hello, World [%]',
              },
              validators: secondValidators,
            }),
          },
        },
        fieldCases: [
          {
            field: 'bio',
            expected: null,
          },
        ],
        schemaFieldCases: [
          {
            schema: '$thirdGroup',
            field: 'bio',
            expected: null,
          },
          {
            schema: '$fourthGroup',
            field: 'bio',
            expected: 'bio must not include `%`',
          },
        ],
      },
    ]

    describe.each(cases)('title: $title', ({ title, args, fieldCases, schemaFieldCases }) => {
      const result = new VariablesValidationResult(args)

      test.each(fieldCases)('field: $field', ({ field, expected }) => {
        const actual = result.message[field]

        expect(actual)
          .toEqual(expected)
      })

      test.each(schemaFieldCases)('schema - field: $schema - $field', ({ schema, field, expected }) => {
        const actual = result.message[schema][field]

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})
