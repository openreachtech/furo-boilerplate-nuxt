<!-- pages/signUp.vue -->
<template>
  <h1>Hello I&#39;m pages/signUp.vue!</h1>

  <form>
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
        type="checkbox"
      >
      <span>利用規約に同意する</span>
    </label>

    <button class="standard">
      新規登録
    </button>
  </form>
</template>

<script>
export default {
  name: 'SignUpPage',
}
</script>

<style>
/* CSS styles here */
</style>
