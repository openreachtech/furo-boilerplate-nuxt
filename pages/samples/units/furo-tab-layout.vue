<script>
import {
  defineComponent,
  ref,
} from 'vue'

import {
  definePageMeta,
} from '#imports'

import FuroTabLayout from '@openreachtech/furo-nuxt/lib/components/FuroTabLayout.vue'

import AppTabLayout from '~/components/units/AppTabLayout.vue'

const tabs = [
  {
    tabKey: 'alpha',
    label: 'Alpha',
  },
  {
    tabKey: 'beta',
    label: 'Beta',
  },
  {
    tabKey: 'gamma',
    label: 'Gamma',
  },
]

export default defineComponent({
  name: 'Furo TabLayout',

  components: {
    FuroTabLayout,
    AppTabLayout,
  },

  setup () {
    definePageMeta({
      $furo: {
        pageTitle: 'Furo TabLayout Samples',
        skipFilter: true,
      },
    })

    /**
     * @type {import('vue').Ref<{
     *   fromTab: import('~/app/vue/contexts/FuroTabItemContext').default | null
     *   toTab: import('~/app/vue/contexts/FuroTabItemContext').default | null
     * }>}
     */
    const changeTabResultRef = ref({
      fromTab: null,
      toTab: null,
    })

    return {
      tabs,

      changeTabResultRef,
      changeTab,
    }

    /**
     * Change tab.
     *
     * @param {{
     *   fromTab: import('~/app/vue/contexts/FuroTabItemContext').default
     *   toTab: import('~/app/vue/contexts/FuroTabItemContext').default
     * }} params - Parameters.
     * @returns {void}
     */
    function changeTab ({
      fromTab,
      toTab,
    }) {
      changeTabResultRef.value = {
        fromTab,
        toTab,
      }
    }
  },
})
</script>

<template>
  <div>
    <h1 class="design-header primary">
      Furo TabLayout Samples
    </h1>

    <br>
    <br>

    <h2 class="design-header secondary">
      &lt;FuroTabLayout&gt; samples
    </h2>

    <!-- ///////////////////////////////////////////////////////////////// -->
    <!-- <FuroTabLayout> with default design -->
    <!-- ///////////////////////////////////////////////////////////////// -->
    <section class="unit-section sample-placeholder double">
      <h3 class="design-header tertiary">
        &lt;FuroTabLayout&gt; with default design
      </h3>

      <FuroTabLayout :tabs="tabs"
        :active-tab-key="tabs[0].tabKey"
      >
        <template #contents>
          <div class="alpha">
            Alpha Content
          </div>

          <div class="beta">
            Beta Content
          </div>

          <div class="gamma">
            Gamma Content
          </div>
        </template>
      </FuroTabLayout>
    </section>

    <!-- ///////////////////////////////////////////////////////////////// -->
    <!-- <FuroTabLayout> with change tab event -->
    <!-- ///////////////////////////////////////////////////////////////// -->
    <section class="unit-section sample-placeholder double">
      <h3 class="design-header tertiary">
        &lt;FuroTabLayout&gt; with change tab event
      </h3>

      <FuroTabLayout :tabs="tabs"
        :active-tab-key="tabs[0].tabKey"
        @change-tab="changeTab"
      >
        <template #contents>
          <div class="alpha">
            Alpha Content
          </div>

          <div class="beta">
            Beta Content
          </div>

          <div class="gamma">
            Gamma Content
          </div>
        </template>
      </FuroTabLayout>

      <div class="button-reaction-placeholder">
        <div>[from: [{{ changeTabResultRef.fromTab?.index }}] {{ changeTabResultRef.fromTab?.tabKey }}]</div>
        <div>↓</div>
        <div>[to: [{{ changeTabResultRef.toTab?.index }}] {{ changeTabResultRef.toTab?.tabKey }}]</div>
      </div>
    </section>

    <!-- ///////////////////////////////////////////////////////////////// -->
    <!-- <FuroTabLayout> with customized alpha-design -->
    <!-- ///////////////////////////////////////////////////////////////// -->
    <section class="unit-section sample-placeholder double">
      <h3 class="design-header tertiary">
        &lt;FuroTabLayout&gt; with customized alpha-design
      </h3>

      <FuroTabLayout :tabs="tabs"
        :active-tab-key="tabs[0].tabKey"
        class="alpha-design"
      >
        <template #contents>
          <div class="alpha">
            Alpha Content
          </div>

          <div class="beta">
            Beta Content
          </div>

          <div class="gamma">
            Gamma Content
          </div>
        </template>
      </FuroTabLayout>
    </section>

    <br>
    <br>

    <h1 class="design-header primary">
      &lt;AppTabLayout&gt; Samples
    </h1>

    <!-- ///////////////////////////////////////////////////////////////// -->
    <!-- <AppTabLayout> with default design -->
    <!-- ///////////////////////////////////////////////////////////////// -->
    <section class="unit-section sample-placeholder double">
      <h3 class="design-header tertiary">
        &lt;AppTabLayout&gt; with default design
      </h3>

      <AppTabLayout :tabs="tabs"
        :active-tab-key="tabs[0].tabKey"
      >
        <template #contents>
          <div class="alpha">
            Alpha Content
          </div>

          <div class="beta">
            Beta Content
          </div>

          <div class="gamma">
            Gamma Content
          </div>
        </template>
      </AppTabLayout>
    </section>

    <!-- ///////////////////////////////////////////////////////////////// -->
    <!-- <AppTabLayout> with customized beta-design -->
    <!-- ///////////////////////////////////////////////////////////////// -->
    <section class="unit-section sample-placeholder double">
      <h3 class="design-header tertiary">
        &lt;AppTabLayout&gt; with customized beta-design
      </h3>

      <AppTabLayout :tabs="tabs"
        :active-tab-key="tabs[0].tabKey"
        class="beta-design"
      >
        <template #contents>
          <div class="alpha">
            Alpha Content
          </div>

          <div class="beta">
            Beta Content
          </div>

          <div class="gamma">
            Gamma Content
          </div>
        </template>
      </AppTabLayout>
    </section>
  </div>
</template>

<!-- can not use scoped here -->
<style>
/*
 * Common design
 */

.unit-tablayout > .contents {
  padding-block-start: 0.25rem;
}

.unit-tablayout > .contents :where(.alpha, .beta, .gamma) {
  border: var(--size-thinnest) var(--color-text) solid;

  padding-block: 1rem;
  padding-inline: 2rem;
}

/* alpha-design */

.unit-tablayout.alpha-design > .tabs > .tab {
  font-size: 1.5rem;

  border-bottom: 0.25rem solid transparent;
}

.unit-tablayout.alpha-design > .tabs > .tab.active {
  border-bottom: 0.25rem solid var(--color-primary);

  background-color: inherit;
  color: inherit;
}

/* beta-design */

.unit-tablayout.beta-design > .tabs {
  margin-block-start: 0;

  gap: 0.25rem;
}

.unit-tablayout.beta-design > .contents {
  padding-block-start: 0;
}

.unit-tablayout.beta-design > .tabs > .tab {
  border-top: var(--size-thinnest) var(--color-text) solid;
  border-left: var(--size-thinnest) var(--color-text) solid;
  border-right: var(--size-thinnest) var(--color-text) solid;
  border-radius: 0.5rem 0.5rem 0 0;

  font-size: 1.5rem;
}

/******************************************************************************/

.button-reaction-placeholder {
  border: var(--size-thinnest) var(--color-text) solid;
  border-radius: .5rem;

  margin-block: 1rem;

  padding-block: .5rem;
  padding-inline: 1rem;

  font-size: 1.2rem;
}
</style>
