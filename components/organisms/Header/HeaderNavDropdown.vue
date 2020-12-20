<template>
  <ul :class="{ 'drop-down-menu': true, active }">
    <li v-for="gallery in category.galleries" :key="gallery.name">
      <nuxt-link :to="`/categories/${category.name}/${gallery.name}`">{{
        gallery.label
      }}</nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'HeaderNavDropdown',
  props: {
    category: {
      type: Object,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
ul.drop-down-menu {
  position: absolute;
  top: 48pt;
  color: #333333;
  background-color: white;
  box-shadow: 0 0pt 8pt 1pt rgba(0, 0, 0, 0.1);
  padding: 8pt;
  min-width: 80pt;

  opacity: 0;
  transition: opacity 300ms;
  visibility: hidden;
}

ul.drop-down-menu.active {
  opacity: 1;
  visibility: visible;
}

ul.drop-down-menu > li {
  display: flex;
  height: 32pt;
  align-items: center;
}

ul.drop-down-menu > li + li {
  margin-top: 8pt;
}

ul.drop-down-menu > li > a {
  color: #333333;
  width: 100%;
  padding: 8pt;
}

ul.drop-down-menu > li > a.nuxt-link-active {
  color: rgba(0, 123, 255, 0.7);
}
</style>
