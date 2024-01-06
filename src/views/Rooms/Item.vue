<script setup lang="ts">
import Layout from "@/components/Layouts/Index.vue";
import ProvideItemsCard from "@/components/Room/ProvideItemsCard.vue";
import BasicInformation from "@/components/Room/BasicInformation.vue";
import BookingInstructionsList from "@/components/Room/BookingInstructionsList.vue";
import { currencyTransform } from "@/utilities/formatTransform";
import { getRoomDetail } from "@/models/rooms";
import { Room } from "@/interfaces/room";
import { ref } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import SwiperImages from "@/components/SwiperImages.vue";

const route = useRoute();
const routeParamsId = (route.params.id as string) || "";

const roomDetail = ref<Room | null>(null);

async function fetchRoomDetail(id: string) {
  try {
    roomDetail.value = await getRoomDetail(id);
  } catch (err) {
    //獲取錯誤，回首頁
    await router.push("/");
  }
}
fetchRoomDetail(routeParamsId);
</script>

<template>
  <Layout>
    <section class="room-detail" v-if="roomDetail">
      <section
        class="d-none d-lg-flex gap-2 m-auto py-10 px-0 image-banner px-2"
      >
        <div class="left">
          <img
            :src="roomDetail.imageUrl"
            alt="main-img"
            class="object-fit rounded-start-3"
            loading="lazy"
          />
        </div>
        <div class="grid gap-2 right">
          <div v-for="(img, index) in roomDetail.imageUrlList" :key="index">
            <img
              :src="img"
              :alt="`${index}-img`"
              class="object-fit"
              :class="[
                { 'border-top-right': index === 1 },
                { 'border-bottom-right': index === 3 },
              ]"
              loading="lazy"
            />
          </div>
        </div>
      </section>
      <swiper-images
        class="d-block d-lg-none"
        :images-url="[...[roomDetail.imageUrl], ...roomDetail.imageUrlList]"
      />
      <section
        class="d-flex flex-wrap flex-lg-nowrap m-auto py-6 py-lg-11 px-3 px-lg-6 px-xxl-0 gap-4 gap-lg-9 main-content"
      >
        <div class="d-flex flex-column gap-4 gap-lg-10 left">
          <div class="d-flex flex-column gap-3">
            <h1 class="m-0 text text-primary">
              {{ roomDetail.name }}
            </h1>
            <div class="description">{{ roomDetail.description }}</div>
          </div>
          <div class="detail-card">
            <basic-information
              :area-info="roomDetail.areaInfo"
              :max-people="roomDetail.maxPeople"
              :bed-info="roomDetail.bedInfo"
            />
          </div>
          <div class="detail-card">
            <provide-items-card
              :title="'房內設備'"
              :info="roomDetail.facilityInfo"
              :isBorder="false"
            />
          </div>
          <div class="detail-card">
            <provide-items-card
              :title="'備品提供'"
              :info="roomDetail.amenityInfo"
              :isBorder="false"
            />
          </div>
          <booking-instructions-list class="detail-card d-none d-lg-flex" />
        </div>
        <div class="right">
          <div
            class="card p-4 p-lg-6 d-flex flex-column gap-4 gap-lg-6 rounded-3 border-0 position-sticky"
          >
            <h5
              class="text-neutral m-0 fw-bold pb-3 border-bottom border-neutral-40"
            >
              預定房型
            </h5>
            <div class="d-flex flex-column gap-2">
              <h2 class="m-0">{{ roomDetail.name }}</h2>
              <div>{{ roomDetail.description }}</div>
            </div>
            <h5 class="m-0 fw-bold text-primary">
              {{ currencyTransform(roomDetail.price) }}
            </h5>
            <button
              class="rounded-2 py-3 w-100 baseButton isStylePrimary"
              @click="$router.push(`/rooms/${routeParamsId}/reservation`)"
            >
              立即預定
            </button>
          </div>
        </div>
        <booking-instructions-list class="detail-card d-lg-none" />
      </section>
    </section>
  </Layout>
</template>

<style lang="scss" scoped>
.room-detail {
  .image-banner {
    max-width: 1760px;
    .left {
      max-height: 600px;
      flex: 1 1 978px;
    }
    .right {
      flex: 1 1 774px;
      &.grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: auto;
        .border-top-right {
          border-top-right-radius: 20px;
        }
        .border-bottom-right {
          border-bottom-right-radius: 20px;
        }
      }
    }
  }
  .main-content {
    max-width: 1296px;
    .left {
      flex: 1 1 746px;
      .detail-card {
        .grid {
          grid-template-columns: repeat(5, 1fr);
        }
        :deep(.text-neutral) {
          font-size: 24px;
        }
      }
    }
    .right {
      flex: 1 1 478px;
      position: relative;
      .position-sticky {
        top: 160px;
      }
    }
  }
  @include media-breakpoint-down(xl) {
    .main-content {
      max-width: 100%;
      h1 {
        font-size: 32px;
      }
      div {
        //內文字體大小為14
        font-size: 14px;
      }
      .detail-card {
        :deep(.text-neutral) {
          //標題
          font-size: 16px !important;
        }
        .gap-md-4 {
          gap: 16px !important;
        }
        :deep(.room) {
          //內容細項
          --bs-columns: 2;
        }
        :deep(.basic-information .text-neutral-80) {
          //房型基本資訊16px
          font-size: 16px;
        }
      }
      .right {
        h5 {
          font-size: 16px;
        }
        h2 {
          font-size: 28px;
        }
      }
    }
  }
}
</style>
