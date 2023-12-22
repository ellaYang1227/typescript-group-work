<script setup lang="ts">
import Layout from "@/components/Layouts/index.vue";
import SlideShow from "@/components/Home/SlideShow.vue";
// import { onMounted, ref, onBeforeUnmount, nextTick } from 'vue';
// import type { ComponentPublicInstance } from "vue";
// const slideShow = ref<ComponentPublicInstance | null>(null);
// const slideShowHeight = ref(0);
// const headerStyle = ref('styleBgTransparent');

// const getSlideShowHeight = async () => {
//   await nextTick(() => {
//     if(slideShow.value) {
//       console.log(slideShow.value.$el.offsetHeight)
//       const height = slideShow.value.$el.offsetHeight;
//       slideShowHeight.value = height;
//     }
//   })
// }
// const onScroll = () => {
//   let scrollTop = 0;
//   if(typeof window.pageYOffset !== 'undefined') {
//     scrollTop = window.pageYOffset;
//   } else if(typeof document.compatMode !== 'undefined' && document.compatMode !== 'BackCompat') {
//     scrollTop = document.documentElement.scrollTop;
//   } else if(typeof document.body !== 'undefined') {
//     scrollTop = document.body.scrollTop;
//   }
//   if(slideShowHeight.value < (scrollTop + 120)) {
//     headerStyle.value = 'styleBgNormal';
//   } else {
//     headerStyle.value = 'styleBgTransparent';
//   }
// }
// onMounted(() => {
//   if(slideShow.value) {
//     getSlideShowHeight();
//     window.addEventListener('scroll', onScroll);
//   }
// });

// onBeforeUnmount(() => {
//   window.removeEventListener('scroll', onScroll);
// });
</script>

<template>
  <Layout :type="'styleBgTransparent'">
    <SlideShow ref="slideShow" />
    <section style="height: 100vh"></section>
  </Layout>
</template>

<style lang="scss"></style>
