<script>
/*
 * <AppDialog> is defined to unify the design of dialogs used throughout the application.
 */

import {
  defineComponent,
  ref,
} from 'vue'

import {
  FuroButtonDialogContext,
} from '@openreachtech/furo-nuxt'

import FuroDialog from '@openreachtech/furo-nuxt/lib/components/FuroDialog.vue'

export default defineComponent({
  name: 'AppDialog',

  components: {
    FuroDialog,
  },

  inheritAttrs: false,

  setup (
    props,
    componentContext
  ) {
    /** @type {import('vue').Ref<FuroDialog | null>} */
    const dialogComponentRef = ref(null)

    const context = FuroButtonDialogContext.create({
      dialogComponentRef,
      emit: componentContext.emit,
    })

    componentContext.expose(
      context.generateExposeHash()
    )

    return {
      dialogComponentRef,
    }
  },
})
</script>

<template>
  <FuroDialog ref="dialogComponentRef"
    class="design"
    v-bind="$attrs"
  >
    <template #contents>
      <slot name="contents" />
    </template>
  </FuroDialog>
</template>

<style scoped>
.unit-dialog[open].design {
  border-radius: 1.5rem;

  min-height: 10rem;
  min-width: 20rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  background-color: #eee;
  box-shadow:
    8px 8px 16px #bebebe,
    -8px -8px 16px #ffffff;
}

.unit-dialog[open].design::backdrop {
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
