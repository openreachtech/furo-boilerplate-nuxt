import BaseFuroContext from './BaseFuroContext.js'

import FuroPageItemContext from './FuroPageItemContext.js'

/**
 * Props context class for FuroPagination component.
 *
 * @property {URLSearchParams} searchParams - Search parameters.
 * @property {number} currentPage - Current page.
 * @property {number} maxPageRange - page range in view
 * @property {number} lastPage - Last page.
 * @property {string} pageKey - Page key.
 * @extends {BaseFuroContext<null>} - Base class.
 */
export default class FuroPaginationContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {FuroPaginationContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,
    searchParams,
    currentPage,
    maxPageRange,
    lastPage,
    pageKey,
  }) {
    super({
      props,
      componentContext,
    })

    this.searchParams = searchParams
    this.currentPage = currentPage
    this.maxPageRange = maxPageRange
    this.lastPage = lastPage
    this.pageKey = pageKey
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof FuroPaginationContext ? X : never} T, X
   * @override
   * @param {FuroPaginationContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - New instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    searchParams = new URLSearchParams(location.search),
  }) {
    const {
      pagination: {
        limit = 20,
        totalRecords = 0,
      } = {},
      pageKey = 'page',
      maxPageRange = 5,
    } = props

    const currentPage = this.extractCurrentPage({
      searchParams,
      pageKey,
    })

    const lastPage = this.calculateLastPage({
      limit,
      totalRecords,
    })

    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        searchParams,
        currentPage,
        lastPage,
        maxPageRange,
        pageKey,
      })
    )
  }

  /**
   * Extract current page.
   *
   * @param {{
   *   searchParams: URLSearchParams
   *   pageKey: string
   * }} params - Parameters.
   * @returns {number} - Current page.
   */
  static extractCurrentPage ({
    searchParams,
    pageKey,
  }) {
    const rawPage = Number(
      searchParams.get(pageKey)
    )

    if (!rawPage) {
      return 1
    }

    return rawPage
  }

  /**
   * Calculate last page.
   *
   * @param {{
   *   limit: number
   *   totalRecords: number
   * }} params - Parameters.
   * @returns {number} - Last page.
   */
  static calculateLastPage ({
    limit,
    totalRecords,
  }) {
    return Math.ceil(totalRecords / limit)
  }

  /**
   * Create pages.
   *
   * @param {{
   *   rangePages?: Array<number>
   * }} [params] - Parameters.
   * @returns {Array<FuroPageItemContext>} - Pages.
   */
  createRangePages ({
    rangePages = this.generateRangePages(),
  } = {}) {
    return rangePages.map(page =>
      FuroPageItemContext.create({
        pageNumber: page,
        searchParams: this.searchParams,
        pageKey: this.pageKey,
        isCurrent: page === this.currentPage,
      })
    )
  }

  /**
   * Generate range pages.
   *
   * @returns {Array<number>} - Range pages.
   */
  generateRangePages () {
    const startPage = this.calculateRangeStartedPage()

    const pageIterator = Array(this.maxPageRange)
      .keys()
    const lastPage = this.lastPage ?? 1

    return [...pageIterator]
      .map(it => startPage + it)
      .filter(it => it <= lastPage)
  }

  /**
   * Calculate range started page.
   *
   * @returns {number} - Start page.
   */
  calculateRangeStartedPage () {
    const simpleStartPage = this.currentPage - Math.floor(this.maxPageRange / 2)
    const simpleLastPage = this.currentPage + Math.floor(this.maxPageRange / 2)

    if (simpleStartPage <= 1) {
      return 1
    }

    if (simpleLastPage > this.lastPage) {
      return Math.max(
        1,
        this.lastPage - this.maxPageRange + 1
      )
    }

    return simpleStartPage
  }

  /**
   * Create previous page.
   *
   * @returns {FuroPageItemContext} - Previous page.
   */
  createPreviousPage () {
    const previousPage = this.currentPage
      ? this.currentPage - 1
      : null

    return FuroPageItemContext.create({
      pageNumber: previousPage,
      searchParams: this.searchParams,
      pageKey: this.pageKey,
    })
  }

  /**
   * Create next page.
   *
   * @returns {FuroPageItemContext} - Next page.
   */
  createNextPage () {
    if (this.lastPage <= this.currentPage) {
      return FuroPageItemContext.create({
        pageNumber: null,
        searchParams: this.searchParams,
        pageKey: this.pageKey,
      })
    }

    const nextPage = this.currentPage + 1

    return FuroPageItemContext.create({
      pageNumber: nextPage,
      searchParams: this.searchParams,
      pageKey: this.pageKey,
    })
  }

  /**
   * Create first page.
   *
   * @returns {FuroPageItemContext} - First page.
   */
  createFirstPage () {
    return FuroPageItemContext.create({
      pageNumber: 1,
      searchParams: this.searchParams,
      pageKey: this.pageKey,
    })
  }

  /**
   * Create last page.
   *
   * @returns {FuroPageItemContext} - Last page.
   */
  createLastPage () {
    return FuroPageItemContext.create({
      pageNumber: this.lastPage,
      searchParams: this.searchParams,
      pageKey: this.pageKey,
    })
  }

  /**
   * Generate control classes.
   *
   * @returns {{
   *   [className: string]: boolean
   * }} - Previous page.
   */
  generateControlClasses () {
    return {
      'disabled-previous': this.isDisabledPreviousPage(),
      'disabled-next': this.isDisabledNextPage(),
      'hidden-first': this.isHiddenFirstPage(),
      'hidden-last': this.isHiddenLastPage(),
      'hidden-first-dash': this.isHiddenFirstPageDash(),
      'hidden-last-dash': this.isHiddenLastPageDash(),
    }
  }

  /**
   * Is disabled first page.
   *
   * @returns {boolean} - true: disabled.
   */
  isDisabledPreviousPage () {
    return this.currentPage === 1
  }

  /**
   * Is disabled next page.
   *
   * @returns {boolean} - true: disabled.
   */
  isDisabledNextPage () {
    return this.lastPage <= this.currentPage
  }

  /**
   * Is hidden first page.
   *
   * @returns {boolean} - true: hidden.
   */
  isHiddenFirstPage () {
    const rangePages = this.generateRangePages()

    return rangePages.includes(1)
  }

  /**
   * Is hidden last page.
   *
   * @returns {boolean} - true: hidden.
   */
  isHiddenLastPage () {
    const rangePages = this.generateRangePages()

    return rangePages.includes(this.lastPage)
  }

  /**
   * Is hidden first page dash.
   *
   * @returns {boolean} - true: hidden.
   */
  isHiddenFirstPageDash () {
    const rangePages = this.generateRangePages()

    return rangePages.includes(2)
  }

  /**
   * Is hidden last page dash.
   *
   * @returns {boolean} - true: hidden.
   */
  isHiddenLastPageDash () {
    const rangePages = this.generateRangePages()

    return rangePages.includes(this.lastPage - 1)
  }
}

/**
 * @typedef {import('./BaseFuroContext.js').BaseFuroContextParams & {
 *   props: FuroPaginationContextProps
 *   componentContext: import('vue').SetupContext
 *   searchParams: URLSearchParams
 *   currentPage: number
 *   maxPageRange: number
 *   lastPage: number
 *   pageKey: string
 * }} FuroPaginationContextParams
 */

/**
 * @typedef {import('./BaseFuroContext.js').BaseFuroContextFactoryParams & {
 *   props: FuroPaginationContextProps
 *   componentContext: import('vue').SetupContext
 *   searchParams?: URLSearchParams
 * }} FuroPaginationContextFactoryParams
 */

/**
 * @typedef {{
 *   pagination?: {
 *     limit?: number
 *     totalRecords?: number
 *   }
 *   pageKey?: string
 *   maxPageRange?: number
 * }} FuroPaginationContextProps
 */
