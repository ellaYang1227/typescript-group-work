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
  <div class="sectionTitle" :class="`isStyle${capitalizeFirstLetter(type)}`">
    <h2 class="sectionHomeTitle mb-0">
      {{ props.title }}
    </h2>
  </div>
</template>

<style lang="scss">
.sectionTitle {
  position: relative;
  &:after {
    content: "";
    position: absolute;
    height: 2px;
    width: 100%;
    background: linear-gradient(90deg, #be9c7c 0%, #ffffff 100%);
  }
  @include media-breakpoint-down(lg) {
    margin-bottom: 2.5rem;
  }
  .sectionHomeTitle {
    color: $primary;
    font-size: 3rem;
    line-height: 1.2;
    letter-spacing: 0.05em;
    @include media-breakpoint-down(lg) {
      font-size: 2rem;
    }
  }
  &.isStyleShort {
    width: 8.75rem;
    padding-bottom: 2.5rem;
    @include media-breakpoint-down(lg) {
      width: 4.25rem;
      padding-bottom: 1.5rem;
    }
    &:after {
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
  &.isStyleWhite {
    color: $white;
    @include media-breakpoint-up(lg) {
      margin-bottom: 5rem;
      width: 19rem;
    }
    .sectionHomeTitle {
      width: 8.75rem;
      color: $white;
      @include media-breakpoint-down(lg) {
        width: 4.25rem;
      }
    }
    &:after {
      background: $white;
      width: 164px;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      @include media-breakpoint-down(lg) {
        width: calc(100% - 4.125rem - 40px);
      }
    }
  }
}
</style>
