<!-- pages/curriculums.vue -->
<template>
  <h1>Hello I&#39;m pages/curriculums.vue!</h1>

  <h2>Curriculums</h2>
  <pre>
    {{
      JSON.stringify(
        curriculumsRef.extractContent(),
        null,
        2
      )
    }}
  </pre>
</template>

<script setup>
import {
  ref,
} from 'vue'

import {
  useCurriculums,
} from '~/composables/useCurriculums'

/** @type {import('vue').Ref<import('~/app/graphql/client/curriculums/CurriculumsQueryGraphqlCapsule').default | null>} */
const curriculumsRef = ref(null)
// NOTE: Null Object Pattern を使えば、此処で NullGraphqlCapsule のインスタンスを入れて於ける！

const {
  fetchCurriculums,
} = useCurriculums()

const response = await fetchCurriculums()

// TODO: 此処で ref に保持する処理を追加する
curriculumsRef.value = response
</script>

<style>
/* CSS styles here */
</style>
