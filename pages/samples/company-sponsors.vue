<script>
import {
  reactive,
} from 'vue'

import {
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'

import defineAppComponent from '~/app/vue/defineAppComponent'

import CompanySponsorsQueryGraphqlLauncher from '~/app/graphql/client/queries/companySponsors/CompanySponsorsQueryGraphqlLauncher'

const {
  capsuleRef,
  // invokeRequestOnEvent,
  invokeRequestOnMounted,
} = useGraphqlClient(CompanySponsorsQueryGraphqlLauncher)

const statusReactive = reactive({
  isLoading: true,
})

export default defineAppComponent({
  name: 'IndexPage',

  setup () {
    invokeRequestOnMounted({
      hooks: {
        async beforeRequest (payload) {
          statusReactive.isLoading = true

          return false
        },
        async afterRequest (capsule) {
          statusReactive.isLoading = false
        },
      },
    })

    return {
      capsuleRef,
      statusReactive,
      invokeRequestOnMounted,
    }
  },
})
</script>

<template>
  <h1>Hello I&#39;m pages/companySponsors.vue!</h1>

  <h2>companySponsors</h2>

  <div v-for="it in capsuleRef.companySponsors"
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

  <div v-if="statusReactive.isLoading"
    class="unit-loading"
  >
    Loading ...
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

/******************************************************************************/

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
