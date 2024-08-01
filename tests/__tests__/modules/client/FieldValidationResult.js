import {
  ConstructorSpyGenerator,
} from '@openreachtech/renchan-test-tools'

import FieldValidationResult from '~/modules/client/FieldValidationResult'
import FieldValidator from '~/modules/client/FieldValidator'

describe('FieldValidationResult', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      describe('#field', () => {
        const cases = [
          {
            args: {
              field: 'username',
              variables: {
                username: 'Alice',
              },
            },
            expected: 'username',
          },
          {
            args: {
              field: 'password',
              variables: {
                password: 'password$001',
              },
            },
            expected: 'password',
          },
          {
            args: {
              field: 'email',
              variables: {
                email: 'info@example.com',
              },
            },
            expected: 'email',
          },
        ]

        test.each(cases)('field: $args.field', ({ args, expected }) => {
          const constructorArgs = {
            field: args.field,
            validators: [],
          }

          const actual = new FieldValidationResult(constructorArgs)

          expect(actual)
            .toHaveProperty('field', expected)
        })
      })

      describe('#variables', () => {
        const cases = [
          {
            args: {
              field: 'username',
              variables: {
                username: 'Alice',
              },
            },
          },
          {
            args: {
              field: 'password',
              variables: {
                password: 'password$001',
              },
            },
          },
          {
            args: {
              field: 'email',
              variables: {
                email: 'info@example.com',
              },
            },
          },
        ]

        test.each(cases)('target: $args.target', ({ args }) => {
          const constructorArgs = {
            field: args.field,
            variables: args.variables,
            validators: [],
          }

          const actual = new FieldValidationResult(constructorArgs)

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

        test.each(cases)('message: $args.message', ({ args }) => {
          const actual = new FieldValidationResult(args)

          expect(actual)
            .toHaveProperty('validators', args.validators)
          expect(actual.validators)
            .toBe(args.validators) // same reference
        })
      })
    })
  })
})

describe('FieldValidationResult', () => {
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
        const actual = FieldValidationResult.create(args)

        expect(actual)
          .toBeInstanceOf(FieldValidationResult)
      })
    })

    describe('to call constructor', () => {
      test.each(cases)('field: $args.field', ({ args }) => {
        const DerivedClass = ConstructorSpyGenerator.create({ jest })
          .generateSpyKitClass(FieldValidationResult)

        DerivedClass.create(args)

        expect(DerivedClass.__spy__)
          .toHaveBeenCalledWith(args)
      })
    })
  })
})
