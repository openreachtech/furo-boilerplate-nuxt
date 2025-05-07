<script>
import {
  defineComponent,
  reactive,
} from 'vue'

import {
  definePageMeta,
} from '#imports'

import FuroLoadingLayout from '@openreachtech/furo-nuxt/lib/components/FuroLoadingLayout.vue'

import AppLoadingLayout from '~/components/units/AppLoadingLayout.vue'

import FuroLoadingLayoutPageContext from './FuroLoadingLayoutPageContext.js'

export default defineComponent({
  components: {
    AppLoadingLayout,
    FuroLoadingLayout,
  },

  setup (
    props,
    componentContext
  ) {
    definePageMeta({
      $furo: {
        pageTitle: 'Furo Loading Layout Samples',
        // skipFilter: true,
      },
    })

    const statusReactive = reactive({
      isLoadingFuro: false,
      isLoadingApp: false,
    })

    const args = {
      props,
      componentContext,
      statusReactive,
    }
    const context = FuroLoadingLayoutPageContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-page">
    <h1 class="heading">
      Furo Loading Layout Sample
    </h1>

    <section class="unit-section">
      <h2 class="heading">
        &lt;FuroLoadingLayout&gt;
      </h2>
      <FuroLoadingLayout :is-loading="context.statusReactive.isLoadingFuro">
        <template #contents>
          <p>This is the content of this section.</p>

          <p>
            Nunc vestibulum mi in augue feugiat blandit. Quisque quis urna scelerisque,
            pulvinar lectus a, convallis purus. Etiam diam sem, porttitor sit amet sollicitudin ac,
            lacinia nec arcu. Vivamus auctor finibus malesuada. Proin lobortis justo ut augue bibendum,
            id mollis est vulputate. Morbi ac blandit ante. Nam vel dictum purus, eu aliquam sem.
          </p>
        </template>
      </FuroLoadingLayout>

      <button
        :disabled="context.statusReactive.isLoadingFuro"
        @click="context.emulateLoading({
          statusLoadingKey: 'isLoadingFuro',
          durationInMs: 2000,
        })"
      >
        Emulate loading state (2s)
      </button>
    </section>

    <section class="unit-section">
      <h2 class="heading">
        &lt;AppLoadingLayout&gt;
      </h2>
      <AppLoadingLayout :is-loading="context.statusReactive.isLoadingApp">
        <template #contents>
          <p>This is the content of this section.</p>

          <p>
            Vivamus vel porta elit. Nam justo mi, bibendum vitae dictum vel, convallis nec urna. Ut
            interdum erat lectus, eu semper eros eleifend at. Mauris mollis quam et ex tempor,
            ac ullamcorper lectus cursus. Donec accumsan non sapien nec malesuada. Proin egestas
            vehicula cursus. Pellentesque a euismod risus.
          </p>
        </template>
      </AppLoadingLayout>

      <button
        :disabled="context.statusReactive.isLoadingApp"
        @click="context.emulateLoading({
          statusLoadingKey: 'isLoadingApp',
          durationInMs: 2000,
        })"
      >
        Emulate loading state (2s)
      </button>
    </section>
  </div>
</template>

<style scoped>
.unit-section > * + * {
  margin-block-start: 1.5rem;
}
</style>
