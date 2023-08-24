<template>
  <div class="products__parameters">
    <div
      class="product__parameter ps-1"
      v-for="(product, productIdx) in products"
      :key="productIdx"
    >
      <parametr-view :product="product" :productIdx="productIdx"></parametr-view>
    </div>
  </div>
</template>

<script>
import { appStore } from "../store/store.js";
import ParametrView from './ParametrView.vue';

export default {
  computed: {
    products() {
      return appStore().products;
    },
  },
  mounted() {
    if (this.products.length === 0) {
      this.addProduct();
    }
  },
  methods: {
    addProduct() {
      appStore().addProduct();
    },
  },
  components: {ParametrView}
};
</script>

<style scoped>
.products__parameters {
  display: flex;
  overflow-x: auto;
}
</style>
