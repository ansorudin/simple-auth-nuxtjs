import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'universal-cookie'

Vue.use(Vuex)

const state = {
  authenticated: false,
  user: { phone: '6282111014768' },
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
}

const actions = {
  nuxtServerInit({ commit }, { req }) {
    const cookies = new Cookies(req.headers.cookie)
    const token = cookies.get('token_test')
    if (token) {
      commit('SET_AUTHENTICATED', true)
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

    const res = await this.$axios.post('/api/oauth/sign_in', form)

    if (res.data.data.user.access_token) {
      cookies.set('token_test', res.data.data.user.access_token)
      this.$axios.setToken(res.data.data.user.access_token)
      dispatch('profile')
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
    const res = await this.$axios.post('/api/register', form)
    cookies.set('user_id_test', res.data.data.user.id)
    commit('SET_USER', res.data.data.user)
    this.$router.push('/otp-input')
  },

  async otpMatch({ commit, dispatch }, payload) {
    const cookies = new Cookies()
    const form = new FormData()
    const userId = cookies.get('user_id_test')
    form.append('user_id', userId)
    form.append('otp_code', payload.otp)

    const res = await this.$axios.post('/api/register/otp/match', form)
    if (res.data.data.user.access_token) {
      cookies.set('token_test', res.data.data.user.access_token)
      this.$axios.setToken(res.data.data.user.access_token)
      dispatch('profile')
      commit('SET_AUTHENTICATED', true)
      this.$router.push('/')
    }
  },

  async requestSendOtp({ commit, rootState }) {
    const cookies = new Cookies()
    const form = new FormData()
    form.append('phone', rootState.user.phone)
    const res = await this.$axios.post('/api/register/otp/request', form)
    cookies.set('user_id_test', res.data.data.user.id)
    commit('SET_USER', res.data.data.user)
    this.$router.push('/otp-input')
  },

  async profile({ commit }) {
    const res = await this.$axios.get('/api/profile/me')
    commit('SET_USER', res.data.data.user)
  },
}

export default () =>
  new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
  })
