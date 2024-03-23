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
}

/**
 * @typedef {{
 *   source: *
 * }} ObjectLiteralizerParams
 */

/**
 * @typedef {ObjectLiteralizerParams} ObjectLiteralizerFactoryParams
 */
