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
    const articlesRef = db
      .collection('categories')
      .doc(category)
      .collection('articles')
      .where('gallery', '==', gallery)
    context.bindFirestoreRef('list', articlesRef)
  }),
  unbindArticles: firestoreAction(function (context) {
    context.unbindFirestoreRef('list')
  }),
  createArticle: async function (context, { params, article }) {
    const { category, gallery } = params
    const articlesRef = db
      .collection('categories')
      .doc(category)
      .collection('articles')

    const payload = {
      ...article,
      // uid: '',
      gallery,
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
  getArticle: async function (context, { category, articleId }) {
    const article = await db
      .collection('categories')
      .doc(category)
      .collection('articles')
      .doc(articleId)
      .get()
      .then(doc => doc.data())

    context.commit('SET_ARTICLE', article)
  },
}
