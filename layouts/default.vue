<template>
  <div>
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Header from '@/components/organisms/Header'
import '@/assets/global.css'

export default {
  components: {
    Header,
  },
}
</script>
