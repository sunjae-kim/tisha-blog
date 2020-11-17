<template>
  <div class="list">
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
      <ul>
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
            <li>
              <nuxt-link
                :to="`/categories/${$route.params.category}/${$route.params.gallery}/${article.id}`"
                @click.native="$store.commit('article/SET_ARTICLE', article)"
                >{{ article.title }}</nuxt-link
              >
            </li>
            <li>{{ article.uid || 'anonymous' }}</li>
            <li :style="{ textAlign: 'center' }">{{ article.likes.length }}</li>
            <li :style="{ textAlign: 'center' }">
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
    }),
  },
  created: function () {
    this.bindArticles(this.$route.params)
  },
  filters: {
    formatTime,
  },
}
</script>

<style>
div.list {
  display: flex;
  flex-flow: column;
  height: 100%;
}

div.list * {
  animation: fadein 200ms;
}

div.list section {
  max-width: 760pt;
  width: 100%;
  margin: 0 auto;
  padding: 0 24pt;
  color: #333333;
}

div.list section a {
  display: inline-block;
  color: #333333;
}

div.list section .write-link {
  padding: 8pt 0;
}

div.list section a:hover {
  color: rgba(55, 135, 216);
}

div.list section .item ul {
  display: grid;
  grid-template-columns: 5fr 1fr 1fr 1fr;
}

div.list section .item a {
  width: 100%;
}

div.list section > ul > li {
  padding: 2pt;
}

div.list section > ul > li + li {
  border-bottom: 1pt solid #ededed;
}

div.list li.header {
  font-weight: 600;
  border-top: 1pt solid #ededed;
  border-bottom: 1pt solid #ededed;
}

div.list li.header ul {
  display: grid;
  grid-template-columns: 5fr 1fr 1fr 1fr;
  text-align: center;
}
</style>
