<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  type: {
    type: String as () => "short" | "white" | "normal",
    default: "normal",
    validator(value: string) {
      return ["short", "white"].includes(value);
    },
  },
});
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
</script>

<template>
  <h2 class="sectionHomeTitle" :class="`isStyle${capitalizeFirstLetter(type)}`">
    {{ props.title }}
  </h2>
</template>

<style lang="scss">
.sectionHomeTitle {
  color: $primary;
  font-size: 3rem;
  margin-bottom: 0;
  position: relative;
  line-height: 1.25em;
  @include media-breakpoint-down(lg) {
    font-size: 2rem;
  }
  &.isStyleShort {
    width: 8.75rem;
    padding-bottom: 2.5rem;
    @include media-breakpoint-down(lg) {
      width: 4.15rem;
      padding-bottom: 1.5rem;
    }
  }
  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    width: 100%;
    background: linear-gradient(90deg, #be9c7c 0%, #ffffff 100%);
  }
}
</style>
