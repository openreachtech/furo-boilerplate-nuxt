import {
  watch,
} from 'vue'

/**
 * Furo Component Context.
 *
 * @template EE - emit() event names.
 */
export default class BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {BaseFuroContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,
  }) {
    this.props = props
    this.componentContext = componentContext
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof BaseFuroContext ? X : never} T, X
   * @param {BaseFuroContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - New instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
      })
    )
  }

  /**
   * emit() event name.
   *
   * @abstract
   * @returns {Record<string, string>}
   */
  static get EMIT_EVENT_NAME () {
    return {}
  }

  /**
   * Get the constructor of this class.
   *
   * @template {X extends typeof BaseFuroContext ? X : never} T, X
   * @returns {T} - Constructor of this
   * @this {InstanceType<T>}
   */
  get Ctor () {
    return /** @type {T} */ (this.constructor)
  }

  /**
   * get: emit() event name.
   *
   * @returns {Record<string, EE>} - emit() event name.
   */
  get EMIT_EVENT_NAME () {
    return /** @type {*} */ (this.Ctor.EMIT_EVENT_NAME)
  }

  /**
   * get: attrs of component context.
   *
   * @returns {import('vue').SetupContext['attrs']} - Attributes of component context.
   */
  get attrs () {
    return this.componentContext.attrs
  }

  /**
   * get: slots of component context.
   *
   * @returns {(
   *   event: EE,
   *   ...args: Array<any>
   * ) => void} - emit() function of component context.
   */
  get emit () {
    return /** @type {*} */ (this.componentContext.emit)
  }

  /**
   * get: expose() of component context.
   *
   * @returns {import('vue').SetupContext['expose']} - Listeners of component context.
   */
  get expose () {
    return this.componentContext.expose
  }

  /**
   * get: slots of component context.
   *
   * @returns {import('vue').SetupContext['slots']} - Slots of component context.
   */
  get slots () {
    return this.componentContext.slots
  }

  /**
   * get: watch() of component context.
   *
   * @returns {import('vue').watch} - Watch of component context.
   */
  get watch () {
    return watch
  }

  /**
   * Setup component context.
   *
   * @param {object} [args] - Arguments of this method.
   * @returns {BaseFuroContext<EE>} - For method chaining.
   * @example
   * ```
   * setupComponent (args) {
   *   this..expose(
   *     this.generateExposeHash()
   *   )
   *
   *   watch(
   *     [
   *       this.rootElementRef,
   *     ],
   *     this.generateWatchRootElementHandler()
   *   )
   *
   *   return this
   * }
   * ```
   */
  setupComponent (args = {}) {
    return this
  }
}

/**
 * @typedef {{
 *   props: import('vue').ComponentCustomProps
 *   componentContext: import('vue').SetupContext
 * }} BaseFuroContextParams
 */

/**
 * @typedef {BaseFuroContextParams} BaseFuroContextFactoryParams
 */
