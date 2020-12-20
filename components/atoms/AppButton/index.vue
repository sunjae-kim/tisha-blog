<template>
  <button :type="type" :style="style">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    label: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: 'white',
    },
    backgroundColor: {
      type: String,
      default: 'rgb(0, 78, 162)',
    },
    type: {
      type: String,
      default: 'button',
    },
  },
  computed: {
    style: function () {
      return {
        color: this.color,
        backgroundColor: this.backgroundColor,
      }
    },
  },
}
</script>

<style scoped>
button {
  display: inline-block;
  font-weight: 700;
  font-size: 10pt;
  padding: 0;
  border: 0;
  border-radius: 8pt;
  cursor: pointer;
  text-align: center;
  width: 56pt;
  height: 24pt;
  line-height: 24pt;
}
</style>
