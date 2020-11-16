<template>
  <div class="main">
    <Header />
    <SideNav />
    <Nuxt />
  </div>
</template>

<script>
import SideNav from '@/components/molecules/SideNav'
import Header from '@/components/organisms/Header'
import '@/assets/global.css'

export default {
  components: {
    Header,
    SideNav,
  },
  created: function () {
    this.$store.dispatch('app/bindCategories')
  },
}
</script>

<style>
.main {
  height: 100%;
  padding-top: 48pt;
}
</style>
