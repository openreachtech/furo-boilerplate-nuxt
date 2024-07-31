import {
  ConstructorSpyGenerator,
} from '@openreachtech/renchan-test-tools'

import FieldValidator from '~/modules/client/FieldValidator'

describe('FieldValidator', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      describe('#name', () => {
        const cases = [
          {
            args: {
              name: 'customer',
            },
            expected: 'customer',
          },
          {
            args: {
              name: 'message',
            },
            expected: 'message',
          },
        ]

        test.each(cases)('name: $args.name', ({ args, expected }) => {
          const constructorArgs = {
            name: args.name,
            body: () => true,
          }

          const actual = new FieldValidator(constructorArgs)

          expect(actual)
            .toHaveProperty('name', expected)
        })
      })

      describe('#body', () => {
        const cases = [
          {
            args: {
              body: () => true,
            },
          },
          {
            args: {
              body: () => false,
            },
          },
        ]

        test.each(cases)('body: $args.body', ({ args }) => {
          const constructorArgs = {
            name: 'customer',
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
            name: 'extra',
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
            name: 'customer',
            body: () => true,
          },
        },
        {
          params: {
            name: 'message',
            body: () => false,
          },
        },
      ]

      test.each(cases)('name: $params.name', ({ params }) => {
        const actual = FieldValidator.create(params)

        expect(actual)
          .toBeInstanceOf(FieldValidator)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          args: {
            name: 'customer',
            body: () => true,
          },
        },
        {
          args: {
            name: 'message',
            body: () => false,
          },
        },
      ]

      test.each(cases)('name: $args.name', ({ args }) => {
        const DerivedClass = ConstructorSpyGenerator.create({ jest })
          .generateSpyKitClass(FieldValidator)

        DerivedClass.create(args)

        expect(DerivedClass.__spy__)
          .toHaveBeenCalledWith(args)
      })
    })
  })
})
