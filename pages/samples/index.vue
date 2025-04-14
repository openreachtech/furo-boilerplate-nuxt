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
    <NuxtLink to="curriculums">
      Curriculums
    </NuxtLink>
  </div>
  <div>
    <NuxtLink to="company-sponsors">
      Company Sponsors
    </NuxtLink>
  </div>
  <div>
    <NuxtLink to="sign-up">
      Sign Up
    </NuxtLink>
  </div>
  <div>
    <NuxtLink to="sign-in">
      Sign In
    </NuxtLink>
  </div>
  <div>
    <NuxtLink to="upload-image">
      Upload Image
    </NuxtLink>
  </div>
  <div>
    <NuxtLink to="pagination-articles">
      Pagination Articles
    </NuxtLink>
  </div>
  <br>
  <div>
    <NuxtLink to="form-controls-inspector">
      Form Controls Inspector
    </NuxtLink>
  </div>
  <div>
    <NuxtLink to="trigger-unlock">
      Trigger Unlock Sample
    </NuxtLink>
  </div>
  <br>
  <div>
    <NuxtLink to="components/furo-pagination">
      Furo Pagination Sample
    </NuxtLink>
  </div>
  <div>
    <NuxtLink to="components/furo-tab-layout">
      Furo TabLayout Sample
    </NuxtLink>
  </div>
  <div>
    <NuxtLink to="components/furo-dialog">
      Furo Dialog Sample
    </NuxtLink>
  </div>
  <div>
    <NuxtLink to="components/furo-loading-layout">
      Furo LoadingLayout Sample
    </NuxtLink>
  </div>
  <br>
  <div>
    <NuxtLink to="context/using-computed">
      computed() via Context
    </NuxtLink>
  </div>
  <br>
  <div>
    <NuxtLink to="chat-room?room=1">
      Chat Room [1]
    </NuxtLink>
  </div>
  <div>
    <NuxtLink to="chat-room?room=2">
      Chat Room [2]
    </NuxtLink>
  </div>
</template>

<style scoped>
/* CSS styles here */
</style>
