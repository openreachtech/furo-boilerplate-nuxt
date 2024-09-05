<script>
import {
  reactive,
} from 'vue'

import {
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'

import defineAppComponent from '~/app/vue/defineAppComponent'

import CurriculumsQueryGraphqlLauncher from '~/app/graphql/client/queries/curriculums/CurriculumsQueryGraphqlLauncher'

const statusReactive = reactive({
  isLoading: true,
})

const {
  capsuleRef,
  invokeRequestOnEvent,
  invokeRequestOnMounted,
} = useGraphqlClient(CurriculumsQueryGraphqlLauncher)

/**
 * @type {furo.GraphqlLauncherHooks}
 */
const launcherHooks = {
  async beforeRequest (payload) {
    statusReactive.isLoading = true

    return false
  },
  async afterRequest (capsule) {
    statusReactive.isLoading = false
  },
}

export default defineAppComponent({
  name: 'IndexPage',

  setup () {
    invokeRequestOnMounted({
      variables: { // TODO: Remove this variables with default values in Payload
        input: {
          pagination: {
            limit: 5,
            offset: 0,
            sort: {
              targetColumn: 'title',
              orderBy: 'ASC',
            },
          },
        },
      },
      hooks: launcherHooks,
    })

    return {
      capsuleRef,
      statusReactive,
      invokeRequestOnEvent,
      launcherHooks,
    }
  },
})
</script>

<template>
  <h1>Hello I&#39;m pages/curriculums.vue!</h1>

  <h2>Curriculums</h2>

  <button @click="invokeRequestOnEvent({
    variables: {
      input: {
        pagination: {
          limit: 5,
          offset: 2,
          sort: {
            targetColumn: 'title',
            orderBy: 'ASC',
          },
        },
      },
    },
    hooks: launcherHooks,
  })"
  >
    Fetch curriculums with offset 2
  </button>
  <pre>
    {{
      JSON.stringify(
        capsuleRef.curriculums,
        null,
        2
      )
    }}
  </pre>

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
