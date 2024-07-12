<template>
  <h1>Hello I&#39;m pages/signUp.vue!</h1>

  <form
    ref="formRef"
  >
    <label
      class="row"
      for="email"
    >
      <span>メールアドレス</span>
      <input
        id="email"
        name="email"
        type="text"
        placeholder="メールアドレスを入力してください。"
      >
    </label>

    <label
      class="row"
      for="username"
    >
      <span>ユーザ名</span>
      <input
        id="username"
        name="username"
        type="text"
        placeholder="ユーザ名を入力してください。"
      >
    </label>

    <label
      class="row"
      for="password"
    >
      <span>パスワード</span>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="パスワードを入力してください。"
      >
    </label>

    <label
      class="row"
      for="confirm-password"
    >
      <span>パスワード (確認用)</span>
      <input
        id="confirm-password"
        name="confirm-password"
        type="password"
        placeholder="パスワードを入力してください。"
      >
    </label>

    <label
      class="column"
      for="agree-policy"
    >
      <input
        id="agree-policy"
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

const formRef = ref(null)
const statusReactive = reactive({
  allowsToSubmit: false,
})
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

form button[disabled] {
  background-color: #ccc;
}

/* CSS styles here */
</style>
