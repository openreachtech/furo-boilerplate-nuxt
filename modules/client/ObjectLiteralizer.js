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
   * Literalize.
   *
   * @public
   * @description This method literalizes Date instance as ISO string.
   * @param {*} source - Litralizing target value
   * @returns {string} Literalized string.
   * @throws {Error} Target value includes unliteralizable value
   */
  literalize (
    source = this.source
  ) {
    if (this.isUnliteralizable(source)) {
      throw new Error('Target value includes unliteralizable value')
    }

    if (this.isValueToStringify(source)) {
      return JSON.stringify(source)
    }

    if (Array.isArray(source)) {
      return this.literalizeArray(source)
    }

    return this.literalizeObject(source)
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

  /**
   * LiteralizeArray
   * @param {Array<*>} array
   * @returns {string}
   */
  literalizeArray (array) {
    const contents = array
      .map(
        it => this.literalize(it)
      )
      .join(',')

    return `[${contents}]`
  }

  /**
   * LiteralizeObject.
   *
   * @param {source} params - Parameters.
   * @returns
   */
  literalizeObject (source) {
    const contents = Object.entries(source)
      .map(
        ([key, value]) => {
          const literalizedValue = this.literalize(value)

          return `${key}:${literalizedValue}`
        }
      )
      .join(',')

    return `{${contents}}`
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
