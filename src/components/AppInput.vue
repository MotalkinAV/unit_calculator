<template>
  <div>
    <input
      class="form-control"
      :class="{ 'is-invalid': error }"
      :placeholder="placeholder"
      :error="error"
      :type="datatype"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @keydown.enter="$emit('enter', $event.target)"
      @change="$emit('entered', $event.target)"
      :maxlength="maxlength"
      v-focus="focus === index"
    />
    <span v-if="error && error.isShowMessage" class="invalid-feedback">{{
      error.message
    }}</span>
  </div>
</template>

<script>
export default {
  emits: [
    "update:modelValue",
    "enter",
    "entered"
  ],
  props: [
    "modelValue",
    "placeholder",
    "error",
    "datatype",
    "maxlength",
    "focus",
    "index",
  ],
  directives: {
    focus: {
      updated(el, binding) {
        if (binding.value) {
          el.focus();
        }
      },
    },
  },
};
</script>

<style scoped>
.invalid-feedback {
  font-family: "Montserrat", sans-serif !important;
}
</style>
