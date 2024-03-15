<!-- layouts/default.vue -->
<template>
  <TheHeader />
  <TheMain />
  <TheFooter />
</template>

<script>
export default {
  name: 'DefaultLayout'
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

body {
  min-height: 100dvh;
  position: relative;
}

</style>
