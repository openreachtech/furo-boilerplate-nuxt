<script>
import {
  ref,
} from 'vue'

import defineAppComponent from '~/app/vue/defineAppComponent'

import {
  BaseFormElementClerk,
} from '@openreachtech/furo'

/**
 * @extends {BaseFormElementClerk<typeof SampleFormElementClerk, *, *>}
 */
class SampleFormElementClerk extends BaseFormElementClerk {

}

/** @type {import('vue').Ref<HTMLFormElement>} */
const formRef = /** @type {*} */ (
  ref(null)
)

const Timber = console

/**
 * Submit form event handler.
 *
 * @param {{
 *   formElement: HTMLFormElement
 * }} args
 */
async function submitForm ({
  formElement,
}) {
  const formElementClerk = SampleFormElementClerk.create({
    formElement,
  })

  await Timber.log(
    'formElementClerk.extractValueHash()',
    formElementClerk.extractValueHash()
  )
}

export default defineAppComponent({
  name: 'FormControlsInspectorPage',

  setup () {
    return {
      formRef,
      submitForm,
    }
  },
})
</script>

<template>
  <h1>Hello I&#39;m pages/form-controls-inspector.vue!</h1>

  <form ref="formRef"
    @submit.prevent="submitForm({
      formElement: formRef,
    })"
  >
    <button class="standard"
      type="submit"
    >
      Submit (above)
    </button>

    <label class="row">
      <span>Test</span>
      <input name="text"
        type="text"
        value="default text"
      >
    </label>

    <label class="row">
      <span>Double Text</span>
      <input name="double-text"
        type="text"
        value="double 001"
      >
      <input name="double-text"
        type="text"
        value="double 002"
      >
    </label>

    <label class="row">
      <span>Password</span>
      <input name="password"
        type="password"
        value="password123"
      >
    </label>

    <label class="row">
      <span>Email</span>
      <input name="email"
        type="email"
        value="example@example.com"
      >
    </label>

    <label class="row">
      <span>Website</span>
      <input name="url"
        type="url"
        value="https://www.example.com"
      >
    </label>

    <label class="row">
      <span>Telephone Number</span>
      <input name="tel"
        type="tel"
        value="090-1234-5678"
      >
    </label>

    <label class="row">
      <span>Color</span>
      <input name="color"
        type="color"
        value="#ff00ff"
      >
    </label>

    <label class="row">
      <span>Number</span>
      <input name="number"
        type="number"
        min="1"
        max="10"
        value="5"
      >
    </label>

    <label class="row">
      <span>Range</span>
      <input name="range"
        type="range"
        min="0"
        max="100"
        value="50"
      >
    </label>

    <label class="row">
      <span>Date</span>
      <input name="date"
        type="date"
        value="2024-01-01"
      >
    </label>

    <label class="row">
      <span>Time</span>
      <input name="time"
        type="time"
        value="11:22:33"
        step="1"
      >
    </label>

    <label class="row">
      <span>DateTime</span>
      <input name="datetime-local"
        type="datetime-local"
        value="2024-01-31T11:22:33"
        step="1"
      >
    </label>

    <label class="row">
      <span>Year Month</span>
      <input name="month"
        type="month"
        value="2024-01"
      >
    </label>

    <label class="row">
      <span>File</span>
      <input name="file"
        type="file"
      >
    </label>

    <hr>

    <h2>Emotion</h2>
    <label>
      <input name="emotion"
        type="radio"
        value="happy"
      >
      <span>happy</span>
    </label>
    <br>
    <label>
      <input name="emotion"
        type="radio"
        value="sad"
      >
      <span>sad</span>
    </label>
    <br>
    <label>
      <input name="emotion"
        type="radio"
        value="angry"
      >
      <span>angry</span>
    </label>

    <hr>

    <h2>Interest</h2>
    <label>
      <input name="interest"
        type="checkbox"
        value="coding"
        checked
      >
      <span>coding</span>
    </label>
    <br>
    <label>
      <input name="interest"
        type="checkbox"
        value="music"
      >
      <span>music</span>
    </label>
    <br>
    <label>
      <input name="interest"
        type="checkbox"
        value="sports"
        checked
      >
      <span>sports</span>
    </label>

    <hr>

    <label class="row">
      <span>Message</span>
      <textarea name="message"
        rows="4"
        cols="50"
      >default message</textarea>
    </label>

    <label class="column">
      <span>City</span>
      <select name="city"
        style="
          min-width: 10rem;
        "
      >
        <option value="tokyo">Tokyo</option>
        <option value="osaka">Osaka</option>
        <option value="kyoto">Kyoto</option>
      </select>
    </label>

    <label class="column">
      <span>Amount (Optional)</span>
      <select name="amount"
        style="
          min-width: 10rem;
        "
      >
        <option value=""
          disabled
          selected
        >Please select</option>
        <option value="small">small</option>
        <option value="large">large</option>
      </select>
    </label>

    <label class="column">
      <span>Greek</span>
      <select name="greek"
        multiple
        style="
          height: 5rem;
          min-width: 10rem;
        "
      >
        <option value="alpha"
          selected
        >alpha</option>
        <option value="beta">beta</option>
        <option value="gamma"
          selected
        >gamma</option>
        <option value="delta">delta</option>
        <option value="epsilon">epsilon</option>
        <option value="zeta">zeta</option>
        <option value="eta">eta</option>
        <option value="theta">theta</option>
      </select>
    </label>

    <button class="standard"
      type="submit"
    >
      Submit (below)
    </button>
  </form>
</template>

<style>
form {
  margin-inline: 1rem;
}

label.row,
label.column {
  margin-block-start: 1rem;
}

label.row {
  display: flex;
  flex-direction: column;
}

label.column {
  display: flex;
  flex-direction: row;
}

form button {
  margin-block-start: 1rem;
}

form button.standard {
  border: none;
  border-radius: .25rem;

  padding-block: .5rem;
  padding-inline: 1rem;
  background-color: #007bff;
  color: #fff;
}

form button.standard:active {
  background-color: #03c;
}

form button[disabled] {
  background-color: #ccc;
}
</style>
