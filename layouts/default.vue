<!-- layouts/default.vue -->
<template>
  <TheHeader />
  <main>
    <NuxtPage />
  </main>
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

/* Layout Style */

body {
  min-height: 100dvh;
  position: relative;
}

main {
  min-height: calc(100dvh - var(--size-footer-height));

  padding-top: var(--size-header-height);

  border: .5rem #000 solid;
}
</style>
