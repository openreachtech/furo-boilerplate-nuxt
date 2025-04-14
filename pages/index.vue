<!-- pages/index.vue -->
<script>
import {
  defineComponent,
} from 'vue'

import {
  NuxtLink,
} from '#components'

export default defineComponent({
  name: 'IndexPage',

  components: {
    NuxtLink,
  },
})
</script>

<template>
  <h1>Hello I&#39;m pages/index.vue!</h1>
  <div>
    <NuxtLink to="samples/curriculums">
      Curriculums
    </NuxtLink>
  </div>
  <div>
    <NuxtLink to="samples/company-sponsors">
      Company Sponsors
    </NuxtLink>
  </div>
  <div>
    <NuxtLink to="samples/sign-up">
      Sign Up
    </NuxtLink>
  </div>
  <div>
    <NuxtLink to="samples/sign-in">
      Sign In
    </NuxtLink>
  </div>
  <div>
    <NuxtLink to="samples/upload-image">
      Upload Image
    </NuxtLink>
  </div>
  <div>
    <NuxtLink to="samples/pagination-articles">
      Pagination Articles
    </NuxtLink>
  </div>
  <br>
  <div>
    <NuxtLink to="samples/form-controls-inspector">
      Form Controls Inspector
    </NuxtLink>
  </div>
  <div>
    <NuxtLink to="samples/trigger-unlock">
      Trigger Unlock Sample
    </NuxtLink>
  </div>
  <br>
  <div>
    <NuxtLink to="samples/components/furo-pagination">
      Furo Pagination Sample
    </NuxtLink>
  </div>
  <div>
    <NuxtLink to="samples/components/furo-tab-layout">
      Furo TabLayout Sample
    </NuxtLink>
  </div>
  <div>
    <NuxtLink to="samples/components/furo-dialog">
      Furo Dialog Sample
    </NuxtLink>
  </div>
  <div>
    <NuxtLink to="samples/components/furo-loading-layout">
      Furo LoadingLayout Sample
    </NuxtLink>
  </div>
  <br>
  <div>
    <NuxtLink to="samples/context/using-computed">
      computed() via Context
    </NuxtLink>
  </div>
  <br>
  <div>
    <NuxtLink to="samples/chat-room?room=1">
      Chat Room [1]
    </NuxtLink>
  </div>
  <div>
    <NuxtLink to="samples/chat-room?room=2">
      Chat Room [2]
    </NuxtLink>
  </div>
</template>

<style scoped>
/* CSS styles here */
</style>
