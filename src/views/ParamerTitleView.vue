<template>
  <div class="products__parameter-name">
    <div class="parameter-name__item" v-for="(key, idx) in product" :key="idx">
      <span
        :class="{'bold-font' : key.isСalculated}"
      >{{ key.parameterTitle }}</span>
    </div>
  </div>
</template>

<script>
import { appStore } from "../store/store.js";

export default {
  computed: {
    product() {
      return appStore().product;
    },
  },
};
</script>

<style scoped>
.parameter-name__item {
  width: 11rem;
  height: 3rem;
  line-height: 1rem;
  display: flex;
  align-items: center;
  margin-right: 1rem;
}
</style>
