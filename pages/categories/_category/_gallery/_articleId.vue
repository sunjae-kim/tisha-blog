<template>
  <div class="detail">
    <GalleryTitle
      :category="$route.params.category"
      :gallery="$route.params.gallery"
    />
    <section v-if="article.title">
      <h1 class="title">{{ article.title }}</h1>
      <ul class="meta">
        <li>
          <i class="far fa-user" />
          {{ article.uid || 'anonymous' }}
        </li>
        <li>
          <i class="far fa-clock" />
          {{ article.createdAt | formatTime }}
        </li>
      </ul>
      <div class="content">
        <pre>{{ article.content }}</pre>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import GalleryTitle from '@/components/molecules/GalleryTitle'
import { formatTime } from '@/utils'

export default {
  name: 'ArticleDetail',
  components: { GalleryTitle },
  computed: {
    ...mapState({ article: state => state.article.detail }),
  },
  methods: {
    ...mapActions({ getArticle: 'article/getArticle' }),
  },
  created: function () {
    this.getArticle(this.$route.params)
  },
  filters: {
    formatTime,
  },
  destroyed: function () {
    this.$store.commit('article/SET_ARTICLE', {})
  },
}
</script>

<style>
div.detail {
  display: flex;
  flex-flow: column;
  height: 100%;
}

div.detail * {
  animation: fadein 200ms;
}

div.detail section {
  max-width: 760pt;
  width: 100%;
  margin: 0 auto;
  padding: 0 24pt;
}

div.detail section h1 {
  border-bottom: 1pt solid rgba(55, 135, 216, 0.55);
  padding: 8pt 0;
}

div.detail section ul.meta {
  display: flex;
  margin: 8pt 0;
}

div.detail section ul.meta > li {
  color: rgba(0, 0, 0, 0.6);
  font-size: 10pt;
}

div.detail section ul.meta > li + li {
  margin-left: 16pt;
}

div.detail section .content {
  margin-top: 24pt;
}

@media (max-width: 768px) {
  div.detail section {
    padding: 0 8pt;
  }
}
</style>
