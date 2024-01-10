<template>
  <swiper
    :slidesPerView="1"
    :spaceBetween="0"
    :loop="true"
    :pagination="{
      clickable: true,
    }"
    :navigation="isNavigation"
    :modules="modules"
    :autoplay="
      isAutoplay ? { delay: 4500, disableOnInteraction: false } : false
    "
    class="swiper-images"
  >
    <swiper-slide v-for="(img, index) in imagesUrl" :key="index">
      <div
        class="h-100 bg-size-contain"
        :style="`background: linear-gradient(rgba(0, 0, 0, ${
          isMask ? 0.6 : 0
        }), rgba(0, 0, 0, ${isMask ? 0.6 : 0})), url(${img});`"
      >
        <slot name="content"></slot>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const modules = [Pagination, Navigation, Autoplay];

defineProps<{
  imagesUrl: string[];
  isMask: boolean;
  isNavigation: boolean;
  isAutoplay: boolean;
}>();
</script>

<style lang="scss" scoped>
@mixin navigation-circle {
  width: 56px;
  height: 56px;
  border-radius: 100px;
  background: white;
}
@mixin navigation-circle-font {
  color: $neutral-80;
  font-weight: bold;
  margin-left: 6px;
  scale: 0.55;
}
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
  :deep(.swiper-button-prev) {
    @include navigation-circle;
    left: 24px;
    &::after {
      @include navigation-circle-font;
      margin-right: 6px;
    }
  }
  :deep(.swiper-button-next) {
    @include navigation-circle;
    right: 24px;
    &::after {
      @include navigation-circle-font;
      margin-left: 6px;
    }
  }
  .bg-size-contain {
    background-repeat: no-repeat !important;
    background-size: cover !important;
  }
}
</style>
