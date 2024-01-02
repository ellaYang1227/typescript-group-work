<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
const store = useAuthStore();
const { userInformation } = storeToRefs(store);
const props = defineProps({
  type: {
    type: String,
    default: "styleBgNormal",
    validator(value: string) {
      return ["styleBgTransparent", "styleDisabled", "styleBgNormal"].includes(
        value
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
          <img src="@/assets/logoWhite.svg" alt="logo" />
        </router-link>
      </div>
      <div class="header_rightSide">
        <BaseButton
          v-if="!isMenuShow"
          class="isStyleTextIcon header_menuBars d-md-none"
          @click="isMenuShow = !isMenuShow"
        >
          <font-awesome-icon icon="fa-solid fa-bars" class="svg mb-0" />
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
              class="header_menuItem align-self-md-start align-self-center mb-md-0 mb-4"
            >
              <BaseButton class="header_menuLink isStyleGhost" to="/rooms"
                >客房旅宿</BaseButton
              >
            </li>
            <li
              class="header_menuItem align-self-md-start align-self-center mb-md-0 mb-4"
            >
              <BaseButton
                v-if="!userInformation?.id"
                class="header_menuLink isStyleGhost"
                to="/login"
                >會員登入</BaseButton
              >
              <BaseButton
                v-else
                class="header_menuLink isStyleGhost"
                to="/user"
              >
                <font-awesome-icon
                  icon="fa-regular fa-circle-user"
                  class="h5 mb-0 d-md-inline d-none"
                />
                <span class="ps-2 align-text-top d-md-inline d-none">{{
                  userInformation.name
                }}</span>
                <span class="ps-2 align-text-top d-md-none">我的帳戶</span>
              </BaseButton>
            </li>
            <li class="header_menuItem align-self-md-start align-self-center">
              <BaseButton class="header_menuLink isStylePrimary" to="/rooms"
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
  background: $neutral-dark;
  transition: 0.3s;
  position: relative;
  @include media-breakpoint-down(md) {
    height: 72px;
  }
  &.styleBgTransparent {
    background: transparent;
    height: auto;
    .header_inner {
      background: transparent;
    }
  }
  &.styleBgNormal {
    background: $neutral-dark;
    .header_inner {
      background: $neutral-dark;
    }
  }
  &.styleDisabled {
    .header_rightSide {
      display: none;
      @include media-breakpoint-down(md) {
        display: block;
      }
    }
    .header_inner {
      background: $neutral-dark;
    }
  }
  &_inner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 0 5rem;
    transition: 0.3s;
    z-index: 1003;
    height: 120px;
    @include media-breakpoint-down(xxl) {
      padding: 0 0.75rem;
    }
    @include media-breakpoint-down(md) {
      padding: 0 0.75rem;
      height: 72px;
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
  &_menuItem {
    @include media-breakpoint-down(md) {
      width: 100%;
    }
    &:not(:last-child) {
      margin-right: 1rem;
      @include media-breakpoint-down(md) {
        margin-right: 0rem;
      }
    }
  }
  &_menuLink {
    @include media-breakpoint-down(md) {
      width: 100%;
    }
  }
  &_menuBars {
    width: 40px;
    height: 40px;
    padding: 0.5rem !important;
    .baseButton__content {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .svg {
      font-size: 1.287rem;
    }
  }
}
</style>
