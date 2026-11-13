import Spy from '@openreachtech/jest-constructor-spy'

const {
  ConstructorSpy,
} = Spy

/*
 * Set global variables.
 */
globalThis.jest = jest
globalThis.constructorSpy = ConstructorSpy.create({
  jest,
})

/*
 * Set global hooks.
 */
afterEach(() => {
  jest.restoreAllMocks()
})
