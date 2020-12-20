<template>
  <div v-if="active" class="dimmer"></div>
</template>

<script>
export default {
  name: 'AppDimmer',
  props: {
    active: {
      type: Boolean,
    },
  },
}
</script>

<style scoped>
.dimmer {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  top: 0;
  animation: fadein 200ms;
  z-index: 1;
}
</style>
