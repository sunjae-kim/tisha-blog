import { db } from '@/plugins/firebase'

export const state = () => ({
  categories: [],
  sideNav: false,
})

export const mutations = {
  TOGGLE_SIDE_NAV: function (state) {
    state.sideNav = !state.sideNav
  },
  SET_CATEGORIES: function (state, categories) {
    state.categories = categories
  },
}

export const actions = {
  bindCategories: async function ({ commit }) {
    const categorieSnapshot = await db.collection('categories').get()
    const categories = categorieSnapshot.docs.map(doc => doc.data())
    const promises = categories.map(category => {
      return db
        .collection('categories')
        .doc(category.name)
        .collection('galleries')
        .get()
    })
    const snapshots = await Promise.all(promises)
    snapshots.forEach((snapshot, idx) => {
      const galleries = snapshot.docs.map(doc => doc.data())
      categories[idx].galleries = galleries
    })
    commit('SET_CATEGORIES', categories)
  },
  toggleSideNav: function ({ commit }) {
    commit('TOGGLE_SIDE_NAV')
  },
}

export default {
  state,
  mutations,
  actions,
}
