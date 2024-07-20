import {
  ConstructorSpyGenerator,
} from '@openreachtech/renchan-test-tools'

import NullGraphqlCapsule from '@/modules/client/capsules/NullGraphqlCapsule'
import BaseGraphqlCapsule from '~/modules/client/BaseGraphqlCapsule'

describe('NullGraphqlCapsule', () => {
  describe('super class', () => {
    test('to be derived class of BaseGraphqlCapsule', () => {
      const actual = NullGraphqlCapsule.prototype

      expect(actual)
        .toBeInstanceOf(BaseGraphqlCapsule)
    })
  })
})

describe('NullGraphqlCapsule', () => {
  describe('.create', () => {
    describe('to be instance of own class', () => {
      test('with no args', () => {
        const actual = NullGraphqlCapsule.create()

        expect(actual)
          .toBeInstanceOf(NullGraphqlCapsule)
      })
    })

    describe('to call constructor', () => {
      test('with no args', () => {
        const expected = {
          rawResponse: null,
          payload: null,
          result: null,
        }

        const DerivedClass = ConstructorSpyGenerator.create({ jest })
          .generateSpyKitClass(NullGraphqlCapsule)

        DerivedClass.create()

        expect(DerivedClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})
