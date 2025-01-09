<script>
import {
  defineComponent,
} from 'vue'

import FuroTabLayout from '@openreachtech/furo-nuxt/lib/components/FuroTabLayout.vue'

export default defineComponent({
  name: 'AppTabLayout',

  components: {
    FuroTabLayout,
  },

  inheritAttrs: false,

  setup (props) {
    return {
      props,
    }
  },
})
</script>

<template>
  <FuroTabLayout class="design"
    v-bind="$attrs"
  >
    <template #contents>
      <slot name="contents" />
    </template>
  </FuroTabLayout>
</template>

<!-- can not use scoped here -->
<style>
/*
 * Can customize the pagination component.
 */

.unit-tablayout.design > .tabs > .tab:hover {
  background-color: var(--color-primary);
  color: var(--color-secondary);

  cursor: pointer;
}

.unit-tablayout.design > .tabs > .tab.active {
  background-color: var(--color-primary);
  color: var(--color-secondary);

  pointer-events: none;
}
</style>
