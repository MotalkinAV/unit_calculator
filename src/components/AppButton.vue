<template>
  <button
    type="button"
    :class="customStyle"
    @click="$emit('action')">
    <slot />
  </button>
</template>

<script>
export default {
  emits: ["action"],
  props: {color: {
    type: String,
    default: ""
  }},
  data() {
    return {
      customStyle: [this.color, this.isTouchDevice === false ? '' : 'no-hover'],
      isTouchDevice: false,
    };
  },
  mounted() {
    this.checkTouchDevice();
    window.addEventListener("touchstart", this.checkTouchDevice);
  },
  beforeUnmount() {
    window.removeEventListener("touchstart", this.checkTouchDevice);
  },
  methods: {
    checkTouchDevice() {
      this.isTouchDevice = window.matchMedia(
        "(hover: none) and (pointer: coarse)"
      ).matches
    },
  },
};
</script>

<style scoped>
.btn {
  font-family: "Montserrat", sans-serif !important;
  width: 12rem !important;
  height: 2rem !important;
  padding-block: 0rem !important;
}
.btn-primary.no-hover:hover {
  background-color: var(--bs-primary) !important;
  border-color: var(--bs-primary) !important;
}
.btn-danger.no-hover:hover {
  background-color: var(--bs-danger) !important;
  border-color: var(--bs-danger) !important;
}
</style>
