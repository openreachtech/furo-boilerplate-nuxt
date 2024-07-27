<script setup>
import {
  useCompanySponsorsClient,
} from '~/composables/client/queries/useCompanySponsorsClient'

const {
  capsuleRef,
  invokeRequestOnMounted,
} = useCompanySponsorsClient()

invokeRequestOnMounted()
</script>

<template>
  <h1>Hello I&#39;m pages/companySponsors.vue!</h1>

  <h2>companySponsors</h2>

  <div
    v-for="it in capsuleRef.companySponsors"
    :key="it.id"
    class="company-sponsor-layout"
  >
    <div class="company-sponsor">
      <h3 class="name">
        {{ it.companyName }}
      </h3>
      <div class="description">
        {{ it.companyDescription }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.company-sponsor-layout {
  margin-block: 1rem;

  padding-inline: 2rem;
}

.company-sponsor {
  margin-bottom: 1rem;
  border: 1px solid #ccc;

  padding-block: 0.5rem;
  padding-inline: 1rem;
}

.company-sponsor .name {
  font-size: 1.5rem;
}

.company-sponsor .description {
  margin-block-start: 0.5rem;
  color: green;
  font-size: 1rem;
}
</style>
