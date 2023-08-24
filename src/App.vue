<template>
  <div class="container" id="app">
    <div class="row my-5">
      <header-view />
      <modal-view v-if="showModal"/>
      <div class="products d-flex">
        <parameter-title-view />
        <products-view/>
      </div>
    </div>
  </div>
</template>

<script>
import { appStore } from "./store/store.js";
import HeaderView from "./views/HeaderView.vue";
import ModalView from "./views/ModalView.vue";
import ParameterTitleView from "./views/ParamerTitleView.vue";
import ProductsView from './views/ProductsView.vue';

export default {
  computed: {
    showModal() {
      return appStore().showModal;
    },
  },
  components: { HeaderView, ModalView, ParameterTitleView, ProductsView, },
};
</script>

<style>
:root {
  --bs-body-font-family: "Montserrat", sans-serif !important;
}
.bold-font {
  font-weight: 600 !important;
}
</style>
