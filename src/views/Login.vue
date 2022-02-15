<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">Movie Tickets | Login</span>

      <div class="input-field">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" @blur="eBlur" />
        <small class="helper-text invalid" v-if="eError">{{ eError }}</small>
      </div>

      <div class="input-field">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" @blur="pBlur" />
        <small class="helper-text invalid" v-if="pError">{{ pError }}</small>
      </div>
    </div>

    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
          @click="submitHandler"
        >
          Enter
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        No account?
        <router-link to="/register">Registration</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'

export default {
  name: 'login',
  setup () {
    const { handleSubmit } = useForm()

    const {
      value: email,
      errorMessage: eError,
      handleBlur: eBlur
    } = useField(
      'email',
      yup
        .string()
        .trim()
        .required('This is a required field')
        .email('Email must be valid')
    )

    const PASS_LENGTH = 6

    const {
      value: password,
      errorMessage: pError,
      handleBlur: pBlur
    } = useField(
      'password',
      yup
        .string()
        .trim()
        .required('This is a required field')
        .min(PASS_LENGTH, `Password must be at least ${PASS_LENGTH} sumbols`)
    )

    const onSubmit = handleSubmit()

    return {
      email,
      password,
      eError,
      pError,
      eBlur,
      pBlur,
      onSubmit
    }
  },

  methods: {
    async submitHandler () {
      const userData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', userData)
        this.$router.push('/')
        window.M.toast({ html: 'Welcome!' })
      } catch (error) {
        window.M.toast({ html: 'Login failed' })
      }
    }
  }
}
</script>
