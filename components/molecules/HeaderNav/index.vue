<template>
  <nav class="header-nav">
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
        <ul
          :class="{
            'drop-down-menu': true,
            active: hovered === category.name,
          }"
        >
          <li v-for="gallery in category.galleries" :key="gallery.name">
            <nuxt-link :to="`/categories/${category.name}/${gallery.name}`">{{
              gallery.label
            }}</nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

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

<style>
.header-nav {
  height: 100%;
}

.header-nav ul.categories {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 12pt;
  margin: 0 16pt;
  height: 100%;
}

.header-nav ul.categories > li {
  display: flex;
  flex-flow: column;
  margin: 0 8pt;
  height: 100%;
}

.header-nav ul.categories > li > a {
  color: rgba(255, 255, 255, 0.7);
  padding: 16pt;
  border-bottom: transparent;
  height: 100%;
}

.header-nav ul.categories > li > a:hover {
  color: rgba(255, 255, 255, 0.85);
}

.header-nav ul.categories > li > a.nuxt-link-active {
  color: white;
  border-bottom: 2pt solid white;
  transition: border-bottom-color 500ms linear;
}

.header-nav ul.drop-down-menu {
  position: absolute;
  top: 48pt;
  color: #333333;
  background-color: white;
  box-shadow: 0 0pt 8pt 1pt rgba(0, 0, 0, 0.1);
  padding: 8pt;
  min-width: 80pt;

  opacity: 0;
  transition: opacity 500ms;
  visibility: hidden;
}

.header-nav ul.drop-down-menu.active {
  opacity: 1;
  visibility: visible;
}

.header-nav ul.drop-down-menu > li {
  display: flex;
  height: 32pt;
  align-items: center;
}

.header-nav ul.drop-down-menu > li + li {
  margin-top: 8pt;
}

.header-nav ul.drop-down-menu > li > a {
  color: #333333;
  width: 100%;
  padding: 8pt;
}

.header-nav ul.drop-down-menu > li > a.nuxt-link-active {
  color: rgba(0, 123, 255, 0.7);
}

@media (max-width: 992px) {
  .header-nav {
    display: none;
  }
}
</style>
