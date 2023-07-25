import { defineStore } from "pinia";

export const appStore = defineStore("App", {
  state: () => {
    return {
      maxProducts: 4,
      products: [],
      productName: "Товар",
      errorAlert: [],
      showModal: false,
    };
  },
  actions: {
    setProductName(name) {
      this.productName = name;
    },
    setErrorAlert(error) {
      this.errorAlert.push(error);
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
        const newProduct = {
          title: `${this.productName}`,
          price: undefined,
          orders: undefined,
          revenue: 0,
          costPrice: undefined,
          byBack: undefined,
          marketCommission: undefined,
          logistic: undefined,
          reverseLogistics: undefined,
          tax: undefined,
          costOfMarketing: undefined,
          fulfillment: undefined,
          marginalProfitUnit: 0,
          marginalProfitAmount: 0,
        };

        this.showModal = false;
        this.products.push(newProduct);
        this.errorAlert = [];
      } catch (err) {
        this.errorAlert.push({
          type: "nameDanger",
          text: err.message,
          showText: true,
        });
      }
    },
  },
});
