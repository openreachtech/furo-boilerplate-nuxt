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

  AccessTokenClerk,
} from '@openreachtech/furo-nuxt'

import useRedirect from '~/composables/useRedirect.js'

import SignInMutationGraphqlLauncher from '~/app/graphql/client/mutations/signIn/SignInMutationGraphqlLauncher'
import SignInFormElementClerk from '~/app/domClerk/SignInFormElementClerk'

export default defineComponent({
  name: 'SignInPage',

  setup () {
    definePageMeta({
      $furo: {
        pageTitle: 'Sign In',
        skipFilter: true,
      },
      layout: 'gateway',
    })

    const statusReactive = reactive({
      isLoading: false,
    })

    const formRef = ref(null)

    const {
      capsuleRef,
      // invokeRequestOnEvent,
      // invokeRequestOnMounted,
      invokeRequestWithFormValueHash,
    } = useGraphqlClient(SignInMutationGraphqlLauncher)

    const {
      validationRef,
      submitForm,
    } = useFormClerk({
      FormElementClerk: SignInFormElementClerk,
      invokeRequestWithFormValueHash,
    })

    const {
      redirectTo,
    } = useRedirect()

    return {
      formRef,
      statusReactive,
      capsuleRef,
      validationRef,

      submitFormWithHooks,
    }

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
          async beforeRequest (payload) {
            statusReactive.isLoading = true

            return false
          },
          async afterRequest (capsule) {
            const hasSaved = AccessTokenClerk.create()
              .saveToken({
                token: capsule.accessToken,
              })

            if (!hasSaved) {
              onFailToGetAccessToken()

              statusReactive.isLoading = false

              return
            }

            // // Redirect to the path after success to sign in.
            await redirectTo()
          },
        },
      })
    }

    /**
     * On fail to get access token.
     */
    function onFailToGetAccessToken () {
      // alert('TODO: Please support the error here.')
    }
  },
})
</script>

<template>
  <h1 class="usual">
    Hello I&#39;m pages/signIn.vue!
  </h1>

  <section class="usual">
    <h2 class="usual">
      Sign In Form
    </h2>

    <form ref="formRef"
      @submit.prevent="submitFormWithHooks({
        formElement: formRef,
      })"
    >
      <span>Account</span>
      <input class="usual"
        name="email"
        type="email"
        placeholder="Please input email address here."
        value="customer.100001@example.com"
      >
      <div>{{ validationRef.message.email }}&nbsp;</div>

      <span>Password</span>
      <input class="usual"
        name="password"
        type="password"
        placeholder="Please input password here."
        value="pAsswOrd$01"
      >
      <div>{{ validationRef.message.password }}&nbsp;</div>

      <button class="usual"
        type="submit"
      >
        Submit
      </button>
    </form>
  </section>

  <section class="usual">
    <h2 class="usual">
      Sign In Information
    </h2>

    <p>Please run server <strong>renchan-boilerplate</strong></p>

    <dl class="unit-test-account sample-placeholder">
      <dt class="term">
        email
      </dt>
      <dd class="details">
        customer.100001@example.com
      </dd>
      <dt class="term">
        password
      </dt>
      <dd class="details">
        pAsswOrd$01
      </dd>
    </dl>
  </section>

  <section class="usual">
    <h2 class="usual">
      GraphQL API result
    </h2>

    <h3>data</h3>
    <pre class="sample-placeholder">{{
      JSON.stringify(
        capsuleRef.extractContent(),
        null,
        4
      )
    }}</pre>
    <h3>error</h3>
    <pre class="sample-placeholder">{{
      JSON.stringify(
        capsuleRef.getErrorMessage(),
        null,
        4
      )
    }}</pre>
  </section>

  <div v-if="statusReactive.isLoading"
    class="unit-loading"
  >
    Loading ...
  </div>
</template>

<style>
/* ---------------------------------------- */

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

/* ---------------------------------------- */

.unit-test-account {
  display: grid;
  grid-template-columns: auto 1fr;
}

.unit-test-account .term {
  text-align: right;
  font-weight: bold;
}

.unit-test-account .term::after {
  content: ':';

  margin-inline-end: 0.5rem;
}

.unit-test-account .details {
  font-style: italic;
}
</style>
