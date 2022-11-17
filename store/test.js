import EasyAccess, { defaultMutations } from 'vuex-easy-access'

export const state = () => ({
  count: 0,
})

export const mutations = {
  ...defaultMutations(state()),
  increment(state, val) {
    state.count += val
  },
}

export const plugins = [EasyAccess()]

export const actions = {
  setIncrement({ dispatch }, payload) {
    dispatch('set/count', payload + 1)
  },
}
