<!-- layouts/default.vue -->
<template>
  <div class="unit-body">
    <TheHeader />
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
