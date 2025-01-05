<script>
import {
  defineComponent,
  ref,
} from 'vue'

import FuroTabLayoutContext from '~/app/vue/contexts/FuroTabLayoutContext.js'

export default defineComponent({
  name: 'FuroTabLayout',
  inheritAttrs: false,

  props: {
    tabs: {
      /** @type {import('vue').PropType<Array<import('~/app/vue/contexts/FuroTabLayoutContext').FuroTabParams>>} */
      type: Array,
      default: () => [],
      validator: value => Array.isArray(value),
    },
    activeTabKey: {
      type: String,
      required: false,
      default: null,
    },
  },

  setup (
    props,
    componentContext
  ) {
    /** @type {import('vue').Ref<Array<HTMLElement>>} */
    const tabElementsRef = ref([])

    const args = {
      props,
      componentContext,
      tabElementsRef,
    }
    const context = FuroTabLayoutContext.create(args)
      .setupComponent()

    return {
      context,
      tabElementsRef,
    }
  },
})
</script>

<template>
  <div class="unit-tablayout"
    v-bind="$attrs"
  >
    <div class="tabs">
      <button v-for="(tab, index) in context.tabContexts"
        :key="index"
        ref="tabElementsRef"
        class="tab"
        :class="{
          active: context.isActiveTab({
            tabKey: tab.tabKey,
          }),
        }"
        @click="context.onClickTab({
          event: $event,
        })"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="contents">
      <slot name="contents" />
    </div>
  </div>
</template>

<style scoped>
/* tabs */

.unit-tablayout > .tabs {
  display: flex;
  flex-direction: row;
}

.unit-tablayout > .tabs > .tab {
  border: none;
  appearance: none;

  padding-block: 0.25rem;
  padding-inline: 0.5rem;
}

.unit-tablayout > .tabs > .tab:hover {
  background-color: var(--color-background-highlight);
  color: var(--color-text-highlight);

  cursor: pointer;
}

.unit-tablayout > .tabs > .tab.active {
  background-color: var(--color-background-highlight);
  color: var(--color-text-highlight);

  pointer-events: none;
}

/* tab gimmick */

.unit-tablayout > .contents > * {
  display: none;
}

.unit-tablayout:has(.tab:nth-of-type(1).active) > .contents > :nth-of-type(1),
.unit-tablayout:has(.tab:nth-of-type(2).active) > .contents > :nth-of-type(2),
.unit-tablayout:has(.tab:nth-of-type(3).active) > .contents > :nth-of-type(3),
.unit-tablayout:has(.tab:nth-of-type(4).active) > .contents > :nth-of-type(4),
.unit-tablayout:has(.tab:nth-of-type(5).active) > .contents > :nth-of-type(5),
.unit-tablayout:has(.tab:nth-of-type(6).active) > .contents > :nth-of-type(6),
.unit-tablayout:has(.tab:nth-of-type(7).active) > .contents > :nth-of-type(7),
.unit-tablayout:has(.tab:nth-of-type(8).active) > .contents > :nth-of-type(8),
.unit-tablayout:has(.tab:nth-of-type(9).active) > .contents > :nth-of-type(9),
.unit-tablayout:has(.tab:nth-of-type(10).active) > .contents > :nth-of-type(10),
.unit-tablayout:has(.tab:nth-of-type(11).active) > .contents > :nth-of-type(11),
.unit-tablayout:has(.tab:nth-of-type(12).active) > .contents > :nth-of-type(12) {
  display: inherit;
}
</style>
