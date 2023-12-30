<script setup lang="ts">
import Header from "./Header.vue";
import Footer from "./Footer.vue";
const props = defineProps({
  type: {
    type: String,
    default: "styleBgNormal",
    validator(value: string) {
      return ["styleBgTransparent", "styleDisabled", "styleBgNormal"].includes(
        value,
      );
    },
  },
  isHasFooterDecoration: {
    type: Boolean,
    default: false,
  },
  isHiddenFooter: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <Header :type="props.type" />
  <slot></slot>
  <template v-if="!isHiddenFooter">
    <Footer :is-has-footer-decoration="isHasFooterDecoration" />
  </template>
</template>

<style lang="scss"></style>
