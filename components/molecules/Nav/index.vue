<template>
  <nav>
    <ul class="pages">
      <li
        v-for="page in pages.data"
        :key="page.id"
        :class="{ active: pages.currentPage }"
      >
        <nuxt-link :to="`/${page.path}`" prefetch>{{ page.label }}</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Nav',
  computed: {
    ...mapState(['pages']),
  },
}
</script>

<style>
nav ul.pages {
  display: flex;
  align-items: center;
  font-weight: 500;
  padding: 0;
  font-size: 12pt;
  list-style: none;
  margin: 0 16pt;
}

nav ul.pages > li {
  display: inline-block;
  margin: 0 8pt;
  color: rgba(255, 255, 255, 0.7);
}

nav ul.pages > li.active {
  color: white;
  border-bottom: 1pt solid white;
}

nav ul.pages > li > a {
  color: rgba(255, 255, 255, 0.7);
  padding: 8pt;
  text-decoration: none;
}

nav ul.pages > li > a.nuxt-link-active {
  color: white;
  border-bottom: 1pt solid white;
}

@media (max-width: 768px) {
  nav {
    display: none;
  }
}
</style>
