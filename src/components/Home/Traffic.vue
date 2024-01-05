<script setup lang="ts">
import SectionTitle from "@/components/Home/SectionTitle.vue";
import { ref } from "vue";
const list = ref([
  {
    title: "自行開車",
    icon: "fa-solid fa-car",
    text: "如果您選擇自行開車，可以透過國道一號下高雄交流道，往市區方向行駛，並依路標指示即可抵達「享樂酒店」。飯店內設有停車場，讓您停車方便。",
  },
  {
    title: "高鐵/火車",
    icon: "fa-solid fa-train-subway",
    text: "如果您是搭乘高鐵或火車，可於左營站下車，外頭有計程車站，搭乘計程車約20分鐘即可抵達。或者您也可以轉乘捷運紅線至中央公園站下車，步行約10分鐘便可抵達。",
  },
  {
    title: "禮賓車服務",
    icon: "fa-solid fa-car-side",
    text: "承億酒店提供禮賓專車接送服務，但因目的地遠近會有不同的收費，請撥打電話將由專人為您服務洽詢專線：(07)123-4567",
  },
]);
</script>

<template>
  <section class="homeTraffic bg-neutral-dark">
    <div class="container pt-10 pb-6 pt-lg-11 pb-lg-10">
      <SectionTitle title="交通方式" />
      <div class="homeTraffic_inner">
        <p class="text-white mb-3">台灣高雄市新興區六角路123號</p>
        <img
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/桌機版/map.png"
          alt="台灣高雄市新興區六角路123號地圖"
          class="w-100 h-auto rounded-3 d-lg-block d-none"
        />
        <img
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/行動版/map.png"
          alt="台灣高雄市新興區六角路123號地圖"
          class="w-100 h-auto rounded-3 d-lg-none"
        />
        <div class="row homeTraffic_list mt-lg-6 mt-0 g-4">
          <div
            v-for="(item, index) in list"
            class="col-lg col-12 homeTraffic_item"
            :key="index"
          >
            <div
              class="homeTraffic_itemIcon mb-lg-3 mb-2"
              :class="`icon-${index}`"
            >
              <font-awesome-icon :icon="item.icon" class="text-primary icon" />
            </div>
            <h5 class="mb-2 text-white fs-lg-5 fs-8">{{ item.title }}</h5>
            <p class="mb-0 text-white fs-lg-8 fs-9 fw-lg-medium fw-normal">
              {{ item.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.homeTraffic {
  &_itemIcon {
    width: 5rem;
    height: 5rem;
    @include media-breakpoint-down(lg) {
      width: 3rem;
      height: 3rem;
    }
    &.icon-0 {
      padding: 0.65rem 0.625rem;
      .icon {
        letter-spacing: 0;
        height: 3.313rem;
        width: 3.75rem;
        line-height: 0;
      }
      @include media-breakpoint-down(lg) {
        padding: 0.625rem 0.375rem;
        .icon {
          width: 2.25rem;
          height: 2rem;
        }
      }
    }

    &.icon-1 {
      padding: 0.26rem 0.521rem 0.625rem 0.521rem;
      .icon {
        letter-spacing: 0;
        height: 3.958rem;
        width: 3.333rem;
        line-height: 0;
      }
      @include media-breakpoint-down(lg) {
        padding: 0.25rem 0.375rem 0.5rem;
        .icon {
          width: 2rem;
          height: 2.375rem;
        }
      }
    }

    &.icon-2 {
      padding: 0.54rem 0.13rem;
      .icon {
        letter-spacing: 0;
        height: 3.313rem;
        width: 4.583rem;
        line-height: 0;
      }
      @include media-breakpoint-down(lg) {
        padding: 0.438rem 0.125rem;
        .icon {
          width: 2.75rem;
          height: 2.125rem;
        }
      }
    }
  }
}
</style>
