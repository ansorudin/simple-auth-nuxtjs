<template>
  <v-app-bar absolute elevate-on-scroll scroll-target="#scrolling-techniques-7">
    <v-container class="d-flex align-center">
      <v-toolbar-title>Hello {{ userName }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon dark v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',
  props: {
    userName: {
      type: String,
      default: '',
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then((err) => {
        console.error(err.response)
      })
    },
  },
}
</script>
