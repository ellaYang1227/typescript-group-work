<script setup lang="ts">
import { defineProps, computed } from "vue";
import ProvideItemsCard from "@/components/Room/ProvideItemsCard.vue";
import { OrderDetail } from "@/interfaces/order";
import { daysDifference, dateTransform } from "@/utilities/handleDate";
import { currencyTransform } from "@/utilities/formatTransform";

const props = defineProps({
  // 訂單詳情
  orderDetails: {
    type: Array as () => OrderDetail[],
    default: () => [],
  },
  // 是否為歷史訂單
  isHistory: {
    type: Boolean,
    default: false,
  },
});

// 過濾 isProvide 為 true 的 Info
const filterOrderDetails = computed(() =>
  props.orderDetails.filter((item) => item)
);
</script>
<template>
  <div class="card rounded-3 border-0">
    <div class="card-body p-3 p-lg-6">
      <h5 class="mb-4 mb-lg-6" v-if="isHistory">歷史訂單</h5>
      <ul class="list-group list-group-flush">
        <!-- 單筆訂單內容 -->
        <li
          class="list-group-item p-0"
          :class="{
            'mb-4 mb-lg-6': filterOrderDetails.length - 1 > index,
          }"
          v-for="(orderDetail, index) in filterOrderDetails"
          :key="orderDetail._id"
        >
          <ul class="list-group list-group-flush d-grid gap-4 gap-lg-6">
            <li class="list-group-item px-0 pt-0 pb-4 pb-lg-6">
              <template v-if="!isHistory">
                <span class="text-neutral-80 mb-2 d-block"
                  >預訂參考編號：{{ orderDetail._id }}</span
                >
                <h5 class="mb-0">即將來的行程</h5>
              </template>
              <div
                :class="{
                  'd-flex flex-column flex-lg-row flex-lg-column flex-xl-row':
                    isHistory,
                }"
              >
                <img
                  :class="
                    isHistory
                      ? 'isHistoryImgSize me-lg-4 mb-4 mb-lg-0 mb-lg-4 mb-xl-0 flex-shrink-0'
                      : 'my-4 my-lg-6'
                  "
                  :src="orderDetail.roomId.imageUrl"
                  class="rounded roomImgHeight"
                  :alt="orderDetail.roomId.name"
                />
                <ul class="list-unstyled mb-0">
                  <li v-if="isHistory" class="text-neutral-80 mb-3">
                    預訂參考編號：{{ orderDetail._id }}
                  </li>
                  <li class="fw-bold" :class="isHistory ? 'mb-3' : 'mb-4'">
                    <h6 class="mb-0 d-flex align-items-center">
                      {{ orderDetail.roomId.name
                      }}<template v-if="!isHistory"
                        >，{{
                          daysDifference(
                            orderDetail.checkInDate,
                            orderDetail.checkOutDate
                          )
                        }}
                        <div class="vr bg-neutral-60 mx-3"></div>
                        住宿人數：{{ orderDetail.peopleNum }} 位</template
                      >
                    </h6>
                  </li>
                  <li class="mb-3" v-if="isHistory">
                    <span class="d-block">
                      住宿天數：{{
                        daysDifference(
                          orderDetail.checkInDate,
                          orderDetail.checkOutDate
                        )
                      }}
                    </span>
                    <span class="d-block">
                      住宿人數：{{ orderDetail.peopleNum }}
                      位
                    </span>
                  </li>
                  <li
                    :class="isHistory ? 'mb-3' : 'mb-4 fw-bold'"
                    class="d-grid gap-2"
                  >
                    <div class="d-flex align-items-center">
                      <div class="customize-vr"></div>
                      入住：{{ dateTransform(orderDetail.checkInDate) }}，15:00
                      可入住
                    </div>
                    <div class="d-flex align-items-center">
                      <div class="customize-vr bg-neutral-60"></div>
                      退房：{{ dateTransform(orderDetail.checkOutDate) }}，12:00
                      前退房
                    </div>
                  </li>
                  <li class="fw-bold">
                    {{ currencyTransform(orderDetail.roomId.price) }}
                  </li>
                </ul>
              </div>
            </li>
            <!-- 提供細項 -->
            <li
              class="list-group-item p-0 d-grid gap-4 gap-lg-6"
              v-if="!isHistory"
            >
              <div>
                <ProvideItemsCard
                  :isBorder="true"
                  :info="orderDetail.roomId.facilityInfo"
                  title="房內設備"
                />
              </div>
              <div>
                <ProvideItemsCard
                  :isBorder="true"
                  :info="orderDetail.roomId.amenityInfo"
                  title="備品提供"
                />
              </div>
            </li>
          </ul>
        </li>
      </ul>
      <!-- 放置 btn 插槽 -->
      <slot></slot>
    </div>
  </div>
</template>
<style lang="scss">
.roomImgHeight {
  // 歷史專用 - 圖片尺寸
  &.isHistoryImgSize {
    width: 120px;
    height: 80px;
  }
}
</style>
@/interfaces/order