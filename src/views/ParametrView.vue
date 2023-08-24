<template>
  <div
    class="product__parameterItem"
    v-for="(parameter, key, parameterIdx) in product"
    :key="key"
  >
    <div
      v-if="key === 'name'"
      class="product__name d-flex justify-content-between flex-fill"
    >
      <span :class="{ 'bold-font': parameter.isСalculated }">{{
        parameter.value
      }}</span>
      <app-button
        :color="'btn-close'"
        @action="deleteProduct(productIdx)"
      ></app-button>
    </div>
    <span
      v-else-if="parameter.isСalculated"
      :class="{ 'bold-font': parameter.isСalculated }"
    >
      {{
        product.marginalProfitAmount.value === "NaN"
          ? "Заполните поля"
          : parameter.value
      }}
    </span>
    <app-input
      v-else
      :placeholder="
        parameter.value === undefined ? 'Введите значение' : parameter.value
      "
      :error="errors[key + productIdx]"
      v-model.number="parameter.value"
      @entered="calculateProduct(product, productIdx)"
      @enter="moveToNextInput(parameterIdx)"
      :focus="focusIndex"
      :index="parameterIdx"
    />
  </div>
</template>

<script>
import { appStore } from "../store/store.js";

export default {
  props: ["product", "productIdx"],
  data() {
    return {
      focusIndex: "",
    };
  },
  computed: {
    errors() {
      return appStore().errors;
    },
    products() {
      return appStore().products;
    },
  },
  methods: {
    moveToNextInput(parameterIdx) {
      this.focusIndex = parameterIdx + 1;
    },
    addError(key, productIdx, message, isShowMessage) {
      appStore().setError(key, productIdx, message, isShowMessage);
    },
    deleteProduct(productIdx) {
      appStore().deleteProduct(productIdx);
      this.errors.length = 0;
    },
    calculateProduct(product, productIdx) {
      appStore().errors = {};

      for (const key in product) {
        if (product[key].isСalculated) {
          continue;
        }
        if (typeof product[key].value !== "number") {
          try {
            throw new Error("Значение должно быть числом");
          } catch (err) {
            this.addError(key, productIdx, err.message, false);
          }
        }
        if (product[key].value < 0) {
          try {
            throw new Error("Значение не может быть отрицательным");
          } catch (err) {
            this.addError(key, productIdx, err.message, false);
          }
        }
        if (Object.keys(appStore().errors).length === 0) {
          const totalOrders = product.price.value * product.orders.value;
          const totalCostPrice = product.costPrice.value * product.orders.value;
          const totalMarketCommission =
            (product.marketCommission.value *
              (product.price.value * product.orders.value)) /
            100;
          const totalLogistic =
            product.logistic.value *
            (1 - product.byBack.value / 100) *
            product.orders.value;
          const totalReverseLogistics =
            product.reverseLogistics.value *
            (1 - product.byBack.value / 100) *
            product.orders.value;
          const totalTax =
            (product.price.value * product.orders.value * product.tax.value) /
            100;
          const totalCostOfMarketing =
            product.costOfMarketing.value * product.orders.value;
          const totalFullfilment =
            product.fulfillment.value * product.orders.value;

          const unitMarginalProfit =
            totalOrders -
            totalCostPrice -
            totalMarketCommission -
            totalLogistic -
            totalReverseLogistics -
            totalTax -
            totalCostOfMarketing -
            totalFullfilment;

          product.marginalProfitAmount.value = unitMarginalProfit.toFixed(2);
        }
      }
    },
  },
};
</script>

<style scoped>
.product__parameterItem {
  width: 12rem;
  height: 3rem;
  display: flex;
  align-items: center;
  margin-right: 1rem;
}
</style>
