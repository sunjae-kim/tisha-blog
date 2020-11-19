<template>
  <p class="gallery-title">
    <nuxt-link :to="category.path">{{ category.label }}</nuxt-link>
    <span v-if="gallery.label">
      ·
      <nuxt-link :to="gallery.path">{{ gallery.label }}</nuxt-link>
    </span>
  </p>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'GalleryTitle',
  computed: {
    ...mapGetters({ labels: 'app/labels' }),
    category: function () {
      return {
        path: `/categories/${this.$route.params.category}`,
        label: this.labels.category,
      }
    },
    gallery: function () {
      return {
        path: `/categories/${this.$route.params.category}/${this.$route.params.gallery}`,
        label: this.labels.gallery,
      }
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
