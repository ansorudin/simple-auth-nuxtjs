<template>
  <div class="form-container">
    <h1 style="margin-bottom: 20px" class="">Login Page</h1>
    <FormsAuthVue type="login" />
  </div>
</template>

<script>
import FormsAuthVue from '../components/auth/FormsAuth.vue'
export default {
  name: 'LoginPage',
  components: {
    FormsAuthVue,
  },
  layout: 'auth',
}
</script>

<style scoped>
.form-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
