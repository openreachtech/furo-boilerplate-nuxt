<script>
import {
  defineComponent,
  reactive,
  ref,
} from 'vue'

import {
  definePageMeta,
} from '#imports'

import {
  useFormClerk,
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'

import UploadCustomerForumPostImageMutationGraphqlLauncher from '~/app/graphql/client/mutations/uploadCustomerForumPostImage/UploadCustomerForumPostImageMutationGraphqlLauncher'

import UploadCustomerForumPostImageFormElementClerk from '~/app/domClerk/UploadCustomerForumPostImageFormElementClerk'

const formRef = ref(null)
const statusReactive = reactive({
  allowsToSubmit: false,
  isLoading: false,
})

const {
  capsuleRef,
  // invokeRequestOnEvent,
  // invokeRequestOnMounted,
  invokeRequestWithFormValueHash,
} = useGraphqlClient(UploadCustomerForumPostImageMutationGraphqlLauncher)

const {
  validationRef,
  submitForm,
} = useFormClerk({
  FormElementClerk: UploadCustomerForumPostImageFormElementClerk,
  invokeRequestWithFormValueHash,
})

/**
 * Submit form event handler.
 *
 * @param {{
 *   formElement: HTMLFormElement | null
 * }} params - Parameters.
 */
async function submitFormWithHooks ({
  formElement,
}) {
  if (!formElement) {
    return
  }

  await submitForm({
    formElement,
    hooks: {
      beforeRequest: async payload => {
        statusReactive.isLoading = true

        return false
      },
      afterRequest: async capsule => {
        statusReactive.isLoading = false
      },
    },
  })
}

export default defineComponent({
  name: 'UploadCustomerForumPostImagePage',

  setup () {
    definePageMeta({
      $furo: {
        pageTitle: 'Upload Customer Forum Post Image Page',
        // skipFilter: false,
      },
    })

    return {
      formRef,
      statusReactive,
      capsuleRef,
      validationRef,

      submitFormWithHooks,
    }
  },
})
</script>

<template>
  <h1>Upload Customer Forum Post Image - GraphQL client</h1>

  <form ref="formRef"
    @submit.prevent="submitFormWithHooks({
      formElement: formRef,
    })"
  >
    <label class="row">
      <span>File</span>
      <input name="image"
        type="file"
      >
      <div data-validation-message="image">{{ validationRef.message.image }}</div>
    </label>

    <button class="usual"
      type="submit"
    >
      Submit
    </button>
  </form>

  <div style="margin-block-start: 3rem;">
    data
  </div>
  <pre style="
      border: 1px #000 solid;

      padding-block: .5rem;
      padding-inline: 1rem;
    "
  >{{
      JSON.stringify(
        capsuleRef.extractContent(),
        null,
        4
      )
  }}</pre>

  <div>errors</div>
  <pre style="
      border: 1px #000 solid;

      padding-block: .5rem;
      padding-inline: 1rem;
    "
  >{{
      JSON.stringify(
        capsuleRef.extractErrors(),
        null,
        4
      )
  }}</pre>

  <div v-if="statusReactive.isLoading"
    class="unit-loading"
  >
    Loading ...
  </div>
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

form button[disabled] {
  background-color: #ccc;
}

.unit-loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  border: 1rem red solid;

  display: grid;
  place-items: center;

  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  font-size: 3rem;
}
</style>
