<template>
  <div class="d-block d-lg-flex align-items-center mb-5">
    <h1 class="me-5">UNIT - калькулятор</h1>
    <app-button
      v-if="maxProducts > products.length"
      :color="'btn btn-primary btn-sm'"
      @action="addProductName"
      >Добавить товар</app-button
    >
  </div>
</template>

<script>
import { appStore } from "../store/store.js";

export default {
  computed: {
    maxProducts() {
      return appStore().maxProducts;
    },
    products() {
      return appStore().products;
    },
  },
  methods: {
    addProductName() {
      appStore().setShowModal(true);
      appStore().setProductName("");
    },
  },
};
</script>

<style></style>
