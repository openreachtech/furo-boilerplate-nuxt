<script setup>
import {
  useCurriculumsClient,
} from '~/composables/client/queries/useCurriculumsClient'

const {
  capsuleRef,
  invokeRequestOnEvent,
  invokeRequestOnMounted,
} = useCurriculumsClient()

invokeRequestOnMounted()
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
</template>

<style>
/* CSS styles here */
</style>
