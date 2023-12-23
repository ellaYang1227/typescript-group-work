<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useLoadingStore } from "@/stores/loading";
const loading = useLoadingStore();
const { isShowLoading } = storeToRefs(loading);
</script>

<template>
  <div v-if="isShowLoading" class="baseLoading">
    <div class="ssc-card ssc-wrapper">
      <div class="d-flex mbs justify-content-between align-items-center">
        <div>
          <div class="ssc-square baseLoading_logo"></div>
        </div>
        <div class="d-md-flex d-none">
          <div class="ssc-square rounded-pill baseLoading_link"></div>
          <div class="ssc-square rounded-pill baseLoading_link"></div>
          <div class="ssc-square rounded-pill baseLoading_link"></div>
        </div>
        <div class="d-md-none">
          <div class="ssc-square rounded-pill baseLoading_link"></div>
        </div>
      </div>
      <div class="ssc-square mt-5 baseLoading_content"></div>
    </div>
  </div>
</template>

<style lang="scss">
.baseLoading {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100vh;
  overflow: hidden;
  z-index: 9999;
  &_logo {
    width: 196px;
    height: 72px;
    border-radius: 8px;
  }
  &_link {
    width: 100px;
    height: 30px;
    margin-left: 30px;
    border-radius: 8px;
  }
  &_content {
    height: 78%;
    border-radius: 8px;
  }
}
</style>
