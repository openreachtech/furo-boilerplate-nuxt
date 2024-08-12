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

  <div
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
