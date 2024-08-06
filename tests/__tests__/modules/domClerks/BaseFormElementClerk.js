import {
  ConstructorSpyGenerator,
} from '@openreachtech/renchan-test-tools'

import BaseFormElementClerk from '~/modules/domClerks/BaseFormElementClerk'

describe('BaseFormElementClerk', () => {
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
          const instance = new BaseFormElementClerk(args)

          expect(instance)
            .toHaveProperty('formElement', args.formElement)
        })
      })
    })
  })
})

describe('BaseFormElementClerk', () => {
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
        const instance = BaseFormElementClerk.create(args)

        expect(instance)
          .toBeInstanceOf(BaseFormElementClerk)
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
          .generateSpyKitClass(BaseFormElementClerk)

        DerivedClass.create(args)

        expect(DerivedClass.__spy__)
          .toHaveBeenCalledWith(args)
      })
    })
  })
})
