<script setup lang="ts">
import Layout from "@/components/Layouts/Index.vue";
import BasicInformation from "@/components/Room/BasicInformation.vue";
import ProvideItemsCard from "@/components/Room/ProvideItemsCard.vue";
import InformationForm from "@/components/User/InformationForm.vue";
import { getRoomDetail } from "@/models/rooms";
import { addOrder } from "@/models/orders";
import { currencyTransform } from "@/utilities/formatTransform";
import { daysDifference, dateTransform } from "@/utilities/handleDate";
import { Room } from "@/interfaces/room";
import { Order } from "@/interfaces/order";
import { useAuthStore } from "@/stores/auth";
import { ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useBookingStore } from "@/stores/booking.ts";

const roomDetail = ref<null | Room>(null);
const orderForm = ref<null | Order>(null);
const sending = ref<boolean>(false);
const route = useRoute();
const router = useRouter();

const bookingStore = useBookingStore();
const { booking, clearBookingData } = bookingStore;

watch<any, any>(
  () => route.params.id,
  async (newVal: string | undefined): Promise<void> => {
    if (newVal) {
      if (booking.id !== newVal) {
        //判斷有無訂房資料，無則退回
        await router.push(`/rooms/${newVal}`);
        return;
      }

      roomDetail.value = await getRoomDetail(newVal);

      orderForm.value = {
        roomId: newVal,
        peopleNum: booking.peopleNum,
        userInfo: {
          address: {
            zipcode: 800,
            detail: "",
          },
          name: "",
          phone: "",
          email: "",
        },
        ...getDefaultCheckDate(),
      };
    }
  },
  { immediate: true }
);

// 處理預設 CheckDate
interface CheckDate {
  checkInDate: Order["checkInDate"];
  checkOutDate: Order["checkOutDate"];
}
const getDefaultCheckDate = (): CheckDate => {
  const checkInDate = transformDate(new Date(booking.startDate));
  const checkOutDate = transformDate(new Date(booking.endDate));
  return {
    checkInDate,
    checkOutDate,
  };
};

const transformDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
};

// 小計金額
const subtotal = computed((): number => {
  let days = 0;
  let currentPrice = 0;
  const { value } = orderForm;
  if (value) {
    const { checkInDate, checkOutDate } = value;
    days = +daysDifference(checkInDate, checkOutDate, true);
  }

  if (roomDetail.value) {
    currentPrice = roomDetail.value.price;
  }

  return days * currentPrice;
});

// 取得會員資料
const authStore = useAuthStore();
const { userInformation } = storeToRefs(authStore);
async function getUserInfo(): Promise<void> {
  const { value } = userInformation;
  const { userInfo }: any = orderForm.value as Order;
  if (userInfo && value) {
    Object.keys(userInfo).forEach((key) => (userInfo[key] = value[key]));
  }
}

// 送出訂單
async function handleSubmit(values: Order["userInfo"]) {
  sending.value = true;
  if (orderForm.value) {
    orderForm.value.userInfo = values;
  }
  await addOrder(orderForm.value as Order);
  setTimeout(() => (sending.value = false), 1000);
  clearBookingData();
}

// UserInfo 表單是否無效
const informationFormComponentRef = ref<any>(null);
const userInfoFormInvalid = computed((): boolean => {
  const { value } = informationFormComponentRef;
  console.log(value);
  let invalid = value?.meta && false;
  if (value?.meta) {
    const { meta } = informationFormComponentRef.value as any;
    invalid = !meta.valid;
  }

  return invalid;
});
</script>

<template>
  <Layout>
    <section class="text-neutral" v-if="orderForm && roomDetail">
      <div class="container-lg py-6 py-lg-11">
        <div class="d-flex align-items-center mb-6">
          <div
            class="d-flex justify-content-center align-items-center me-2"
            style="width: 40px; height: 40px"
          >
            <RouterLink
              :to="`/rooms/${orderForm.roomId}`"
              class="flex-shrink-0 baseButton isStyleText text-neutral fs-6"
            >
              <font-awesome-icon icon="fa-solid fa-angle-left" />
            </RouterLink>
          </div>
          <h3 class="mb-0">確認訂房資訊</h3>
        </div>
        <div class="row gy-6 gx-xl-9">
          <div class="col-lg-7">
            <ul class="list-group list-group-flush d-grid gap-6 gap-lg-7">
              <li
                class="list-group-item bg-transparent text-neutral px-0 pt-0 pb-6 pb-lg-7"
              >
                <h4 class="mb-5 mb-lg-6">訂房資訊</h4>
                <div class="d-grid gap-4">
                  <div class="row gx-3 align-items-center">
                    <div class="col">
                      <div class="d-grid gap-2">
                        <div class="d-flex align-items-center">
                          <div class="customize-vr"></div>
                          <strong>選擇房型</strong>
                        </div>
                        {{ roomDetail.name }}
                      </div>
                    </div>
                  </div>
                  <div class="row gx-3 align-items-center">
                    <div class="col">
                      <div class="d-grid gap-2">
                        <div class="d-flex align-items-center">
                          <div class="customize-vr"></div>
                          <strong>訂房日期</strong>
                        </div>
                        <section class="d-grid gap-2">
                          <span
                            >入住：{{ dateTransform(orderForm.checkInDate) }}
                          </span>
                          <span
                            >退房：{{
                              dateTransform(orderForm.checkOutDate)
                            }}</span
                          >
                        </section>
                      </div>
                    </div>
                    <div class="col-auto">
                      <button
                        type="button"
                        class="baseButton isStyleText text-neutral"
                        @click="router.push(`/rooms/${orderForm.roomId}`)"
                      >
                        編輯
                      </button>
                    </div>
                  </div>
                  <div class="row gx-3 align-items-center">
                    <div class="col">
                      <div class="d-grid gap-2">
                        <div class="d-flex align-items-center">
                          <div class="customize-vr"></div>
                          <strong>房客人數</strong>
                        </div>
                        <section>{{ orderForm.peopleNum }} 人</section>
                      </div>
                    </div>
                    <div class="col-auto">
                      <button
                        type="button"
                        class="baseButton isStyleText p-0 border-0 text-neutral"
                        @click="router.push(`/rooms/${orderForm.roomId}`)"
                      >
                        編輯
                      </button>
                    </div>
                  </div>
                </div>
              </li>
              <li
                class="list-group-item bg-transparent text-neutral px-0 pt-0 pb-6 pb-lg-7"
              >
                <h4
                  class="mb-5 mb-lg-6 d-flex align-items-center justify-content-between"
                >
                  訂房人資訊
                  <button
                    type="button"
                    class="baseButton isStyleText d-none d-lg-block p-0 border-0"
                    @click="getUserInfo"
                  >
                    套用會員資料
                  </button>
                </h4>
                <InformationForm
                  ref="informationFormComponentRef"
                  :userInformation="orderForm.userInfo"
                  @handleSubmit="handleSubmit"
                />
              </li>
              <li class="list-group-item bg-transparent text-neutral p-0">
                <h4 class="mb-5 mb-lg-6">房間資訊</h4>
                <div class="d-grid gap-4">
                  <section v-if="roomDetail">
                    <BasicInformation
                      :areaInfo="roomDetail.areaInfo"
                      :bedInfo="roomDetail.bedInfo"
                      :maxPeople="roomDetail.maxPeople"
                    />
                  </section>
                  <section>
                    <ProvideItemsCard
                      :info="roomDetail.facilityInfo"
                      title="房內設備"
                    />
                  </section>
                  <section>
                    <ProvideItemsCard
                      :info="roomDetail.amenityInfo"
                      title="備品提供"
                    />
                  </section>
                </div>
              </li>
            </ul>
          </div>
          <div class="col-lg">
            <div
              class="card rounded-3 border-0 text-neutral roomPositionSticky"
            >
              <div class="card-body p-3 p-lg-6 d-grid gap-3 gap-lg-6">
                <img
                  class="rounded roomImgHeight"
                  :src="roomDetail.imageUrl"
                  :alt="roomDetail.name"
                />
                <div class="d-grid gap-3 gap-lg-4">
                  <h4 class="mb-0">價格詳情</h4>
                  <div class="d-grid" style="gap: 0.75rem">
                    <div class="row g-0">
                      <div
                        class="col d-flex align-items-center"
                        v-if="roomDetail.price"
                      >
                        {{ currencyTransform(roomDetail.price) }}
                        <div class="ms-2 text-body" v-if="orderForm">
                          <font-awesome-icon
                            icon="fa-solid fa-xmark"
                            class="me-1"
                          />
                          {{
                            daysDifference(
                              orderForm.checkInDate,
                              orderForm.checkOutDate
                            )
                          }}
                        </div>
                      </div>
                      <div class="col-auto">
                        {{ currencyTransform(subtotal) }}
                      </div>
                    </div>
                    <div class="row g-0">
                      <div class="col">住宿折扣</div>
                      <div class="col-auto text-primary">
                        {{ currencyTransform(0) }}
                      </div>
                    </div>
                  </div>
                  <div class="bg-neutral-40" style="height: 1px"></div>
                  <div class="row g-0">
                    <div class="col"><strong>總價</strong></div>
                    <div class="col-auto">
                      <strong>{{ currencyTransform(subtotal) }}</strong>
                    </div>
                  </div>
                </div>
                <button
                  form="UserInfoForm"
                  class="baseButton isStylePrimary d-block"
                  :disabled="userInfoFormInvalid || sending"
                >
                  <template v-if="sending">
                    <span
                      class="spinner-border spinner-border-sm me-1"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </template>
                  <template v-else>確認訂房</template>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
</template>

<style lang="scss">
.list-group {
  --bs-list-group-border-color: var(--bs-neutral-60);
}
</style>
