<script setup lang="ts">
import Layout from "@/components/Layouts/Index.vue";
import SlideShow from "@/components/Home/SlideShow.vue";
import News from "@/components/Home/News.vue";
import About from "@/components/Home/About.vue";
import Rooms from "@/components/Home/Rooms.vue";
import Culinary from "@/components/Home/Culinary.vue";
import Traffic from "@/components/Home/Traffic.vue";
import { usehomeStore } from "@/stores";
import { onMounted } from "vue";
const homeStore = usehomeStore();
//  === fix header scroll ===
/* import { onMounted, ref, onBeforeUnmount, nextTick } from 'vue';
import type { ComponentPublicInstance } from "vue";
const slideShow = ref<ComponentPublicInstance | null>(null);
const slideShowHeight = ref(0);
const headerStyle = ref('styleBgTransparent');

const getSlideShowHeight = async () => {
  await nextTick(() => {
    if(slideShow.value) {
      console.log(slideShow.value.$el.offsetHeight)
      const height = slideShow.value.$el.offsetHeight;
      slideShowHeight.value = height;
    }
  })
}
const onScroll = () => {
  let scrollTop = 0;
  if(typeof window.pageYOffset !== 'undefined') {
    scrollTop = window.pageYOffset;
  } else if(typeof document.compatMode !== 'undefined' && document.compatMode !== 'BackCompat') {
    scrollTop = document.documentElement.scrollTop;
  } else if(typeof document.body !== 'undefined') {
    scrollTop = document.body.scrollTop;
  }
  if(slideShowHeight.value < (scrollTop + 120)) {
    headerStyle.value = 'styleBgNormal';
  } else {
    headerStyle.value = 'styleBgTransparent';
  }
}
onMounted(() => {
  if(slideShow.value) {
    getSlideShowHeight();
    window.addEventListener('scroll', onScroll);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
}); */
// === end ===

onMounted(() => {
  Promise.race([
    homeStore.fetchNews(),
    homeStore.fetchSlideShow(),
    homeStore.fetchCulinary(),
    homeStore.fetchRoom(),
  ]);
});
</script>

<template>
  <Layout :type="'styleBgTransparent'" is-has-footer-decoration>
    <SlideShow ref="slideShow" />
    <News />
    <About />
    <Rooms />
    <Culinary />
    <Traffic />
  </Layout>
</template>

<style lang="scss"></style>
