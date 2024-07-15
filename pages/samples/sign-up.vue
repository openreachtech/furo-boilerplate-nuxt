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
        v-model="formReactive.email"
        name="email"
        type="text"
        placeholder="メールアドレスを入力してください。"
      >
    </label>

    <label class="row">
      <span>ユーザ名</span>
      <input
        v-model="formReactive.username"
        name="username"
        type="text"
        placeholder="ユーザ名を入力してください。"
      >
    </label>

    <label class="row">
      <span>パスワード</span>
      <input
        v-model="formReactive.password"
        name="password"
        type="password"
        placeholder="パスワードを入力してください。"
      >
    </label>

    <label class="row">
      <span>パスワード (確認用)</span>
      <input
        v-model="formReactive.confirmPassword"
        name="confirm-password"
        type="password"
        placeholder="パスワードを入力してください。"
      >
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
</template>

<script setup>
import {
  reactive,
  ref,
} from 'vue'

import {
  useSignUpClient,
} from '~/composables/useSignUpClient'

const {
  sendSignUp,
} = useSignUpClient()

const formRef = ref(null)
const formReactive = reactive({
  email: '',
  password: '',
  username: '',
  confirmPassword: '',
})
const statusReactive = reactive({
  allowsToSubmit: false,
})

async function submitForm ({
  formElement,
}) {
  await console.log('submitForm()', formElement)
  await console.log('formReactive', formReactive)

  const capsule = await sendSignUp({
    variables: {
      input: {
        email: 'stew.eucen@openreach.tech',
        username: 'EucenSama',
        firstName: 'Eucen',
        lastName: 'Stew',

        password: 'passwordIsString',
      },
    },
  })

  console.log('@@@@@@@@@@@', capsule)
}
</script>

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

/* CSS styles here */
</style>
