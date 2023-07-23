<template>
  <div class="products__parameter-name">
    <div
      class="parameter-name__item"
      v-for="(title, idx) in parameterTitles"
      :key="idx"
    >
      <b v-if="idx === 0 || idx === 3 || idx === 12 || idx === 13">{{
        title
      }}</b>
      <p v-else>{{ title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parameterTitles: [
        "Товар",
        "Цена, ₽",
        "Заказы, кол-во",
        "Выручка, ₽",
        "Себестоимость, ₽/ед.",
        "Выкуп, %",
        "Комиссия МП, %",
        "Логистика, ₽",
        "Обратная логистика, ₽",
        "Налог, %",
        "Маркетинг, ₽/ед.",
        "Фулфилмент, ₽",
        "Маржинальная прибыль 1 шт, ₽",
        "Маржинальная прибыль сумма, ₽",
      ],
    }
  }
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
