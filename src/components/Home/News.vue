<script setup lang="ts">
import SectionTitle from "@/components/Home/SectionTitle.vue";
import { usehomeStore } from "@/stores";
import { storeToRefs } from "pinia";
const { newsList } = storeToRefs(usehomeStore());
</script>

<template>
  <section v-if="newsList.length" class="homeNews">
    <div class="container py-6 py-md-11">
      <div class="row">
        <div class="col-md-2">
          <SectionTitle type="short" title="最新消息" />
        </div>
        <div class="col-md-10">
          <ul class="list-unstyled homeNews_list">
            <li
              v-for="newsItem in newsList"
              :key="newsItem._id"
              class="homeNews_item"
            >
              <div class="row">
                <div class="col-5 ps-0">
                  <img
                    :src="newsItem.image"
                    :alt="newsItem.title"
                    class="homeNews_img object-fit"
                  />
                </div>
                <div class="col-7 align-self-center">
                  <h3 class="mb-4">{{ newsItem.title }}</h3>
                  <p class="mb-0 text-neutral-80 fw-medium">
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
