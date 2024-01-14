<script setup lang="ts">
import Layout from "@/components/Layouts/Index.vue";
import SwiperImages from "@/components/SwiperImages.vue";
import BasicInformation from "@/components/Room/BasicInformation.vue";
import { currencyTransform } from "@/utilities/formatTransform";
import { getRooms } from "@/models/rooms";
import { Room } from "@/interfaces/room";
import router from "@/router";
import { ref, computed } from "vue";

const rooms = ref<Room[]>([]);

const roomsBannerImages = computed<string[]>(() => {
  const bannerUrl =
    "https://github.com/hexschool/2022-web-layout-training/blob/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/banner.png?raw=true";
  return [bannerUrl, ...rooms.value.map((room) => room.imageUrl)];
});

async function fetchRoom() {
  try {
    rooms.value = await getRooms();
  } catch (err) {
    //獲取錯誤，回首頁
    await router.push("/");
  }
}
fetchRoom();
</script>

<template>
  <Layout type="styleBgTransparent">
    <section class="room-index-page" v-if="rooms.length">
      <section
        class="d-flex align-items-center justify-content-center position-relative main-banner"
      >
        <swiper-images
          class="h-100 w-100"
          :is-mask="true"
          :is-navigation="false"
          :is-autoplay="true"
          :images-url="roomsBannerImages"
        >
          <template v-slot:content>
            <div
              class="d-flex flex-column flex-lg-row align-items-center justify-content-center gap-6 gap-lg-10 position-absolute top-0 w-100 h-100"
            >
              <div
                class="d-flex gap-2 flex-column align-items-center align-items-lg-start text-primary pb-lg-6 hotel-name"
              >
                <h2 class="m-0">享樂酒店</h2>
                <h5 class="m-0">Enjoyment Luxury Hotel</h5>
                <div class="vertical-line d-lg-none"></div>
              </div>
              <h1 class="m-0 text-white">客房旅宿</h1>
            </div>
          </template>
        </swiper-images>
      </section>
      <section
        class="room-intro-list container-lg d-flex flex-column gap-4 gap-lg-7 align-items-center py-6 py-lg-11"
      >
        <div class="title mb-3 mb-lg-5">
          <h6 class="mb-2 mb-lg-3">房型選擇</h6>
          <h1 class="text-primary m-0">各種房型，任您挑選</h1>
        </div>
        <div
          v-for="room in rooms"
          :key="`room_${room._id}`"
          class="room-intro d-flex flex-column flex-lg-row"
        >
          <div class="swiper-images-div">
            <swiper-images
              class="h-100 m-0"
              :is-mask="false"
              :is-navigation="true"
              :is-autoplay="false"
              :images-url="[room.imageUrl, ...room.imageUrlList]"
            />
          </div>
          <div class="room-intro-card bg-white p-3 p-lg-6">
            <h2 class="mb-2 text-black">{{ room.name }}</h2>
            <div>{{ room.description }}</div>
            <basic-information
              class="py-4 py-lg-6 basic-information"
              :is-hide-title="true"
              :area-info="room.areaInfo"
              :max-people="room.maxPeople"
              :bed-info="room.bedInfo"
            />
            <div
              class="mt-4 mt-lg-6 text-primary d-flex justify-content-between align-items-center room-intro-card-footer"
            >
              <h5 class="m-0">{{ currencyTransform(room.price) }}</h5>
              <font-awesome-icon
                class="fs-5"
                icon="fa-solid fa-arrow-right"
                @click="$router.push(`/rooms/${room._id}`)"
              />
            </div>
          </div>
        </div>
      </section>
    </section>
  </Layout>
</template>

<style lang="scss" scoped>
$main-linear-gradient: linear-gradient(90deg, #be9c7c 0%, #ffffff 100%);
@mixin linear-gradient-bordered {
  border-bottom: 2px solid;
  border-image: $main-linear-gradient;
  border-image-slice: 1;
}
.room-index-page {
  .main-banner {
    height: 800px;
    .hotel-name {
      width: 500px;
      @include linear-gradient-bordered;
    }
  }
  .room-intro-list {
    .title {
      max-width: 1296px;
      width: 100%;
    }
    .room-intro {
      height: 457px;
      .swiper-images-div {
        width: 50vw;
        .swiper-images {
          border-radius: 20px 0 0 20px;
        }
      }
      .room-intro-card {
        border-radius: 0 20px 20px 0;
        .basic-information {
          @include linear-gradient-bordered;
        }
        .fa-arrow-right {
          cursor: pointer;
          &:hover {
            color: $primary-dark;
          }
        }
      }
    }
  }
  @include media-breakpoint-down(lg) {
    h1 {
      font-size: 32px;
    }
    h2 {
      font-size: 28px;
    }
    h5 {
      font-size: 16px;
    }
    h6,
    div {
      font-size: 14px;
    }
    .main-banner {
      height: 466px;
      .hotel-name {
        width: auto;
        border: none;
      }
      .vertical-line {
        width: 2px;
        height: 83px;
        margin-top: 12px;
        background: linear-gradient(180deg, #be9c7c 0%, #ffffff 100%);
      }
    }
    .room-intro-list {
      padding-left: 12px;
      padding-right: 12px;
      .room-intro {
        height: auto;
        .swiper-images-div {
          width: calc(100vw - 24px);
          .swiper-images {
            border-radius: 20px 20px 0 0 !important;
          }
        }
        .room-intro-card {
          max-width: calc(100vw - 24px);
          border-radius: 0 0 20px 20px !important;
        }
        .room-intro-card-footer {
          height: 56px;
        }
      }
    }
  }
  .swiper-images-div {
    @media (min-width: 1200px) {
      max-width: 773px;
    }
    @media (min-width: 992px) and (max-width: 1200px) {
      max-width: 533px;
    }
    @media (min-width: 576px) and (max-width: 991px) {
      height: 300px;
    }
    @media (max-width: 576px) {
      height: 200px;
    }
  }
}
</style>
