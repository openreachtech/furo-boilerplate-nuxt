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
/* Reset CSS */

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
}

/* Custom Properties */

:root {
  --size-header-height: 5rem;
  --size-footer-height: 10rem;
}

/* Layout */

.unit-body {
  min-height: 100vh;

  display: flex;
  flex-direction: column;
}

</style>
