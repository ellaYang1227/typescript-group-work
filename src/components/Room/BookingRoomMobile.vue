<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import { Offcanvas } from "bootstrap";
import dayjs from "dayjs";
import { currencyTransform } from "@/utilities/formatTransform";
import { dateFormat, daysDifference } from "@/utilities/handleDate";
import { useBookingStore } from "@/stores/booking.ts";

const emit = defineEmits(["toBooking"]);

const bookingStore = useBookingStore();
const { booking } = bookingStore;

const { price, routeParamsId } = defineProps<{
  price: number;
  maxPeople: number;
  routeParamsId: string;
}>();

const peopleNum = ref<number>(0);
const dateRange = ref<[] | [Date, Date]>([]);
const isSelectDateRangeFinish = ref<boolean>(true);

// 步驟
const steps = ["default", "selectDateRange", "setPeopleNum", "finish"];
type Step = (typeof steps)[number];
const step = ref<Step>("default");

// 訂房結果文字
const roomResult = computed<string>(() => {
  let days: number = 1;
  if (dateRange.value.length)
    days = daysDifference(
      dateRange.value[0],
      dateRange.value[1],
      true
    ) as number;

  let daysText: string = days !== 1 ? ` / ${days} 晚` : ` / 晚`;

  let peopleText: string = peopleNum.value ? ` / ${peopleNum.value} 人` : "";

  return currencyTransform(price * days) + daysText + peopleText;
});

const tomorrow = computed<Date>(() => {
  const today = dayjs();
  const tomorrow = today.add(1, "day");
  return tomorrow.toDate();
});

const isSameDate = computed<boolean>(() => {
  if (!dateRange.value.length) return true;
  const days: number = daysDifference(
    dateRange.value[0],
    dateRange.value[1],
    true
  ) as number;
  return days === 0;
});

const bookingOffcanvas = ref<HTMLElement | null>(null);
let bsOffcanvas: Offcanvas;

onMounted(() => {
  bsOffcanvas = new Offcanvas(bookingOffcanvas.value as HTMLElement);
  if (booking.id === routeParamsId) {
    peopleNum.value = booking.peopleNum;
    dateRange.value = [booking.startDate, booking.endDate];
  }
});

const showBsOffcanvas = (nextStep: string): void => {
  step.value = nextStep;
  if (nextStep === "selectDateRange" && !dateRange.value.length) {
    //預設明天-後天
    const startDate = tomorrow.value;
    const endDate = dayjs(startDate).add(1, "day").toDate();
    dateRange.value = [startDate, endDate];
  } else if (nextStep === "setPeopleNum" && !peopleNum.value) {
    peopleNum.value = 2; //預設人數2
  }
  bsOffcanvas.show();
};

const hideBsOffcanvas = (nextStep: string): void => {
  if (nextStep === "default") {
    // 回到預設值
    dateRange.value = [];
    peopleNum.value = 0;
  }
  step.value = nextStep;
  bsOffcanvas.hide();
};

const toBooking = async (): Promise<void> => {
  const bookingData = {
    startDate: dateRange.value[0] as Date,
    endDate: dateRange.value[1] as Date,
    peopleNum: peopleNum.value,
  };
  emit("toBooking", bookingData);
};
</script>

<template>
  <section>
    <div
      ref="bookingOffcanvas"
      class="offcanvas offcanvas-bottom rounded-top-2"
      data-bs-backdrop="static"
    >
      <div
        class="offcanvas-header align-items-start flex-column gap-3 pt-3 pb-2 px-4 border-bottom border-neutral-40 z-3"
      >
        <font-awesome-icon
          class="fs-4"
          :class="[{ 'text-black': step === 'setPeopleNum' }]"
          icon="fa-solid fa-xmark"
          @click="hideBsOffcanvas('default')"
        />
        <div class="d-flex align-items-center gap-3">
          <h6 class="m-0 text-black">
            {{
              dateRange.length
                ? daysDifference(dateRange[0], dateRange[1], false)
                : "0 晚"
            }}
          </h6>
          <div v-if="dateRange.length">
            {{ dateFormat(dateRange[0], "YYYY / MM / DD") }} -
            {{ dateFormat(dateRange[1], "YYYY / MM / DD") }}
          </div>
        </div>
      </div>
      <div class="offcanvas-body p-4">
        <VueDatePicker
          v-show="step === 'selectDateRange'"
          class="date-picker-inline"
          v-model="dateRange"
          inline
          auto-apply
          range
          multi-calendars
          locale="zh"
          week-start="0"
          :enable-time-picker="false"
          no-today
          :min-date="tomorrow"
          :month-change-on-scroll="false"
          prevent-min-max-navigation
          hide-offset-dates
          year-first
          @range-start="isSelectDateRangeFinish = false"
          @range-end="isSelectDateRangeFinish = true"
        >
          <template #calendar-header="{ day }">
            {{ day.substring(1) }}
          </template>
        </VueDatePicker>
        <div class="set-people-area" v-show="step === 'setPeopleNum'">
          <div class="mb-1 text-black fw-bold title">選擇人數</div>
          <div>此房型最多供 {{ maxPeople }} 人居住，不接受寵物入住。</div>
          <div class="mt-3 d-flex align-items-center gap-3">
            <button
              type="button"
              class="icon-circle d-flex justify-content-center align-items-center"
              @click="peopleNum > 1 && peopleNum--"
              :disabled="peopleNum === 1"
            >
              <font-awesome-icon icon="fa-solid fa-minus" />
            </button>
            <h6 class="m-0 text-black">{{ peopleNum }}</h6>
            <button
              class="icon-circle d-flex justify-content-center align-items-center"
              @click="peopleNum < maxPeople && peopleNum++"
              :disabled="peopleNum === maxPeople"
            >
              <font-awesome-icon icon="fa-solid fa-plus" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <section
      class="fixed-bottom fix-booking d-flex justify-content-between align-items-center bg-white border-top border-neutral-40"
    >
      <template v-if="step === 'selectDateRange'">
        <button
          class="rounded-2 w-100 baseButton isStyleWhite"
          @click="dateRange = []"
        >
          清除日期
        </button>
        <button
          class="rounded-2 w-100 baseButton isStylePrimary"
          :disabled="isSameDate || !isSelectDateRangeFinish"
          @click="showBsOffcanvas('setPeopleNum')"
        >
          確定日期
        </button>
      </template>
      <template v-else-if="step === 'setPeopleNum'">
        <button
          class="rounded-2 w-100 baseButton isStyleWhite"
          @click="step = 'selectDateRange'"
        >
          重新選擇日期
        </button>
        <button
          class="rounded-2 w-100 baseButton isStylePrimary"
          :disabled="isSameDate"
          @click="hideBsOffcanvas('finish')"
        >
          儲存
        </button>
      </template>
      <template v-else>
        <div class="flex-grow-1">
          {{ roomResult }}
          <div v-if="dateRange.length" class="mt-1 text-black date-format">
            {{ dateFormat(dateRange[0], "M / D") }} -
            {{ dateFormat(dateRange[1], "M / D") }}
          </div>
        </div>
        <button
          v-if="step === 'finish'"
          class="rounded-2 baseButton flex-grow-1 isStylePrimary"
          @click="toBooking"
        >
          立即預定
        </button>
        <button
          v-else
          class="rounded-2 baseButton flex-grow-1 isStylePrimary"
          @click="showBsOffcanvas('selectDateRange')"
        >
          查看可訂日期
        </button>
      </template>
    </section>
  </section>
</template>

<style scoped lang="scss">
.fix-booking {
  padding: 12px;
  gap: 10px;
  z-index: 1046;
  .date-format {
    font-size: 12px;
    text-decoration: underline;
  }
}
.offcanvas {
  bottom: 82px;
  height: inherit;
  max-height: calc(100vh - 82px - 36px);
  .date-picker-inline:deep {
    .dp__outer_menu_wrap {
      width: 100%;
    }
    .dp__month_year_select {
      font-size: 14px;
    }
    .dp__menu_inner {
      gap: 48px;
      font-size: 14px;
    }
    .dp__calendar_item {
      display: flex;
      justify-content: center;
      flex-grow: 0;
      width: 100%;
    }
    .dp__range_between {
      width: 100%;
    }
  }
  .set-people-area {
    .title {
      font-size: 16px;
    }
    .icon-circle {
      width: 56px;
      height: 56px;
      border-radius: 100%;
      border: 1px solid $neutral-40;
      background-color: white;
      &:disabled {
        color: $neutral-60;
      }
    }
  }
}
:deep(.offcanvas-backdrop) {
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  &.show {
    opacity: 1;
  }
}
</style>
