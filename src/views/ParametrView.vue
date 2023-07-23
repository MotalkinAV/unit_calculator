<template>
  <div class="products__parameters">
    <div
      class="product__parameter"
      v-for="(product, idx) in products"
      :key="idx"
    >
      <div class="parameter__item" v-for="(item, key) in product" :key="key">
        <p
          v-if="
            key === 'title' ||
            key === 'revenue' ||
            key === 'marginalProfitUnit' ||
            key === 'marginalProfitAmount'
          "
        >
          <b>{{ item }}</b>
        </p>
        <app-input
          v-else
          :datatype="key + idx"
          :placeholder="item === undefined ? 'Введите значение' : item"
          :error="errorAlert"
          v-model.number="product[key]"
        />
      </div>
      <div class="parameter__item">
        <app-button
          :color="'btn-primary'"
          @action="calculateProduct(product, idx)"
          >Рассчитать товар</app-button
        >
      </div>
      <div class="parameter__item">
        <app-button :color="'btn-danger'" @action="deleteProduct(idx)"
          >Удалить товар</app-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { appStore } from "../store/store.js";

export default {
  watch: {
    errorAlert(errorAlert) {
      appStore().setErrorAlert(errorAlert);
    },
  },
  computed: {
    errorAlert() {
      return appStore().errorAlert;
    },
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
    addError(errorAlert) {
      appStore().setErrorAlert(errorAlert);
    },
    addProduct() {
      appStore().addProduct();
    },
    deleteProduct(idx) {
      appStore().deleteProduct(idx);
      this.errorAlert.length = 0
    },
    calculateProduct(product, idx) {
      this.errorAlert.length = 0;

      for (const key in product) {
        if (
          key === "title" ||
          key === "revenue" ||
          key === "marginalProfitUnit" ||
          key === "marginalProfitAmount"
        ) {
          continue;
        }
        if (typeof product[key] !== "number") {
          try {
            throw new Error("Значение должно быть числом");
          } catch (err) {
            this.errorAlert.push({
              type: key + idx,
              text: err.message,
              showText: false,
            });
          }
        }
        if (product[key] < 0) {
          try {
            throw new Error("Значение не может быть отрицательным");
          } catch (err) {
            this.errorAlert.push({
              type: key + idx,
              text: err.message,
              showText: false,
            });
          }
        }
      }
      if (this.errorAlert.length === 0) {
        const totalOrders = product.price * product.orders;
        const totalCostPrice = product.costPrice * product.orders;
        const totalMarketCommission =
          (product.marketCommission * (product.price * product.orders)) / 100;
        const totalLogistic =
          product.logistic * (1 - product.byBack / 100) * product.orders;
        const totalReverseLogistics =
          product.reverseLogistics *
          (1 - product.byBack / 100) *
          product.orders;
        const totalTax = (product.price * product.orders * product.tax) / 100;
        const totalCostOfMarketing = product.costOfMarketing * product.orders;
        const totalFullfilment = product.fulfillment * product.orders;

        const unitMarginalProfit =
          totalOrders -
          totalCostPrice -
          totalMarketCommission -
          totalLogistic -
          totalReverseLogistics -
          totalTax -
          totalCostOfMarketing -
          totalFullfilment;

        product.revenue = 
          ((product.byBack / 100) * product.price * product.orders).toFixed(2)
        product.marginalProfitUnit = (unitMarginalProfit).toFixed(2)
        product.marginalProfitAmount =
          (unitMarginalProfit * ((product.byBack / 100) * product.orders)).toFixed(2)
      }
    },
  },
};
</script>

<style scoped>
.products__parameters {
  display: flex;
  overflow-x: auto;
}

.parameter__item {
  width: 12rem;
  height: 3rem;
  display: flex;
  align-items: center;
  margin-right: 1rem;
}
</style>
