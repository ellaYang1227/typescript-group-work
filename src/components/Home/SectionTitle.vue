<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  subTitle: {
    type: String,
    default: "",
  },
  type: {
    type: String as () => "short" | "white" | "normal" | "banner",
    default: "normal",
    validator(value: string) {
      return ["short", "white", "normal", "banner"].includes(value);
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
    <span v-if="subTitle" class="text-primary sectionHomeSubTitle fw-bold">{{
      subTitle
    }}</span>
  </div>
</template>

<style lang="scss">
.sectionTitle {
  position: relative;
  margin-bottom: 5rem;
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
    line-height: 1.25;
    letter-spacing: 0.05em;
    gap: 4px;
    @include media-breakpoint-down(lg) {
      font-size: 2rem;
    }
  }
  &.isStyleNormal {
    width: 19rem;
    @include media-breakpoint-down(lg) {
      width: calc(100% - 51px);
    }
    .sectionHomeTitle {
      width: 8.75rem;
      color: $primary;
      @include media-breakpoint-down(lg) {
        width: 4.25rem;
      }
    }
    &:after {
      width: 161px;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      @include media-breakpoint-down(lg) {
        width: calc(100% - 4.125rem - 40px);
      }
    }
  }
  &.isStyleShort {
    width: 8.75rem;
    margin-bottom: 0;
    padding-bottom: 2.5rem;
    @include media-breakpoint-down(lg) {
      width: 4.25rem;
      padding-bottom: 1.5rem;
      margin-bottom: 2.5rem;
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
  &.isStyleBanner {
    padding-bottom: 2.5rem;
    @include media-breakpoint-down(lg) {
      text-align: center;
      max-height: 169px;
      height: 24vh;
    }

    @media screen and (max-width: 376px) {
      margin-bottom: 0;
      height: 146px;
    }
    &:after {
      bottom: 0;
      left: 0;
      @include media-breakpoint-down(lg) {
        width: 2px;
        height: 83px;
        left: 50%;
        top: auto;
        bottom: -20px;
      }
      @media screen and (max-width: 376px) {
        height: 73px;
      }
    }
    .sectionHomeTitle {
      letter-spacing: 0.05em;
      font-size: 2.5vw;
      @include media-breakpoint-down(lg) {
        font-size: 1.75rem;
      }
    }
    .sectionHomeSubTitle {
      font-size: 1.25vw;
      margin-top: 0.5rem;
      display: inline-block;
      @include media-breakpoint-down(lg) {
        font-size: 1.5rem;
      }
    }
  }
}
</style>
