<script setup lang="ts">
import { usehomeStore } from "@/stores";
import { storeToRefs } from "pinia";
const { culinaryList } = storeToRefs(usehomeStore());
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import SectionTitle from "@/components/Home/SectionTitle.vue";
import { onMounted, onUnmounted, ref } from "vue";
const windowWidth = ref(0);
const setWindowWidth = () => {
  windowWidth.value = document.body.clientWidth;
};
onMounted(() => {
  setWindowWidth();
  window.addEventListener("resize", setWindowWidth);
});
onUnmounted(() => {
  window.removeEventListener("resize", setWindowWidth);
});
</script>

<template>
  <section v-if="culinaryList.length" class="homeCulinary">
    <div class="homeCulinary_inner">
      <div class="homeCulinary_container py-10 py-lg-11">
        <SectionTitle title="佳餚美饌" type="normal" />
        <swiper
          :slidesPerView="1.2"
          spaceBetween="24"
          :loop="true"
          :breakpoints="{
            '992': {
              slidesPerView: 3.8,
              spaceBetween: 24,
            },
          }"
          class="culinarySwiper"
        >
          <swiper-slide
            v-for="(culinaryItem, index) in culinaryList"
            :key="index"
            class="culinarySwiper_item"
          >
            <div
              class="culinarySwiper_inner"
              :style="{
                backgroundImage: `url('${culinaryItem.image}')`,
              }"
            >
              <div class="culinarySwiper_content">
                <div class="position-relative z-1">
                  <div
                    class="d-flex justify-content-between align-items-center mb-4"
                  >
                    <h5 class="mb-0 culinarySwiper_title">
                      {{ culinaryItem.title }}
                    </h5>
                    <div class="fs-lg-8 fs-9">
                      <span>{{
                        culinaryItem.diningTime.split(
                          /^([A-Z]{3}-[A-Z]{3})\s(.*)$/
                        )[1]
                      }}</span>
                      <span class="ps-3">{{
                        culinaryItem.diningTime.split(
                          /^([A-Z]{3}-[A-Z]{3})\s(.*)$/
                        )[2]
                      }}</span>
                    </div>
                  </div>
                  <p class="mb-0 fs-lg-8 fs-9 fw-lg-medium fw-normal">
                    {{ culinaryItem.description }}
                  </p>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.homeCulinary {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    background-image: url("@/assets/homeLine.svg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 187px;
    height: 1068px;
    left: calc((100vw - 1320px) / 2 - 53px - 187px - (calc(1.5rem * 0.5)));
    bottom: -83px;
    @include media-breakpoint-down(xxl) {
      left: calc((100vw - 1140px) / 2 - (calc(var(--bs-gutter-x) * 0.5)));
    }
    @include media-breakpoint-down(xl) {
      left: calc((100vw - 960px) / 2 - (calc(var(--bs-gutter-x) * 0.5)));
    }
    @include media-breakpoint-down(lg) {
      display: none;
    }
  }
  &::after {
    content: "";
    position: absolute;
    background-image: url("@/assets/homeDot.svg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 200px;
    height: 200px;
    right: 4.2%;
    top: -40px;
    @include media-breakpoint-down(lg) {
      display: none;
    }
  }
  &_inner {
    overflow: hidden;
  }
  &_container {
    @include make-container();
    max-width: 1920px;
    position: relative;
    left: calc((100vw - 1320px) / 2 - (calc(var(--bs-gutter-x) * 0.5)));
    margin-right: 0;
    margin-left: 0;
    @include media-breakpoint-down(xxl) {
      left: calc((100vw - 1140px) / 2 - (calc(var(--bs-gutter-x) * 0.5)));
    }
    @include media-breakpoint-down(xl) {
      left: calc((100vw - 960px) / 2 - (calc(var(--bs-gutter-x) * 0.5)));
    }
    @include media-breakpoint-down(lg) {
      left: auto;
      padding-right: 0;
    }
    .culinarySwiper {
      .swiper-wrapper {
        transition-timing-function: linear;
      }
      &_inner {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        height: 600px;
        display: flex;
        width: 100%;
        @include media-breakpoint-down(lg) {
          height: 480px;
        }
      }
      &_item {
        border-radius: 8px;
        overflow: hidden;
      }
      &_content {
        margin-top: auto;
        position: relative;
        color: $white;
        padding: 1.5rem;
        &:before {
          backdrop-filter: blur(8px);
          content: "";
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            #140f0a 77.6%
          );
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        @include media-breakpoint-down(lg) {
          padding: 1rem;
        }
      }
      &_title {
        letter-spacing: 0.05em;
      }
    }
  }
}
</style>
