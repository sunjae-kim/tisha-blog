<template>
  <div class="category-title">
    <span
      ><nuxt-link :to="category.path">{{ category.label }}</nuxt-link></span
    ><span v-if="labels.gallery"
      ><nuxt-link :to="gallery.path">{{ gallery.label }}</nuxt-link></span
    >
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CategoryTitle',
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

<style scoped>
.category-title {
  max-width: 760pt;
  width: 100%;
  margin: 16pt auto;
  height: 40pt;
  line-height: 40pt;
  font-size: 16pt;
  padding: 0 24pt;
}

.category-title a {
  color: black;
}

.category-title a:hover {
  color: rgba(55, 135, 216);
}

.category-title span + span:before {
  content: '·';
  margin: 0 8pt;
}

@media (max-width: 768px) {
  .category-title {
    padding: 0 8pt;
  }
}
</style>
