<script>
import {
  NuxtLink,
} from '#components'

import FuroOffCanvasMenuLayout from '@openreachtech/furo-nuxt/lib/components/FuroOffCanvasMenuLayout.vue'

import AppOffCanvasMenu from '~/components/AppOffCanvasMenu/AppOffCanvasMenu.vue'

export default {
  name: 'DefaultLayout',

  components: {
    NuxtLink,

    FuroOffCanvasMenuLayout,
    AppOffCanvasMenu,
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
      <img
        class="toggle-navigation-image"
        src="/assets/img/hamburger-menu.png"
        alt="Logo"
      >
    </template>

    <template #navigation>
      <div class="navigation">
        <AppOffCanvasMenu />
      </div>
    </template>

    <template #contents>
      <slot />
    </template>
  </FuroOffCanvasMenuLayout>
</template>

<!-- NOTE: Never use <style scoped> here -->
<style>
@layer app {
  .furo-layout.off-canvas-menu > .unit-nav {
    padding-block: 0;
    padding-inline: 0;
  }

  .furo-layout.off-canvas-menu > .unit-main {
    background-color: var(--color-background);

    padding-block: 1rem;
    padding-inline: 1.5rem;
  }
}
</style>
