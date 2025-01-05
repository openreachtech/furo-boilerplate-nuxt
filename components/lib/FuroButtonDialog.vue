<script>
import {
  defineComponent,
  ref,
} from 'vue'

import FuroDialog from '~/components/lib/FuroDialog.vue'

import FuroButtonDialogContext from '~/app/vue/contexts/FuroButtonDialogContext.js'

const EVENT_NAME = {
  CLICK_BACKDROP: 'clickBackdrop',

  CLICK_POSITIVE_BUTTON: 'clickPositiveButton',
  CLICK_NEGATIVE_BUTTON: 'clickNegativeButton',
  CLICK_NEUTRAL_BUTTON: 'clickNeutralButton',
}

export default defineComponent({
  name: 'FuroButtonDialog',

  components: {
    FuroDialog,
  },

  inheritAttrs: false,

  emits: [
    EVENT_NAME.CLICK_BACKDROP,

    EVENT_NAME.CLICK_POSITIVE_BUTTON,
    EVENT_NAME.CLICK_NEGATIVE_BUTTON,
    EVENT_NAME.CLICK_NEUTRAL_BUTTON,
  ],

  setup (
    props,
    componentContext
  ) {
    /** @type {import('vue').Ref<FuroDialog | null>} */
    const dialogComponentRef = ref(null)

    const args = {
      props,
      componentContext,
      dialogComponentRef,
    }

    const context = FuroButtonDialogContext.create(args)
      .setupComponent()

    return {
      dialogComponentRef,
      context,
    }
  },
})
</script>

<template>
  <FuroDialog ref="dialogComponentRef"
    v-bind="$attrs"
  >
    <template #contents>
      <div class="contents">
        <slot name="contents" />
      </div>

      <div class="unit-buttons">
        <button class="button neutral"
          @click="context.clickNeutralButton()"
        >
          <slot name="neutral">
            &nbsp;
          </slot>
        </button>
        <button class="button negative"
          @click="context.clickNegativeButton()"
        >
          <slot name="negative">
            &nbsp;
          </slot>
        </button>
        <button class="button positive"
          @click="context.clickPositiveButton()"
        >
          <slot name="positive">
            &nbsp;
          </slot>
        </button>
      </div>
    </template>
  </FuroDialog>
</template>

<style scoped>
.unit-dialog[open] {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  padding-block: 1rem;
  padding-inline: 1rem;
}

.unit-dialog[open] > .contents {
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.unit-dialog[open] > .unit-buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.unit-dialog[open] > .unit-buttons .button {
  border-radius: 0.3rem;

  display: inline-block;

  appearance: none;
}

.unit-dialog[open].alert > .unit-buttons .button {
  display: inline-block;

  appearance: none;
}

.unit-dialog[open].alert > .unit-buttons .button:where(.neutral, .negative),
.unit-dialog[open].confirm > .unit-buttons .button:where(.neutral) {
  display: none;
}

.unit-dialog[open].alert > .unit-buttons > .button {
  min-width: 32%;
}

.unit-dialog[open].confirm > .unit-buttons > .button {
  min-width: 32%;
}

.unit-dialog[open].ternary > .unit-buttons .button {
  width: 25%;
}

.unit-dialog[open].ternary > .unit-buttons .button.neutral {
  margin-inline-end: auto;
}
</style>
