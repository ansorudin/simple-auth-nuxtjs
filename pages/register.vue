<template>
  <div class="form-container">
    <h1 style="margin-bottom: 20px" class="">Register Page</h1>
    <FormsAuthVue type="register" />
  </div>
</template>

<script>
import FormsAuthVue from '../components/FormsAuth.vue'
export default {
  name: 'RegisterPage',
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
