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

describe('BaseFormElementClerk', () => {
  describe('.get:validators', () => {
    test('to return fixed value', () => {
      const actual = BaseFormElementClerk.validators

      expect(actual)
        .toBeInstanceOf(Array)
      expect(actual)
        .toHaveLength(0)
    })
  })
})

describe('BaseFormElementClerk', () => {
  describe('#isValid()', () => {
    /**
     * @extends {BaseFormElementClerk<typeof TestFormElementClerk, *, *>}
     */
    class TestFormElementClerk extends BaseFormElementClerk {
      static get validators () {
        return [
          {
            field: 'alpha',
            message: 'alpha message',
            ok: () => true,
          },
          {
            field: 'beta',
            message: 'beta message',
            ok: () => true,
          },
        ]
      }
    }

    const formElement = document.createElement('form')

    describe('to be truthy', () => {
      /**
       * @type {Array<{
       *   args: {
       *     validationHash: import('~/modules/validators/ValueHashValidator').ValidatorHashType
       *   }
       * }>}
       */
      const cases = [
        {
          args: {
            validationHash: {
              valid: {
                alpha: true,
                beta: true,
              },
              invalid: {
                alpha: false,
                beta: false,
              },
              messages: {
                alpha: [],
                beta: [],
              },
              message: {
                alpha: null,
                beta: null,
              },
            },
          },
        },
        {
          args: {
            validationHash: {
              valid: {
                alpha: true,
              },
              invalid: {
                alpha: false,
              },
              messages: {
                alpha: [],
              },
              message: {
                alpha: null,
              },
            },
          },
        },
        {
          args: {
            validationHash: {
              valid: {},
              invalid: {},
              messages: {},
              message: {},
            },
          },
        },
      ]

      test.each(cases)('valid: $args.validationHash.valid', ({ args }) => {
        const formElementClerk = TestFormElementClerk.create({
          formElement,
        })

        const generateValidationHashSpy = jest.spyOn(formElementClerk, 'generateValidationHash')
          .mockReturnValue(args.validationHash)

        const actual = formElementClerk.isValid()

        expect(actual)
          .toBeTruthy()

        generateValidationHashSpy.mockRestore()
      })
    })

    describe('to be falsy', () => {
      /**
       * @type {Array<{
       *   args: {
       *     validationHash: import('~/modules/validators/ValueHashValidator').ValidatorHashType
       *   }
       * }>}
       */
      const cases = [
        {
          args: {
            validationHash: {
              valid: {
                alpha: false,
                beta: true,
              },
              invalid: {
                alpha: true,
                beta: false,
              },
              messages: {
                alpha: [
                  'alpha message',
                ],
                beta: [],
              },
              message: {
                alpha: 'alpha message',
                beta: null,
              },
            },
          },
        },
        {
          args: {
            validationHash: {
              valid: {
                alpha: true,
                beta: false,
              },
              invalid: {
                alpha: false,
                beta: true,
              },
              messages: {
                alpha: [],
                beta: [
                  'beta message',
                ],
              },
              message: {
                alpha: null,
                beta: 'beta message',
              },
            },
          },
        },
        {
          args: {
            validationHash: {
              valid: {
                alpha: false,
                beta: false,
              },
              invalid: {
                alpha: true,
                beta: true,
              },
              messages: {
                alpha: [
                  'alpha message',
                ],
                beta: [
                  'beta message',
                ],
              },
              message: {
                alpha: 'alpha message',
                beta: 'beta message',
              },
            },
          },
        },
      ]

      test.each(cases)('valid: $args.validationHash.valid', ({ args }) => {
        const formElementClerk = TestFormElementClerk.create({
          formElement,
        })

        const generateValidationHashSpy = jest.spyOn(formElementClerk, 'generateValidationHash')
          .mockReturnValue(args.validationHash)

        const actual = formElementClerk.isValid()

        expect(actual)
          .toBeFalsy()

        generateValidationHashSpy.mockRestore()
      })
    })
  })
})
