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
}

/**
 * @typedef {{
 *   source: *
 * }} ObjectLiteralizerParams
 */
