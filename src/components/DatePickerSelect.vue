<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { Ref } from "vue";

const { modelValue } = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const year: Ref<number> = ref(1990);
const month: Ref<number> = ref(8);
const day: Ref<number> = ref(15);

const currentYear = computed<number>(() => {
  return new Date().getFullYear();
});

// 計算月份日子
const monthDays = computed<number>(() => {
  const date: Date = new Date(year.value, month.value - 1, 1);
  date.setMonth(date.getMonth() + 1);
  date.setDate(date.getDate() - 1);
  return date.getDate();
});

// 若選取日子>月份日子，重設為1
watch(monthDays, (newValue: number) => {
  if (day.value > newValue) day.value = 1;
});

const formatDate = (): void => {
  emit("update:modelValue", `${year.value}/${month.value}/${day.value}`);
};

// 建立初始值
const setInitValue = (): void => {
  if (modelValue) {
    const dateArray = modelValue.split("/").map(Number);
    year.value = dateArray[0];
    month.value = dateArray[1];
    day.value = dateArray[2];
  }
  formatDate();
};
setInitValue();
</script>

<template>
  <section class="d-flex gap-2">
    <select class="form-select p-3" v-model="year" @change="formatDate">
      <option
        v-for="year in currentYear - 1911 + 1"
        :key="`year-${year}`"
        :value="currentYear - year + 1"
      >
        {{ currentYear - year + 1 }}
      </option>
    </select>
    <select class="form-select p-3" v-model="month" @change="formatDate">
      <option v-for="month in 12" :key="`month-${month}`">{{ month }}</option>
    </select>
    <select class="form-select p-3" v-model="day" @change="formatDate">
      <option v-for="day in monthDays" :key="`day-${day}`">{{ day }}</option>
    </select>
  </section>
</template>
