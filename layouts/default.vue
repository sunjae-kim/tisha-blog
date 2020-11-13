<template>
  <fragment>
    <Header />
    <SideNav />
    <Nuxt />
  </fragment>
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
