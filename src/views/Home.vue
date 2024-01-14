<script setup lang="ts">
import Layout from "@/components/Layouts/Index.vue";
import SlideShow from "@/components/Home/SlideShow.vue";
import News from "@/components/Home/News.vue";
import About from "@/components/Home/About.vue";
import Rooms from "@/components/Home/Rooms.vue";
import Culinary from "@/components/Home/Culinary.vue";
import Traffic from "@/components/Home/Traffic.vue";
import { usehomeStore } from "@/stores";
import { onMounted, ref } from "vue";
const homeStore = usehomeStore();
const headerType = ref("styleBgTransparent");
onMounted(() => {
  Promise.race([
    homeStore.fetchNews(),
    homeStore.fetchSlideShow(),
    homeStore.fetchCulinary(),
    homeStore.fetchRoom(),
  ]);
});
const setHeaderType = (type: string) => {
  headerType.value = type;
};
</script>

<template>
  <Layout :type="headerType" is-has-footer-decoration>
    <SlideShow ref="slideShow" @header-type="setHeaderType" />
    <News />
    <About />
    <Rooms />
    <Culinary />
    <Traffic />
  </Layout>
</template>

<style lang="scss"></style>
