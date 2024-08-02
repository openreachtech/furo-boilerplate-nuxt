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
      FieldValidator.create({
        field: 'bio',
        body: (it, variables) => !(
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
        body: (it, variables) => it,
        message: 'email is required',
      }),
      FieldValidator.create({
        field: 'email',
        body: (it, variables) => {
          return !it
            || /^[^@]+@[^@]+\.[^@]+$/.test(it)
        },
        message: 'email must be valid',
      }),
      FieldValidator.create({
        field: 'password',
        body: (it, variables) => it,
        message: 'password is required',
      }),
      FieldValidator.create({
        field: 'password-confirmation',
        body: (it, variables) => it,
        message: 'password confirmation is required',
      }),
      FieldValidator.create({
        field: 'password-confirmation',
        body: (it, variables) => it === variables.password,
        message: 'password confirmation must match password',
      }),
    ]

    const firstValidators = [
      FieldValidator.create({
        field: 'bio',
        body: (it, variables) => !it.includes('$'),
        message: 'bio must not include `$`',
      }),
    ]

    const secondValidators = [
      FieldValidator.create({
        field: 'bio',
        body: (it, variables) => !it.includes('%'),
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
