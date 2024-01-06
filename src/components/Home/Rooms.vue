<script setup lang="ts">
import { usehomeStore } from "@/stores";
import { storeToRefs } from "pinia";
const { roomList } = storeToRefs(usehomeStore());
import BaseButton from "@/components/BaseButton.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ref } from "vue";
// const uSwiper = useSwiper();
const modules = [Pagination, EffectFade, Navigation];
const roomsSwiperRef = ref("");
// const handlePrev = () => {
//   console.log(roomsSwiperRef?.value, event);
//   if (!roomsSwiperRef?.value) return;
//   roomsSwiperRef?.value?.uSwiper.slidePrev();
// };
// const handleNext = () => {};
</script>

<template>
  <section v-if="roomList.length" class="homeRooms bg-neutral-dark">
    <div class="homeRooms_inner">
      <div class="homeRooms_container py-10 py-lg-11">
        <swiper
          :pagination="{ clickable: true }"
          :modules="modules"
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
            <div class="roomsSwiper_inner d-flex">
              <div class="roomsSwiper_left">
                <img
                  :src="roomItem.imageUrl"
                  :alt="roomItem.name"
                  class="roomsSwiper_img object-fit"
                />
              </div>
              <div class="roomsSwiper_right align-self-end ps-10">
                <div class="roomsSwiper_content text-white">
                  <h2 class="mb-3">{{ roomItem.name }}</h2>
                  <span>{{ roomItem.description }}</span>
                  <div class="h3 fs-semibold mt-6">
                    NT$ {{ roomItem.price }}
                  </div>
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
    height: 16.45%;
    top: 15.8%;
    right: 0;
    z-index: 3;
  }
  &:after {
    content: "";
    position: absolute;
    background-image: url("@/assets/homeBG.svg");
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 677px;
    bottom: 0;
    right: 0;
  }

  &_inner {
    overflow: hidden;
  }
  &_container {
    position: relative;
    @include make-container();
    max-width: calc(
      100vw - (100vw - 1320px) / 2 - (calc(var(--bs-gutter-x) * 0.5))
    );
    margin-left: 0;
    padding-left: 0;
    .roomsSwiper {
      .swiper-pagination {
        width: 46.88vw;
        max-width: 900px;
        bottom: 1.5rem;
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
      .swiper-slide {
        opacity: 0 !important;
        &.swiper-slide-active {
          opacity: 1 !important;
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
          font-size: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
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
      }
      &_right {
        flex: 1;
      }
      &_img {
        height: 100%;
        width: 100%;
        border-radius: 0 8px 8px 0;
      }
      &_content {
        margin-bottom: 9rem;
      }
      &_contentLink {
        width: 100%;
        padding: 2.5rem;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 2.5rem;
        &:after {
          content: "";
          height: 1px;
          width: 150px;
          background-color: $neutral;
          transition: 0.3s;
          display: block;
          margin-left: 1rem;
        }
        &:hover {
          &:after {
            background-color: $white;
            width: 120px;
          }
        }
      }
    }
  }
}
</style>
