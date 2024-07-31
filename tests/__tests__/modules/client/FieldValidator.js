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
