import { firestoreAction } from 'vuexfire'
import firebase, { db } from '@/plugins/firebase'

export const state = () => ({
  detail: {},
  list: [],
})

export const mutations = {
  SET_ARTICLE_LIST: function (state, articles) {
    state.list = articles
  },
  SET_ARTICLE: function (state, detail) {
    state.detail = detail
  },
}

export const actions = {
  bindArticles: firestoreAction(function (context, { category, gallery }) {
    const { rootState, bindFirestoreRef } = context
    const { app } = rootState
    if (gallery !== app.gallery || category !== app.category) {
      let articlesRef = db
        .collection(`categories/${category}/articles`)
        .orderBy('createdAt', 'desc')
      if (gallery) {
        const galleryRef = db.doc(`categories/${category}/galleries/${gallery}`)
        articlesRef = articlesRef.where('gallery', '==', galleryRef)
      }
      return bindFirestoreRef('list', articlesRef)
    }
  }),
  createArticle: async function (_, { params, article }) {
    const { category, gallery } = params
    const articlesRef = db.collection(`categories/${category}/articles`)
    const payload = {
      ...article,
      // uid: '',
      gallery: db.doc(`categories/${category}/galleries/${gallery}`),
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      views: 0,
      version: 0,
      likes: [],
      dislikes: [],
      deleted: false,
    }
    const { id } = await articlesRef.add(payload)
    await articlesRef.doc(id).collection('versions').doc('0').set({
      title: payload.title,
      conntent: payload.content,
      updatedAt: payload.createdAt,
      deleted: payload.deleted,
    })
    $nuxt.$router.push(`/categories/${category}/${gallery}/${id}`)
  },
  setArticle: async function (context, articleId) {
    const { state, commit } = context
    const article = state.list.find(article => article.id === articleId)
    commit('SET_ARTICLE', article)
  },
}
