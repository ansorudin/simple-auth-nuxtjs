<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <div v-if="userData" class="mt-14">
    <HeaderDashboardVue
      :avatar="userData.user_picture.picture.url"
      :coverPhoto="userData.cover_picture.url"
    >
      <v-file-input
        v-if="!coverFile"
        v-model="coverFile"
        hide-input
        prepend-icon="mdi-camera"
      ></v-file-input>
      <div v-else class="d-flex flex-column align-start">
        <v-chip>{{ coverFile?.name }}</v-chip>
        <v-btn class="mt-2" @click="changeCover">Change Cover</v-btn>
      </div>
    </HeaderDashboardVue>
    <div class="wrapper-content">
      <div class="wrapper-gallery">
        <div class="wrapper-card-gallery">
          <h3 class="text-body-1">Gallery Image</h3>
          <div class="wrapper-card-image">
            <img
              v-for="(pic, idx) in userData.user_pictures"
              :key="idx"
              :src="pic?.picture.url"
              class="card-image"
              @click="clickedPhoto(pic)"
            />
          </div>
          <div>
            <v-file-input
              v-model="fileGallery"
              multiple
              label="File input"
            ></v-file-input>
            <v-btn v-if="fileGallery.length > 0" @click="submitPhoto"
              >Submit Photos</v-btn
            >
          </div>
        </div>
      </div>
      <div class="wrapper-form">
        <!-- Section Personal Information -->
        <div class="pa-3">
          <h3 class="text-heading-6">Personal Information</h3>
          <div class="form-type-1">
            <v-text-field :value="userData.name" placeholder="Name" />
            <v-menu
              ref="menuDate1"
              v-model="menuDate1"
              :close-on-content-click="false"
              :return-value.sync="userData.birthday"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="userData.birthday"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  placeholder="Birthday"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="userData.birthday" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menuDate1 = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menuDate1.save(userData.birthday)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </div>
          <div class="form-type-1">
            <v-text-field v-model="userData.hometown" placeholder="Home Town" />
            <v-text-field v-model="userData.bio" placeholder="Bio" />
          </div>
          <v-btn @click="submitPersonalInformation">Submit</v-btn>
        </div>
        <!-- Section Education -->
        <div class="pa-3 mt-5">
          <h3 class="text-heading-6">Education</h3>
          <div class="form-type-1">
            <v-text-field
              v-model="userData.education.school_name"
              placeholder="School Name"
            />
            <v-menu
              ref="menuDate2"
              v-model="menuDate2"
              :close-on-content-click="false"
              :return-value.sync="userData.education.graduation_time"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="userData.education.graduation_time"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  placeholder="Graduation Date"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="userData.education.graduation_time"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menuDate2 = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="
                    $refs.menuDate2.save(userData.education.graduation_time)
                  "
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </div>
          <v-btn @click="submitEducation">Submit</v-btn>
        </div>
        <!-- Section Career -->
        <div class="pa-3 mt-5">
          <h3 class="text-heading-6">Career</h3>
          <div class="form-type-1">
            <v-text-field placeholder="Position" />
            <v-text-field
              v-model="userData.career.company_name"
              placeholder="Company Name"
            />
          </div>
          <div class="form-type-1">
            <v-menu
              ref="menuDate3"
              v-model="menuDate3"
              :close-on-content-click="false"
              :return-value.sync="userData.career.ending_in"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="userData.career.ending_in"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  placeholder="Strating Date"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="userData.career.ending_in"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menuDate3 = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menuDate3.save(userData.career.ending_in)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
            <v-menu
              ref="menuDate4"
              v-model="menuDate4"
              :close-on-content-click="false"
              :return-value.sync="userData.career.starting_from"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="userData.career.starting_from"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  placeholder="End Date"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="userData.career.starting_from"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menuDate4 = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menuDate4.save(userData.career.starting_from)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </div>
          <v-btn @click="submitCareer">Submit</v-btn>
        </div>
      </div>
    </div>
    <DialogSelectPhotoVue
      :dialog="dialog"
      :photoSelected="photoSelected?.picture?.url"
      @closeDialog="closeDialog"
      @changeAvatar="changeAvatar"
    />
  </div>
</template>

<script>
import DialogSelectPhotoVue from '../components/dashboard/DialogSelectPhoto.vue'
import HeaderDashboardVue from '../components/dashboard/HeaderDashboard.vue'
export default {
  name: 'IndexPage',
  components: {
    DialogSelectPhotoVue,
    HeaderDashboardVue,
  },
  middleware: 'auth',
  data() {
    return {
      userData: {
        age: 0,
        bio: '',
        birthday: '',
        career: {
          company_name: '',
          ending_in: '',
          starting_from: '',
        },
        cover_picture: {
          url: '',
        },
        education: {
          graduation_time: '',
          school_name: '',
        },
        hometown: '',
        name: '',
        user_picture: {
          picture: {
            url: '',
          },
        },
        user_pictures: [],
      },
      fileGallery: [],
      coverFile: null,
      photoSelected: {},
      dialog: false,
      menuDate1: false,
      menuDate2: false,
      menuDate3: false,
      menuDate4: false,
    }
  },
  computed: {
    users() {
      return this.$store.getters.getUser
    },
    basic: {
      get() {
        return this.$store.getters.getUser
      },
    },
  },
  watch: {
    users(newValue) {
      this.userData = JSON.parse(JSON.stringify(newValue))
    },
  },
  mounted() {
    this.$store.dispatch('profile')
  },
  methods: {
    increment() {
      this.$store.dispatch('test/setIncrement', 10)
    },
    changeText() {
      this.$store.set('text', 'ini udah berubah ya')
    },

    submitPersonalInformation() {
      this.$store
        .dispatch('dashboard/personalInformation', {
          name: this.userData.name,
          birthday: this.userData.birthday,
          hometown: this.userData.hometown,
          bio: this.userData.bio,
        })
        .catch((err) => {
          console.error(err.response)
        })
    },
    submitEducation() {
      this.$store
        .dispatch('dashboard/education', {
          school_name: this.userData.education.school_name,
          graduation_time: this.userData.education.graduation_time,
        })
        .catch((err) => {
          console.error(err.response)
        })
    },
    submitCareer() {
      this.$store
        .dispatch('dashboard/career', {
          company_name: this.userData.career.company_name,
          position: 'penyuplai',
          ending_in: this.userData.career.ending_in,
          starting_from: this.userData.career.starting_from,
        })
        .catch((err) => {
          console.error(err.response)
        })
    },
    submitPhoto() {
      this.$store
        .dispatch('dashboard/photos', {
          photos: this.fileGallery,
        })
        .then(() => {
          this.fileGallery = []
        })
        .catch((err) => {
          console.error(err.response)
        })
    },
    closeDialog(val) {
      this.dialog = val
    },
    clickedPhoto(val) {
      this.dialog = true
      this.photoSelected = val
    },
    changeAvatar(val) {
      this.$store
        .dispatch('dashboard/avatar', {
          id: this.photoSelected.id,
        })
        .catch((err) => {
          console.error(err.response)
        })
      this.dialog = val
    },
    changeCover() {
      this.$store
        .dispatch('dashboard/coverPhoto', {
          image: this.coverFile,
        })
        .catch((err) => {
          console.error(err.response)
        })
      this.coverFile = null
    },
  },
}
</script>

<style>
.wrapper-header {
  position: relative;
}
.avatar-header {
  width: 12.5rem;
  height: 12.5rem;
  object-fit: cover;
  border-radius: 50%;
  position: absolute;
  bottom: -6.25rem;
  left: 1.25rem;
}
.wrapper-content {
  margin-top: 0.9375rem;
  display: flex;
}
.wrapper-gallery {
  width: 30%;
  padding-top: 6.25rem;
}

.wrapper-form {
  flex: 1;
}
.wrapper-card-gallery {
  padding: 0.625rem;
}
.card-image {
  width: 100%;
  height: 9.375rem;
  cursor: pointer;
  border: 0.0625rem solid gray;
  object-fit: cover;
}
.wrapper-card-image {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.625rem;
  margin-top: 0.9375rem;
}

.wrapper-card-image img {
  border-radius: 0.25rem;
}

.form-type-1 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

@media (max-width: 37.5rem) {
  .wrapper-content {
    flex-direction: column;
  }

  .wrapper-gallery {
    width: 100%;
  }
}

@media (min-width: 37.5rem) and (max-width: 50rem) {
  .wrapper-card-image {
    grid-template-columns: 1fr;
  }
}
</style>
