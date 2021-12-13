<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">Movie Tickets | Registration</span>

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

      <div class="input-field">
        <input id="name" type="text" v-model="name" @blur="nBlur" />
        <label for="name">Name</label>
        <small class="helper-text invalid" v-if="nError">{{ nError }}</small>
      </div>

      <p>
        <label>
          <input
            id="checkbox"
            type="checkbox"
            required
            v-model="checkbox"
            @blur="cBlur"
          />
          <span>Accept the rules</span>
        </label><br>
        <small class="helper-text invalid" v-if="cError">{{ cError }}</small>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Registration
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Already have an account?
        <router-link to="/login">Sing in!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'

export default {
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

    const {
      value: name,
      errorMessage: nError,
      handleBlur: nBlur
    } = useField(
      'name',
      yup.string().trim().required('This is a required field')
    )

    const {
      value: checkbox,
      errorMessage: cError,
      handleBlur: cBlur
    } = useField('checkbox', yup.boolean().oneOf([true], 'You have to accept the rules'))

    const onSubmit = handleSubmit((values) => console.log('form:', values))

    return {
      email,
      password,
      name,
      checkbox,
      eError,
      pError,
      nError,
      cError,
      eBlur,
      pBlur,
      nBlur,
      cBlur,
      onSubmit
    }
  },
  methods: {
    submitHandler () {
      this.$router.push('/')
    }
  }
}
</script>
