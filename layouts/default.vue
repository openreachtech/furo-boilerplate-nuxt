<!-- layouts/default.vue -->
<script>
import {
  NuxtLink,
} from '#components'

import FuroOffCanvasMenuLayout from '@openreachtech/furo-nuxt/lib/components/FuroOffCanvasMenuLayout.vue'

export default {
  name: 'DefaultLayout',

  components: {
    FuroOffCanvasMenuLayout,
    NuxtLink,
  },
}
</script>

<template>
  <FuroOffCanvasMenuLayout>
    <template #header>
      <div class="header">
        <NuxtLink to="/">
          [Go to Home]
        </NuxtLink>
      </div>
    </template>

    <template #toggle-menu>
      <img class="toggle-navigation-image"
        src="/assets/img/samples/hanburger-menu.png"
        alt="Logo"
      >
    </template>

    <template #navigation>
      <div class="navigation">
        I am Navigation
      </div>
    </template>

    <template #contents>
      <slot />
    </template>
  </FuroOffCanvasMenuLayout>
</template>

<!-- never use <style scoped> here -->
<style>
.unit-body > .header .toggle-navigation-image {
  width: 2rem;
}

.unit-body > .navigation {
  padding-block: 1rem;
  padding-inline: 1.5rem;
}

.unit-body > .contents {
  background-color: var(--color-background);

  padding-block: 1rem;
  padding-inline: 1.5rem;
}
</style>
