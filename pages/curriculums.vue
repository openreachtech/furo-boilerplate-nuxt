<!-- pages/index.vue -->
<template>
  <h1>Hello I&#39;m pages/curriculums.vue!</h1>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
</template>

<script>
import CurriculumsGraphqlLauncher from '@/app/graphql/client/Curriculums/CurriculumsGraphqlLauncher'

export default {
  name: 'IndexPage',
}

const input = {
  pagination: {
    limit: 5,
    offset: 1,
    sort: {
      targetColumn: 'title',
      orderBy: 'ASC',
    },
  },
}

const launcher = CurriculumsGraphqlLauncher.create({
  config: {
    ENDPOINT_URL: 'https://clc-dev-front.openreach.tech/graphql-customer',
  },
})

launcher.launchQuery({
  input,
})
  .then(capsule =>
    (0, console).log(
      capsule
    )
  )
</script>

<style>
/* CSS styles here */
</style>
