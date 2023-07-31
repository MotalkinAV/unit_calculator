import { defineStore } from "pinia";

const MAX_LENGTH_INPUT = 14;
const MAX_QUANTITY_OF_PRODUCTS = 4;
const DEFAULT_PRODUCT_NAME = "Товар";
const NEW_PRODUCT = () => {
  return {
    name: {
      parameterTitle: "Товар",
      value: "",
      isСalculated: true,
    },
    price: {
      parameterTitle: "Цена, ₽",
      value: undefined,
      isСalculated: false,
    },
    orders: {
      parameterTitle: "Заказы, кол-во",
      value: undefined,
      isСalculated: false,
    },
    costPrice: {
      parameterTitle: "Себестоимость, ₽/ед.",
      value: undefined,
      isСalculated: false,
    },
    byBack: {
      parameterTitle: "Выкуп, %",
      value: undefined,
      isСalculated: false,
    },
    marketCommission: {
      parameterTitle: "Комиссия МП, %",
      value: 0,
      isСalculated: false,
    },
    logistic: {
      parameterTitle: "Логистика, ₽",
      value: 0,
      isСalculated: false,
    },
    reverseLogistics: {
      parameterTitle: "Обратная логистика, ₽",
      value: 0,
      isСalculated: false,
    },
    tax: {
      parameterTitle: "Налог, %",
      value: 0,
      isСalculated: false,
    },
    costOfMarketing: {
      parameterTitle: "Маркетинг, ₽/ед.",
      value: 0,
      isСalculated: false,
    },
    fulfillment: {
      parameterTitle: "Фулфилмент, ₽",
      value: 0,
      isСalculated: false,
    },
    marginalProfitAmount: {
      parameterTitle: "Маржинальная прибыль сумма, ₽",
      value: 0,
      isСalculated: true,
    },
  };
};

export const appStore = defineStore("App", {
  state: () => {
    return {
      maxProducts: MAX_QUANTITY_OF_PRODUCTS,
      maxlengthInput: MAX_LENGTH_INPUT,
      products: [],
      productName: DEFAULT_PRODUCT_NAME,
      errors: {},
      showModal: false,
      product: NEW_PRODUCT(),
    };
  },
  actions: {
    setProductName(name) {
      this.productName = name;
    },
    setError(key, productIdx, message, isShowMessage) {
      const newError = [key + productIdx]
      const errorValue = {
        message: message,
        isShowMessage: isShowMessage,
      }
      this.errors[newError] = errorValue
    },
    setShowModal(condition) {
      this.showModal = condition;
    },
    deleteProduct(idx) {
      this.products.splice(idx, 1);
    },
    addProduct() {
      try {
        if (this.productName === "") {
          throw new Error("Введите название товара");
        }
        const newProduct = NEW_PRODUCT();

        newProduct.name.value = this.productName;

        this.showModal = false;
        this.products.push(newProduct);
        this.errors = {};
      } catch (err) {
        this.setError('name', 'Err', err.message, true)
      }
    },
  },
});
