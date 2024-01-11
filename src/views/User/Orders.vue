<script setup lang="ts">
import Layout from "@/components/Layouts/Index.vue";
import OrderDetailCard from "@/components/Order/OrderDetailCard.vue";
import { swalWithCheckButtons } from "@/utilities/sweetAlert";
import { OrderDetail } from "@/interfaces/order";
import { getOrders, deleteOneOrder } from "@/models/orders";
import { useAuthStore } from "@/stores";
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";
const { userInformation } = storeToRefs(useAuthStore());

const showAll = ref(false);
const orderDetails = ref<OrderDetail[]>([]);
const featureOrderDetail = ref<null | OrderDetail>(null);
const sortedFeatureOrders = ref<OrderDetail[]>([]);
const sortedHistoryOrders = ref<OrderDetail[]>([]);

// 篩選未取消的訂單
const filterOrders = computed(() => {
  return orderDetails.value.filter((item) => item.status === 0);
});

// 歷史訂單列表
function getHistoryOrders() {
  const now = Date.now();
  const checkInTime = (15 - 8) * 60 * 60 * 1000; // 入住時間為 15:00，因 new Date(checkInDate) 實際時間從 08: 00 開始

  // 篩選當前時間以前的訂單，並依照入住時間新到舊排序
  sortedHistoryOrders.value = filterOrders.value
    .filter((order) => {
      const orderTimestamp =
        new Date(order.checkInDate).getTime() + checkInTime;
      return orderTimestamp < now;
    })
    .sort(
      (a, b) =>
        new Date(b.checkInDate).getTime() - new Date(a.checkInDate).getTime()
    );
}

// 即將來的行程列表
function getFeatureOrder() {
  featureOrderDetail.value = null;
  // 1) 篩選當前時間以後的訂單，並依照入住時間舊到新排序
  const now = Date.now();
  const checkInTime = (15 - 8) * 60 * 60 * 1000; // 入住時間為 15:00，因 new Date(checkInDate) 實際時間從 08: 00 開始
  sortedFeatureOrders.value = filterOrders.value
    .filter((order) => {
      const orderTimestamp =
        new Date(order.checkInDate).getTime() + checkInTime;
      return orderTimestamp >= now;
    })
    .sort(
      (a, b) =>
        new Date(a.checkInDate).getTime() - new Date(b.checkInDate).getTime()
    );

  // 2) 如果沒有即將來的行程，則不顯示
  if (sortedFeatureOrders.value.length === 0) return;
  featureOrderDetail.value = sortedFeatureOrders.value[0]; // 顯示當前即將來的行程
}

// 切換即將來的行程
let currentOrderIndex = 0;
function handleShowOrder(state: string) {
  if (state === "prev") {
    if (currentOrderIndex > 0) {
      currentOrderIndex--;
      featureOrderDetail.value = sortedFeatureOrders.value[currentOrderIndex];
    }
  } else {
    if (currentOrderIndex < sortedFeatureOrders.value.length - 1) {
      currentOrderIndex++;
      featureOrderDetail.value = sortedFeatureOrders.value[currentOrderIndex];
    }
  }
}

// 取消單筆訂單
function cancelOrder() {
  swalWithCheckButtons
    .fire({
      icon: "info",
      title: "取消預定",
      text: "確定要取消此房型的預訂嗎?",
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: "關閉視窗",
      confirmButtonText: "確定取消",
    })
    .then((result) => {
      if (result.isConfirmed) {
        const id = featureOrderDetail.value!._id;
        deleteOneOrder(id).then(() => handleGetOrders());
      }
    });
}

// 撈取所有訂單資料，並顯示歷史訂單與即將來的行程列表
async function handleGetOrders() {
  orderDetails.value = await getOrders();
  getHistoryOrders();
  getFeatureOrder();
}
handleGetOrders();
</script>

<template>
  <Layout is-has-footer-decoration>
    <section class="bg-neutral-dark user">
      <div class="banner">
        <img
          class="banner__bg w-100 d-none d-lg-block"
          src="@/assets/userBanner.png"
          alt="userBanner"
        />
        <img
          class="banner__bg w-100 d-block d-lg-none"
          src="@/assets/userBannerMobile.jpg"
          alt="userBanner"
        />
        <div class="banner__container container">
          <div
            class="banner__head d-flex flex-column flex-lg-row align-items-lg-center gap-3 gap-lg-4"
          >
            <img src="@/assets/headSticker.png" alt="headSticker" />
            <h1 v-if="userInformation" class="text-white fw-bold m-0">
              Hello，{{ userInformation.name }}
            </h1>
          </div>
        </div>
      </div>
      <div class="container-lg pb-6 pb-lg-11">
        <nav class="py-6 py-lg-10">
          <router-link
            to="/user"
            class="baseButton isStyleGhost px-4 py-3"
            active-class="active"
          >
            個人資料
          </router-link>
          <router-link
            to="/user/orders"
            class="baseButton isStyleGhost px-4 py-3"
            active-class="active"
          >
            我的訂單
          </router-link>
        </nav>
        <main
          class="row gap-4 gap-lg-6 d-flex flex-column flex-lg-row w-100 m-auto"
        >
          <div class="card col-12 col-lg-6 col-xxl-6 p-0 h-100">
            <OrderDetailCard
              :orderDetails="featureOrderDetail ? [featureOrderDetail] : []"
            >
              <div
                v-if="featureOrderDetail"
                class="d-flex justify-content-between gap-3 pt-6"
              >
                <button
                  class="baseButton isStyleSecondary w-100"
                  @click="cancelOrder"
                >
                  取消預定
                </button>
                <RouterLink
                  :to="`/rooms/${
                    featureOrderDetail ? featureOrderDetail.roomId._id : null
                  }`"
                  class="baseButton isStylePrimary w-100"
                >
                  查看詳情
                </RouterLink>
              </div>
              <div
                v-if="sortedFeatureOrders.length > 1"
                class="d-flex justify-content-center gap-6 pt-6"
              >
                <button
                  :disabled="currentOrderIndex == 0"
                  class="baseButton isStyleText"
                  @click="handleShowOrder('prev')"
                >
                  <font-awesome-icon :icon="['fas', 'chevron-left']" />
                  <span class="ps-2">上一筆訂單</span>
                </button>
                <button
                  :disabled="
                    currentOrderIndex === sortedFeatureOrders.length - 1
                  "
                  class="baseButton isStyleText"
                  @click="handleShowOrder('next')"
                >
                  <span class="pe-2">下一筆訂單</span>
                  <font-awesome-icon :icon="['fas', 'chevron-right']" />
                </button>
              </div>
            </OrderDetailCard>
          </div>
          <div class="card col-12 col-lg p-0 h-100">
            <OrderDetailCard
              :isHistory="true"
              :orderDetails="sortedHistoryOrders"
              :isShowAll="showAll"
            >
              <button
                class="baseButton isStyleSecondary w-100"
                @click="showAll = !showAll"
                v-if="sortedHistoryOrders.length > 3 && !showAll"
              >
                查看更多<font-awesome-icon class="ps-1" icon="chevron-down" />
              </button>
            </OrderDetailCard>
          </div>
        </main>
      </div>
    </section>
  </Layout>
</template>

<style lang="scss">
.user {
  .container {
    padding: 0 0.75rem;
  }
  .banner {
    position: relative;
    &__bg {
      object-fit: cover;
      height: 12.875rem;
      @include media-breakpoint-up(lg) {
        height: 24rem;
      }
    }
    &__container {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
    &__head {
      img {
        width: 4.5rem;
        @include media-breakpoint-up(lg) {
          width: 9rem;
        }
      }
      p {
        font-size: 2rem;
        @include media-breakpoint-up(lg) {
          font-size: 3rem;
        }
      }
    }
  }
  .active {
    color: $primary;
    position: relative;
    &::after {
      content: "";
      display: block;
      width: 2rem;
      height: 0.25rem;
      border-radius: 0.625rem;
      background: $primary;
      position: absolute;
      right: 2.5rem;
      bottom: 0.25rem;
    }
  }
  .disabled-order {
    color: $neutral-60;
    cursor: default;
  }
}
.check-actions {
  flex-direction: row-reverse;
  gap: 1rem;
}
</style>
