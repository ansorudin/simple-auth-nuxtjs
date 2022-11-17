<template>
  <div class="form-container">
    <h1 style="margin-bottom: 20px" class="">Percobaan OTP</h1>
    <FormOtp />
  </div>
</template>

<script>
import FormOtp from '../components/auth/FormOtp.vue'
export default {
  name: 'OtpInput',
  components: {
    FormOtp,
  },
  layout: 'auth',
}
</script>

<style scoped>
.form-container {
  height: 100%;
  width: 100%;
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
