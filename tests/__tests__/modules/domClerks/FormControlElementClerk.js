import {
  ConstructorSpyGenerator,
} from '@openreachtech/renchan-test-tools'

import FormControlElementClerk from '~/modules/domClerks/FormControlElementClerk'

const formElement = document.createElement('form')
const inputElement = document.createElement('input')

inputElement.type = 'radio'
inputElement.name = 'group'
inputElement.value = '001'
formElement.appendChild(inputElement)

const nameKey = 'group'
const radioNodeList = formElement.elements[nameKey]

describe('FormControlElementClerk', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      describe('#control', () => {
        const cases = [
          {
            args: {
              control: document.createElement('button'),
            },
          },
          {
            args: {
              control: document.createElement('input'),
            },
          },
          {
            args: {
              control: document.createElement('textarea'),
            },
          },
          {
            args: {
              control: radioNodeList,
            },
          },
        ]

        test.each(cases)('control: $args.control', ({ args }) => {
          const instance = new FormControlElementClerk(args)

          expect(instance)
            .toHaveProperty('control', args.control)
        })
      })
    })
  })
})

describe('FormControlElementClerk', () => {
  describe('.create()', () => {
    describe('to create an instance of own class', () => {
      const cases = [
        {
          args: {
            control: document.createElement('button'),
          },
        },
        {
          args: {
            control: document.createElement('input'),
          },
        },
        {
          args: {
            control: document.createElement('textarea'),
          },
        },
        {
          args: {
            control: radioNodeList,
          },
        },
      ]

      test.each(cases)('control: $args.control', ({ args }) => {
        const instance = FormControlElementClerk.create(args)

        expect(instance)
          .toBeInstanceOf(FormControlElementClerk)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          args: {
            control: document.createElement('button'),
          },
        },
        {
          args: {
            control: document.createElement('input'),
          },
        },
        {
          args: {
            control: document.createElement('textarea'),
          },
        },
        {
          args: {
            control: radioNodeList,
          },
        },
      ]

      test.each(cases)('control: $args.control', ({ args }) => {
        const DerivedClass = ConstructorSpyGenerator.create({ jest })
          .generateSpyKitClass(FormControlElementClerk)

        DerivedClass.create(args)

        expect(DerivedClass.__spy__)
          .toHaveBeenCalledWith(args)
      })
    })
  })
})
