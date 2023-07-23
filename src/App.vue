<template>
  <div class="container" id="app">
    <div class="row my-5">
      <div class="d-block d-lg-flex align-items-center mb-5">
        <h1 class="me-5">UNIT - калькулятор</h1>
        <app-button v-if="maxProducts > products.length" :color="'btn-primary'" @action="addProductName"
          >Добавить товар</app-button
        >
      </div>
      <modal-view v-if="showModal" />
      <div class="products">
        <parameter-title-view />
        <parameter-view />
      </div>
    </div>
  </div>
</template>

<script>
import { appStore } from "./store/store.js";
import ModalView from "./views/ModalView.vue";
import ParameterTitleView from "./views/ParamerTitleView.vue";
import ParameterView from "./views/ParametrView.vue";

export default {
  computed: {
    showModal() {
      return appStore().showModal;
    },
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
      appStore().setProductName('')
    }
  },













  components: { ModalView, ParameterTitleView, ParameterView, },
};
</script>

<style>
h1,
h2,
h3 {
  font-family: "Montserrat", sans-serif !important;
  font-weight: 500;
}
p,
small {
  font-family: "Montserrat", sans-serif !important;
  font-style: normal;
  font-weight: 400;
  line-height: 125% !important;
  margin-block: 0 !important;
}
p {
  font-size: 16px;
}
small {
  font-size: 10px;
}
b {
  font-weight: 600 !important;
}
.products {
  display: flex;
}
</style>
