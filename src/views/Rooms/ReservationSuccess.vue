<script setup lang="ts">
import Layout from '@/components/Layouts/index.vue';
import OrderDetailCard from '@/components/Order/OrderDetailCard.vue';
import { getOrderDetail } from '@/models/orders';
import { OrderDetail } from '@/Interface/orderDetail';
import { useAuthStore } from '@/stores/auth';
import { useLoadingStore } from '@/stores/loading';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const authStore = useAuthStore();
const loadingStore = useLoadingStore();
loadingStore.showLoading();
const orderDetail = ref<null | OrderDetail>(null);
const route = useRoute<RouteLocationNormalizedLoaded<RouteParams>>();

watch(
    () => route.params.id,
    async (newVal: string, oldVal: string): void => {
        orderDetail.value = await getOrderDetail(newVal);
        loadingStore.hideLoading();
    },
    { immediate: true }
);
</script>

<template>
    <Layout>
        <section class="bg-neutral-dark">
            <div class="container py-6 py-md-10">
                <div class="row">
                    <div class="col-lg-7">
                        <ul class="list-group list-group-flush">
                            <li
                                class="list-group-item bg-transparent px-0 pt-0 pb-6 pb-md-9"
                            >
                                <div
                                    class="d-sm-flex align-items-center mb-5 mb-md-6"
                                >
                                    <font-awesome-icon
                                        icon="fa-solid fa-circle-check"
                                        class="text-success flex-shrink-0"
                                        size="3x"
                                    />
                                    <h1
                                        class="pt-3 pt-sm-0 ps-sm-6 text-white mb-0"
                                    >
                                        恭喜，{{
                                            orderDetail?.userInfo?.name
                                        }}！<br />您已預訂成功
                                    </h1>
                                </div>
                                <p class="mb-0 text-neutral-40">
                                    我們已發送訂房資訊及詳細內容至你的電子信箱，入住時需向櫃檯人員出示訂房人證件。
                                </p>
                            </li>
                            <li
                                class="list-group-item bg-transparent px-0 py-6 py-md-9"
                            >
                                <h5 class="text-white mb-6">
                                    立即查看您的訂單紀錄
                                </h5>
                                <router-link
                                    to="/user/orders"
                                    class="baseButton isStylePrimary d-block d-md-inline-block"
                                >
                                    前往我的訂單
                                </router-link>
                            </li>
                            <li
                                class="list-group-item bg-transparent px-0 pt-6 pt-md-9 pb-0"
                            >
                                <h5 class="text-white mb-6">訂房人資訊</h5>
                                <ul class="list-unstyled">
                                    <li class="text-white mb-4">
                                        <span class="text-neutral-40 d-block"
                                            >姓名</span
                                        >{{ orderDetail?.userInfo?.name }}
                                    </li>
                                    <li class="text-white mb-4">
                                        <span class="text-neutral-40 d-block"
                                            >手機號碼</span
                                        >{{ orderDetail?.userInfo?.phone }}
                                    </li>
                                    <li class="text-white">
                                        <span class="text-neutral-40 d-block"
                                            >電子信箱</span
                                        >
                                        {{ orderDetail?.userInfo?.email }}
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div class="col-lg mt-8 mt-lg-0">
                        <div class="ms-lg-7">
                            <OrderDetailCard :orderDetails="[orderDetail]" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
</template>

<style lang="scss"></style>
