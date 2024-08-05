<script setup>
import {
  reactive,
  ref,
} from 'vue'

import useSignUpClient from '~/composables/client/mutations/useSignUpClient'

import FormElementClerk from '~/modules/domClerks/FormElementClerk'

const formRef = ref(null)
const statusReactive = reactive({
  allowsToSubmit: false,
})

const {
  // capsuleRef,
  validationRef,
  invokeRequestOnEvent,
  // invokeRequestOnMounted,
} = useSignUpClient()

/**
 * Submit form event handler.
 *
 * @param {{
 *   formElement: HTMLFormElement | null
 * }} params - Parameters.
 */
async function submitForm ({
  formElement,
}) {
  if (!formElement) {
    return
  }

  const formElementClerk = FormElementClerk.create({
    formElement,
  })

  const formValueHash = formElementClerk.extractValueHash()

  await invokeRequestOnEvent({
    variables: {
      input: formValueHash,
    },
  })
}
</script>

<template>
  <h1>Hello I&#39;m pages/signUp.vue!</h1>

  <form
    ref="formRef"
    @submit.prevent="submitForm({
      formElement: formRef,
    })"
  >
    <label class="row">
      <span>メールアドレス</span>
      <input
        name="email"
        type="text"
        placeholder="メールアドレスを入力してください。"
        value="stew.eucen@openreach.tech"
      >
      <div>{{ validationRef.message.email }}&nbsp;</div>
    </label>

    <label class="row">
      <span>ユーザ名</span>
      <input
        name="username"
        type="text"
        placeholder="ユーザ名を入力してください。"
        value="John Doe"
      >
      <div>{{ validationRef.message.username }}&nbsp;</div>
    </label>

    <label class="row">
      <span>First Name</span>
      <input
        name="firstName"
        type="text"
        placeholder="Please enter your first name."
        value="Eucen"
      >
      <div>{{ validationRef.message.firstName }}&nbsp;</div>
    </label>

    <label class="row">
      <span>First Name</span>
      <input
        name="lastName"
        type="text"
        placeholder="Please enter your last name."
        value="Stew"
      >
      <div>{{ validationRef.message.lastName }}&nbsp;</div>
    </label>

    <label class="row">
      <span>パスワード</span>
      <input
        name="password"
        type="password"
        placeholder="パスワードを入力してください。"
      >
      <div>{{ validationRef.message.password }}&nbsp;</div>
    </label>

    <label class="row">
      <span>パスワード (確認用)</span>
      <input
        name="confirm-password"
        type="password"
        placeholder="パスワードを入力してください。"
      >
      <div>{{ validationRef.message['password-confirmation'] }}&nbsp;</div>
    </label>

    <label class="column">
      <input
        v-model="statusReactive.allowsToSubmit"
        type="checkbox"
      >
      <span>利用規約に同意する</span>
    </label>

    <button
      class="standard"
      type="submit"
      :disabled="!statusReactive.allowsToSubmit"
    >
      新規登録
    </button>
  </form>

  <div
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

form button.standard {
  border: none;
  border-radius: .25rem;

  padding: .5rem 1rem;
  background-color: #007bff;
  color: #fff;
}

form button.standard:active {
  background-color: #03c;
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
