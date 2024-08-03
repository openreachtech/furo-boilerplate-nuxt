import {
  ConstructorSpyGenerator,
} from '@openreachtech/renchan-test-tools'

import VariablesValidationResult from '~/modules/client/VariablesValidationResult'

import VariablesPerSchemaValidator from '~/modules/client/VariablesPerSchemaValidator'

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
