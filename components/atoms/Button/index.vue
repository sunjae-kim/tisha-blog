<template>
  <button :type="type" :class="classes" :style="style">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    label: {
      type: String,
      required: true,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
    },
    backgroundColor: {
      type: String,
    },
    type: {
      type: String,
      default: 'button',
    },
  },
  computed: {
    classes: function () {
      return {
        button: true,
        outlined: this.outlined,
      }
    },
    style: function () {
      return {
        color: this.color,
        backgroundColor: this.backgroundColor,
      }
    },
  },
}
</script>

<style>
.button {
  display: inline-block;
  font-weight: 700;
  font-size: 10pt;
  border: 0;
  border-radius: 8pt;
  cursor: pointer;
  text-align: center;
  width: 56pt;
  height: 24pt;
  line-height: 24pt;

  color: white;
  background-color: rgb(0, 78, 162);
}

.button.outlined {
  color: #333;
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.5) 0 0 0 1pt inset;
}
</style>
