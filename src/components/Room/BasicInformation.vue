<script setup lang="ts">
import { useRoute } from "vue-router";
import { Room } from "@/interfaces/room";

interface BasicInformation {
  areaInfo: Room['areaInfo'];
  bedInfo: Room['bedInfo'];
  maxPeople: Room['maxPeople'];
  isHideTitle?: boolean
}

interface RoomInfo {
  name: string;
  icon: string;
  value: string;
}

const route = useRoute();
const routeName = (route.name as string) || "";

const { areaInfo, bedInfo, maxPeople, isHideTitle } = defineProps<BasicInformation>();
const roomBasicInformationList: RoomInfo[] = [
  {
    name: "area",
    icon: "fa-expand",
    value: areaInfo,
  },
  {
    name: "bed",
    icon: "fa-bed",
    value: bedInfo,
  },
  {
    name: "people",
    icon: "fa-user",
    value: `1${maxPeople ? `-${maxPeople}` : ""} 人`,
  },
];
</script>

<template>
  <div class="d-grid gap-3 gap-md-4">
    <div class="d-flex align-items-center" v-if="!isHideTitle">
      <div class="customize-vr"></div>
      <h5 class="mb-0 text-neutral" :style="{ fontSize: (routeName === 'rooms-success' || routeName === 'user-orders' ? 1 : 1.5 ) + 'rem' }"><strong>房型基本資訊</strong></h5>
    </div>
    <section class="basic-information">
      <template v-for="list in roomBasicInformationList" :key="list.icon">
        <div
          v-if="list.value"
          class="detail-square"
          :class="[{ 'have-border': routeName === 'rooms' }]"
        >
          <font-awesome-icon
            :icon="`fa-solid ${list.icon}`"
            size="lg"
            class="text-primary"
          />
          <div class="text-neutral-80"><strong>{{ list.value }}</strong></div>
        </div>
      </template>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.basic-information {
  display: flex;
  gap: 16px;
  .detail-square {
    width: 97px;
    height: 97px;
    border-radius: 8px;
    padding: 16px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 8px;
    &.have-border {
      border: 1px solid $primary-40;
    }
  }
}
</style>
