<template>
<div class="modal show d-block">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-body">
      <app-button :color="'btn-close'" @action="closeModal"></app-button>
        <h3 class="modal__title">Введите название товара</h3>
        <app-input
          :error="errors['nameErr']"
          :datatype="'text'"
          v-model.trim="productName"
          @enter="addProduct"
          :maxlength="maxlengthInput"
        />
        <app-button :color="'btn btn-primary mt-3'" @action="addProduct"
          >Добавить товар</app-button
        >
      </div>
    </div>
  </div>
</div>
<div class="modal-backdrop show"></div>
</template>

<script>
import { appStore } from "../store/store.js";

export default {
  data() {
    return {
      maxlengthInput: appStore().maxlengthInput,
    };
  },
  computed: {
        errors() {
      return appStore().errors
    },
    productName: {
      get() {
        return appStore.productName;
      },
      set(value) {
        appStore().setProductName(value);
      },
    },
  },
  methods: {
    closeModal() {
      appStore().setShowModal(false);
      appStore().errors = {};
    },
    addProduct() {
      appStore().addProduct();
    },
  },
};
</script>

<style scoped>
</style>
