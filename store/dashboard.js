export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},

  actions: {
    async personalInformation({ rootState, dispatch }, payload) {
      const form = new FormData()
      form.append('name', payload.name)
      form.append('birthday', payload.birthday)
      form.append('hometown', payload.hometown)
      form.append('bio', payload.bio)
      form.append('gender', 0)
      await this.$axios.post('/api/profile', form, {
        headers: {
          Authorization: rootState.token,
        },
      })
      dispatch('profile', null, { root: true })
    },

    async education({ rootState, dispatch }, payload) {
      const form = new FormData()
      form.append('school_name', payload.school_name)
      form.append('graduation_time', payload.graduation_time)
      await this.$axios.post('/api/profile/education', form, {
        headers: {
          Authorization: rootState.token,
        },
      })
      dispatch('profile', null, { root: true })
    },

    async career({ rootState, dispatch }, payload) {
      const form = new FormData()
      form.append('position', payload.position)
      form.append('company_name', payload.company_name)
      form.append('starting_from', payload.starting_from)
      form.append('ending_in', payload.ending_in)
      await this.$axios.post('/api/profile/career', form, {
        headers: {
          Authorization: rootState.token,
        },
      })
      dispatch('profile', null, { root: true })
    },

    photos({ rootState, dispatch }, payload) {
      const promise = []
      payload.photos.forEach((image, idx) => {
        const formData = new FormData()
        formData.append('image', image)
        this.$axios.post(`/api/uploads/profile`, formData, {
          headers: {
            Authorization: rootState.token,
          },
        })
      })
      Promise.all(promise)
      dispatch('profile', null, { root: true })
    },
    async avatar({ rootState, dispatch }, payload) {
      const formData = new FormData()
      formData.append('id', payload.id)
      await this.$axios.post(`/api/uploads/profile/default`, formData, {
        headers: {
          Authorization: rootState.token,
        },
      })
      dispatch('profile', null, { root: true })
    },

    async coverPhoto({ rootState, dispatch }, payload) {
      const formData = new FormData()
      formData.append('image', payload.image)
      await this.$axios.post('/api/uploads/cover', formData, {
        headers: {
          Authorization: rootState.token,
        },
      })
      dispatch('profile', null, { root: true })
    },
  },
}
