import { defineStore } from "pinia";

const MAX_LENGTH_INPUT = 14;
const MAX_QUANTITY_OF_PRODUCTS = 4;
const DEFAULT_PRODUCT_NAME = "Товар";
const NEW_PRODUCT = () => {
  const parameter = (parameterTitle, value, isСalculated) => ({
    parameterTitle,
    value,
    isСalculated,
  });

  return {
    name: parameter("Товар", "", true),
    price: parameter("Цена, ₽", undefined, false),
    orders: parameter("Заказы, кол-во", undefined, false),
    costPrice: parameter("Себестоимость, ₽/ед.", undefined, false),
    byBack: parameter("Выкуп, %", undefined, false),
    marketCommission: parameter("Комиссия МП, %", 0, false),
    logistic: parameter("Логистика, ₽", 0, false),
    reverseLogistics: parameter("Обратная логистика, ₽", 0, false),
    tax: parameter("Налог, %", 0, false),
    costOfMarketing: parameter("Маркетинг, ₽/ед.", 0, false),
    fulfillment: parameter("Фулфилмент, ₽", 0, false),
    marginalProfitAmount: parameter("Маржинальная прибыль сумма, ₽", 0, true),
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
      const newError = [key + productIdx];
      const errorValue = {
        message: message,
        isShowMessage: isShowMessage,
      };
      this.errors[newError] = errorValue;
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
        this.setError("name", "Err", err.message, true);
      }
    },
  },
});
