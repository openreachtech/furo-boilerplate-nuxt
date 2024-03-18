export default class BaseGraphqlPayload {
  /**
   * Constructor.
   *
   * @param {BaseGraphqlPayloadParams} params
   */
  constructor ({
    queryTemplate,
  }) {
    this.queryTemplate = queryTemplate
  }
}

/**
 * @typedef {{
 *   queryTemplate: string
 * }} BaseGraphqlPayloadParams
 */
