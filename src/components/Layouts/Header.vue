<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
const store = useAuthStore();
const { isLogined } = storeToRefs(store);
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
});
const isMenuShow = ref(false);
</script>

<template>
  <header class="header" :class="props.type">
    <div class="header_inner d-flex align-items-center justify-content-between">
      <div class="header_leftSide mr-3">
        <router-link to="/">
          <img src="@/assets/logoWhite.svg" alt="" />
        </router-link>
      </div>
      <div class="header_rightSide">
        <BaseButton
          v-if="!isMenuShow"
          class="isStyleTextIcon d-md-none"
          @click="isMenuShow = !isMenuShow"
        >
          <font-awesome-icon icon="fa-solid fa-bars" />
        </BaseButton>
        <nav class="header_menu" :class="{ isShow: isMenuShow }">
          <BaseButton
            class="isStyleTextIcon d-md-none d-flex ms-auto h4"
            @click="isMenuShow = !isMenuShow"
          >
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </BaseButton>
          <ul
            class="header_menuList list-unstyled d-flex flex-column flex-md-row mb-0 justify-content-md-start justify-content-center"
          >
            <li
              class="align-self-md-start align-self-center w-md-auto w-100 mb-md-0 mb-4"
            >
              <BaseButton class="isStyleGhost w-md-auto w-100" to="/rooms"
                >客房旅宿</BaseButton
              >
            </li>
            <li
              class="align-self-md-start align-self-center w-md-auto w-100 mb-md-0 mb-4"
            >
              <BaseButton
                v-if="!isLogined"
                class="isStyleGhost w-md-auto w-100"
                to="/login"
                >會員登入</BaseButton
              >
              <BaseButton
                v-else
                class="isStyleGhost w-md-auto w-100"
                to="/user"
              >
                <font-awesome-icon icon="fa-regular fa-circle-user" /><span>{{
                  "Jession"
                }}</span>
              </BaseButton>
            </li>
            <li class="align-self-md-start align-self-center w-md-auto w-100">
              <BaseButton class="isStylePrimary w-md-auto w-100" to="/rooms"
                >立即訂房</BaseButton
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  height: 120px;
  background: $neutral;
  transition: 0.3s;
  position: relative;
  &.styleBgTransparent {
    background: transparent;
    height: auto;
    .header_inner {
      background: transparent;
    }
  }
  &.styleBgNormal {
    background: $neutral;
    .header_inner {
      background: $neutral;
    }
  }
  &.styleDisabled {
    .header_rightSide {
      display: none;
    }
  }
  &_inner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 1.5rem 5rem;
    transition: 0.3s;
    @include media-breakpoint-down(lg) {
      padding: 1.5rem 2rem;
    }
    @include media-breakpoint-down(md) {
      padding: 1rem 0.68rem 1rem 0.75rem;
    }
  }
  &_leftSide {
    img {
      @include media-breakpoint-down(md) {
        width: 109px;
      }
    }
  }
  &_menu {
    @include media-breakpoint-down(md) {
      display: none;
      padding: 1.25rem;
    }
    &.isShow {
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      height: 100vh;
      width: 100%;
      background: #140f0a;
    }
  }
  &_menuList {
    @include media-breakpoint-down(md) {
      height: calc(100% - 50vw);
    }
  }
}
</style>
