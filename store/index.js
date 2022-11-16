import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'universal-cookie'

Vue.use(Vuex)
const state = {
  authenticated: false,
  token: '',
  user: {},
}

const getters = {
  isAuth: (state) => state.authenticated,
  getUser: (state) => state.user,
}
const mutations = {
  SET_AUTHENTICATED(state, payload) {
    state.authenticated = payload
  },
  SET_USER(state, payload) {
    state.user = payload
  },
  SET_TOKEN(state, payload) {
    state.token = payload
  },
}

const actions = {
  nuxtServerInit({ commit, dispatch }, { req }) {
    const cookies = new Cookies(req.headers.cookie)
    const token = cookies.get('token_test')
    if (token) {
      commit('SET_AUTHENTICATED', true)
      commit('SET_TOKEN', token)
    } else {
      commit('SET_AUTHENTICATED', false)
    }
  },

  async login({ commit, dispatch }, payload) {
    const cookies = new Cookies()
    const form = new FormData()
    form.append('phone', payload.phoneNumber)
    form.append('password', payload.password)
    form.append('latlong', '10')
    form.append('device_token', '10')
    form.append('device_type', 2)

    const { data } = await this.$axios.post('/api/oauth/sign_in', form)

    if (data.data.user.access_token) {
      cookies.set('token_test', data.data.user.access_token)
      commit('SET_TOKEN', data.data.user.access_token)
      commit('SET_AUTHENTICATED', true)
      this.$router.push('/')
    }
  },

  async register({ commit }, payload) {
    const cookies = new Cookies()
    const form = new FormData()
    form.append('phone', payload.phoneNumber)
    form.append('password', payload.password)
    form.append('country', payload.country)
    form.append('latlong', '10')
    form.append('device_token', '10')
    form.append('device_type', 2)

    const { data } = await this.$axios.post('/api/register', form)

    cookies.set('user_id_test', data.data.user.id)
    commit('SET_USER', data.data.user)
    this.$router.push('/otp-input')
  },

  async otpMatch({ commit, dispatch }, payload) {
    const cookies = new Cookies()
    const form = new FormData()
    const userId = cookies.get('user_id_test')
    form.append('user_id', userId)
    form.append('otp_code', payload.otp)

    const { data } = await this.$axios.post('/api/register/otp/match', form)

    if (data.data.user.access_token) {
      cookies.set('token_test', data.data.user.access_token)
      commit('SET_TOKEN', data.data.user.access_token)
      commit('SET_AUTHENTICATED', true)
      this.$router.push('/')
    }
  },

  async requestSendOtp({ commit, rootState }) {
    const cookies = new Cookies()
    const form = new FormData()
    form.append('phone', rootState.user.phone)
    const { data } = await this.$axios.post('/api/register/otp/request', form)

    cookies.set('user_id_test', data.data.user.id)
    commit('SET_USER', data.data.user)
    this.$router.push('/otp-input')
  },

  async profile({ commit, rootState }) {
    const { data } = await this.$axios.get('/api/profile/me', {
      headers: {
        Authorization: rootState.token,
      },
    })
    commit('SET_USER', data.data.user)
  },

  logout({ commit }) {
    const cookies = new Cookies()
    cookies.remove('token_test')
    commit('SET_AUTHENTICATED', false)
    commit('SET_TOKEN', '')
    this.$router.push('/login')
  },

  // dashboard
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
    dispatch('profile')
  },

  async education({ rootState, dispatch }, payload) {
    const form = new FormData()
    form.append('school_name', payload.name)
    form.append('graduation_time', payload.birthday)
    await this.$axios.post('/api/profile/education', form, {
      headers: {
        Authorization: rootState.token,
      },
    })
    dispatch('profile')
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
    dispatch('profile')
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
    dispatch('profile')
  },
  async avatar({ rootState, dispatch }, payload) {
    const formData = new FormData()
    formData.append('id', payload.id)
    await this.$axios.post(`/api/uploads/profile/default`, formData, {
      headers: {
        Authorization: rootState.token,
      },
    })
    dispatch('profile')
  },

  async coverPhoto({ rootState, dispatch }, payload) {
    const formData = new FormData()
    formData.append('image', payload.image)
    await this.$axios.post('/api/uploads/cover', formData, {
      headers: {
        Authorization: rootState.token,
      },
    })
    dispatch('profile')
  },
}

export default () =>
  new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
  })
