<script setup>
import {
  reactive,
  ref,
} from 'vue'
import SignUpFormElementClerk from '~/app/domClerk/SignUpFormElementClerk'

import useSignUpClient from '~/composables/client/mutations/useSignUpClient'

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

  /*
   * <form> 窓口を生成
   */
  const formClerk = SignUpFormElementClerk.create({
    formElement,
  })

  validationRef.value = formClerk.generateValidationHash()

  /*
   * フォームのバリデーションを確認
   */
  if (formClerk.isInvalid()) {
    // バリデーションエラーなら、launchRequest() は実行しないで終了。

    return
  }

  /**
   * フォーム送信
   */
  const schemaVariableHash = formClerk.generateSchemaVariableHash()

  await invokeRequestOnEvent({
    variables: {
      input: schemaVariableHash,
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
        value="JohnDoe"
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

/* CSS styles here */
</style>
