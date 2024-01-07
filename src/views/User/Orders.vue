<script setup lang="ts">
import Layout from "@/components/Layouts/Index.vue";
// import ProvideItemsCard from "@/components/Room/ProvideItemsCard.vue";
import OrderDetailCard from "@/components/Order/OrderDetailCard.vue";
import { swalWithCheckButtons } from "@/utilities/sweetAlert";
import { OrderDetail } from "@/interfaces/orderDetail";
import { getOrders, deleteOneOrder } from "@/models/orders";
import { ref, watch } from "vue";

const showAll = ref(false);
const orderDetails = ref<OrderDetail[]>([]);
const lastOrderDetail = ref<null | OrderDetail>(null);
watch(orderDetails, () => {
  if (orderDetails.value?.length) {
    lastOrderDetail.value = orderDetails.value[orderDetails.value.length - 1];
  }
});

// 取消單筆訂單
function cancelOrder() {
  swalWithCheckButtons.fire({
    icon: "info",
    title: "取消預定",
    text: "確定要取消此房型的預訂嗎?",
    showCancelButton: true,
    showConfirmButton: true,
    cancelButtonText: "關閉視窗",
    confirmButtonText: "確定取消",
  }).then((result) => {
    if (result.isConfirmed) {
      const id = lastOrderDetail.value!._id;
      deleteOneOrder(id);
    }
  })
};

// 撈取訂單資料
async function handleGetOrders() {
  orderDetails.value = await getOrders();
}
handleGetOrders();
</script>

<template>
  <Layout is-has-footer-decoration>
    <section class="bg-neutral-dark user">
      <div class="banner">
        <img class="banner__bg w-100 d-none d-lg-block" src="@/assets/userBanner.png" alt="userBanner">
        <img class="banner__bg w-100 d-block d-lg-none" src="@/assets/userBannerMobile.jpg" alt="userBanner">
        <div class="banner__container container">
          <div class="banner__head d-flex flex-column flex-lg-row align-items-lg-center gap-3 gap-lg-4">
            <img src="@/assets/headSticker.png" alt="headSticker">
            <p class="text-white">Hello，Jessica</p>
          </div>
        </div>
      </div>
      <div class="container container-lg pb-11">
        <nav class="py-10">
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
        <main class="row gap-4 gap-lg-6 d-flex flex-column flex-lg-row w-100 m-auto">
          <div class="card col-12 col-lg-6 col-xxl-6 p-0 h-100" v-if="lastOrderDetail">
            <OrderDetailCard :orderDetails="[lastOrderDetail]">
              <div class="d-flex justify-content-between gap-3 pt-6">
                <button class="baseButton isStyleSecondary w-100" @click="cancelOrder">取消預定</button>
                <RouterLink :to="`/rooms/${lastOrderDetail.roomId._id}`" 
                  class="baseButton isStylePrimary w-100"
                >
                  查看詳情
                </RouterLink>
              </div>
            </OrderDetailCard>
          </div>
          <div class="card col-12 col-lg p-0" v-if="orderDetails.length > 0">
            <OrderDetailCard
              :isHistory="true"
              :orderDetails="orderDetails"
              :isShowAll="showAll"
            >
              <button
                class="baseButton isStyleSecondary w-100"
                @click="showAll = !showAll"
                v-if="orderDetails.length > 3 && !showAll"
              >
                查看更多<font-awesome-icon class="ps-3" icon="chevron-down" />
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
