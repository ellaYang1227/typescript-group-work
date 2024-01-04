<script setup lang="ts">
import SectionTitle from "@/components/Home/SectionTitle.vue";
import { usehomeStore } from "@/stores";
import { storeToRefs } from "pinia";
const { newsList } = storeToRefs(usehomeStore());
</script>

<template>
  <section v-if="newsList.length" class="homeNews">
    <div class="container py-10 py-lg-11 homeNews_inner">
      <div class="row">
        <div class="col-lg-2">
          <SectionTitle type="short" title="最新消息" />
        </div>
        <div class="col-lg-10">
          <ul class="list-unstyled homeNews_list">
            <li
              v-for="newsItem in newsList"
              :key="newsItem._id"
              class="homeNews_item"
            >
              <div class="row">
                <div class="col-lg-5 ps-lg-0">
                  <img
                    :src="newsItem.image"
                    :alt="newsItem.title"
                    class="homeNews_img object-fit"
                  />
                </div>
                <div class="col-lg-7 align-self-center">
                  <h3 class="mb-lg-4 mb-2 mt-lg-0 mt-4">
                    {{ newsItem.title }}
                  </h3>
                  <p class="mb-0 fw-medium">
                    {{ newsItem.description }}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.homeNews {
  overflow: hidden;
  &_inner {
    position: relative;
    &:before {
      position: absolute;
      content: "";
      background-image: url("@/assets/homeDot.svg");
      background-repeat: no-repeat;
      background-size: cover;
      height: 200px;
      width: 200px;
      top: 100px;
      right: -132px;
      @include media-breakpoint-down(lg) {
        top: 2.5rem;
        right: 1.5rem;
        width: 100px;
        height: 100px;
      }
    }
  }

  &_img {
    border-radius: 8px;
  }
  &_item {
    &:not(:last-child) {
      margin-bottom: 2.5rem;
    }
  }
}
</style>
