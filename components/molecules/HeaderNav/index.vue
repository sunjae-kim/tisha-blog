<template>
  <nav class="header-nav">
    <ul class="categories">
      <li v-for="category in categories" :key="category.id">
        <nuxt-link :to="`/${category.path}`">{{ category.label }}</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HeaderNav',
  computed: {
    ...mapState({ categories: state => state.app.categories }),
  },
}
</script>

<style>
.header-nav ul.categories {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 12pt;
  margin: 0 16pt;
}

.header-nav ul.categories > li {
  display: inline-block;
  margin: 0 8pt;
  color: rgba(255, 255, 255, 0.7);
}

.header-nav ul.categories > li > a {
  color: rgba(255, 255, 255, 0.7);
  padding: 8pt;
  border-bottom: transparent;
}

.header-nav ul.categories > li > a.nuxt-link-active {
  color: white;
  border-bottom: 1pt solid white;
  transition: border-bottom-color 0.6s linear;
}

@media (max-width: 768px) {
  .header-nav {
    display: none;
  }
}
</style>
