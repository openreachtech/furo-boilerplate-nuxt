<script>
import {
  defineComponent,
  ref,
} from 'vue'

import {
  definePageMeta,
} from '#imports'

import FuroDialog from '@openreachtech/furo-nuxt/lib/components/FuroDialog.vue'
import FuroButtonDialog from '@openreachtech/furo-nuxt/lib/components/FuroButtonDialog.vue'
import AppDialog from '~/components/units/AppDialog.vue'

export default defineComponent({
  name: 'Furo Dialog Samples',

  components: {
    FuroDialog,
    FuroButtonDialog,
    AppDialog,
  },

  setup () {
    definePageMeta({
      $furo: {
        pageTitle: 'Furo Dialog Samples',
        skipFilter: true,
      },
    })

    /** @type {import('vue').Ref<FuroDialog | null>} */
    const messageAndXCloseButtonFuroDialogRef = ref(null)

    /** @type {import('vue').Ref<FuroDialog | null>} */
    const dialogStatusCallbackFuroDialogRef = ref(null)

    /** @type {import('vue').Ref<FuroDialog | null>} */
    const closeByClickedOnBackdropFuroDialogRef = ref(null)

    /** @type {import('vue').Ref<FuroDialog | null>} */
    const alertFuroButtonDialogRef = ref(null)

    /** @type {import('vue').Ref<FuroDialog | null>} */
    const confirmFuroButtonDialogRef = ref(null)

    /** @type {import('vue').Ref<FuroDialog | null>} */
    const ternaryConfirmFuroButtonDialogRef = ref(null)

    /** @type {import('vue').Ref<FuroDialog | null>} */
    const customDesignedFuroDialogRef = ref(null)

    /** @type {import('vue').Ref<FuroDialog | null>} */
    const defaultAppDialogRef = ref(null)

    /** @type {import('vue').Ref<FuroDialog | null>} */
    const customAppDialogRef = ref(null)

    /** @type {import('vue').Ref<FuroDialog | null>} */
    const formDialogRef = ref(null)

    ////////////////////////////////////////////////////////////////////////////

    const clickedButtonRef = ref('????')
    const dialogStatusRef = ref('????')

    ////////////////////////////////////////////////////////////////////////////

    /** @type {import('vue').Ref<HTMLFormElement | null>} */
    const formElementRef = ref(null)
    const formValuesRef = ref('{}')

    return {
      showDialog,
      dismissDialog,
      clickBackdrop,

      onShowDialog () {
        dialogStatusRef.value = 'Showed'
      },
      onDismissDialog () {
        dialogStatusRef.value = 'Dismissed'
      },

      onClickPositiveButton () {
        clickedButtonRef.value = 'Positive'
      },
      onClickNegativeButton () {
        clickedButtonRef.value = 'Negative'
      },
      onClickNeutralButton () {
        clickedButtonRef.value = 'Neutral'
      },

      messageAndXCloseButtonFuroDialogRef,
      dialogStatusCallbackFuroDialogRef,
      closeByClickedOnBackdropFuroDialogRef,

      alertFuroButtonDialogRef,
      confirmFuroButtonDialogRef,
      ternaryConfirmFuroButtonDialogRef,

      customDesignedFuroDialogRef,
      defaultAppDialogRef,
      customAppDialogRef,

      formDialogRef,

      // dialog click reactive
      clickedButtonRef,
      dialogStatusRef,

      // Related to <form> dialog
      submitForm,
      formElementRef,
      formValuesRef,
    }

    /**
     * Opens dialog.
     *
     * @param {{
     *   dialog: FuroDialog | null
     * }} params - The parameters.
     * @returns {void}
     */
    function showDialog ({
      dialog,
    }) {
      dialog?.showDialog()
    }

    /**
     * Closes dialog.
     *
     * @param {{
     *   dialog: FuroDialog | null
     * }} params - The parameters.
     * @returns {void}
     */
    function dismissDialog ({
      dialog,
    }) {
      dialog?.dismissDialog()
    }

    /**
     * The clickBackdrop callback.
     *
     * @param {{
     *   dialog: FuroDialog | null
     * }} params - The parameters.
     * @returns {void}
     */
    function clickBackdrop ({
      dialog,
    }) {
      dialogStatusRef.value = 'Clicked on Backdrop'

      dialog?.dismissDialog()
    }

    /**
     * The submitForm callback.
     *
     * @param {{
     *   form: HTMLFormElement | null
     * }} params - The parameters.
     * @returns {boolean}
     */
    function submitForm ({
      form,
    }) {
      const value = form
        ? Object.fromEntries(
          new FormData(form) // eslint-disable-line
        )
        : null

      formValuesRef.value = JSON.stringify(
        value,
        null,
        2
      )

      formDialogRef.value
        ?.dismissDialog()

      return false
    }
  },
})
</script>

<template>
  <div>
    <h1 class="design-header primary">
      Furo Dialog Samples
    </h1>

    <br>
    <br>

    <h2 class="design-header secondary">
      &lt;FuroButtonDialog&gt; samples
    </h2>

    <div class="button-reaction-placeholder">
      Clicked [{{ clickedButtonRef }}] button
    </div>

    <section class="unit-samples">
      <!-- ///////////////////////////////////////////////////////////////// -->
      <!-- Alert Dialog -->
      <!-- ///////////////////////////////////////////////////////////////// -->
      <div class="unit-item sample-placeholder double">
        <h3 class="design-header tertiary">
          Alert Dialog
        </h3>

        <button class="button usual"
          @click="showDialog({
            dialog: alertFuroButtonDialogRef,
          })"
        >
          show
        </button>

        <FuroButtonDialog ref="alertFuroButtonDialogRef"
          class="alert simple-dialog"
          @click-positive-button="onClickPositiveButton"
        >
          <template #contents>
            <div>Alert Dialog</div>
          </template>
          <template #positive>
            OK
          </template>
        </FuroButtonDialog>
      </div>

      <!-- ///////////////////////////////////////////////////////////////// -->
      <!-- Confirm Dialog -->
      <!-- ///////////////////////////////////////////////////////////////// -->
      <div class="unit-item sample-placeholder double">
        <h3 class="design-header tertiary">
          Confirm Dialog
        </h3>

        <button class="button usual"
          @click="showDialog({
            dialog: confirmFuroButtonDialogRef,
          })"
        >
          show
        </button>

        <FuroButtonDialog ref="confirmFuroButtonDialogRef"
          class="confirm simple-dialog"
          @click-positive-button="onClickPositiveButton"
          @click-negative-button="onClickNegativeButton"
        >
          <template #contents>
            <div>Confirm Dialog</div>
          </template>
          <template #negative>
            Cancel
          </template>
          <template #positive>
            OK
          </template>
        </FuroButtonDialog>
      </div>

      <!-- ///////////////////////////////////////////////////////////////// -->
      <!-- Ternary Confirm Dialog -->
      <!-- ///////////////////////////////////////////////////////////////// -->
      <div class="unit-item sample-placeholder double">
        <h3 class="design-header tertiary">
          Ternary Confirm Dialog
        </h3>

        <button class="button usual"
          @click="showDialog({
            dialog: ternaryConfirmFuroButtonDialogRef,
          })"
        >
          show
        </button>

        <FuroButtonDialog ref="ternaryConfirmFuroButtonDialogRef"
          class="ternary simple-dialog"
          @click-positive-button="onClickPositiveButton"
          @click-negative-button="onClickNegativeButton"
          @click-neutral-button="onClickNeutralButton"
        >
          <template #contents>
            <div>
              Ternary Confirm Dialog
            </div>
          </template>
          <template #neutral>
            Later
          </template>
          <template #negative>
            Cancel
          </template>
          <template #positive>
            OK
          </template>
        </FuroButtonDialog>
      </div>
    </section>

    <br>
    <br>

    <h2 class="design-header secondary">
      &lt;FuroDialog&gt; samples
    </h2>

    <div class="button-reaction-placeholder">
      Result: {{ dialogStatusRef }}
    </div>

    <section class="unit-samples">
      <!-- ///////////////////////////////////////////////////////////////// -->
      <!-- Message with ⊗ (x-close button) -->
      <!-- ///////////////////////////////////////////////////////////////// -->
      <div class="unit-item sample-placeholder double">
        <h3 class="design-header">
          Message with ⊗<br>(x-close button)
        </h3>

        <button class="button usual"
          @click="showDialog({
            dialog: messageAndXCloseButtonFuroDialogRef,
          })"
        >
          show
        </button>

        <FuroDialog ref="messageAndXCloseButtonFuroDialogRef"
          class="x-close simple-dialog"
        >
          <template #contents>
            <div class="centering">
              Message with ⊗<br>(x-close button)
            </div>
          </template>
        </FuroDialog>
      </div>

      <!-- ///////////////////////////////////////////////////////////////// -->
      <!-- Dialog Status Callbacks -->
      <!-- ///////////////////////////////////////////////////////////////// -->
      <div class="unit-item sample-placeholder double">
        <h3 class="design-header tertiary">
          Dialog Status Callbacks
        </h3>

        <button class="button usual"
          @click="showDialog({
            dialog: dialogStatusCallbackFuroDialogRef,
          })"
        >
          show
        </button>

        <FuroDialog ref="dialogStatusCallbackFuroDialogRef"
          class="simple-dialog"
          @show-dialog="onShowDialog"
          @dismiss-dialog="onDismissDialog"
        >
          <template #contents>
            <div class="centering">
              <div>
                Dialog Status Callbacks
              </div>
              <br>
              <button class="button usual"
                @click="dismissDialog({
                  dialog: dialogStatusCallbackFuroDialogRef,
                })"
              >
                Close
              </button>
            </div>
          </template>
        </FuroDialog>
      </div>

      <!-- ///////////////////////////////////////////////////////////////// -->
      <!-- Close by clicked on Backdrop -->
      <!-- ///////////////////////////////////////////////////////////////// -->
      <div class="unit-item sample-placeholder double">
        <h3 class="design-header">
          Close by clicked on Backdrop
        </h3>

        <button class="button usual"
          @click="showDialog({
            dialog: closeByClickedOnBackdropFuroDialogRef,
          })"
        >
          show
        </button>

        <FuroDialog ref="closeByClickedOnBackdropFuroDialogRef"
          class="simple-dialog"
          @click-backdrop="clickBackdrop({
            dialog: closeByClickedOnBackdropFuroDialogRef,
          })"
        >
          <template #contents>
            <div class="centering">
              <div>
                Close by clicked on Backdrop
              </div>
              <br>
              <button class="button usual"
                @click="dismissDialog({
                  dialog: closeByClickedOnBackdropFuroDialogRef,
                })"
              >
                Close
              </button>
            </div>
          </template>
        </FuroDialog>
      </div>
    </section>

    <br>
    <br>

    <h2 class="design-header secondary">
      Custom Design samples
    </h2>

    <section class="unit-samples">
      <!-- ///////////////////////////////////////////////////////////////// -->
      <!-- Custom Design based <FuroDialog> -->
      <!-- ///////////////////////////////////////////////////////////////// -->
      <div class="unit-item sample-placeholder double">
        <h3 class="design-header tertiary">
          Custom Design of &lt;FuroDialog&gt; [alpha]
        </h3>

        <button class="button usual"
          @click="showDialog({
            dialog: customDesignedFuroDialogRef,
          })"
        >
          show
        </button>

        <FuroDialog ref="customDesignedFuroDialogRef"
          class="design alpha"
        >
          <template #contents>
            <div>
              Custom Design from &lt;FuroDialog&gt; [alpha]
            </div>

            <button class="button usual"
              @click="dismissDialog({
                dialog: customDesignedFuroDialogRef,
              })"
            >
              OK
            </button>
          </template>
        </FuroDialog>
      </div>

      <!-- ///////////////////////////////////////////////////////////////// -->
      <!-- Default Design of <AppDialog> -->
      <!-- ///////////////////////////////////////////////////////////////// -->
      <div class="unit-item sample-placeholder double">
        <h3 class="design-header tertiary">
          Default Design of &lt;AppDialog&gt;
        </h3>

        <button class="button usual"
          @click="showDialog({
            dialog: defaultAppDialogRef,
          })"
        >
          show
        </button>

        <AppDialog ref="defaultAppDialogRef">
          <template #contents>
            <div>
              Default Design of &lt;AppDialog&gt;
            </div>

            <button class="button usual"
              @click="dismissDialog({
                dialog: defaultAppDialogRef,
              })"
            >
              OK
            </button>
          </template>
        </AppDialog>
      </div>

      <!-- ///////////////////////////////////////////////////////////////// -->
      <!-- Custom Design of <AppDialog> -->
      <!-- ///////////////////////////////////////////////////////////////// -->
      <div class="unit-item sample-placeholder double">
        <h3 class="design-header tertiary">
          Custom Design of &lt;AppDialog&gt;
        </h3>

        <button class="button usual"
          @click="showDialog({
            dialog: customAppDialogRef,
          })"
        >
          show
        </button>

        <AppDialog ref="customAppDialogRef"
          class="design beta"
        >
          <template #contents>
            <div>
              Custom Design of &lt;AppDialog&gt;
            </div>

            <button class="button usual"
              @click="dismissDialog({
                dialog: customAppDialogRef,
              })"
            >
              OK
            </button>
          </template>
        </AppDialog>
      </div>
    </section>

    <br>
    <br>

    <h2 class="design-header secondary">
      Various Samples
    </h2>

    <section class="unit-samples">
      <!-- ///////////////////////////////////////////////////////////////// -->
      <!-- <form> Dialog -->
      <!-- ///////////////////////////////////////////////////////////////// -->
      <div class="unit-item sample-placeholder double">
        <h3 class="design-header tertiary">
          &lt;form&gt; Dialog sample
        </h3>

        <button class="button usual"
          @click="showDialog({
            dialog: formDialogRef,
          })"
        >
          show
        </button>

        <FuroDialog ref="formDialogRef"
          class="x-close design unit-form"
        >
          <template #contents>
            <div>
              &lt;form&gt; Dialog
            </div>

            <form ref="formElementRef"
              class="form"
              @submit.prevent="submitForm({
                form: formElementRef,
              })"
            >
              <input type="text"
                class="input id"
                name="id"
                placeholder="Please input id here"
                value="JohnDoe"
              >
              <input type="text"
                class="input message"
                name="message"
                placeholder="Please input message here"
                value="Who are you?"
              >

              <button class="button usual submit"
                type="submit"
              >
                Submit
              </button>
            </form>
          </template>
        </FuroDialog>

        <div class="result unit-form">
          <span>Submit &lt;form&gt; Result:</span>
          <pre class="json">{{
            formValuesRef
          }}</pre>
        </div>
      </div>
    </section>

    <br>
    <br>
  </div>
</template>

<!-- can not use scoped here -->
<style>
/******************************************************************************/
/* page design */
/******************************************************************************/

.unit-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.unit-section > .button {
  margin-block: .25rem;

  border-radius: .5rem;

  padding-block: .5rem;
  padding-inline: 1rem;

  font-size: 1.5rem;
}

.unit-section > :not(.button) {
  flex-grow: 1;
}

/******************************************************************************/

.unit-samples {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: stretch;
  gap: 1rem;
}

.unit-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.unit-item > .button {
  margin-block: .25rem;

  border-radius: .5rem;

  padding-block: .5rem;
  padding-inline: 1rem;

  font-size: 1.5rem;
}

/******************************************************************************/
/* dialog */
/******************************************************************************/

.unit-dialog[open] {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
}

.unit-dialog[open].simple-dialog {
  min-width: 20rem;
  min-height: 10rem;

  border-radius: .5rem;
}

.unit-dialog[open] .centering {
  text-align: center;
}

/*
 * <button> design in <FuroButtonDialog>
 */
.unit-dialog[open] > .unit-buttons .button {
  border-radius: 0.3rem;
  border: var(--size-thinnest) #000 solid;

  padding-block: 0.25rem;
  padding-inline: 0.5rem;
}

/******************************************************************************/
/* dialog design alpha */

.unit-dialog[open].design.alpha {
  border-radius: 0.5rem;
  border: var(--color-primary) outset 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  padding-block: 1rem;
  padding-inline: 2rem;

  background-color: var(--color-secondary);
  color: var(--color-black);
}

.unit-dialog[open].design.alpha::backdrop {
  background-color: rgba(0, 0, 0, 0.8);
}

/******************************************************************************/
/* dialog design beta */

.unit-dialog[open].design.beta {
  border-radius: .5rem;
  border: none;

  background-color: var(--color-primary);
  color: var(--color-text-primary);

  text-align: center;
}

.unit-dialog[open].design.beta::backdrop {
  background-color: rgba(255, 255, 255, 0.5);
}

.unit-dialog[open].design.beta .button {
  border: var(--size-thinnest) var(--color-text-primary) solid;
}

/******************************************************************************/
/* dialog design unit-form */

.unit-dialog[open].design.unit-form {
  border-radius: 0.5rem;

  padding-block: 1rem;
  padding-inline: 2rem;
}

.unit-dialog.design.unit-form > .buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.unit-dialog.design.unit-form > .buttons > * {
  width: 0;

  flex-grow: 1;
}

.unit-dialog.design.unit-form .form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  padding-block: 1rem 0.5rem;
  padding-inline: 1rem;
}

.unit-dialog.design.unit-form .form > .input {
  min-width: 15rem;
}

.unit-dialog.design.unit-form .form > .button.submit {
  max-width: 50%;
}

.result.unit-form {
  margin-block-start: 1.5rem;
}

.result.unit-form > .json {
  border: var(--size-thinnest) var(--color-text) solid;

  padding-block: 0.5rem;
  padding-inline: 1rem;

  white-space: pre;
}

/******************************************************************************/

.button-reaction-placeholder {
  border: var(--size-thinnest) var(--color-text) solid;
  border-radius: .5rem;

  margin-block: 1rem;

  padding-block: .5rem;
  padding-inline: 1rem;

  font-size: 1.2rem;
}
</style>
