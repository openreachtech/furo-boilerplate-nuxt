<script>
import {
  defineComponent,
} from 'vue'

import FuroPaginationContext from '~/app/vue/contexts/FuroPaginationContext.js'

export default defineComponent({
  name: 'FuroPagination',
  inheritAttrs: false,

  props: {
    pagination: {
      type: Object,
      default: () => ({
        limit: 20,
        totalRecords: 0,
      }),
      validator: value => {
        if (typeof value !== 'object') {
          return false
        }

        if (value === null) {
          return false
        }

        if (Array.isArray(value)) {
          return false
        }

        return true
      },
    },
    pageKey: {
      type: String,
      default: 'page',
    },
    maxPageRange: {
      type: Number,
      default: 5,
    },
  },

  setup (
    props,
    componentContext
  ) {
    const context = FuroPaginationContext.create({
      props,
      componentContext,
    })

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-pagination"
    :class="context.generateControlClasses()"
    v-bind="$attrs"
  >
    <a class="previous"
      :href="context.createPreviousPage().generateHref()"
    >
      <slot name="previous">&lt;</slot>
    </a>

    <a class="page first"
      :href="context.createFirstPage().generateHref()"
    >{{
      context.createFirstPage().generateText()
    }}</a>

    <span class="first dash">⋯</span>

    <a v-for="page in context.createRangePages()"
      :key="page.page"
      class="page"
      :class="page.generateControlClasses()"
      :href="page.generateHref()"
    >{{
      page.generateText()
    }}</a>

    <span class="last dash">⋯</span>

    <a class="page last"
      :href="context.createLastPage().generateHref()"
    >{{
      context.createLastPage().generateText()
    }}</a>

    <a class="next"
      :href="context.createNextPage().generateHref()"
    >
      <slot name="next">&gt;</slot>
    </a>
  </div>
</template>

<style>
.unit-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

.unit-pagination > .page {
  height: 100%;

  padding-block: 0.25rem;
  padding-inline: 0.5rem;
}

.unit-pagination > .page:hover {
  background-color: var(--color-background-hover);
  color: var(--color-text-hover);
}

.unit-pagination > .page.current {
  background-color: var(--color-background-highlight);
  color: var(--color-text-highlight);
}

.unit-pagination > .page.current:hover {
  background-color: var(--color-background-hover);
  color: var(--color-text-hover);
}

.unit-pagination > :where(.previous, .next) {
  height: 100%;

  display: inline-grid;
  place-items: center;

  padding-inline: 0.25rem;

  font-size: 1.2rem;
}

.unit-pagination > :where(.previous, .next):hover {
  background-color: var(--color-background-hover);
  color: var(--color-text-hover);
}

.unit-pagination.disabled-previous > .previous,
.unit-pagination.disabled-next > .next {
  pointer-events: none;

  color: var(--color-disabled);
}

.unit-pagination.hidden-first > .first,
.unit-pagination.hidden-last > .last {
  display: none;
}

.unit-pagination.hidden-first-dash > .first.dash,
.unit-pagination.hidden-last-dash > .last.dash {
  display: none;
}
</style>
