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
  describe('#extractSchemaNames()', () => {
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

      const actual = validator.extractSchemaNames()

      expect(actual)
        .toEqual(expected)
    })
  })
})
