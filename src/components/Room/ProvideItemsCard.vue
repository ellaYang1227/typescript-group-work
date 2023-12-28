<script setup lang="ts">
import { defineProps, computed, ref, watchEffect } from "vue";
import { Room } from "@/interfaces/room";
import { useRoute } from "vue-router";

const props = defineProps({
  // 標題
  title: {
    type: String as () => "房間格局" | "房內設備" | "備品提供",
    default: "房內設備",
  },
  // 提供內容
  info: {
    type: Object as () => Room["facilityInfo"] | Room["amenityInfo"],
    default: [],
  },
  // 是否有邊框
  isBorder: {
    type: Boolean,
    default: false,
  },
});

// 過濾 isProvide 為 true 的 Info
const filterInfo = computed(() => props.info.filter((item) => item.isProvide));

// 處理 rowColsClass
const route = useRoute();
const rowColsClass = ref<string>("");
watchEffect(() => {
  const regex = /\/rooms.*\/success$/;
  rowColsClass.value = regex.test(route.path)
    ? "row-cols-lg-2 row-cols-xxl-3"
    : "row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5";
});
</script>
<template>
  <div class="d-flex align-items-center">
    <div class="customize-vr bg-primary"></div>
    <strong>{{ title }}</strong>
  </div>
  <div class="card mt-4" :class="{ 'border-0': !isBorder }">
    <div class="card-body">
      <ul
        class="list-unstyled mb-0 row gx-4 row-cols-2 row-cols-sm-3 row-cols-md-5"
        :class="rowColsClass"
      >
        <li v-if="!filterInfo.length" class="my-1"><strong>無</strong></li>
        <li
          v-else
          v-for="(item, index) in filterInfo"
          :key="index"
          class="col my-1"
        >
          <font-awesome-icon
            icon="fa-solid fa-check"
            class="text-primary"
            size="lg"
          /><strong class="ps-2">{{ item.title }}</strong>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss"></style>
