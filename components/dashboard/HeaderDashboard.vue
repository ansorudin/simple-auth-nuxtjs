<template>
  <div class="wrapper-header">
    <div style="position: relative">
      <img
        v-if="coverPhoto"
        :src="coverPhoto"
        alt="header"
        width="100%"
        height="300px"
        style="object-fit: cover; border-radius: 0.5rem"
      />
      <div
        v-else
        class="d-flex justify-center align-center"
        style="width: 100%; height: 300px; background-color: #121212"
      >
        <p>Cover Foto Belum Tersedia</p>
      </div>
      <div style="position: absolute; bottom: 20px; right: 10px">
        <slot></slot>
      </div>
    </div>
    <img
      :src="
        avatar ||
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngfind.com%2Fmpng%2FTRJxwTh_default-profile-picture-transparent-hd-png-download%2F&psig=AOvVaw0aahM5yBtiGt31VqVQnKAE&ust=1668754758411000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCLCiqYbStPsCFQAAAAAdAAAAABAE'
      "
      alt="avatar"
      class="avatar-header"
    />
  </div>
</template>

<script>
export default {
  name: 'HeaderDashboard',
  props: {
    coverPhoto: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
  },
}
</script>
