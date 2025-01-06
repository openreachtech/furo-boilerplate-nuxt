<script>
import {
  defineComponent,
  ref,
} from 'vue'

import FuroOffCanvasMenuLayoutContext from '~/app/vue/contexts/FuroOffCanvasMenuLayoutContext.js'

export default defineComponent({
  name: 'FuroOffCanvasMenuLayout',

  setup (
    props,
    componentContext
  ) {
    /** @type {import('vue').Ref<HTMLElement | null>} */
    const rootElementRef = ref(null)

    const args = {
      props,
      componentContext,
      rootElementRef,
    }
    const context = FuroOffCanvasMenuLayoutContext.create(args)
      .setupComponent()

    return {
      context,
      rootElementRef,
    }
  },
})
</script>

<template>
  <div ref="rootElementRef"
    class="unit-body"
  >
    <header class="header">
      <button class="button toggle-navigation"
        @click="context.clickToggleNavigation()"
      >
        <slot name="toggle-menu" />
      </button>

      <slot name="header" />
    </header>

    <nav class="navigation"
      @click="context.clickInNav({
        event: $event,
      })"
    >
      <slot name="navigation" />
    </nav>

    <main class="contents">
      <slot name="contents" />
    </main>
  </div>
</template>

<style>
:root {
  --time-transition-nav-toggle: 0.3s;
}
</style>

<style scoped>
.unit-body {
  min-height: var(--size-screen-height);

  display: grid;
  grid-template-columns: 0 1fr;
}

.unit-body > .header {
  grid-column: 1 / -1;

  height: var(--size-header-height);

  position: sticky;
  top: 0;

  display: flex;
  align-items: center;

  padding-inline-start: 0.75rem;

  background-color: var(--color-background-header);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.unit-body > .header > .button {
  max-height: 100%;
  width: 2rem;
  aspect-ratio: 1 / 1;

  display: grid;
  place-items: center;

  background-color: transparent;

  appearance: none;
  cursor: pointer;

  @media (48rem <= width) {
    display: none;
  }
}

.unit-body > .header > .button.toggle-navigation {
  border: none;

  background: none;

  padding-block: 0;
  padding-inline: 0;

  cursor: pointer;
}

.unit-body > .header > .button.toggle-navigation + * {
  margin-inline-start: 1rem;
}

/******************************************************************************/

.unit-body > .header::after {
  content: '';

  position: fixed;
  top: var(--size-header-height);
  left: 0;

  height: calc(
    var(--size-screen-height)
    - var(--size-header-height)
  );
  width: 100vw;

  transform: translateZ(1rem);

  background-color: rgba(0, 0, 0, 0.5);

  transition:
    background-color var(--time-transition-nav-toggle) ease-out,
  ;

  display: none;
}

@media (width < 48rem) {
  .unit-body.open-nav > .header::after {
    display: inherit;

    background-color: rgba(0, 0, 0, 0.5);
  }
}

.unit-body > .navigation {
  transform: translateX(-100%);

  max-height: calc(
    var(--size-screen-height)
    - var(--size-header-height)
  );
  width: var(--size-nav-width);

  position: sticky;
  top: var(--size-header-height);

  padding-block: 0.5rem;
  padding-inline: 1rem;

  background-color: var(--color-background-nav);

  transition:
    transform var(--time-transition-nav-toggle) ease-out
  ;

  @media (48rem <= width) {
    transform: translateX(0);
  }
}

.unit-body.open-nav > .navigation {
  transform: translateX(0);
}

.unit-body > .contents {
  justify-self: end;

  min-height: calc(
    var(--size-screen-height)
    - var(--size-header-height)
  );
  width: 100%;

  transition:
    width var(--time-transition-nav-toggle) ease-out
  ;

  @media (48rem <= width) {
    width: calc(100% - var(--size-nav-width));
  }
}
</style>
