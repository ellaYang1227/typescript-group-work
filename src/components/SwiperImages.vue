<template>
  <swiper
    :slidesPerView="1"
    :spaceBetween="8"
    :loop="true"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    :autoplay="{ delay: 4500, disableOnInteraction: false }"
    class="swiper-images"
  >
    <swiper-slide v-for="(img, index) in imagesUrl" :key="index">
      <img class="object-fit" :src="img" :alt="`img-${index}`" />
    </swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const modules = [Pagination, Autoplay];

defineProps<{
  imagesUrl: string[];
}>();
</script>

<style lang="scss" scoped>
.swiper-images {
  :deep(.swiper-pagination-bullet) {
    background-color: $primary-40;
    width: 32px;
    height: 4px;
    border-radius: 100px;
    opacity: 1;
  }
  :deep(.swiper-pagination-bullet-active) {
    background-color: $primary;
    width: 60px;
  }
  :deep(.swiper-pagination) {
    transform: translate3d(0, 6px, 0);
  }
  :deep(.swiper-pagination-horizontal) {
    bottom: 24px;
  }
}
</style>
