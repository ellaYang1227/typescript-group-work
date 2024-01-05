<script setup lang="ts">
import Layout from "@/components/Layouts/Index.vue";
import ProvideItemsCard from "@/components/Room/ProvideItemsCard.vue";
import OrderDetailCard from "@/components/Order/OrderDetailCard.vue";
import { OrderDetail } from "@/interfaces/orderDetail";
import { getOrders } from "@/models/orders";
import { ref, watch } from "vue";
// 6597cab5c13e6ba34bbea04d

const showAll = ref(false);
const orderDetail = ref<OrderDetail[]>([]);
const firstOrderDetail = ref<null | OrderDetail>(null);
watch(orderDetail, () => {
  firstOrderDetail.value = orderDetail.value[orderDetail.value.length - 1];
  console.log(firstOrderDetail.value);
});

// 撈取訂單資料
async function handleGetOrders() {
  orderDetail.value = await getOrders();
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
          >
            我的訂單
          </router-link>
        </nav>
        <main class="row gap-6">
          <div class="card col-7 p-6">
            <ProvideItemsCard />
          </div>
          <div class="card col p-0">
            <OrderDetailCard
              :isHistory="true"
              :orderDetails="orderDetail"
              :isShowAll="showAll"
            >
              <button
                class="baseButton isStyleWhite w-100"
                @click="showAll = !showAll"
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
</style>
