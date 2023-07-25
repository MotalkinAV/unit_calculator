<template>
  <div class="modal__mask">
    <div class="modal__container">
      <app-button :color="'btn-close'" @action="closeModal"></app-button>
      <div class="modal__body">
        <h3 class="modal__title">Введите название товара</h3>
        <app-input
          :error="errorAlert"
          :datatype="'nameDanger'"
          v-model.trim="productName"
          @enter="addProduct"

        />
        <app-button :color="'btn-primary mt-3'" @action="addProduct"
          >Добавить товар</app-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { appStore } from "../store/store.js";

export default {
  computed: {
    errorAlert() {
      return appStore().errorAlert;
    },
    productName: {
      get() {
        return appStore.productName;
      },
      set(value) {
        appStore().setProductName(value);
      },
    },
  },
  methods: {
    closeModal() {
      appStore().setShowModal(false);
      this.errorAlert.length = 0;
    },
    addProduct() {
      appStore().addProduct();
    },
  },
};
</script>

<style scoped>
.modal__mask {
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.modal__container {
  width: 500px;
  margin: auto;
  padding: 10px 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}
.modal__body {
  display: flex;
  flex-direction: column;
  margin-block: 1rem;
  margin-inline: 1rem;
}
.invalid {
  transition: 300ms !important;
  border-color: red !important;
  background: rgba(255, 0, 0, 0.115) !important;
}
small {
  color: red;
}
</style>
