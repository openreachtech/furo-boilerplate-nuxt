<script>
import {
  defineComponent,
} from 'vue'

import FuroPagination from '~/components/lib/FuroPagination.vue'

export default defineComponent({
  name: 'AppPagination',

  components: {
    FuroPagination,
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
  <FuroPagination class="design"
    v-bind="$attrs"
  >
    <template #previous>
      <slot name="previous">
        ←
      </slot>
    </template>
    <template #next>
      <slot name="next">
        →
      </slot>
    </template>
  </FuroPagination>
</template>

<!-- can not use scoped here -->
<style>
/*
 * Can customize the pagination component.
 */
.unit-pagination.design {
  gap: 0.5rem;
}

.unit-pagination.design > .page {
  border: 3px double var(--color-primary);
  border-radius: 0.25rem;
}
</style>
