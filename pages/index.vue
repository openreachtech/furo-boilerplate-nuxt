<!-- pages/index.vue -->
<script>
import {
  defineComponent,
} from 'vue'

import {
  definePageMeta,
} from '#imports'

export default defineComponent({
  name: 'IndexPage',

  setup () {
    definePageMeta({
      $furo: {
        pageTitle: 'Home',
      },
    })

    return {}
  },
})
</script>

<template>
  <h1>Home</h1>
</template>

<style scoped>
/* CSS styles here */
</style>
