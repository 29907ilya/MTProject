<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Билеты в кино - Вход</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
        />
        <label for="email">Email</label>
        <small class="helper-text invalid">Email</small>
      </div>
      <div class="input-field">
        <input id="password" type="password" class="validate" />
        <label for="password">Пароль</label>
        <small class="helper-text invalid">Password</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
export default {
  name: 'login',
  // setup() {
  //   const {value: email, errorMessage: eError, handleBlur: eBlur} = useField('email')
  //   const {value: password, errorMessage: pError, handleBlur: pBlur} = useField('password')
  //   return {
  //     email,
  //     password,
  //     eError,
  //     pError,
  //     eBlur,
  //     pBlur
  //   }
  // },
  methods: {
    submitHandler () {
      this.$router.push('/')
    }
  }
}
</script>
