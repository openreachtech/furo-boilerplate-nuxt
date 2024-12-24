<script>
import {
  defineComponent,
} from 'vue'

import {
  definePageMeta,
} from '#imports'

import FuroPagination from '~/components/lib/FuroPagination.vue'
import AppPagination from '~/components/units/AppPagination.vue'

export default defineComponent({
  name: 'Furo Pagination',

  components: {
    FuroPagination,
    AppPagination,
  },

  setup () {
    definePageMeta({
      $furo: {
        pageTitle: 'Furo Pagination Samples',
        skipFilter: true,
      },
    })

    const pagination = {
      limit: 5,
      totalRecords: 53,
    }

    return {
      pagination,
    }
  },
})
</script>

<template>
  <div>
    <h1 class="design-header primary">
      Furo Pagination Samples
    </h1>

    <h2 class="design-header secondary">
      &lt;FuroPagination&gt; with default Previous and Next
    </h2>

    <section class="unit-section sample-placeholder double">
      <h3 class="design-header secondary">
        with default previous and next (design: &lt;FuroPagination&gt;)
      </h3>

      <FuroPagination :pagination="{
        limit: 5,
        totalRecords: 53,
      }"
      />
    </section>

    <section class="unit-section sample-placeholder double">
      <h3 class="design-header secondary">
        with pageKey &quot;p&quot; (design: &lt;FuroPagination&gt;)
      </h3>

      <FuroPagination page-key="p"
        :pagination="{
          limit: 5,
          totalRecords: 53,
        }"
      />
    </section>

    <section class="unit-section sample-placeholder double">
      <h3 class="design-header secondary">
        with SVG image for previous and next (design: alpha)
      </h3>

      <FuroPagination class="alpha-design"
        :pagination="{
          limit: 5,
          totalRecords: 53,
        }"
      >
        <template #previous>
          <svg xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M17 4.5L8 12L17 19.5V4.5Z"
              fill="currentColor"
            />
          </svg>
        </template>
        <template #next>
          <svg xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M7 4.5L16 12L7 19.5V4.5Z"
              fill="currentColor"
            />
          </svg>
        </template>
      </FuroPagination>
    </section>

    <br>
    <br>

    <h2 class="design-header secondary">
      &lt;FuroPagination&gt; with a few Total Records
    </h2>

    <section class="unit-section sample-placeholder double">
      <h3 class="design-header secondary">
        with Last Page 5
      </h3>

      <FuroPagination page-key="p"
        :pagination="{
          limit: 5,
          totalRecords: 24,
        }"
      />
    </section>

    <section class="unit-section sample-placeholder double">
      <h3 class="design-header secondary">
        with Last Page 3
      </h3>

      <FuroPagination page-key="p"
        :pagination="{
          limit: 5,
          totalRecords: 14,
        }"
      />
    </section>

    <section class="unit-section sample-placeholder double">
      <h3 class="design-header secondary">
        with Last Page 1
      </h3>

      <FuroPagination page-key="p"
        :pagination="{
          limit: 5,
          totalRecords: 3,
        }"
      />
    </section>

    <br>
    <br>

    <h2 class="design-header secondary">
      &lt;AppPagination&gt; with default Previous and Next
    </h2>

    <section class="unit-section sample-placeholder double">
      <h2 class="design-header secondary">
        Default Previous and Next (design: &lt;AppPagination&gt;)
      </h2>

      <AppPagination :pagination="{
        limit: 5,
        totalRecords: 53,
      }"
      />
    </section>

    <section class="unit-section sample-placeholder double">
      <h3 class="design-header secondary">
        with pageKey &quot;pg&quot; (design: &lt;AppPagination&gt;)
      </h3>

      <AppPagination page-key="pg"
        :pagination="{
          limit: 5,
          totalRecords: 53,
        }"
      />
    </section>

    <section class="unit-section sample-placeholder double">
      <h2 class="design-header secondary">
        with Emoji for previous and next (design: beta)
      </h2>

      <AppPagination class="beta-design"
        :pagination="{
          limit: 5,
          totalRecords: 53,
        }"
      >
        <template #previous>
          👈️
        </template>
        <template #next>
          👉️
        </template>
      </AppPagination>
    </section>
  </div>
</template>

<!-- can not use scoped here -->
<style>
.design-header.primary {
  margin-block-end: 1rem;

  font-size: 2rem;
}

.design-header.secondary {
  margin-block-end: 1rem;

  font-size: 1.618rem;
}

.design-header.tertiary {
  margin-block-end: 1rem;
}

.unit-section + .unit-section {
  margin-block-start: 2rem;
}

/*
 * Can customize the pagination component.
 */

/** alpha design */
.unit-pagination.alpha-design > .page {
  border: none;
  border-radius: 50%;
}

/** beta design */
.unit-pagination.beta-design > .page {
  border-color: var(--color-secondary);
  border-style: outset;
  border-width: 0.5rem;

  background: var(--color-secondary);
}

.unit-pagination.beta-design > .page:hover {
  border-color: var(--color-primary);

  background: var(--color-primary);
  color: var(--color-secondary);
}

.unit-pagination.beta-design > .page.current {
  border-color: var(--color-primary);

  background: var(--color-primary);
  color: var(--color-secondary);
}
</style>
