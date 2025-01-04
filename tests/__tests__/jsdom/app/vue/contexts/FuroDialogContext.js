import FuroDialogContext from '~/app/vue/contexts/FuroDialogContext.js'

import BaseFuroContext from '~/app/vue/contexts/BaseFuroContext'

describe('FuroDialogContext', () => {
  describe('super class', () => {
    test('to extend BaseFuroContext', () => {
      const actual = FuroDialogContext.prototype

      expect(actual)
        .toBeInstanceOf(BaseFuroContext)
    })
  })
})

describe('FuroDialogContext', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#dialogElementRef', () => {
        /**
         * @type {Array<{
         *   params: {
         *     dialogElementRef: import('vue').Ref<HTMLDialogElement | null>
         *   }
         * }>}
         */
        const cases = /** @type {Array<*>} */ ([
          {
            params: {
              dialogElementRef: {
                value: document.createElement('dialog'),
              },
            },
          },
          {
            params: {
              dialogElementRef: {
                value: null,
              },
            },
          },
        ])

        test.each(cases)('dialogElementRef: $params.dialogElementRef', ({ params }) => {
          const args = {
            props: {},
            componentContext: {
              attrs: {},
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            dialogElementRef: params.dialogElementRef,
            emit: () => {},
          }

          const context = new FuroDialogContext(args)

          expect(context.dialogElementRef)
            .toBe(params.dialogElementRef)
        })
      })
    })
  })
})

describe('FuroDialogContext', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      /**
       * @type {Array<{
       *   params: {
       *     props: import('vue').ComponentCustomProps
       *     componentContext: import('vue').SetupContext
       *     dialogElementRef: import('vue').Ref<HTMLDialogElement | null>
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            props: {
              alpha: Symbol('alpha'),
            },
            componentContext: {
              attrs: {
                alpha: 1,
              },
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            dialogElementRef: {
              value: document.createElement('dialog'),
            },
          },
        },
        {
          params: {
            props: {
              beta: Symbol('beta'),
            },
            componentContext: {
              attrs: {
                beta: 2,
              },
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            dialogElementRef: {
              value: null,
            },
          },
        },
      ])

      test.each(cases)('dialogElementRef: $params.dialogElementRef', ({ params }) => {
        const context = FuroDialogContext.create(params)

        expect(context)
          .toBeInstanceOf(FuroDialogContext)
      })
    })

    describe('to call constructor', () => {
      /**
       * @type {Array<{
       *   params: {
       *     props: import('vue').ComponentCustomProps
       *     componentContext: import('vue').SetupContext
       *     dialogElementRef: import('vue').Ref<HTMLDialogElement | null>
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            props: {
              alpha: Symbol('alpha'),
            },
            componentContext: {
              attrs: {
                alpha: 1,
              },
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            dialogElementRef: {
              value: document.createElement('dialog'),
            },
          },
        },
        {
          params: {
            props: {
              beta: Symbol('beta'),
            },
            componentContext: {
              attrs: {
                beta: 2,
              },
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            dialogElementRef: {
              value: null,
            },
          },
        },
      ])

      test.each(cases)('dialogElementRef: $params.dialogElementRef', ({ params }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(FuroDialogContext)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(params)
      })
    })
  })
})

describe('FuroDialogContext', () => {
  describe('.get:EMIT_EVENT_NAME', () => {
    test('to return fixed value', () => {
      const expected = {
        SHOW_DIALOG: 'showDialog',
        DISMISS_DIALOG: 'dismissDialog',
        CLICK_BACKDROP: 'clickBackdrop',
      }

      const actual = FuroDialogContext.EMIT_EVENT_NAME

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('FuroDialogContext', () => {
  describe('#get:dialogElement', () => {
    /**
     * @type {Array<{
     *   params: {
     *     props: import('vue').ComponentCustomProps
     *     componentContext: import('vue').SetupContext
     *     dialogElementRef: import('vue').Ref<HTMLDialogElement | null>
     *   }
     *   expected: HTMLDialogElement | null
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: {
            alpha: Symbol('alpha'),
          },
          componentContext: {
            attrs: {
              alpha: 1,
            },
            emit: () => {},
            expose: () => {},
            slots: {},
          },
          dialogElementRef: {
            value: document.createElement('dialog'),
          },
        },
        expected: expect.any(HTMLDialogElement),
      },
      {
        params: {
          props: {
            beta: Symbol('beta'),
          },
          componentContext: {
            attrs: {
              beta: 2,
            },
            emit: () => {},
            expose: () => {},
            slots: {},
          },
          dialogElementRef: {
            value: null,
          },
        },
        expected: null,
      },
    ])

    test.each(cases)('props: $params.props', ({ params, expected }) => {
      const context = new FuroDialogContext(params)

      const actual = context.dialogElement

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('FuroDialogContext', () => {
  describe('#showDialog()', () => {
    describe('to call HTMLDialogElement#showModal()', () => {
      /**
       * @type {Array<{
       *   params: {
       *     props: import('vue').ComponentCustomProps
       *     componentContext: import('vue').SetupContext
       *     dialogElementRef: import('vue').Ref<HTMLDialogElement | null>
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            props: {
              alpha: Symbol('alpha'),
            },
            componentContext: {
              attrs: {
                alpha: 1,
              },
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            dialogElementRef: {
              value: {
                showModal: () => {},
                close: () => {},
              },
            },
          },
        },
      ])

      test.each(cases)('props: $params.props', ({ params }) => {
        const showModalSpy = jest.spyOn(params.dialogElementRef.value, 'showModal')

        const context = new FuroDialogContext(params)

        context.showDialog()

        expect(showModalSpy)
          .toHaveBeenCalledWith()
      })
    })
  })
})

describe('FuroDialogContext', () => {
  describe('#dismissDialog()', () => {
    describe('to call HTMLDialogElement#showModal()', () => {
      /**
       * @type {Array<{
       *   params: {
       *     props: import('vue').ComponentCustomProps
       *     componentContext: import('vue').SetupContext
       *     dialogElementRef: import('vue').Ref<HTMLDialogElement | null>
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            props: {
              alpha: Symbol('alpha'),
            },
            componentContext: {
              attrs: {
                alpha: 1,
              },
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            dialogElementRef: {
              value: {
                showModal: () => {},
                close: () => {},
              },
            },
            emit: () => {},
          },
        },
      ])

      test.each(cases)('props: $params.props', ({ params }) => {
        const closeSpy = jest.spyOn(params.dialogElementRef.value, 'close')

        const context = new FuroDialogContext(params)

        context.dismissDialog()

        expect(closeSpy)
          .toHaveBeenCalledWith()
      })
    })
  })
})

describe('FuroDialogContext', () => {
  describe('#generateExposeHash', () => {
    /**
     * @type {Array<{
     *   params: {
     *     props: import('vue').ComponentCustomProps
     *     componentContext: import('vue').SetupContext
     *     dialogElementRef: import('vue').Ref<HTMLDialogElement | null>
     *   }
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: {
            alpha: Symbol('alpha'),
          },
          componentContext: {
            attrs: {
              alpha: 1,
            },
            emit: () => {},
            expose: () => {},
            slots: {},
          },
          dialogElementRef: {
            value: document.createElement('dialog'),
          },
        },
      },
      {
        params: {
          props: {
            beta: Symbol('beta'),
          },
          componentContext: {
            attrs: {
              beta: 2,
            },
            emit: () => {},
            expose: () => {},
            slots: {},
          },
          dialogElementRef: {
            value: null,
          },
          emit: () => {},
        },
      },
    ])

    describe('to be generated object', () => {
      test.each(cases)('props: $params.props', ({ params }) => {
        const expected = {
          showDialog: expect.any(Function),
          dismissDialog: expect.any(Function),
        }

        const context = new FuroDialogContext(params)

        const actual = context.generateExposeHash()

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('to call #showDialog()', () => {
      test.each(cases)('props: $params.props', ({ params }) => {
        const context = new FuroDialogContext(params)
        const showDialogSpy = jest.spyOn(context, 'showDialog')
          .mockImplementation(() => {})

        const exposeHash = context.generateExposeHash()

        exposeHash.showDialog()

        expect(showDialogSpy)
          .toHaveBeenCalledWith()
      })
    })

    describe('to call #dismissDialog()', () => {
      test.each(cases)('props: $params.props', ({ params }) => {
        const context = new FuroDialogContext(params)
        const dismissDialogSpy = jest.spyOn(context, 'dismissDialog')
          .mockImplementation(() => {})

        const exposeHash = context.generateExposeHash()

        exposeHash.dismissDialog()

        expect(dismissDialogSpy)
          .toHaveBeenCalledWith()
      })
    })
  })
})

describe('FuroDialogContext', () => {
  describe('#extractDialogRect()', () => {
    describe('to return DOMRect', () => {
      /**
       * @type {Array<{
       *   params: {
       *     props: import('vue').ComponentCustomProps
       *     componentContext: import('vue').SetupContext
       *     dialogElementRef: import('vue').Ref<HTMLDialogElement | null>
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            props: {
              alpha: Symbol('alpha'),
            },
            componentContext: {
              attrs: {
                alpha: 1,
              },
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            dialogElementRef: {
              value: document.createElement('dialog'),
            },
          },
        },
      ])

      test.each(cases)('props: $params.props', ({ params }) => {
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

        const context = new FuroDialogContext(params)

        const actual = context.extractDialogRect()

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('to return null', () => {
      /**
       * @type {Array<{
       *   params: {
       *     props: import('vue').ComponentCustomProps
       *     componentContext: import('vue').SetupContext
       *     dialogElementRef: import('vue').Ref<HTMLDialogElement | null>
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            props: {
              alpha: Symbol('alpha'),
            },
            componentContext: {
              attrs: {
                alpha: 1,
              },
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            dialogElementRef: {
              value: null,
            },
          },
        },
      ])

      test.each(cases)('props: $params.props', ({ params }) => {
        const context = new FuroDialogContext(params)

        const actual = context.extractDialogRect()

        expect(actual)
          .toBeNull()
      })
    })
  })
})

describe('FuroDialogContext', () => {
  describe('#isClickedOnBackdrop()', () => {
    const args = {
      props: {},
      componentContext: {
        attrs: {},
        emit: () => {},
        expose: () => {},
        slots: {},
      },
      dialogElementRef: /** @type {*} */ ({
        value: document.createElement('dialog'),
      }),
    }
    const context = new FuroDialogContext(args)

    describe('when exists <dialog>', () => {
      /**
       * @type {Array<{
       *   params: {
       *     dialogRect: {
       *       top: number
       *       left: number
       *       right: number
       *       bottom: number
       *       height: number
       *       width: number
       *       x: number
       *       y: number
       *     }
       *   }
       *   truthyCases: Array<{
       *     mouseEvent: MouseEvent
       *   }>
       *   falsyCases: Array<{
       *     mouseEvent: MouseEvent
       *   }>
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            dialogRect: {
              top: 50,
              left: 50,
              right: 100,
              bottom: 100,
              height: 50,
              width: 50,
            },
          },
          truthyCases: [
            { mouseEvent: { clientX: 49, clientY: 50 } },
            { mouseEvent: { clientX: 50, clientY: 49 } },
            { mouseEvent: { clientX: 100, clientY: 101 } },
            { mouseEvent: { clientX: 101, clientY: 100 } },
          ],
          falsyCases: [
            { mouseEvent: { clientX: 50, clientY: 50 } },
            { mouseEvent: { clientX: 50, clientY: 100 } },
            { mouseEvent: { clientX: 100, clientY: 50 } },
            { mouseEvent: { clientX: 100, clientY: 100 } },
          ],
        },
        {
          params: {
            dialogRect: {
              top: 500,
              left: 200,
              right: 400,
              bottom: 600,
              height: 100,
              width: 200,
            },
          },
          truthyCases: [
            { mouseEvent: { clientX: 199, clientY: 500 } },
            { mouseEvent: { clientX: 200, clientY: 499 } },
            { mouseEvent: { clientX: 400, clientY: 601 } },
            { mouseEvent: { clientX: 401, clientY: 600 } },
          ],
          falsyCases: [
            { mouseEvent: { clientX: 200, clientY: 500 } },
            { mouseEvent: { clientX: 200, clientY: 600 } },
            { mouseEvent: { clientX: 400, clientY: 500 } },
            { mouseEvent: { clientX: 400, clientY: 600 } },
          ],
        },
      ])

      describe.each(cases)('dialogRect: $params.dialogRect', ({ params, truthyCases, falsyCases }) => {
        describe('to be truthy', () => {
          test.each(truthyCases)('event: $mouseEvent', ({ mouseEvent }) => {
            jest.spyOn(context, 'extractDialogRect')
              .mockReturnValue(params.dialogRect)

            const actual = context.isClickedOnBackdrop({
              event: mouseEvent,
            })

            expect(actual)
              .toBeTruthy()
          })
        })

        describe('to be falsy', () => {
          test.each(falsyCases)('event: $mouseEvent', ({ mouseEvent }) => {
            jest.spyOn(context, 'extractDialogRect')
              .mockReturnValue(params.dialogRect)

            const actual = context.isClickedOnBackdrop({
              event: mouseEvent,
            })

            expect(actual)
              .toBeFalsy()
          })
        })
      })
    })

    describe('when closed <dialog>', () => {
      /**
       * @type {Array<{
       *   params: {
       *     dialogRect: {
       *       top: number
       *       left: number
       *       right: number
       *       bottom: number
       *       height: number
       *       width: number
       *       x: number
       *       y: number
       *     }
       *   }
       *   eventCases: Array<{
       *     mouseEvent: MouseEvent
       *   }>
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            dialogRect: {
              top: 50,
              left: 50,
              right: 100,
              bottom: 100,
              height: 0,
              width: 0,
            },
          },
          eventCases: [
            { mouseEvent: { clientX: 49, clientY: 50 } },
            { mouseEvent: { clientX: 50, clientY: 49 } },
            { mouseEvent: { clientX: 100, clientY: 101 } },
            { mouseEvent: { clientX: 101, clientY: 100 } },
            { mouseEvent: { clientX: 50, clientY: 50 } },
            { mouseEvent: { clientX: 50, clientY: 100 } },
            { mouseEvent: { clientX: 100, clientY: 50 } },
            { mouseEvent: { clientX: 100, clientY: 100 } },
          ],
        },
        {
          params: {
            dialogRect: {
              top: 500,
              left: 200,
              right: 400,
              bottom: 600,
              height: 0,
              width: 0,
            },
          },
          eventCases: [
            { mouseEvent: { clientX: 199, clientY: 500 } },
            { mouseEvent: { clientX: 200, clientY: 499 } },
            { mouseEvent: { clientX: 400, clientY: 601 } },
            { mouseEvent: { clientX: 401, clientY: 600 } },
            { mouseEvent: { clientX: 200, clientY: 500 } },
            { mouseEvent: { clientX: 200, clientY: 600 } },
            { mouseEvent: { clientX: 400, clientY: 500 } },
            { mouseEvent: { clientX: 400, clientY: 600 } },
          ],
        },
        {
          params: {
            dialogRect: {
              top: 500,
              left: 200,
              right: 400,
              bottom: 600,
              height: 100,
              width: 0,
            },
          },
          eventCases: [
            { mouseEvent: { clientX: 199, clientY: 500 } },
            { mouseEvent: { clientX: 200, clientY: 499 } },
            { mouseEvent: { clientX: 400, clientY: 601 } },
            { mouseEvent: { clientX: 401, clientY: 600 } },
            { mouseEvent: { clientX: 200, clientY: 500 } },
            { mouseEvent: { clientX: 200, clientY: 600 } },
            { mouseEvent: { clientX: 400, clientY: 500 } },
            { mouseEvent: { clientX: 400, clientY: 600 } },
          ],
        },
        {
          params: {
            dialogRect: {
              top: 500,
              left: 200,
              right: 400,
              bottom: 600,
              height: 0,
              width: 200,
            },
          },
          eventCases: [
            { mouseEvent: { clientX: 199, clientY: 500 } },
            { mouseEvent: { clientX: 200, clientY: 499 } },
            { mouseEvent: { clientX: 400, clientY: 601 } },
            { mouseEvent: { clientX: 401, clientY: 600 } },
            { mouseEvent: { clientX: 200, clientY: 500 } },
            { mouseEvent: { clientX: 200, clientY: 600 } },
            { mouseEvent: { clientX: 400, clientY: 500 } },
            { mouseEvent: { clientX: 400, clientY: 600 } },
          ],
        },
      ])

      describe.each(cases)('dialogRect: $params.dialogRect', ({ params, eventCases }) => {
        test.each(eventCases)('event: $mouseEvent', ({ mouseEvent }) => {
          jest.spyOn(context, 'extractDialogRect')
            .mockReturnValue(params.dialogRect)

          const actual = context.isClickedOnBackdrop({
            event: mouseEvent,
          })

          expect(actual)
            .toBeFalsy()
        })
      })
    })
  })
})

describe('FuroDialogContext', () => {
  describe('#clickInInner', () => {
    const args = {
      props: {},
      componentContext: {
        attrs: {},
        emit: () => {},
        expose: () => {},
        slots: {},
      },
      dialogElementRef: /** @type {*} */ ({
        value: document.createElement('dialog'),
      }),
    }
    const context = new FuroDialogContext(args)

    /**
     * @type {Array<{
     *   params: {
     *     dialogRect: {
     *       top: number
     *       left: number
     *       right: number
     *       bottom: number
     *       height: number
     *       width: number
     *       x: number
     *       y: number
     *     }
     *   }
     *   truthyCases: Array<{
     *     mouseEvent: MouseEvent
     *   }>
     *   falsyCases: Array<{
     *     mouseEvent: MouseEvent
     *   }>
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          dialogRect: {
            top: 50,
            left: 50,
            right: 100,
            bottom: 100,
          },
        },
        truthyCases: [
          { mouseEvent: { clientX: 49, clientY: 50 } },
          { mouseEvent: { clientX: 50, clientY: 49 } },
          { mouseEvent: { clientX: 100, clientY: 101 } },
          { mouseEvent: { clientX: 101, clientY: 100 } },
        ],
        falsyCases: [
          { mouseEvent: { clientX: 50, clientY: 50 } },
          { mouseEvent: { clientX: 50, clientY: 100 } },
          { mouseEvent: { clientX: 100, clientY: 50 } },
          { mouseEvent: { clientX: 100, clientY: 100 } },
        ],
      },
      {
        params: {
          dialogRect: {
            top: 500,
            left: 200,
            right: 400,
            bottom: 700,
          },
        },
        truthyCases: [
          { mouseEvent: { clientX: 199, clientY: 500 } },
          { mouseEvent: { clientX: 200, clientY: 499 } },
          { mouseEvent: { clientX: 400, clientY: 701 } },
          { mouseEvent: { clientX: 401, clientY: 700 } },
        ],
        falsyCases: [
          { mouseEvent: { clientX: 200, clientY: 500 } },
          { mouseEvent: { clientX: 200, clientY: 700 } },
          { mouseEvent: { clientX: 400, clientY: 500 } },
          { mouseEvent: { clientX: 400, clientY: 700 } },
        ],
      },
    ])

    describe.each(cases)('dialogRect: $params.dialogRect', ({ params, truthyCases, falsyCases }) => {
      describe.each(truthyCases)('to call #componentContext.emit()', () => {
        test.each(truthyCases)('event: $mouseEvent', ({ mouseEvent }) => {
          const expected = 'clickBackdrop'

          jest.spyOn(context, 'extractDialogRect')
            .mockReturnValue(params.dialogRect)
          const isClickedOnBackdropSpy = jest.spyOn(context, 'isClickedOnBackdrop')
          const emitSpy = jest.spyOn(context.componentContext, 'emit')

          context.clickInInner({
            event: mouseEvent,
          })

          expect(isClickedOnBackdropSpy)
            .toHaveBeenCalledWith({
              event: mouseEvent,
            })
          expect(emitSpy)
            .toHaveBeenCalledWith(expected)
        })
      })

      describe.each(falsyCases)('not to call #componentContext.emit()', () => {
        test.each(falsyCases)('event: $mouseEvent', ({ mouseEvent }) => {
          jest.spyOn(context, 'extractDialogRect')
            .mockReturnValue(params.dialogRect)
          const isClickedOnBackdropSpy = jest.spyOn(context, 'isClickedOnBackdrop')
          const emitSpy = jest.spyOn(context.componentContext, 'emit')

          context.clickInInner({
            event: mouseEvent,
          })

          expect(isClickedOnBackdropSpy)
            .toHaveBeenCalledWith({
              event: mouseEvent,
            })
          expect(emitSpy)
            .not
            .toHaveBeenCalled()
        })
      })
    })
  })
})
