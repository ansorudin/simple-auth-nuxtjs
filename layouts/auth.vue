<template>
  <v-app>
    <v-container>
      <v-main class="auth-container">
        <Nuxt />
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'BlogLayout',
}
</script>

<style>
html {
  font-family: 'Roboto', sans-serif;
}
.auth-container {
  min-height: 90vh;
}
</style>
