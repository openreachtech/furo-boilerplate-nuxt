<script setup>
import {
  reactive,
} from 'vue'

import {
  useCurriculumsClient,
} from '~/composables/client/queries/useCurriculumsClient'

const statusReactive = reactive({
  isLoading: true,
})

const {
  capsuleRef,
  invokeRequestOnEvent,
  invokeRequestOnMounted,
} = useCurriculumsClient()

function generateHooks () {
  return {
    /** @type {*} */
    async beforeRequest (payload) {
      statusReactive.isLoading = true

      return false
    },
    /** @type {*} */
    async afterRequest (capsule) {
      statusReactive.isLoading = false
    },
  }
}

invokeRequestOnMounted({
  hooks: generateHooks(),
})
</script>

<template>
  <h1>Hello I&#39;m pages/curriculums.vue!</h1>

  <h2>Curriculums</h2>

  <button
    @click="invokeRequestOnEvent({
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
      hooks: generateHooks(),
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

  <div
    v-if="statusReactive.isLoading"
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
