<template>
  <div class="gallery-list">
    <GalleryTitle
      :category="$route.params.category"
      :gallery="$route.params.gallery"
    />
    <section>
      <nuxt-link
        class="write-link"
        :to="`/categories/${$route.params.category}/${$route.params.gallery}/write`"
        >새 글 작성</nuxt-link
      >
      <ul class="article-list">
        <li class="header">
          <ul>
            <li>제목</li>
            <li>글쓴이</li>
            <li>추천수</li>
            <li>날짜</li>
          </ul>
        </li>
        <li class="item" v-for="article in articleList" :key="article.id">
          <ul>
            <li style="text-align: start">
              <nuxt-link
                :to="`/categories/${$route.params.category}/${article.gallery.name}/${article.id}`"
                @click.native="$store.commit('article/SET_ARTICLE', article)"
                >{{ article.title }}</nuxt-link
              >
            </li>
            <li>{{ article.uid || 'anonymous' }}</li>
            <li>{{ article.likes.length }}</li>
            <li>
              {{ article.createdAt | formatTime }}
            </li>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import GalleryTitle from '@/components/molecules/GalleryTitle'
import { formatTime } from '@/utils'

export default {
  name: 'Gallery',
  components: {
    GalleryTitle,
  },
  computed: {
    ...mapState({ articleList: state => state.article.list }),
  },
  methods: {
    ...mapActions({
      bindArticles: 'article/bindArticles',
      createArticle: 'article/createArticle',
      setCategoryAndGallery: 'app/setCategoryAndGallery',
    }),
  },
  created: async function () {
    await this.bindArticles(this.$route.params)
    this.setCategoryAndGallery(this.$route.params)
  },
  filters: {
    formatTime,
  },
}
</script>

<style>
div.gallery-list {
  display: flex;
  flex-flow: column;
  height: 100%;
}

div.gallery-list * {
  animation: fadein 200ms;
}

div.gallery-list a {
  display: inline-block;
  color: #333333;
}

div.gallery-list a:hover {
  color: rgba(55, 135, 216);
}

div.gallery-list section {
  max-width: 760pt;
  width: 100%;
  margin: 0 auto;
  padding: 0 24pt;
  color: #333333;
}

div.gallery-list section .write-link {
  padding: 8pt 0;
}

div.gallery-list section > ul.article-list {
  font-size: 10pt;
}

div.gallery-list section > ul.article-list a {
  width: 100%;
}

div.gallery-list section > ul.article-list > li {
  padding: 2pt;
}

div.gallery-list section > ul.article-list > li + li {
  border-bottom: 1pt solid #ededed;
}

div.gallery-list section > ul.article-list > li > ul {
  display: grid;
  grid-template-columns: 5fr 1fr 1fr 1fr;
}

div.gallery-list section > ul.article-list > li.header {
  font-weight: 600;
  border-top: 1pt solid #ededed;
  border-bottom: 1pt solid #ededed;
}

div.gallery-list section > ul.article-list > li > ul > li {
  text-align: center;
}
</style>
