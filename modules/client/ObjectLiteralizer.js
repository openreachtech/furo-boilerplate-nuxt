export default class ObjectLiteralizer {
  /**
   * Constructor.
   *
   * @param {ObjectLiteralizerParams} params - Parameters.
   */
  constructor ({
    source,
  }) {
    this.source = source
  }

  /**
   * Factory method.
   *
   * @param {ObjectLiteralizerFactoryParams} params - Parameters.
   * @returns
   */
  static create ({
    source,
  }) {
    return new this({
      source,
    })
  }

  /**
   * Confirm is value unliteralizable.
   *
   * @param {*} source - Source value.
   * @returns {boolean} true: It is unliteralizable.
   */
  isUnliteralizable (source) {
    return [
      'bigint',
      'symbol',
      'function',
    ]
      .includes(typeof source)
      || JSON.stringify(source) === undefined
  }

  /**
   * Confirm which is value to stringify.
   *
   * @param {*} value - Value to confirm.
   * @returns {boolean} true: It is target value.
   */
  isValueToStringify (value) {
    if (
      value === null
      || typeof value !== 'object'
    ) {
      return true
    }

    return value.constructor.name !== 'Array'
      && value.constructor.name !== 'Object'
  }
}

/**
 * @typedef {{
 *   source: *
 * }} ObjectLiteralizerParams
 */

/**
 * @typedef {ObjectLiteralizerParams} ObjectLiteralizerFactoryParams
 */
