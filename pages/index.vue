<!-- pages/index.vue -->
<script>
import {
  defineComponent,
} from 'vue'

export default defineComponent({
  name: 'IndexPage',
})
</script>

<template>
  <h1>Hello I&#39;m pages/index.vue!</h1>
  <div><a href="samples/curriculums">Curriculums</a></div>
  <div><a href="samples/company-sponsors">Company Sponsors</a></div>
  <div><a href="samples/sign-up">Sign Up</a></div>
  <div><a href="samples/sign-in">Sign In</a></div>
  <div><a href="samples/upload-image">Upload Image</a></div>
  <div><a href="samples/pagination-articles">Pagination Articles</a></div>
  <br>
  <div><a href="samples/form-controls-inspector">Form Controls Inspector</a></div>
  <div><a href="samples/trigger-unlock">Trigger Unlock Sample</a></div>
  <br>
  <div><a href="samples/components/furo-pagination">Furo Pagination Sample</a></div>
  <div><a href="samples/components/furo-tab-layout">Furo TabLayout Sample</a></div>
  <div><a href="samples/components/furo-dialog">Furo Dialog Sample</a></div>
  <div><a href="samples/components/furo-loading-layout">Furo LoadingLayout Sample</a></div>
  <br>
  <div><a href="samples/context/using-computed">computed() via Context</a></div>
</template>

<style scoped>
/* CSS styles here */
</style>
