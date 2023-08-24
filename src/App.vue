<template>
  <div class="container" id="app">
    <div class="row my-5">
      <app-header />
      <app-modal v-if="showModal"/>
      <div class="products d-flex">
        <app-parameter-title />
        <app-products />
      </div>
    </div>
  </div>
</template>

<script>
import { appStore } from "./store/store.js";
import AppHeader from "./components/AppHeader.vue";
import AppModal from "./components/AppModal.vue";
import AppParameterTitle from "./components/AppParameterTitle.vue";
import AppProducts from './components/AppProducts.vue';

export default {
  computed: {
    showModal() {
      return appStore().showModal;
    },
  },
  components: { AppHeader, AppModal, AppParameterTitle, AppProducts, },
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
