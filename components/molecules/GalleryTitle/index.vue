<template>
  <p class="gallery-title">
    <nuxt-link :to="`/categories/${category}/${gallery}`">{{
      title
    }}</nuxt-link>
  </p>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'GalleryTitle',
  props: {
    gallery: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  computed: {
    ...mapState({ categories: state => state.app.categories }),
    title: function () {
      const category = this.categories.find(
        category => category.name === this.category
      )
      const gallery =
        category &&
        category.galleries.find(gallery => gallery.name === this.gallery)
      return category ? `${category.label} ∙ ${gallery.label}` : ''
    },
  },
}
</script>

<style>
.gallery-title {
  max-width: 760pt;
  width: 100%;
  margin: 16pt auto;
  height: 40pt;
  line-height: 40pt;
  font-size: 16pt;
  padding: 0 24pt;
}

.gallery-title a {
  color: black;
}

.gallery-title a:hover {
  color: rgba(55, 135, 216);
}

@media (max-width: 768px) {
  .gallery-title {
    padding: 0 8pt;
  }
}
</style>
