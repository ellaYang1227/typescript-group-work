<script setup lang="ts">
import Layout from "@/components/Layouts/Index.vue";
import OrderDetailCard from "@/components/Order/OrderDetailCard.vue";
import { getOrderDetail } from "@/models/orders";
import { OrderDetail } from "@/interfaces/order";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const orderDetail = ref<null | OrderDetail>(null);
const route = useRoute();

watch<any, any>(
  () => route.params.id,
  async (newVal: string | undefined): Promise<void> => {
    if (newVal) {
      orderDetail.value = await getOrderDetail(newVal);
    }
  },
  { immediate: true }
);
</script>

<template>
  <Layout is-has-footer-decoration>
    <section class="bg-neutral-dark">
      <div class="container py-6 py-lg-11">
        <div class="row gy-8 gx-xl-9">
          <div class="col-lg-7">
            <ul class="list-group list-group-flush d-grid gap-6 gap-lg-10">
              <li
                class="list-group-item bg-transparent px-0 pt-0 pb-6 pb-lg-10"
              >
                <div class="d-sm-flex align-items-center mb-5 mb-lg-6">
                  <font-awesome-icon
                    icon="fa-solid fa-circle-check"
                    class="text-success flex-shrink-0"
                    size="3x"
                  />
                  <h1 class="pt-3 pt-sm-0 ps-sm-6 text-white mb-0">
                    恭喜，{{ orderDetail?.userInfo?.name }}！<br />您已預訂成功
                  </h1>
                </div>
                <p class="mb-0 text-neutral-40">
                  我們已發送訂房資訊及詳細內容至你的電子信箱，入住時需向櫃檯人員出示訂房人證件。
                </p>
              </li>
              <li
                class="list-group-item bg-transparent px-0 pt-0 pb-6 pb-lg-10"
              >
                <h5 class="text-white mb-6">立即查看您的訂單紀錄</h5>
                <router-link
                  to="/user/orders"
                  class="baseButton isStylePrimary d-block d-md-inline-block"
                >
                  前往我的訂單
                </router-link>
              </li>
              <li class="list-group-item bg-transparent p-0">
                <h5 class="text-white mb-6">訂房人資訊</h5>
                <ul class="list-unstyled d-grid gap-4">
                  <li class="text-white">
                    <span class="text-neutral-40 d-block mb-2">姓名</span>
                    <strong>{{ orderDetail?.userInfo?.name }}</strong>
                  </li>
                  <li class="text-white">
                    <span class="text-neutral-40 d-block mb-2">手機號碼</span>
                    <strong>{{ orderDetail?.userInfo?.phone }}</strong>
                  </li>
                  <li class="text-white">
                    <span class="text-neutral-40 d-block mb-2">電子信箱</span>
                    <strong>{{ orderDetail?.userInfo?.email }}</strong>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="col-lg" v-if="orderDetail">
            <OrderDetailCard :orderDetails="[orderDetail]" />
          </div>
        </div>
      </div>
    </section>
  </Layout>
</template>

<style lang="scss"></style>
@/interfaces/order