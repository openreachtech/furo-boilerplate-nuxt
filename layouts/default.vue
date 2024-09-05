<!-- layouts/default.vue -->
<script>
export default {
  name: 'DefaultLayout',
}
</script>

<template>
  <div class="unit-body">
    <header class="header">
      I am Header
    </header>

    <main class="main">
      <slot />
    </main>

    <footer class="footer">
      I am Footer
    </footer>
  </div>
</template>

<style>
/* Custom Properties */

/* Layout */

.unit-body {
  min-height: 100vh;

  display: flex;
  flex-direction: column;
}

</style>

<style scoped>
.header {
  position: sticky;
  top: 0;

  height: var(--size-header-height);

  display: grid;
  place-items: center;

  background-color: rgba(0, 255, 0, .5);
  color: #fff;
}

.main {
  flex: 1;

  padding-block: .5rem;
  padding-inline: 1rem;
  background: #eee;
}

.footer {
  height: var(--size-footer-height);

  display: grid;
  place-items: center;

  background-color: rgba(0, 0, 255, .5);
  color: #fff;
}
</style>
