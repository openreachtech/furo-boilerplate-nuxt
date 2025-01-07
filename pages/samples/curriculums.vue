<script>
import {
  defineComponent,
  reactive,
} from 'vue'

import {
  definePageMeta,
} from '#imports'

import {
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'

import CurriculumsQueryGraphqlLauncher from '~/app/graphql/client/queries/curriculums/CurriculumsQueryGraphqlLauncher'
import CurriculumsPageContext from '~/app/vue/contexts/CurriculumsPageContext'

export default defineComponent({
  name: 'IndexPage',

  setup (
    props,
    componentContext
  ) {
    /*
     * Setup page meta
     */
    definePageMeta({
      $furo: {
        pageTitle: 'Curriculums',
        // skipFilter: true,
      },
    })

    /*
     * Setup page context
     */
    const statusReactive = reactive({
      isLoading: true,
    })
    const graphqlClient = useGraphqlClient(CurriculumsQueryGraphqlLauncher)

    const args = {
      props,
      componentContext,
      graphqlClient,
      statusReactive,
    }

    const context = CurriculumsPageContext.create(args)
      .setupComponent()

    /**
     * Return reactive data
     */
    return {
      capsuleRef: graphqlClient.capsuleRef,
      statusReactive,
      context,
    }
  },
})
</script>

<template>
  <h1>Hello I&#39;m pages/curriculums.vue!</h1>

  <h2>Curriculums</h2>

  <br>

  <button class="usual"
    @click="context.requestCurriculums()"
  >
    Fetch curriculums with offset 0
  </button>

  <br>
  <br>

  <button class="usual"
    @click="context.requestCurriculums({
      offset: 2,
    })"
  >
    Fetch curriculums with offset 2
  </button>

  <br>
  <br>

  <button class="usual"
    @click="context.requestCurriculums({
      offset: 4,
    })"
  >
    Fetch curriculums with offset 4
  </button>

  <pre>{{
    JSON.stringify(
      capsuleRef.curriculums,
      null,
      2
    )
  }}</pre>

  <div v-if="statusReactive.isLoading"
    class="unit-loading"
  >
    Loading ...
  </div>
</template>

<style>
.unit-loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  border: 1rem red solid;

  display: grid;
  place-items: center;

  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  font-size: 3rem;
}
</style>
