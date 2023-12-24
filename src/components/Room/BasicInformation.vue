<script setup lang="ts">
import { useRoute } from "vue-router";

interface BasicInformation {
  areaInfo: string;
  bedInfo: string;
  minPeople?: number;
  maxPeople: number;
}

interface RoomInfo {
  name: string;
  icon: string;
  value: string;
}

const route = useRoute();
const routeName = (route.name as string) || "";

const { areaInfo, bedInfo, minPeople, maxPeople } =
  defineProps<BasicInformation>();
const roomBasicInformationList: RoomInfo[] = [
  {
    name: "area",
    icon: "fa-expand",
    value: areaInfo ?? "-",
  },
  {
    name: "bed",
    icon: "fa-bed",
    value: bedInfo ?? "-",
  },
  {
    name: "people",
    icon: "fa-user",
    value: `${minPeople ?? 1}-${maxPeople} 人`,
  },
];
</script>

<template>
  <section class="basic-information">
    <div
      v-for="list in roomBasicInformationList"
      :key="list.icon"
      class="detail-square"
      :class="[{ 'have-border': routeName === 'rooms' }]"
    >
      <font-awesome-icon :icon="`fa-solid ${list.icon}`" size="lg" class="fa" />
      <div class="text">{{ list.value }}</div>
    </div>
  </section>
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
    .fa {
      color: #997e64;
    }
    .text {
      color: #4b4b4b;
    }
  }
}
</style>
