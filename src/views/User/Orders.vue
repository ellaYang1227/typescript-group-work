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

// 歷史訂單只顯示有預約的訂單
const filterOrders = computed(() =>
  orderDetails.value.filter((item) => item.status === 0)
);

// 即將來的行程顯示入住時間最靠近今天的日期
function getFeatureOrder() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 將今天的時間設為 00:00:00
  featureOrderDetail.value = null; // 清空即將來的行程
  // 1) 過濾掉昨天以前的訂單
  const futureOrders = filterOrders.value.filter((order) => {
    const orderDate = new Date(order.checkInDate);
    return orderDate >= today;
  });
  // 2) 如果沒有即將來的行程，則不顯示
  if (futureOrders.length === 0) return;
  // 3) 依照入住時間排序
  const sortedOrders = [...futureOrders].sort(
    (a, b) =>
      (new Date(a.checkInDate) as any) - (new Date(b.checkInDate) as any)
  );
  // 4) 取得最靠近今天的訂單
  featureOrderDetail.value = sortedOrders.reduce((prev, current) => {
    const prevDate = new Date(prev.checkInDate);
    const currentDate = new Date(current.checkInDate);
    return prevDate >= today && prevDate <= currentDate ? prev : current;
  });
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

// 撈取所有訂單資料，並取得即將來的行程
async function handleGetOrders() {
  orderDetails.value = await getOrders();
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
      <div class="container container-lg pb-6 pb-lg-11">
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
            </OrderDetailCard>
          </div>
          <div class="card col-12 col-lg p-0 h-100">
            <OrderDetailCard
              :isHistory="true"
              :orderDetails="filterOrders"
              :isShowAll="showAll"
            >
              <button
                class="baseButton isStyleSecondary w-100"
                @click="showAll = !showAll"
                v-if="filterOrders.length > 3 && !showAll"
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
}
.check-actions {
  flex-direction: row-reverse;
  gap: 1rem;
}
</style>
