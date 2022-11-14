<template>
  <v-form class="custom-form-container">
    <v-text-field
      v-model="phoneNumber"
      type="text"
      outlined
      placeholder="Phone Number"
      full-width
      :error-messages="phoneNumberErrors"
      @input="$v.phoneNumber.$touch()"
      @blur="$v.phoneNumber.$touch()"
    />
    <v-text-field
      v-model="password"
      :type="isPassword ? 'password' : 'text'"
      outlined
      placeholder="Password"
      full-width
      :append-icon="isPassword ? 'mdi-eye-off' : 'mdi-eye'"
      :error-messages="passwordErrors"
      @click:append="togglePassword"
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
    />
    <v-text-field
      v-if="type === 'register'"
      v-model="country"
      outlined
      placeholder="Country"
      full-width
      :error-messages="countryErrors"
      @input="$v.country.$touch()"
      @blur="$v.country.$touch()"
    />

    <div class="button-container">
      <v-btn
        :disabled="$v.$invalid"
        outlined
        color="indigo"
        block
        @click="submit"
      >
        Submit
      </v-btn>
    </div>
    <div class="mt-6 d-flex justify-center">
      <p v-if="type === 'register'" class="text-body2 font-weight-light">
        If you have already account? <nuxt-link to="login">login</nuxt-link>
      </p>
      <p v-else class="text-body2 font-weight-light">
        don't have an account?
        <nuxt-link to="register">register here</nuxt-link>
      </p>
    </div>
  </v-form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  helpers,
  maxLength,
  requiredIf,
} from 'vuelidate/lib/validators'

const number = helpers.regex('phoneNumber', /\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/)

export default {
  mixins: [validationMixin],
  props: {
    type: String,
  },

  validations: {
    phoneNumber: { required, number, maxLength: maxLength(14) },
    password: { required, minLength: minLength(8) },
    country: {
      required: requiredIf(function () {
        return this.type === 'register'
      }),
    },
  },

  data: () => ({
    phoneNumber: '',
    password: '',
    country: '',
    loading: false,
    isPassword: true,
  }),

  computed: {
    phoneNumberErrors() {
      const errors = []
      if (!this.$v.phoneNumber.$dirty) return errors
      !this.$v.phoneNumber.required &&
        errors.push('Phone number must be filled')
      !this.$v.phoneNumber.number && errors.push('Phone number not valid')
      !this.$v.phoneNumber.maxLength && errors.push('Phone number max 13 char')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password must be filled')
      !this.$v.password.minLength && errors.push('Min 8 char')
      return errors
    },
    countryErrors() {
      const errors = []
      if (this.type === 'register') {
        if (!this.$v.country.$dirty) return errors
        !this.$v.country.required && errors.push('Password must be filled')
      }
      return errors
    },
  },
  methods: {
    submit() {
      switch (this.type) {
        case 'register':
          try {
            this.$store.dispatch('register', {
              phoneNumber: this.phoneNumber,
              password: this.password,
              country: this.country,
            })
          } catch (error) {
            console.log(error)
          }

          break
        default:
          try {
            this.$store.dispatch('login', {
              phoneNumber: this.phoneNumber,
              password: this.password,
            })
          } catch (error) {
            console.log(error)
          }

          break
      }
    },

    togglePassword() {
      this.isPassword = !this.isPassword
    },
  },
}
</script>

<style scoped>
.custom-form-container {
  width: 600px;
}
.button-container {
  width: 100%;
  padding: 0 35%;
}
.errors {
  color: red;
}
.success {
  color: green;
}
</style>
