<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import { dateFormat, daysDifference } from "@/utilities/handleDate";
import { ref, watch, onMounted, computed } from "vue";
import dayjs from "dayjs";

defineProps(["dateRange", "show"]);
const emit = defineEmits(["update:dateRange", "update:show"]);

const dateRangeValue = ref<[] | [Date, Date]>([]);

watch(dateRangeValue, (newVal) => {
  emit("update:dateRange", newVal);
});

const isSameDate = computed<boolean>(() => {
  if (!dateRangeValue.value.length) return true;
  const days: number = daysDifference(
    dateRangeValue.value[0],
    dateRangeValue.value[1],
    true
  ) as number;
  return days === 0;
});

const tomorrow = computed<Date>(() => {
  const today = dayjs();
  const tomorrow = today.add(1, "day");
  return tomorrow.toDate();
});

onMounted(() => {
  const startDate = tomorrow.value;
  const endDate = dayjs(startDate).add(1, "day").toDate();
  dateRangeValue.value = [startDate, endDate];
});
</script>

<template>
  <div>
    <div class="mask"></div>
    <div
      class="date-range-platform bg-white position-absolute rounded-3 p-5 d-flex gap-6 flex-column"
    >
      <div class="title d-flex flex-column justify-content-center">
        <template v-if="dateRangeValue.length">
          <h5 class="mb-2 text-black">
            {{ daysDifference(dateRange[0], dateRangeValue[1]) }}
          </h5>
          <p class="m-0">
            {{ dateFormat(dateRangeValue[0], "YYYY/MM/DD") }}
            <span class="mx-2">-</span>
            {{ dateFormat(dateRangeValue[1], "YYYY/MM/DD") }}
          </p>
        </template>
      </div>
      <VueDatePicker
        class="date-picker-inline"
        v-model="dateRangeValue"
        inline
        auto-apply
        range
        multi-calendars
        locale="zh"
        week-start="0"
        :enable-time-picker="false"
        :month-change-on-scroll="false"
        no-today
        :min-date="tomorrow"
        calendar-cell-class-name="dp-custom-cell"
        prevent-min-max-navigation
        hide-offset-dates
        year-first
      >
        <template #calendar-header="{ day }">
          {{ day.substring(1) }}
        </template>
      </VueDatePicker>
      <div class="d-flex gap-3 justify-content-end">
        <button
          class="rounded-2 py-3 baseButton isStyleWhite"
          @click="dateRangeValue = []"
        >
          清除日期
        </button>
        <button
          class="rounded-2 py-3 baseButton isStylePrimary"
          :disabled="isSameDate"
          @click="emit('update:show', false)"
        >
          確定日期
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.date-range-platform {
  width: 740px;
  top: -32px;
  right: -32px;
  .title {
    height: 81.6px;
  }
  .date-picker-inline:deep(.dp__flex_display) {
    justify-content: center;
  }
  .date-picker-inline:deep(.dp__outer_menu_wrap) {
    flex: 1;
  }
  .date-picker-inline:deep(.dp-custom-cell) {
    width: 44px;
    height: 44px;
  }
  .date-picker-inline:deep(.dp__menu_inner) {
    gap: 60px;
  }
}
.mask {
  background: #00000066;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter: blur(5px);
}
</style>
