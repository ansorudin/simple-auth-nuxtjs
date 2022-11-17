<template>
  <v-dialog v-model="openDialog" max-width="500">
    <v-card>
      <v-card-title class="text-h5"> Change Avatar to this photo </v-card-title>
      <div class="d-flex justify-center my-4">
        <img
          :src="photoSelected"
          style="
            width: 300px;
            height: 300px;
            object-fit: cover;
            border-radius: 4px;
          "
        />
      </div>
      <div class="d-flex justify-center pb-3">
        <v-btn color="red darken-1" text @click="$emit('closeDialog', false)">
          Cancel
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="$emit('changeAvatar', false)"
        >
          Aggree
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogSelectPhoto',
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    photoSelected: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      openDialog: false,
    }
  },
  watch: {
    dialog(newValue) {
      this.openDialog = newValue
    },
  },
}
</script>
