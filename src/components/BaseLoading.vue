<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useLoadingStore } from "@/stores/loading";
const loading = useLoadingStore();
const { isShowLoading } = storeToRefs(loading);
</script>

<template>
  <div v-if="isShowLoading" class="baseLoading">
    <img src="@/assets/loading.svg" alt="" />
  </div>
</template>

<style lang="scss">
.baseLoading {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 999;
  background: rgba($neutral-40, 0.8);
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
