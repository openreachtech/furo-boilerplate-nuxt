import {
  ConstructorSpyGenerator,
} from '@openreachtech/renchan-test-tools'

import FormElementClerk from '~/modules/domClerks/FormElementClerk'

describe('FormElementClerk', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      describe('#formElement', () => {
        const cases = [
          {
            args: {
              formElement: document.createElement('form'),
            },
          },
        ]

        test.each(cases)('formElement: $args.formElement', ({ args }) => {
          const instance = new FormElementClerk(args)

          expect(instance)
            .toHaveProperty('formElement', args.formElement)
        })
      })
    })
  })
})

describe('FormElementClerk', () => {
  describe('.create()', () => {
    describe('to create an instance of own class', () => {
      const cases = [
        {
          args: {
            formElement: document.createElement('form'),
          },
        },
      ]

      test.each(cases)('formElement: $args.formElement', ({ args }) => {
        const instance = FormElementClerk.create(args)

        expect(instance)
          .toBeInstanceOf(FormElementClerk)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          args: {
            formElement: document.createElement('form'),
          },
        },
      ]

      test.each(cases)('formElement: $args.formElement', ({ args }) => {
        const DerivedClass = ConstructorSpyGenerator.create({ jest })
          .generateSpyKitClass(FormElementClerk)

        DerivedClass.create(args)

        expect(DerivedClass.__spy__)
          .toHaveBeenCalledWith(args)
      })
    })
  })
})
