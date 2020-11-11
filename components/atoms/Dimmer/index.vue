<template>
  <div v-if="active" class="dimmer"></div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Dimmer',
  props: {
    active: {
      type: Boolean,
    },
  },
}
</script>

<style>
.dimmer {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  top: 0;

  animation: fadein 200ms;
  -moz-animation: fadein 200ms; /* Firefox */
  -webkit-animation: fadein 200ms; /* Safari and Chrome */
  -o-animation: fadein 200ms; /* Opera */

  z-index: 1;
}
</style>
