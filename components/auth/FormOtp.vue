<template>
  <div class="form-container-otp">
    <v-otp-input v-model="otpValue" length="4"></v-otp-input>

    <div class="button-container-otp">
      <v-btn :disabled="otpValue.length < 4" outlined block @click="submitOtp"
        >Verifikasi</v-btn
      >
    </div>
    <div class="container-send-again">
      <p @click="sendAgainOtp">Kirim Ulang OTP</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      otpValue: '',
    }
  },
  methods: {
    submitOtp() {
      try {
        this.$store.dispatch('otpMatch', {
          otp: this.otpValue,
        })
      } catch (error) {
        console.log(error)
      }
    },
    sendAgainOtp() {
      try {
        this.$store.dispatch('requestSendOtp')
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped>
.form-container-otp {
  width: 60%;
}
.button-container-otp {
  width: 100%;
  padding: 0 35%;
  margin-top: 1.875rem;
}
.container-send-again {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1.25rem;
}
.container-send-again p {
  cursor: pointer;
}
</style>
