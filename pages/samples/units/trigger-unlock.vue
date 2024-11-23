<script></script>

<template>
  <div>
    <h1>Trigger Unlock</h1>

    <h2>Checkbox Types</h2>

    <section class="unit-section">
      <h3>one trigger - one aim &lt;label&gt;&lt;input&gt;&lt;/label&gt;</h3>

      <label class="-trigger-unlock-checkbox">
        <input type="checkbox">
        <span>I agree it</span>
      </label>
      <br>

      <button class="-aim-unlock"
        type="submit"
      >
        Submit
      </button>
    </section>

    <section class="unit-section">
      <h3>one trigger - one aim &lt;label for&gt;&lt;input id&gt;</h3>

      <input id="labeled-input"
        class="-trigger-unlock-checkbox"
        type="checkbox"
      >
      <label for="labeled-input">I agree it</label>
      <br>

      <button class="-aim-unlock"
        type="submit"
      >
        Submit
      </button>
    </section>

    <section class="unit-section">
      <h3>plural triggers - one aim (Open Type)</h3>

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

      <button class="-aim-unlock"
        type="submit"
      >
        Submit
      </button>
    </section>

    <section class="unit-section">
      <h3>plural triggers - one aim (Unified Type)</h3>

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

      <button class="-aim-unlock"
        type="submit"
      >
        Submit
      </button>
    </section>

    <h2>Radio Types</h2>

    <section class="unit-section">
      <h3>one radio set - one aim (Open Type)</h3>

      <label class="-trigger-unlock-radio">
        <input type="radio"
          name="radio-group"
        >
        <span>Alpha</span>
      </label>
      <br>
      <label class="-trigger-unlock-radio">
        <input type="radio"
          name="radio-group"
        >
        <span>Beta</span>
      </label>
      <br>
      <label class="-trigger-unlock-radio">
        <input type="radio"
          name="radio-group"
        >
        <span>Gamma</span>
      </label>
      <br>

      <button class="-aim-unlock"
        type="submit"
      >
        Submit
      </button>
    </section>

    <section class="unit-section">
      <h3>one radio set - one aim (Unified Type)</h3>

      <div class="-trigger-unlock-radio unify-frame">
        <label>
          <input type="radio"
            name="radio-group"
          >
          <span>Alpha</span>
        </label>
        <br>
        <label>
          <input type="radio"
            name="radio-group"
          >
          <span>Beta</span>
        </label>
        <br>
        <label>
          <input type="radio"
            name="radio-group"
          >
          <span>Gamma</span>
        </label>
      </div>

      <button class="-aim-unlock"
        type="submit"
      >
        Submit
      </button>
    </section>
  </div>
</template>

<style scoped>
h1 {
  font-size: 2rem;
}
h2 {
  margin-block-start: 2rem;

  font-size: 1.618rem;
}

h1,
h2,
h3 {
  margin-block-end: 1rem;
}

button {
  margin-block-start: 0.5rem;
  border: none;
  border-radius: .25rem;

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

  padding-block: .5rem;
  padding-inline: 1rem;
}
</style>
