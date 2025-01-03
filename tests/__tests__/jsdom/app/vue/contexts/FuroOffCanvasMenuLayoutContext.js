import FuroOffCanvasMenuLayoutContext from '~/app/vue/contexts/FuroOffCanvasMenuLayoutContext.js'
import BaseFuroContext from '~/app/vue/contexts/BaseFuroContext.js'

describe('FuroOffCanvasMenuLayoutContext', () => {
  describe('super class', () => {
    test('to be BaseFuroContext', () => {
      const actual = FuroOffCanvasMenuLayoutContext.prototype

      expect(actual)
        .toBeInstanceOf(BaseFuroContext)
    })
  })
})

describe('FuroOffCanvasMenuLayoutContext', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      const domParser = new DOMParser()

      const alphaElement = domParser.parseFromString('<div><nav>Alpha</nav></div>', 'text/html')
        .body
        .firstElementChild
      const betaElement = domParser.parseFromString('<div><nav>Beta</nav></div>', 'text/html')
        .body
        .firstElementChild

      describe('#props', () => {
        describe('with existing HTMLElement', () => {
          /**
           * @type {Array<{
           *   params: {
           *     html: string
           *     rootElementRef: import('vue').Ref<HTMLElement | null>
           *   }
           * }>}
           */
          const cases = /** @type {Array<*>} */ ([
            {
              params: {
                html: '<div><nav>Alpha</nav></div>',
                rootElementRef: {
                  value: alphaElement,
                },
              },
            },
            {
              params: {
                html: '<div><nav>Beta</nav></div>',
                rootElementRef: {
                  value: betaElement,
                },
              },
            },
          ])

          test.each(cases)('html: $params.html', ({ params }) => {
            const args = {
              rootElementRef: params.rootElementRef,
              props: {},
              componentContext: {
                attrs: {},
                emit: () => {},
                expose: () => {},
                slots: {},
              },
            }

            const context = new FuroOffCanvasMenuLayoutContext(args)

            expect(context)
              .toHaveProperty('rootElementRef', params.rootElementRef)
          })
        })

        describe('with null', () => {
          /**
           * @type {Array<{
           *   params: {
           *     rootElementRef: import('vue').Ref<HTMLElement | null>
           *   }
           * }>}
           */
          const cases = /** @type {Array<*>} */ ([
            {
              params: {
                rootElementRef: {
                  value: null,
                },
              },
            },
          ])

          test.each(cases)('rootElementRef: $params.rootElementRef.value', ({ params }) => {
            const args = {
              rootElementRef: params.rootElementRef,
              props: {},
              componentContext: {
                attrs: {},
                emit: () => {},
                expose: () => {},
                slots: {},
              },
            }

            const context = new FuroOffCanvasMenuLayoutContext(args)

            expect(context)
              .toHaveProperty('rootElementRef', params.rootElementRef)
          })
        })
      })
    })
  })
})

describe('FuroOffCanvasMenuLayoutContext', () => {
  describe('.create()', () => {
    const domParser = new DOMParser()

    const alphaElement = domParser.parseFromString('<div><nav>Alpha</nav></div>', 'text/html')
      .body
      .firstElementChild
    const betaElement = domParser.parseFromString('<div><nav>Beta</nav></div>', 'text/html')
      .body
      .firstElementChild

    /**
     * @type {Array<{
     *   params: {
     *     html: string
     *     rootElementRef: import('vue').Ref<HTMLElement | null>
     *   }
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          html: '<div><nav>Alpha</nav></div>',
          rootElementRef: {
            value: alphaElement,
          },
        },
      },
      {
        params: {
          html: '<div><nav>Beta</nav></div>',
          rootElementRef: {
            value: betaElement,
          },
        },
      },
    ])

    describe('to be instance of own class', () => {
      test.each(cases)('html: $params.html', ({ params }) => {
        const args = {
          rootElementRef: params.rootElementRef,
          props: {},
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
        }

        const context = FuroOffCanvasMenuLayoutContext.create(args)

        expect(context)
          .toBeInstanceOf(FuroOffCanvasMenuLayoutContext)
      })
    })

    describe('to call constructor', () => {
      test.each(cases)('html: $params.html', ({ params }) => {
        const args = {
          rootElementRef: params.rootElementRef,
          props: {},
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
        }

        const SpyClass = globalThis.constructorSpy.spyOn(FuroOffCanvasMenuLayoutContext)

        SpyClass.create(args)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(args)
      })
    })
  })
})

describe('FuroOffCanvasMenuLayoutContext', () => {
  describe('#get:rootElement', () => {
    const domParser = new DOMParser()

    const alphaElement = domParser.parseFromString('<div><nav>Alpha</nav></div>', 'text/html')
      .body
      .firstElementChild
    const betaElement = domParser.parseFromString('<div><nav>Beta</nav></div>', 'text/html')
      .body
      .firstElementChild

    /**
     * @type {Array<{
     *   params: {
     *     html: string
     *     rootElementRef: import('vue').Ref<HTMLElement | null>
     *   }
     *   expected: HTMLElement
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          html: '<div><nav>Alpha</nav></div>',
          rootElementRef: {
            value: alphaElement,
          },
        },
        expected: alphaElement,
      },
      {
        params: {
          html: '<div><nav>Beta</nav></div>',
          rootElementRef: {
            value: betaElement,
          },
        },
        expected: betaElement,
      },
    ])

    test.each(cases)('html: $params.html', ({ params, expected }) => {
      const args = {
        rootElementRef: params.rootElementRef,
        props: {},
        componentContext: {
          attrs: {},
          emit: () => {},
          expose: () => {},
          slots: {},
        },
      }

      const context = FuroOffCanvasMenuLayoutContext.create(args)

      const actual = context.rootElement

      expect(actual)
        .toBe(expected) // same reference
    })
  })
})

describe('FuroOffCanvasMenuLayoutContext', () => {
  describe('#get:Ctor', () => {
    describe('to be own class', () => {
      const domParser = new DOMParser()

      const alphaElement = domParser.parseFromString('<div><nav>Alpha</nav></div>', 'text/html')
        .body
        .firstElementChild
      const betaElement = domParser.parseFromString('<div><nav>Beta</nav></div>', 'text/html')
        .body
        .firstElementChild

      /**
       * @type {Array<{
       *   params: {
       *     props: import('vue').ComponentCustomProps
       *     componentContext: import('vue').SetupContext
       *     rootElementRef: import('vue').Ref<HTMLElement | null>
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            props: {
              label: 'alpha',
            },
            componentContext: {
              attrs: {},
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            rootElementRef: {
              value: alphaElement,
            },
          },
        },
        {
          params: {
            props: {
              label: 'beta',
            },
            componentContext: {
              attrs: {},
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            rootElementRef: {
              value: betaElement,
            },
          },
        },
      ])

      test.each(cases)('label: $params.props.label', ({ params }) => {
        const context = FuroOffCanvasMenuLayoutContext.create(params)

        const actual = context.Ctor

        expect(actual)
          .toBe(FuroOffCanvasMenuLayoutContext) // same reference
      })
    })
  })
})

describe('FuroOffCanvasMenuLayoutContext', () => {
  describe('#closeNavigation()', () => {
    const domParser = new DOMParser()

    const alphaElement = domParser.parseFromString('<div class="open-nav"><nav>Alpha</nav></div>', 'text/html')
      .body
      .firstElementChild
    const betaElement = domParser.parseFromString('<div><nav>Beta</nav></div>', 'text/html')
      .body
      .firstElementChild

    /**
     * @type {Array<{
     *   params: {
     *     html: string
     *     rootElementRef: import('vue').Ref<HTMLElement | null>
     *     classListHandler: DOMTokenList
     *   }
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          html: '<div class="open-nav"><nav>Alpha</nav></div>',
          rootElementRef: {
            value: alphaElement,
          },
          classListHandler: alphaElement?.['classList'],
        },
      },
      {
        params: {
          html: '<div><nav>Beta</nav></div>',
          rootElementRef: {
            value: betaElement,
          },
          classListHandler: betaElement?.['classList'],
        },
      },
    ])

    test.each(cases)('html: $params.html', ({ params }) => {
      const args = {
        rootElementRef: params.rootElementRef,
        props: {},
        componentContext: {
          attrs: {},
          emit: () => {},
          expose: () => {},
          slots: {},
        },
      }

      const context = FuroOffCanvasMenuLayoutContext.create(args)
      context.closeNavigation()

      const actual = params.classListHandler.contains('open-nav')

      expect(actual)
        .toBeFalsy()
    })
  })
})

describe('FuroOffCanvasMenuLayoutContext', () => {
  describe('#clickToggleNavigation()', () => {
    const domParser = new DOMParser()

    describe('when toggle from closed to open', () => {
      const alphaElement = domParser.parseFromString('<div><nav>Alpha</nav></div>', 'text/html')
        .body
        .firstElementChild
      const betaElement = domParser.parseFromString('<div><nav>Beta</nav></div>', 'text/html')
        .body
        .firstElementChild

      /**
       * @type {Array<{
       *   params: {
       *     html: string
       *     rootElementRef: import('vue').Ref<HTMLElement | null>
       *     classListHandler: DOMTokenList
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            html: '<div><nav>Alpha</nav></div>',
            rootElementRef: {
              value: alphaElement,
            },
            classListHandler: alphaElement?.['classList'],
          },
        },
        {
          params: {
            html: '<div><nav>Beta</nav></div>',
            rootElementRef: {
              value: betaElement,
            },
            classListHandler: betaElement?.['classList'],
          },
        },
      ])

      test.each(cases)('html: $params.html', ({ params }) => {
        const args = {
          rootElementRef: params.rootElementRef,
          props: {},
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
        }

        const context = FuroOffCanvasMenuLayoutContext.create(args)
        context.clickToggleNavigation()

        const actual = params.classListHandler.contains('open-nav')

        expect(actual)
          .toBeTruthy()
      })
    })

    describe('when toggle from open to closed', () => {
      const alphaElement = domParser.parseFromString('<div class="open-nav"><nav>Alpha</nav></div>', 'text/html')
        .body
        .firstElementChild
      const betaElement = domParser.parseFromString('<div class="open-nav"><nav>Beta</nav></div>', 'text/html')
        .body
        .firstElementChild

      /**
       * @type {Array<{
       *   params: {
       *     html: string
       *     rootElementRef: import('vue').Ref<HTMLElement | null>
       *     classListHandler: DOMTokenList
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            html: '<div class="open-nav"><nav>Alpha</nav></div>',
            rootElementRef: {
              value: alphaElement,
            },
            classListHandler: alphaElement?.['classList'],
          },
        },
        {
          params: {
            html: '<div class="open-nav"><nav>Beta</nav></div>',
            rootElementRef: {
              value: betaElement,
            },
            classListHandler: betaElement?.['classList'],
          },
        },
      ])

      test.each(cases)('html: $params.html', ({ params }) => {
        const args = {
          rootElementRef: params.rootElementRef,
          props: {},
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
        }

        const context = FuroOffCanvasMenuLayoutContext.create(args)
        context.clickToggleNavigation()

        const actual = params.classListHandler.contains('open-nav')

        expect(actual)
          .toBeFalsy()
      })
    })
  })
})

describe('FuroOffCanvasMenuLayoutContext', () => {
  describe('#isShowedNavigation()', () => {
    const domParser = new DOMParser()

    describe('to be truthy', () => {
      const alphaOpenElement = domParser.parseFromString('<div class="open-nav"><nav>Alpha</nav></div>', 'text/html')
        .body
        .firstElementChild
      const betaClosedElement = domParser.parseFromString('<div class="open-nav"><nav>Beta</nav></div>', 'text/html')
        .body
        .firstElementChild

      /**
       * @type {Array<{
       *   params: {
       *     html: string
       *     rootElementRef: import('vue').Ref<HTMLElement | null>
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            html: '<div class="open-nav"><nav>Alpha</nav></div>',
            rootElementRef: {
              value: alphaOpenElement,
            },
          },
        },
        {
          params: {
            html: '<div class="open-nav"><nav>Beta</nav></div>',
            rootElementRef: {
              value: betaClosedElement,
            },
          },
        },
      ])

      test.each(cases)('html: $params.html', ({ params }) => {
        const args = {
          rootElementRef: params.rootElementRef,
          props: {},
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
        }

        const context = FuroOffCanvasMenuLayoutContext.create(args)

        expect(context.isShowedNavigation())
          .toBeTruthy()
      })
    })

    describe('to be falsy', () => {
      const alphaOpenElement = domParser.parseFromString('<div><nav>Alpha</nav></div>', 'text/html')
        .body
        .firstElementChild
      const betaClosedElement = domParser.parseFromString('<div><nav>Beta</nav></div>', 'text/html')
        .body
        .firstElementChild

      /**
       * @type {Array<{
       *   params: {
       *     html: string
       *     rootElementRef: import('vue').Ref<HTMLElement | null>
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            html: '<div><nav>Alpha</nav></div>',
            rootElementRef: {
              value: alphaOpenElement,
            },
          },
        },
        {
          params: {
            html: '<div><nav>Beta</nav></div>',
            rootElementRef: {
              value: betaClosedElement,
            },
          },
        },
      ])

      test.each(cases)('html: $params.html', ({ params }) => {
        const args = {
          rootElementRef: params.rootElementRef,
          props: {},
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
        }

        const context = FuroOffCanvasMenuLayoutContext.create(args)

        expect(context.isShowedNavigation())
          .toBeFalsy()
      })
    })
  })
})

describe('FuroOffCanvasMenuLayoutContext', () => {
  describe('#clickInNav()', () => {
    const domParser = new DOMParser()

    const alphaElement = domParser.parseFromString('<div class="open-nav"><nav>Alpha</nav></div>', 'text/html')
      .body
      .firstElementChild
    const betaElement = domParser.parseFromString('<div class="open-nav"><nav>Beta</nav></div>', 'text/html')
      .body
      .firstElementChild

    /**
     * @type {Array<{
     *   params: {
     *     html: string
     *     rootElementRef: import('vue').Ref<HTMLElement | null>
     *     isClickedOnBackdrop: boolean
     *   }
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          html: '<div class="open-nav"><nav>Alpha</nav></div>',
          rootElementRef: {
            value: alphaElement,
          },
        },
      },
      {
        params: {
          html: '<div class="open-nav"><nav>Beta</nav></div>',
          rootElementRef: {
            value: betaElement,
          },
        },
      },
    ])

    describe.each(cases)('html: $params.html', ({ params }) => {
      const contextArgs = {
        rootElementRef: params.rootElementRef,
        props: {},
        componentContext: {
          attrs: {},
          emit: () => {},
          expose: () => {},
          slots: {},
        },
      }

      const context = FuroOffCanvasMenuLayoutContext.create(contextArgs)

      test('when click on backdrop of <nav>', () => {
        jest.spyOn(context, 'isClickedOnNavigationBackdrop')
          .mockReturnValue(true)
        const closeNavigationSpy = jest.spyOn(context, 'closeNavigation')

        const args = {
          event: new MouseEvent('click'),
        }

        context.clickInNav(args)

        expect(closeNavigationSpy)
          .toHaveBeenCalledWith()
      })

      test('when click on not backdrop of <nav>', () => {
        jest.spyOn(context, 'isClickedOnNavigationBackdrop')
          .mockReturnValue(false)
        const closeNavigationSpy = jest.spyOn(context, 'closeNavigation')

        const args = {
          event: new MouseEvent('click'),
        }

        context.clickInNav(args)

        expect(closeNavigationSpy)
          .not
          .toHaveBeenCalledWith()
      })
    })
  })
})

describe('FuroOffCanvasMenuLayoutContext', () => {
  describe('#isClickedOnNavigationBackdrop()', () => {
    const domParser = new DOMParser()

    const alphaElement = domParser.parseFromString('<div class="open-nav"><nav>Alpha</nav></div>', 'text/html')
      .body
      .firstElementChild
    const betaElement = domParser.parseFromString('<div class="open-nav"><nav>Beta</nav></div>', 'text/html')
      .body
      .firstElementChild

    /**
     * @type {Array<{
     *   params: {
     *     html: string
     *     rootElementRef: import('vue').Ref<HTMLElement | null>
     *     clientX: number
     *     rect: DOMRect
     *   }
     *   truthyCases: Array<{
     *     event: MouseEvent
     *   }>
     *   falsyCases: Array<{
     *     event: MouseEvent
     *   }>
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          html: '<div class="open-nav"><nav>Alpha</nav></div>',
          rootElementRef: {
            value: alphaElement,
          },
          clientX: 250,
          rect: {
            top: 100,
            left: 200,
            right: 300, // ✅️
            bottom: 400,
          },
        },
        truthyCases: [
          { event: { clientX: 301 } },
          { event: { clientX: 399 } },
          { event: { clientX: 400 } },
          { event: { clientX: 401 } },
        ],
        falsyCases: [
          { event: { clientX: 99 } },
          { event: { clientX: 100 } },
          { event: { clientX: 199 } },
          { event: { clientX: 200 } },
          { event: { clientX: 299 } },
          { event: { clientX: 300 } },
        ],
      },
      {
        params: {
          html: '<div class="open-nav"><nav>Beta</nav></div>',
          rootElementRef: {
            value: betaElement,
          },
          clientX: 150,
          rect: {
            top: 10,
            left: 20,
            right: 30, // ✅️
            bottom: 40,
          },
        },
        truthyCases: [
          { event: { clientX: 31 } },
          { event: { clientX: 39 } },
          { event: { clientX: 40 } },
          { event: { clientX: 41 } },
        ],
        falsyCases: [
          { event: { clientX: 9 } },
          { event: { clientX: 10 } },
          { event: { clientX: 19 } },
          { event: { clientX: 20 } },
          { event: { clientX: 29 } },
          { event: { clientX: 30 } },
        ],
      },
    ])

    describe.each(cases)('html: $params.html', ({ params, truthyCases, falsyCases }) => {
      const args = {
        rootElementRef: params.rootElementRef,
        props: {},
        componentContext: {
          attrs: {},
          emit: () => {},
          expose: () => {},
          slots: {},
        },
      }

      const context = FuroOffCanvasMenuLayoutContext.create(args)

      test.each(truthyCases)('clientX: $event.clientX', ({ event: mouseEvent }) => {
        jest.spyOn(context, 'extractNavRect')
          .mockReturnValue(params.rect)

        const actual = context.isClickedOnNavigationBackdrop({
          event: mouseEvent,
        })

        expect(actual)
          .toBeTruthy()
      })

      test.each(falsyCases)('clientX: $event.clientX', ({ event: mouseEvent }) => {
        jest.spyOn(context, 'extractNavRect')
          .mockReturnValue(params.rect)

        const actual = context.isClickedOnNavigationBackdrop({
          event: mouseEvent,
        })

        expect(actual)
          .toBeFalsy()
      })
    })
  })
})

describe('FuroOffCanvasMenuLayoutContext', () => {
  describe('#extractNavRect()', () => {
    describe('to return DOMRect', () => {
      const domParser = new DOMParser()

      const alphaElement = domParser.parseFromString('<div><nav style="height: 10rem; width: 20rem;">Alpha</nav></div>', 'text/html')
        .body
        .firstElementChild
      const betaElement = domParser.parseFromString('<div><nav style="height: 5rem; width: 10rem;">Beta</nav></div>', 'text/html')
        .body
        .firstElementChild

      /**
       * @type {Array<{
       *   params: {
       *     html: string
       *     rootElementRef: import('vue').Ref<HTMLElement | null>
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            html: '<div><nav style="height: 10rem; width: 20rem;">Alpha</nav></div>',
            rootElementRef: {
              value: alphaElement,
            },
          },
        },
        {
          params: {
            html: '<div><nav style="height: 5rem; width: 10rem;">Beta</nav></div>',
            rootElementRef: {
              value: betaElement,
            },
          },
        },
      ])

      test.each(cases)('html: $params.html', ({ params }) => {
        const expected = {
          top: expect.any(Number),
          left: expect.any(Number),
          right: expect.any(Number),
          bottom: expect.any(Number),
          width: expect.any(Number),
          height: expect.any(Number),
          x: expect.any(Number), // eslint-disable-line id-length
          y: expect.any(Number), // eslint-disable-line id-length
        }

        const args = {
          rootElementRef: params.rootElementRef,
          props: {},
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
        }

        const context = FuroOffCanvasMenuLayoutContext.create(args)
        const actual = context.extractNavRect()

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('to return null', () => {
      test('rootElement: null', () => {
        /** @type {Parameters<FuroOffCanvasMenuLayoutContext.create>[0]} */
        const args = /** @type {*} */ ({
          rootElementRef: {
            value: null,
          },
          props: {},
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
        })

        const context = FuroOffCanvasMenuLayoutContext.create(args)
        const actual = context.extractNavRect()

        expect(actual)
          .toBeNull()
      })
    })
  })
})
