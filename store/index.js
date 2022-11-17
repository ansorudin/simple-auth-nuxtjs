import Cookies from 'universal-cookie'
import EasyAccess, { defaultMutations } from 'vuex-easy-access'

export const state = () => ({
  authenticated: false,
  token: '',
  text: '',
  user: {},
})

export const getters = {
  isAuth: (state) => state.authenticated,
  getUser: (state) => state.user,
}

export const mutations = {
  ...defaultMutations(state()),
  SET_TOKEN(state, payload) {
    state.token = payload
  },
  SET_AUTHENTICATED(state, payload) {
    state.authenticated = payload
  },
}

export const plugins = [EasyAccess()]

export const actions = {
  nuxtServerInit(context, { req }) {
    const cookies = new Cookies(req.headers.cookie)
    const token = cookies.get('token_test')
    if (token) {
      context.commit('SET_TOKEN', token)
      context.commit('SET_AUTHENTICATED', true)
    } else {
      context.commit('SET_AUTHENTICATED', false)
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
      dispatch('set/token', data.data.user.access_token)
      dispatch('set/authenticated', true)
      this.$router.push('/')
    }
  },

  async register({ commit, dispatch }, payload) {
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
    dispatch('set/user', data.data.user)
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
      dispatch('token', data.data.user.access_token)
      dispatch('authenticated', true)
      this.$router.push('/')
    }
  },

  async requestSendOtp({ dispatch, rootState }) {
    const cookies = new Cookies()
    const form = new FormData()
    form.append('phone', rootState.user.phone)
    const { data } = await this.$axios.post('/api/register/otp/request', form)

    cookies.set('user_id_test', data.data.user.id)
    dispatch('set/user', data.data.user)
    this.$router.push('/otp-input')
  },

  async profile({ rootState, dispatch }) {
    const { data } = await this.$axios.get('/api/profile/me', {
      headers: {
        Authorization: rootState.token,
      },
    })
    dispatch('set/user', data.data.user)
  },

  logout({ dispatch }) {
    const cookies = new Cookies()
    cookies.remove('token_test')
    dispatch('set/authenticated', false)
    dispatch('set/token', '')
    this.$router.push('/login')
  },
}
