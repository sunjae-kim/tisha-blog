import { db } from '@/plugins/firebase'

export const state = () => ({
  categories: [],
  sideNav: false,
  category: '',
  gallery: '',
})

export const mutations = {
  TOGGLE_SIDE_NAV: function (state) {
    state.sideNav = !state.sideNav
  },
  SET_CATEGORIES: function (state, categories) {
    state.categories = categories
  },
  SET_CATEGORY_AND_GALLERY: function (state, { category, gallery }) {
    state.category = category
    state.gallery = gallery
  },
}

export const getters = {
  labels: function (state) {
    if (!state.categories.length) return {}
    const { params } = $nuxt.$route
    const category = state.categories.find(
      ({ name }) => name === params.category
    )
    const galleryLabel = params.gallery
      ? category.galleries.find(({ name }) => name === params.gallery).label
      : ''
    return { category: category.label, gallery: galleryLabel }
  },
}

export const actions = {
  bindCategories: async function ({ commit }) {
    const categorieSnapshot = await db.collection('categories').get()
    const categories = categorieSnapshot.docs.map(doc => doc.data())
    const galleryGroup = await db.collectionGroup('galleries').get()
    const galleries = galleryGroup.docs.map(doc => doc.data())
    categories.forEach(category => {
      category.galleries = galleries.filter(
        gallery => category.name === gallery.category
      )
    })
    commit('SET_CATEGORIES', categories)
  },
  toggleSideNav: function ({ commit }) {
    commit('TOGGLE_SIDE_NAV')
  },
  setCategoryAndGallery: function ({ state, commit }, { category, gallery }) {
    if (gallery !== state.gallery || category !== state.category) {
      commit('SET_CATEGORY_AND_GALLERY', { category, gallery })
    }
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
