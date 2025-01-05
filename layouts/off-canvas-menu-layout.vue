<!-- layouts/default.vue -->
<script>
import FuroOffCanvasMenuLayout from '~/components/lib/FuroOffCanvasMenuLayout.vue'

export default {
  name: 'OffCanvasMenuLayout',

  components: {
    FuroOffCanvasMenuLayout,
  },
}
</script>

<template>
  <FuroOffCanvasMenuLayout>
    <template #header>
      <div class="header">
        I am Header
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
      <main class="main">
        <slot />
      </main>
    </template>
  </FuroOffCanvasMenuLayout>
</template>

<style scoped>
.unit-body .header .toggle-navigation-image {
  width: 2rem;
}

.unit-body .main {
  background-color: var(--color-background);

  padding-block: 0.5rem;
  padding-inline: 1rem;
}
</style>
