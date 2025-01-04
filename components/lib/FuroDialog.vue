<script>
import {
  defineComponent,
  ref,
  watch,
} from 'vue'

import FuroDialogContext from '~/app/vue/contexts/FuroDialogContext.js'

const EVENT_NAME = {
  SHOW_DIALOG: 'showDialog',
  DISMISS_DIALOG: 'dismissDialog',
  CLICK_BACKDROP: 'clickBackdrop',
}

export default defineComponent({
  name: 'FuroDialog',
  inheritAttrs: false,

  emits: [
    EVENT_NAME.SHOW_DIALOG,
    EVENT_NAME.DISMISS_DIALOG,
    EVENT_NAME.CLICK_BACKDROP,
  ],

  setup (
    props,
    componentContext
  ) {
    /** @type {import('vue').Ref<HTMLDialogElement | null>} */
    const dialogElementRef = ref(null)

    const context = FuroDialogContext.create({
      props,
      componentContext,
      dialogElementRef,
    })

    componentContext.expose(
      context.generateExposeHash()
    )

    watch([dialogElementRef], ([newOne], [oldOne]) => {
      if (oldOne) {
        return
      }

      if (!dialogElementRef.value) {
        return
      }

      // MutationObserverの設定
      const observer = new MutationObserver(mutations => {
        const mutation = [...mutations]
          .filter(it => it.type === 'attributes')
          .filter(it => it.attributeName === 'open')
          .find(it => it.target === dialogElementRef.value)

        if (!mutation) {
          return
        }

        const isOpen = dialogElementRef.value
          ?.hasAttribute('open')

        componentContext.emit(
          isOpen
            ? EVENT_NAME.SHOW_DIALOG
            : EVENT_NAME.DISMISS_DIALOG
        )
      })

      observer.observe(dialogElementRef.value, {
        attributes: true,
        attributeFilter: [
          'open',
        ],
        attributeOldValue: true,
      })
    })

    return {
      context,
      dialogElementRef,
    }
  },
})
</script>

<template>
  <dialog ref="dialogElementRef"
    class="unit-dialog"
    v-bind="$attrs"
    @click="context.clickInInner({
      event: $event,
    })"
  >
    <slot name="contents" />

    <button class="close"
      @click="context.dismissDialog()"
    >
      <slot name="x-button">
        ✕
      </slot>
    </button>
  </dialog>
</template>

<style scoped>
.unit-dialog[open] {
  --size-x-button: 2rem;
}

.unit-dialog.x-close {
  --size-x-button: 2rem;

  overflow: visible;
}

.unit-dialog.x-close .close {
  position: absolute;
  top: calc(var(--size-x-button) * -0.4);
  right: calc(var(--size-x-button) * -0.4);

  border: none;
  border-radius: 50%;

  width: var(--size-x-button);
  aspect-ratio: 1 / 1;

  display: none;

  background: var(--color-background-highlight);
  color: var(--color-text-highlight);

  appearance: none;
}

.unit-dialog.x-close .close {
  display: inline-block;
}

.unit-dialog.x-close .close:active {
  filter: brightness(0.8);
}

.unit-dialog:not(.x-close) .close {
  display: none;
}
</style>
