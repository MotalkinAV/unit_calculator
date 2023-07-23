<template>
  <div>
    <input
      class="form-control"
      type="text"
      :datatype="datatype"
      :class="{ invalid: findError }"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <small v-if="findShowText">Введите название товара</small>
  </div>
</template>

<script>
export default {
  emits: ["update:modelValue"],
  props: ["modelValue", "placeholder", "error", "datatype"],
  data() {
    return {};
  },
  computed: {
    findShowText() {
      return this.error.some((obj) => obj.type === this.datatype && obj.showText === true);
    },
    findError() {
      return this.error.some((obj) => obj.type === this.datatype);
    },
  },
};
</script>

<style scoped>
.invalid {
  transition: 300ms !important;
  border-color: red !important;
  background: rgba(255, 0, 0, 0.115) !important;
}
small {
  color: red;
}
</style>
