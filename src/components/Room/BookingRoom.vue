<script setup lang="ts">
import { currencyTransform } from "@/utilities/formatTransform";
import { ref, computed, onMounted } from "vue";
import DateRangePickerPlatform from "@/components/Room/DateRangePickerPlatform.vue";
import { dateFormat, daysDifference } from "@/utilities/handleDate";
import { useBookingStore } from "@/stores/booking.ts";
import dayjs from "dayjs";

const emit = defineEmits(["toBooking"]);

const bookingStore = useBookingStore();
const { booking } = bookingStore;

const { price, routeParamsId } = defineProps<{
  name: string;
  description: string;
  price: number;
  maxPeople: number;
  routeParamsId: string;
}>();

const showDatePicker = ref<boolean>(false);
const dateRange = ref<[] | [Date, Date]>([]);
const peopleNum = ref<number>(2);

const total = computed<string>(() => {
  if (!dateRange.value.length) return "0";
  const days: number = daysDifference(
    dateRange.value[0],
    dateRange.value[1],
    true
  ) as number;
  return currencyTransform(days * price);
});

const toBooking = async (): Promise<void> => {
  const bookingData = {
    startDate: dateRange.value[0] as Date,
    endDate: dateRange.value[1] as Date,
    peopleNum: peopleNum.value,
  };
  emit("toBooking", bookingData);
};

onMounted(() => {
  if (booking.id === routeParamsId) {
    peopleNum.value = booking.peopleNum;
    dateRange.value = [booking.startDate, booking.endDate];
  } else {
    const today = dayjs();
    const tomorrow = today.add(1, "day");
    const dayAfterTomorrow = today.add(2, "day");
    dateRange.value = [tomorrow.toDate(), dayAfterTomorrow.toDate()];
  }
});
</script>

<template>
  <div
    class="card p-4 p-lg-6 d-lg-flex flex-column gap-4 gap-lg-6 rounded-3 border-0 position-sticky"
  >
    <h5 class="text-neutral m-0 fw-bold pb-3 border-bottom border-neutral-40">
      預定房型
    </h5>
    <div class="d-flex flex-column gap-2">
      <h2 class="m-0">{{ name }}</h2>
      <div>{{ description }}</div>
    </div>
    <div
      class="date-range-picker d-flex flex-wrap column-gap-2 position-relative"
    >
      <div
        class="border rounded-2 p-3 border-black z-3 flex-grow-1"
        :class="[{ 'cursor-pointer': !showDatePicker }]"
        v-for="dateTarget in ['checkInDate', 'checkOutDate']"
        :key="dateTarget"
        @click="showDatePicker = true"
      >
        <label>{{ dateTarget === "checkInDate" ? "入住" : "退房" }}</label>
        <p class="m-0 date-input text-black">
          <span v-if="dateRange.length">
            {{
              dateTarget === "checkInDate"
                ? dateFormat(dateRange[0] as Date, "YYYY/MM/DD")
                : dateFormat(dateRange[1] as Date, "YYYY/MM/DD")
            }}
          </span>
        </p>
      </div>
      <transition name="fade" mode="in-out">
        <date-range-picker-platform
          class="w-100"
          v-show="showDatePicker"
          v-model:date-range="dateRange"
          v-model:show="showDatePicker"
        />
      </transition>
    </div>
    <div class="d-flex justify-content-between align-items-center text-black">
      <p class="m-0 fw-bold">人數</p>
      <div class="d-flex align-items-center gap-3">
        <button
          type="button"
          class="icon-circle d-flex justify-content-center align-items-center"
          @click="peopleNum > 1 && peopleNum--"
          :disabled="peopleNum === 1"
        >
          <font-awesome-icon icon="fa-solid fa-minus" />
        </button>
        <h6 class="m-0">{{ peopleNum }}</h6>
        <button
          class="icon-circle d-flex justify-content-center align-items-center"
          @click="peopleNum < maxPeople && peopleNum++"
          :disabled="peopleNum === maxPeople"
        >
          <font-awesome-icon icon="fa-solid fa-plus" />
        </button>
      </div>
    </div>
    <h5 class="m-0 fw-bold text-primary">
      {{ total }}
    </h5>
    <button
      class="rounded-2 py-3 w-100 baseButton isStylePrimary"
      @click="toBooking"
    >
      立即預定
    </button>
  </div>
</template>

<style scoped lang="scss">
.date-range-picker {
  margin-bottom: -24px;
  .cursor-pointer {
    cursor: pointer;
  }
  .date-input {
    height: 24px;
  }
  label {
    font-size: 12px;
  }
}
.icon-circle {
  width: 56px;
  height: 56px;
  border-radius: 100%;
  border: 1px solid $neutral-40;
  background-color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
