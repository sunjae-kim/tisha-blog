const getInitialState = () => ({
  uid: '',
  username: '',
})

export const state = () => getInitialState()

export const mutations = {
  SET_USER: function (state, user) {
    for (const key in user) {
      state[key] = user[key]
    }
  },
}

export const actions = {
  login: function ({ commit }, user) {
    commit('SET_USER', user)
  },
  logout: function ({ commit }) {
    commit('SET_USER', getInitialState())
    if (['history', 'subscriptions'].includes($nuxt.$route.name)) {
      $nuxt.$router.push('/')
    }
  },
}

export default {
  state,
  mutations,
  actions,
}
