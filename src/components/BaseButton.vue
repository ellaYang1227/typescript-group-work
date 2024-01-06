<script setup lang="ts">
const props = defineProps({
  type: {
    type: String as () => "button" | "submit" | undefined,
    default: "button",
    validator(value: string) {
      return ["button", "submit"].includes(value);
    },
  },
  to: {
    type: [Object, String],
    default: "",
  },
  href: {
    type: String,
    default: "",
  },
  target: {
    type: String,
    default: "_blank",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  replace: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <a
    v-if="props.href"
    :href="props.href"
    :target="props.target"
    :disabled="props.disabled"
    class="baseButton"
  >
    <span class="baseButton__content"><slot /></span>
  </a>
  <router-link
    v-else-if="props.to"
    :to="props.to"
    :disabled="props.disabled"
    class="baseButton"
  >
    <span class="baseButton__content"><slot /></span>
  </router-link>
  <button v-else :type="props.type" :disabled="disabled" class="baseButton">
    <span class="baseButton__content"><slot /></span>
  </button>
</template>
<style lang="scss">
@function capitalize($string) {
  @return to-upper-case(str-slice($string, 1, 1)) + str-slice($string, 2);
}
$colors: (
  "primary": (
    "color": $primary,
    "color-hover": $primary-dark,
    "text": #fff,
    "border-color": $primary,
    "text-hover": $white,
    "border-color-hover": $primary-dark,
    "disabled-text": $neutral-60,
    "disabled-border-color": transparent,
    "disabled-color": transparent,
  ),
  "secondary": (
    "color": $white,
    "color-hover": $primary-tint,
    "text": $primary,
    "border-color": $primary,
    "text-hover": $primary-dark,
    "border-color-hover": $primary-dark,
    "disabled-text": $neutral-60,
    "disabled-border-color": $neutral-60,
    "disabled-color": $white,
  ),
  "white": (
    "color": $white,
    "color-hover": $primary,
    "text": $neutral,
    "border-color": $white,
    "text-hover": $white,
    "border-color-hover": $primary,
    "disabled-text": $neutral-60,
    "disabled-border-color": $neutral-60,
    "disabled-color": $white,
  ),
  "ghost": (
    "color": transparent,
    "color-hover": transparent,
    "text": #fff,
    "border-color": transparent,
    "text-hover": $primary,
    "border-color-hover": transparent,
    "disabled-text": $neutral-60,
    "disabled-border-color": transparent,
    "disabled-color": transparent,
  ),
  "text": (
    "color": transparent,
    "color-hover": transparent,
    "text": $primary,
    "border-color": transparent,
    "text-hover": $primary-dark,
    "border-color-hover": transparent,
    "disabled-text": $neutral-60,
    "disabled-border-color": transparent,
    "disabled-color": transparent,
  ),
  "textIcon": (
    "color": transparent,
    "color-hover": transparent,
    "text": $white,
    "border-color": transparent,
    "text-hover": $primary,
    "border-color-hover": transparent,
    "disabled-text": $neutral-60,
    "disabled-border-color": transparent,
    "disabled-color": transparent,
  ),
);

.baseButton {
  display: inline-block;
  width: auto;
  max-width: 100%;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.15;
  color: #fff;
  text-align: center;
  letter-spacing: 0.02em;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  background: $primary;
  border: 1px solid transparent;
  opacity: 1;
  transition:
    background 0.3s,
    border 0.3s,
    color 0.3s,
    opacity 0.3s,
    backdrop-filter 0.3s;
  -webkit-appearance: none;
  appearance: none;
  text-decoration: none;
  border-radius: 8px;
  // @include max-lg {
  //   padding: 1rem 3.6rem;
  //   font-size: 1rem;
  // }

  &:focus {
    outline: none;
  }

  &:hover {
    text-decoration: none;
  }

  @each $color, $value in $colors {
    &.isStyle#{capitalize($color)} {
      color: map-get($value, "text");
      background: map-get($value, "color");
      border-color: map-get($value, "border-color");

      &:hover:not(:disabled) {
        background: map-get($value, "color-hover");
        color: map-get($value, "text-hover") !important;
        border-color: map-get($value, "border-color-hover");
      }

      &:active:not(:disabled) {
        background: map-get($value, "color-hover");
        color: map-get($value, "text-hover") !important;
        border-color: map-get($value, "border-color-hover");
      }
      &:disabled {
        background: map-get($value, "disabled-color");
        color: map-get($value, "disabled-text") !important;
        border-color: map-get($value, "disabled-border-color");
      }
    }
  }
  &.isStyleText {
    padding: 1rem;
    text-decoration: underline;
    &:hover:not(:disabled) {
      text-decoration: underline;
    }
  }
  &.isStyleTextIcon {
    padding: 1rem;
    font-size: 16px;
  }
  // &.isWhite {
  //   color: $white;
  //   text-decoration: none;
  //   &:hover:not(:disabled) {
  //     text-decoration: none;
  //     color: white;
  //     opacity: .7;
  //   }
  // }
  &:disabled {
    background: $neutral-40;
    opacity: 1;
    color: $neutral-60;
    cursor: not-allowed;
  }
}
</style>
