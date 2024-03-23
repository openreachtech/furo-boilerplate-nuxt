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
}

/**
 * @typedef {{
 *   source: *
 * }} ObjectLiteralizerParams
 */

/**
 * @typedef {ObjectLiteralizerParams} ObjectLiteralizerFactoryParams
 */
