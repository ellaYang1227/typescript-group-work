<script setup lang="ts">
import { usehomeStore } from "@/stores";
import { storeToRefs } from "pinia";
const { roomList } = storeToRefs(usehomeStore());
import { Room } from "@/interfaces/room";
import BaseButton from "@/components/BaseButton.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ref } from "vue";
import { currencyTransform } from "@/utilities/formatTransform";
const modules = [Pagination, EffectFade, Navigation];
const roomsSwiperRef = ref("");
const formatImg = (item: Room) => {
  let result = [];
  if (item.imageUrl) {
    result.push(item.imageUrl);
  }
  if (item.imageUrlList.length) {
    result = [...result, ...item.imageUrlList];
  }
  return result;
};
</script>

<template>
  <section v-if="roomList.length" class="homeRooms bg-neutral-dark">
    <div class="homeRooms_inner">
      <div class="homeRooms_container py-10 py-lg-11">
        <swiper
          :modules="modules"
          :allowTouchMove="false"
          :effect="'fade'"
          class="roomsSwiper"
          ref="roomsSwiperRef"
          :navigation="{
            prevEl: '.prev-arrow',
            nextEl: '.next-arrow',
          }"
        >
          <swiper-slide
            v-for="(roomItem, index) in roomList"
            :key="index"
            class="roomsSwiper_item"
          >
            <div class="roomsSwiper_inner d-lg-flex">
              <div class="roomsSwiper_left">
                <swiper
                  :modules="modules"
                  :pagination="{ clickable: true }"
                  class="roomsImgSwiper h-100"
                >
                  <swiper-slide
                    v-for="(img, index2) in formatImg(roomItem)"
                    :key="index2"
                    class="roomsImgSwiper_item"
                  >
                    <img
                      :src="img"
                      :alt="roomItem.name"
                      class="roomsSwiper_img object-fit"
                    />
                  </swiper-slide>
                </swiper>
              </div>
              <div class="roomsSwiper_right align-self-end ps-lg-10">
                <div class="roomsSwiper_content text-white">
                  <h2 class="mb-lg-3 mb-2 fs-lg-2 fs-4">
                    {{ roomItem.name }}
                  </h2>
                  <span class="fs-lg-8 fs-9 fw-lg-medium fw-normal">{{
                    roomItem.description
                  }}</span>
                  <h3 class="fs-lg-3 fs-5 mt-lg-6 mt-4">
                    {{ currencyTransform(roomItem.price) }}
                  </h3>
                  <BaseButton
                    :to="`/rooms/${roomItem._id}`"
                    class="isStyleWhite roomsSwiper_contentLink"
                  >
                    查看更多
                  </BaseButton>
                </div>
              </div>
            </div>
          </swiper-slide>
          <div class="roomsSwiper_navigation">
            <BaseButton class="isStyleTextIcon prev-arrow">
              <font-awesome-icon icon="fa-solid fa-arrow-left" />
            </BaseButton>
            <BaseButton class="isStyleTextIcon next-arrow">
              <font-awesome-icon icon="fa-solid fa-arrow-right" />
            </BaseButton>
          </div>
        </swiper>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.homeRooms {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    background-image: url("@/assets/homeLine2.svg");
    background-repeat: no-repeat;
    background-size: contain;
    min-width: calc(100vw - 46.88vw + 40px);
    max-width: 100vw;
    background-position: right;
    height: 16.45%;
    top: 15.8%;
    right: 0;
    z-index: 3;
    @include media-breakpoint-down(lg) {
      width: calc(100% - 80px);
      height: 84px;
      top: -1.25rem;
      background-image: url("@/assets/homeLine2Mobile.svg");
      background-position: right;
    }
  }
  &:after {
    content: "";
    position: absolute;
    background-image: url("@/assets/homeBG.svg");
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 59%;
    max-height: 667px;
    bottom: 0;
    right: 0;
    @include media-breakpoint-down(lg) {
      content: "";
      position: absolute;
      background-image: url("@/assets/homeBG.svg");
      background-repeat: no-repeat;
      background-size: cover;
      width: 100%;
      height: 132px;
      top: 404px;
      right: 0;
    }
  }

  &_inner {
    overflow: hidden;
  }
  &_container {
    position: relative;
    @include make-container();
    max-width: calc(100vw - (100vw - 1320px) / 2 - (var(--bs-gutter-x) * 0.5));
    margin-left: 0;
    padding-left: 0;
    @include media-breakpoint-down(xxl) {
      max-width: calc(
        100vw - (100vw - 1140px) / 2 - (var(--bs-gutter-x) * 0.5)
      );
    }
    @include media-breakpoint-down(xl) {
      max-width: calc(100vw - (100vw - 960px) / 2 - (var(--bs-gutter-x) * 0.5));
    }
    @include media-breakpoint-down(lg) {
      max-width: 100%;
      margin-left: auto;
      padding-left: calc(var(--bs-gutter-x) * 0.5);
    }
    .roomsSwiper {
      .swiper-slide {
        opacity: 0 !important;
        z-index: -222;
        &.swiper-slide-active {
          opacity: 1 !important;
          z-index: 1;
        }
      }
      &_navigation {
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 2;
        display: flex;
        .prev-arrow,
        .next-arrow {
          width: 56px;
          height: 56px;
          letter-spacing: 0;
          color: $primary;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 100px;
          .baseButton__content {
            padding: 4px;
          }
          &:hover:not(:disabled) {
            color: $white !important;
          }
        }
        .next-arrow {
        }
      }
      &_left {
        width: 46.88vw;
        max-width: 900px;
        height: 100vh;
        max-height: 900px;
        border-radius: 0 8px 8px 0;
        overflow: hidden;
        @include media-breakpoint-down(lg) {
          width: 100%;
          max-width: 100%;
          height: 300px;
          margin-bottom: 1.5rem;
        }
      }
      &_right {
        flex: 1;
      }
      &_img {
        height: 100%;
        width: 100%;
      }
      &_content {
        margin-bottom: 9rem;
        @include media-breakpoint-down(lg) {
          margin-bottom: 5rem;
        }
      }
      &_contentLink {
        width: 100%;
        padding: 2.5rem;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 2.5rem;
        @include media-breakpoint-down(lg) {
          padding: 1.25rem;
          margin-top: 1.5rem;
          font-size: 1rem;
        }
        &:after {
          content: "";
          height: 1px;
          width: 150px;
          background-color: $neutral;
          transition: 0.3s;
          display: block;
          margin-left: 1rem;
          @include media-breakpoint-down(lg) {
            width: 80px;
          }
        }
        &:hover {
          &:after {
            background-color: $white;
            width: 120px;
            @include media-breakpoint-down(lg) {
              width: 60px;
            }
          }
        }
      }
    }
    .roomsImgSwiper {
      .swiper-pagination {
        bottom: 1.5rem;
        @include media-breakpoint-down(lg) {
          bottom: 1rem;
        }
        .swiper-pagination-bullet {
          width: 32px;
          height: 4px;
          background: $primary-40;
          border-radius: 100px;
          opacity: 1;
          transition: 0.3s;
        }
        .swiper-pagination-bullet-active {
          width: 60px;
          background: $primary;
        }
      }
    }
  }
}
</style>
