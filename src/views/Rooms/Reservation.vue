<script setup lang="ts">
import Layout from "@/components/Layouts/Index.vue";
import BasicInformation from "@/components/Room/BasicInformation.vue"
import ProvideItemsCard from "@/components/Room/ProvideItemsCard.vue";
import InformationForm from "@/components/User/InformationForm.vue"
import { apiGetUser } from "@/models/auth";
import { getRoomDetail } from "@/models/rooms";
import { currencyTransform } from "@/utilities/formatTransform";
import { daysDifference } from "@/utilities/handleDate";
import { Room } from "@/interfaces/room";
import { Order } from "@/interfaces/order";
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { Form, Field, ErrorMessage } from "vee-validate";
import { addOrder } from "@/models/orders";

const roomDetail = ref<null | Room>(null);
const orderForm = ref<null | Order>(null);
const route = useRoute();

watch<any, any>(
  () => route.params.id,
  async (newVal: string | undefined): Promise<void> => {
    if (newVal) {
      roomDetail.value = await getRoomDetail(newVal);

      orderForm.value = {
        roomId: newVal,
        peopleNum: 2,
        userInfo: {
          address: {
            zipcode: 800,
            detail: ""
          },
          name: "",
          phone: "",
          email: ""
        },
        ...getDefaultCheckDate()
      };
    }
  },
  { immediate: true }
);

// 處理預設 CheckDate
const today = new Date();
interface CheckDate {
  checkInDate: Order['checkInDate'];
  checkOutDate: Order['checkOutDate']
}
const getDefaultCheckDate = (): CheckDate => {
  const checkOutDate = transformDate(new Date(today.getTime() + 24 * 60 * 60 * 1000));
  return {
    checkInDate: transformDate(today),
    checkOutDate,
  };
}

const transformDate = (date: Date):string => {
  const year = date.getFullYear();
  const month = (`0${(date.getMonth() + 1)}`).slice(-2);
  const day = (`0${date.getDate()}`).slice(-2);
  return `${year}-${month}-${day}`;
}

// 小計金額
const subtotal = computed(():number => {
  let days = 0;
  let currentPrice = 0;
  const { value } = orderForm;
  if(value) {
    const { checkInDate, checkOutDate } = value;
    days = +(daysDifference(checkInDate, checkOutDate, true));
  }

  if(roomDetail.value) {currentPrice = roomDetail.value.price}

  return days * currentPrice;
});

// 當前訂房資訊狀態
interface OrderEditState {
  checkDate: boolean;
  peopleNum: boolean
}
const orderEditState = ref<OrderEditState>({
  checkDate: false,
  peopleNum: false
});

const switchOrderEditState = (switchItem: 'checkDate' | 'peopleNum'):void => {
  const { value } = orderEditState;
  orderEditState.value[switchItem] = !value[switchItem];
};

// 訂單房間表單驗證
const orderRoomFormSchema = {
  checkInDate(value:string): true | string {
    const { checkOutDate } = orderForm.value as Order;
    const formatToday = transformDate(today)
    if (value >= formatToday && checkOutDate > value) {
      return true;
    }

    return `開始日期不能比今天(${formatToday})早，且不能比結束日期 ${checkOutDate} 晚`;
  },
  checkOutDate(value: string): true | string {
    const { checkInDate } = orderForm.value as Order;
    const formatToday = transformDate(today)
    if (value >= formatToday && value > checkInDate) {
      return true;
    }

    return `結束日期須晚於今天(${formatToday})與開始日期 ${checkInDate}`;
  }
};

// 取得會員資料
async function getGetUser(): Promise<void>  {
  const res: any = await apiGetUser();
  const { userInfo }:any = orderForm.value as Order;
  if(userInfo && res) {
    Object.keys(userInfo).forEach(key => userInfo[key] = res[key]);
  }
}

const orderRoomFormRef = ref<any>(null);
const orderRoomFormErrNum = computed(():number => {
  const errors: { [key:string]:any } = orderRoomFormRef.value?.getErrors();
  return errors ? Object.keys(errors).length : 0;
});

// 送出訂單
async function handleSubmit(values: Order['userInfo']) {
  if(orderForm.value) { orderForm.value.userInfo = values}
  await addOrder(orderForm.value as Order);
}

</script>

<template>
  <Layout>
    <section class="text-neutral" v-if="orderForm && roomDetail">
      <Form v-slot="{ errors }" ref="orderRoomFormRef" :validation-schema="orderRoomFormSchema">
        <div class="container py-6 py-lg-11">
          <div class="d-flex align-items-center mb-6">
            <div class="d-flex justify-content-center align-items-center me-2" style="width: 40px; height: 40px;">
              <RouterLink :to="`/rooms/${orderForm.roomId}`" class="flex-shrink-0 baseButton isStyleText text-neutral fs-6">
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
                        {{ roomDetail?.name }}
                      </div>
                    </div>
                  </div>
                  <row class="row gx-3 align-items-center">
                    <div class="col">
                      <div class="d-grid gap-2">
                        <div class="d-flex align-items-center">
                          <div class="customize-vr"></div>
                          <strong>預定日期</strong>
                        </div>
                        <section v-show="orderEditState.checkDate">
                          <div class="input-group">
                            <Field
                              name="checkInDate"
                              type="date"
                              as="input"
                              class="form-control"
                              :class="{ 'is-invalid': errors.checkInDate }"
                              v-model="orderForm.checkInDate"
                            ></Field>
                            <span class="input-group-text p-3">~</span>
                            <Field
                              name="checkOutDate"
                                type="date"
                                as="input"
                                class="form-control"
                                :class="{ 'is-invalid': errors.checkOutDate }"
                                v-model="orderForm.checkOutDate"
                              ></Field>
                          </div>
                          <ErrorMessage name="checkInDate" class="invalid-feedback d-block"></ErrorMessage>
                          <ErrorMessage name="checkOutDate" class="invalid-feedback d-block"></ErrorMessage>
                        </section>
                        <section v-show="!orderEditState.checkDate">{{ orderForm.checkInDate }} ~ {{ orderForm.checkOutDate }}</section>
                      </div>
                    </div>
                    <div class="col-auto">
                      <button type="button" class="baseButton isStyleText p-0 border-0 text-neutral" @click="switchOrderEditState('checkDate')" :disabled="orderRoomFormErrNum ? true : false">編輯</button>
                    </div>
                  </row>
                  <div class="row gx-3 align-items-center">
                    <div class="col">
                      <div class="d-grid gap-2">
                        <div class="d-flex align-items-center">
                          <div class="customize-vr"></div>
                          <strong>房客人數</strong>
                        </div>
                        <Field class="form-select p-3" name="peopleNum" as="select" rules="required" v-if="orderEditState.peopleNum" v-model="orderForm.peopleNum">
                          <option :value="people" :key="people" v-for="people in roomDetail.maxPeople">{{ people }}人</option>
                        </Field>
                        <section v-else>{{ orderForm.peopleNum }} 人</section>
                      </div>
                    </div>
                    <div class="col-auto">
                      <button type="button" class="baseButton isStyleText p-0 border-0 text-neutral" @click="switchOrderEditState('peopleNum')">編輯</button>
                    </div>
                  </div>
                </div>
                </li>
                <li
                  class="list-group-item bg-transparent text-neutral px-0 pt-0 pb-6 pb-lg-7"
                >
                  <h4 class="mb-5 mb-lg-6 d-flex align-items-center justify-content-between">訂房人資訊
                    <button type="button" class="baseButton isStyleText d-none d-lg-block p-0 border-0" @click="getGetUser">套用會員資料</button>
                  </h4>
                  <InformationForm :userInformation="orderForm?.userInfo" @handleSubmit="handleSubmit" />
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
                      :info="roomDetail?.facilityInfo"
                      title="房內設備"
                    />
                  </section>
                  <section>
                    <ProvideItemsCard
                      :info="roomDetail?.amenityInfo"
                      title="備品提供"
                    />
                  </section>
                </div>
                </li>
              </ul>
            </div>
            <div class="col-lg">
              <div class="card rounded-3 border-0 text-neutral">
                <div class="card-body p-3 p-lg-6 d-grid gap-3 gap-lg-6">
                  <img class="rounded roomImgHeight" 
                  :src="roomDetail?.imageUrl" :alt="roomDetail?.name">
                  <div class="d-grid gap-3 gap-lg-4">
                    <h4 class="mb-0">價格詳情</h4>
                    <div class="d-grid" style="gap: 0.75rem">
                      <div class="row g-0">
                        <div class="col d-flex align-items-center" v-if="roomDetail?.price">
                          {{ currencyTransform(roomDetail.price) }} 
                          <div class="ms-2 text-body" v-if="orderForm">
                            <font-awesome-icon icon="fa-solid fa-xmark" class="me-1" />
                            {{ daysDifference(orderForm.checkInDate, orderForm.checkOutDate) }}
                          </div>
                        </div>
                        <div class="col-auto">{{ currencyTransform(subtotal) }}</div>
                      </div>
                      <div class="row g-0">
                        <div class="col">住宿折扣</div>
                        <div class="col-auto text-primary">{{ currencyTransform(0) }}</div>
                      </div>
                    </div>
                    <div class="bg-neutral-40" style="height: 1px"></div>
                    <div class="row g-0">
                      <div class="col"><strong>總價</strong></div>
                      <div class="col-auto"><strong>{{ currencyTransform(subtotal) }}</strong></div>
                    </div>
                  </div>
                  <button form="UserInfoForm" class="baseButton isStylePrimary d-block" :disabled="orderRoomFormErrNum ? true : false">確認訂房</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </section>
  </Layout>
</template>

<style lang="scss">
.list-group {
  --bs-list-group-border-color: var(--bs-neutral-60);
}
</style>
