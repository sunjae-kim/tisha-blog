export const state = () => ({
  categories: [
    { id: 1, label: '저장소', path: 'store' },
    { id: 2, label: '놀이터', path: 'fun' },
    { id: 4, label: '잡담', path: 'talk' },
    { id: 5, label: '기타', path: 'etc' },
  ],
  sideNav: false,
})

export const mutations = {
  TOGGLE_SIDE_NAV: function (state) {
    state.sideNav = !state.sideNav
  },
}

export const actions = {
  toggleSideNav: function ({ commit }) {
    commit('TOGGLE_SIDE_NAV')
  },
}

export default {
  state,
  mutations,
  actions,
}
