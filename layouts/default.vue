<!-- layouts/default.vue -->
<template>
  <header>I am Header</header>
  <main>
    <NuxtPage />
  </main>
  <footer>I am Footer</footer>
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

header {
  position: fixed;
  top: 0;

  width: 100dvw;
  height: var(--size-header-height);

  display: grid;
  place-items: center;

  background-color: rgba(0, 255, 0, .5);
  color: #000;
}

main {
  min-height: calc(100dvh - var(--size-footer-height));

  padding-top: var(--size-header-height);

  border: .5rem #000 solid;
}

footer {
  width: 100dvw;
  height: var(--size-footer-height);

  display: grid;
  place-items: center;

  background-color: rgba(0, 0, 255, .5);
  color: #fff;
}
</style>
