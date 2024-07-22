<script setup>
import {
  onMounted,
  ref,
} from 'vue'

import CurriculumsQueryGraphqlCapsule from '~/app/graphql/client/queries/curriculums/CurriculumsQueryGraphqlCapsule'

import {
  useCurriculums,
} from '~/composables/client/queries/useCurriculumsClient'

/** @type {import('vue').Ref<CurriculumsQueryGraphqlCapsule>} */
const capsuleRef = ref(
  CurriculumsQueryGraphqlCapsule.createAsPending()
)

const {
  fetchCurriculums,
} = useCurriculums()

onMounted(async () => {
  const capsule = await fetchCurriculums()

  capsuleRef.value = capsule
})

</script>

<template>
  <h1>Hello I&#39;m pages/curriculums.vue!</h1>

  <h2>Curriculums</h2>
  <pre>
    {{
      JSON.stringify(
        capsuleRef.isPending()
          ? '(Loading...)'
          : capsuleRef.extractContent(),
        null,
        2
      )
    }}
  </pre>
</template>

<style>
/* CSS styles here */
</style>
