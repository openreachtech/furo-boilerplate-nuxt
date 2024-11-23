<script></script>

<template>
  <div>
    <h1 class="design-header primary">
      Trigger Unlock
    </h1>

    <h2 class="design-header secondary">
      Checkbox Types
    </h2>

    <section class="unit-section">
      <h3 class="design-header tertiary">
        one trigger - one aim &lt;label&gt;&lt;input&gt;&lt;/label&gt;
      </h3>

      <label class="-trigger-unlock-checkbox">
        <input type="checkbox">
        <span>I agree it</span>
      </label>
      <br>

      <button class="-aim-unlock design-button"
        type="submit"
        onclick="alert('Submit!')"
      >
        Submit
      </button>
    </section>

    <section class="unit-section">
      <h3 class="design-header tertiary">
        one trigger - one aim &lt;label for&gt;&lt;input id&gt;
      </h3>

      <input id="labeled-input"
        class="-trigger-unlock-checkbox"
        type="checkbox"
      >
      <label for="labeled-input">I agree it</label>
      <br>

      <button class="-aim-unlock design-button"
        type="submit"
        onclick="alert('Submit!')"
      >
        Submit
      </button>
    </section>

    <section class="unit-section">
      <h3 class="design-header tertiary">
        plural triggers - one aim (Open Type)
      </h3>

      <label class="-trigger-unlock-checkbox">
        <input type="checkbox">
        <span>I agree it (1)</span>
      </label>
      <br>
      <label class="-trigger-unlock-checkbox">
        <input type="checkbox">
        <span>I agree it (2)</span>
      </label>
      <br>

      <button class="-aim-unlock design-button"
        type="submit"
        onclick="alert('Submit!')"
      >
        Submit
      </button>
    </section>

    <section class="unit-section">
      <h3 class="design-header tertiary">
        plural triggers - one aim (Unified Type)
      </h3>

      <div class="-trigger-unlock-checkbox unify-frame">
        <label>
          <input type="checkbox">
          <span>I agree it (1)</span>
        </label>
        <br>
        <label>
          <input type="checkbox">
          <span>I agree it (2)</span>
        </label>
      </div>

      <button class="-aim-unlock design-button"
        type="submit"
        onclick="alert('Submit!')"
      >
        Submit
      </button>
    </section>

    <h2 class="design-header secondary">
      Radio Types
    </h2>

    <section class="unit-section">
      <h3 class="design-header tertiary">
        one radio set - one aim (Open Type)
      </h3>

      <label class="-trigger-unlock-radio">
        <input type="radio"
          name="radio-group-first"
        >
        <span>Alpha</span>
      </label>
      <br>
      <label class="-trigger-unlock-radio">
        <input type="radio"
          name="radio-group-first"
        >
        <span>Beta</span>
      </label>
      <br>
      <label class="-trigger-unlock-radio">
        <input type="radio"
          name="radio-group-first"
        >
        <span>Gamma</span>
      </label>
      <br>

      <button class="-aim-unlock design-button"
        type="submit"
        onclick="alert('Submit!')"
      >
        Submit
      </button>
    </section>

    <section class="unit-section">
      <h3 class="design-header tertiary">
        one radio set - one aim (Unified Type)
      </h3>

      <div class="-trigger-unlock-radio unify-frame">
        <label>
          <input type="radio"
            name="radio-group-second"
          >
          <span>Alpha</span>
        </label>
        <br>
        <label>
          <input type="radio"
            name="radio-group-second"
          >
          <span>Beta</span>
        </label>
        <br>
        <label>
          <input type="radio"
            name="radio-group-second"
          >
          <span>Gamma</span>
        </label>
      </div>

      <button class="-aim-unlock design-button"
        type="submit"
        onclick="alert('Submit!')"
      >
        Submit
      </button>
    </section>
  </div>
</template>

<style scoped>
.design-header.primary {
  margin-block-end: 1rem;

  font-size: 2rem;
}

.design-header.secondary {
  margin-block-start: 2rem;
  margin-block-end: 1rem;

  font-size: 1.618rem;
}

.design-header.tertiary {
  margin-block-end: 1rem;
}

.design-button {
  margin-block-start: 0.5rem;
  border: none;
  border-radius: 0.25rem;

  background-color: #55f;
  color: white;

  padding-block: 0.25rem;
  padding-inline: 0.75rem;
}

.unit-section {
  margin-block-start: 1rem;

  border: 3px #000 double;

  padding-block: 0.5rem;
  padding-inline: 1rem;
}

.unify-frame {
  border: 1px #000 solid;

  padding-block: 0.5rem;
  padding-inline: 1rem;
}
</style>
