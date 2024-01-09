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
  return rooms.value.map((room) => room.imageUrl);
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
    <section v-if="rooms.length">
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
              class="d-flex align-items-center justify-content-center gap-10 position-absolute top-0 w-100 h-100"
            >
              <div
                class="d-flex gap-2 flex-column text-primary pb-6 hotel-name"
              >
                <h2 class="m-0">享樂酒店</h2>
                <h5 class="m-0">Enjoyment Luxury Hotel</h5>
              </div>
              <h1 class="m-0 text-white">客房旅宿</h1>
            </div>
          </template>
        </swiper-images>
      </section>
      <section
        class="room-intro-list d-flex flex-column gap-7 align-items-center py-11"
      >
        <div class="title mb-5">
          <h6 class="mb-3">房型選擇</h6>
          <h1 class="text-primary m-0">各種房型，任您挑選</h1>
        </div>
        <div
          v-for="room in rooms"
          :key="`room_${room._id}`"
          class="room-intro d-flex"
        >
          <div class="swiper-images-div">
            <swiper-images
              class="h-100 m-0 rounded-start-3"
              :is-mask="false"
              :is-navigation="true"
              :is-autoplay="false"
              :images-url="room.imageUrlList"
            />
          </div>
          <div class="room-intro-card bg-white p-6 rounded-end-3">
            <h2 class="mb-2">{{ room.name }}</h2>
            <div>{{ room.description }}</div>
            <basic-information
              class="py-6 basic-information"
              :is-hide-title="true"
              :area-info="room.areaInfo"
              :max-people="room.maxPeople"
              :bed-info="room.bedInfo"
            />
            <div
              class="mt-6 text-primary d-flex justify-content-between align-items-center"
            >
              <h5 class="m-0">{{ currencyTransform(room.price) }}</h5>
              <font-awesome-icon
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
      max-width: 773px;
      width: 50vw;
    }
    .room-intro-card {
      max-width: 523px;
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
</style>
