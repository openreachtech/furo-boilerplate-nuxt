<script>
import {
  defineComponent,
  ref,
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

    const args = {
      props,
      componentContext,
      dialogElementRef,
    }
    const context = FuroDialogContext.create(args)
      .setupComponent()

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
