<template>
  <ul class="categories">
    <li
      v-for="category in categories"
      :key="category.name"
      @mouseenter="hovered = category.name"
      @mouseleave="hovered = ''"
    >
      <nuxt-link :to="`/categories/${category.name}`">{{
        category.label
      }}</nuxt-link>
      <HeaderNavDropdown
        :category="category"
        :active="hovered === category.name"
      />
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'
import HeaderNavDropdown from './HeaderNavDropdown'

export default {
  name: 'HeaderNav',
  data: function () {
    return {
      hovered: '',
    }
  },
  computed: {
    ...mapState({ categories: state => state.app.categories }),
  },
}
</script>

<style scoped>
ul.categories {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 12pt;
  margin: 0 16pt;
  height: 100%;
}

ul.categories > li {
  display: flex;
  margin: 0 8pt;
  height: 100%;
}

ul.categories > li > a {
  height: 100%;
  padding: 16pt;
  border-bottom: transparent;
  color: rgba(255, 255, 255, 0.7);
}

ul.categories > li > a:hover {
  color: rgba(255, 255, 255, 0.85);
}

ul.categories > li > a.nuxt-link-active {
  border-bottom: 2pt solid white;
  color: white;
  transition: border-bottom-color 300ms linear;
}

@media (max-width: 992px) {
  ul.categories {
    display: none;
  }
}
</style>
