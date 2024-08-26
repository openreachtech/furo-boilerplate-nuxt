<!-- layouts/default.vue -->
<template>
  <div class="unit-body">
    <header>I am Header</header>

    <TheMain />
    <TheFooter />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

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
header {
  position: sticky;
  top: 0;

  width: 100dvw;
  height: var(--size-header-height);

  display: grid;
  place-items: center;

  background-color: rgba(0, 255, 0, .5);
  color: #fff;
}
</style>
