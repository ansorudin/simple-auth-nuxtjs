<template>
  <v-app>
    <v-main>
      <v-container>
        <AppBar :user-name="userData.name" />
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from '../components/AppBar.vue'
export default {
  name: 'DefaultLayout',
  components: {
    AppBar,
  },
  computed: {
    userData() {
      return this.$store.getters.getUser
    },
  },
}
</script>
