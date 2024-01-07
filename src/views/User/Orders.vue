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
      console.log(lastOrderDetail.value!._id)
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
      <div class="container pt-10 pb-11">
        <nav class="pb-11">
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
        <main class="row gap-6 d-flex flex-column flex-lg-row">
          <div class="card col-12 col-lg-6 col-xxl-7 p-0 h-100" v-if="lastOrderDetail">
            <OrderDetailCard :orderDetails="[lastOrderDetail]">
              <div class="d-flex justify-content-between gap-3 pt-9">
                <button class="baseButton isStyleWhite w-100" @click="cancelOrder">取消預定</button>
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
                class="baseButton isStyleWhite w-100"
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
  padding: 0 0.75rem;
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
