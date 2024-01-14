<script setup lang="ts">
import { usehomeStore } from "@/stores";
import { storeToRefs } from "pinia";
const { slideShowList } = storeToRefs(usehomeStore());
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import SectionTitle from "@/components/Home/SectionTitle.vue";
import BaseButton from "@/components/BaseButton.vue";
import _throttle from "@/utilities/throttle";
import getScrollTop from "@/utilities/getScrollTop";
import { onMounted, ref, onUnmounted, onUpdated } from "vue";
const modules = [Pagination, Autoplay];
const windowWidth = ref(0);
const sectionRef = ref<HTMLElement | null>(null);
const slideShowHeight = ref(0);
const emit = defineEmits(["headerType"]);
const setWindowWidth = () => {
  windowWidth.value = document.body.clientWidth;
};
const setClientHeight = () => {
  if (!sectionRef.value) return;
  slideShowHeight.value = sectionRef.value.clientHeight;
};
const onScroll = () => {
  const scrollTop = getScrollTop();
  if (windowWidth.value > 991) {
    if (slideShowHeight.value < scrollTop + 120) {
      emit("headerType", "styleBgTransparentScroll");
    } else {
      emit("headerType", "styleBgTransparent");
    }
  } else {
    if (slideShowHeight.value < scrollTop + 72) {
      emit("headerType", "styleBgTransparentScroll");
    } else {
      emit("headerType", "styleBgTransparent");
    }
  }
};

onMounted(() => {
  setWindowWidth();
  window.addEventListener(
    "resize",
    _throttle(() => {
      setWindowWidth();
      setClientHeight();
    }, 200)
  );
  window.addEventListener(
    "scroll",
    _throttle(() => {
      onScroll();
    }, 200)
  );
});
onUpdated(() => {
  setClientHeight();
});
onUnmounted(() => {
  window.removeEventListener("resize", () => {
    setWindowWidth();
    setClientHeight();
  });
  window.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <section ref="sectionRef">
    <swiper
      v-if="slideShowList.length"
      :pagination="{ clickable: true }"
      :autoplay="{
        delay: 3000,
      }"
      :modules="modules"
      :loop="true"
      :slidesPerView="1"
      :slidesPerGroup="1"
      class="slideShowSwiper"
    >
      <swiper-slide
        v-for="(slideShowItem, index) in slideShowList"
        :key="index"
        class="slideShowSwiper_item"
        :style="{
          backgroundImage: `url('${
            windowWidth > 992 ? slideShowItem.image : slideShowItem.image2
          }')`,
        }"
      >
        <div class="slideShowSwiper_itemInner container-fluid">
          <div class="slideShowSwiper_itemInnerBox">
            <div class="row">
              <div class="col-lg-4 col-12 align-self-center">
                <SectionTitle
                  title="享樂酒店"
                  subTitle="Enjoyment Luxury Hotel"
                  type="banner"
                />
              </div>
              <div
                class="col-lg-7 col-12 ps-lg-11 offset-lg-1 mt-lg-0 mt-6 slideShowSwiper_itemRight"
              >
                <div class="slideShowSwiper_content">
                  <div
                    class="z-1 position-relative slideShowSwiper_contentInner"
                  >
                    <div
                      class="slideShowSwiper_contentTitle fw-bold"
                      v-html="slideShowItem.title"
                    ></div>
                    <p
                      class="slideShowSwiper_contentText mb-0 fw-bold mt-4 text-neutral-40"
                    >
                      {{ slideShowItem.text }}
                    </p>
                    <BaseButton
                      to="/rooms"
                      class="isStyleWhite slideShowSwiper_contentLink"
                    >
                      立即訂房
                    </BaseButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </section>
</template>

<style lang="scss">
.slideShowSwiper {
  &_item {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 100%;
    min-height: 100%;
    height: 100vh;
    position: relative;
    // padding-top: 22vh;
    // padding-bottom: 15.5vh;
    @include media-breakpoint-down(lg) {
      min-height: 100vh;
      height: 100%;
      // padding-top: 113px;
      // padding-bottom: 71px;
    }
    &:after {
      content: "";
      background-color: rgb($neutral, 0.6);
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      z-index: -1;
    }
  }
  &_itemRight {
    @include media-breakpoint-down(xxl) {
      padding-right: 20px;
    }
  }
  &_itemInner {
    padding: 120px 5rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    @include media-breakpoint-down(xxl) {
      padding: 72px 0.75rem 0;
      height: 100vh;
    }
  }
  &_itemInnerBox {
    flex: 0 0 100%;
    @include media-breakpoint-down(lg) {
      // flex: 0 0 auto;
    }
  }
  &_content {
    position: relative;
    padding-top: 6rem;
    padding-bottom: 6rem;
    &::before {
      content: "";
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.3) 100%
      );

      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 1px solid $white;
      border-width: 1px 1px 0px 0px;
      border-radius: 80px;
      backdrop-filter: blur(8px);
      @include media-breakpoint-down(lg) {
        width: calc(100% - 64px);
        right: 0;
        left: auto;
        border-radius: 40px;
      }
    }
    @include media-breakpoint-down(lg) {
      padding-top: 3.75rem;
      padding-bottom: 3.75rem;
      @media screen and (max-width: 376px) {
        padding-top: 2.75rem;
        padding-bottom: 2.75rem;
      }
    }
  }
  &_contentInner {
    letter-spacing: 0.05em;
    margin-left: -48px;
    color: $white;
    // width: 772px;
    width: 40.21vw;
    max-width: 100%;
    @include media-breakpoint-down(lg) {
      width: auto;
      margin-left: 26px;
      padding-right: 20px;
    }
  }
  &_contentTitle {
    // font-size: 6.25rem;
    font-size: 5.209vw;
    line-height: 1.24;
    gap: 8px;
    @include media-breakpoint-down(lg) {
      font-size: 3rem;
    }
  }
  &_contentText {
    font-size: 1.67vw;
    @include media-breakpoint-down(lg) {
      font-size: 1rem;
    }
  }
  &_contentLink {
    width: 100%;
    // padding: 2.5rem;
    padding: 2.09vw;
    // font-size: 1.5rem;
    font-size: 1.25vw;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 3.75rem;
    @include media-breakpoint-down(lg) {
      font-size: 1rem;
      padding: 1.25rem;
      margin-top: 2.5rem;
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
  .swiper-pagination {
    bottom: 24px;
    @include media-breakpoint-down(lg) {
      bottom: 1.5rem;
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
</style>
