<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
const props = defineProps({
  isHasFooterDecoration: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <footer
    class="bg-neutral-dark text-white footer"
    :class="{ isHasFooterDecoration: props.isHasFooterDecoration }"
  >
    <div class="container-lg footer_inner">
      <div class="fotter_top d-md-flex justify-content-between">
        <div class="footer_leftSide">
          <img src="@/assets/logoWhite.svg" alt="logo" />
          <div class="mt-6">
            <BaseButton
              href="https://line.me/tw/"
              class="isStyleTextIcon footer_icon"
            >
              <font-awesome-icon icon="fa-brands fa-line" />
            </BaseButton>
            <BaseButton
              href="https://www.instagram.com/"
              class="isStyleTextIcon footer_icon"
            >
              <font-awesome-icon icon="fa-brands fa-instagram" />
            </BaseButton>
          </div>
        </div>
        <div class="footer_rightSide">
          <div class="d-md-flex">
            <div class="leftItem">
              <h4 class="h6">TEL</h4>
              <span class="text-neutral-40">+886-7-1234567</span>
            </div>
            <div class="mt-md-0 mt-3">
              <h4 class="h6">MAIL</h4>
              <span class="text-neutral-40">elh@hexschool.com</span>
            </div>
          </div>
          <div class="d-md-flex">
            <div class="leftItem mt-md-6 mt-3">
              <h4 class="h6">FAX</h4>
              <span class="text-neutral-40">+886-7-1234567</span>
            </div>
            <div class="mt-md-6 mt-3">
              <h4 class="h6">WEB</h4>
              <span class="text-neutral-40">www.elhhexschool.com.tw</span>
            </div>
          </div>
        </div>
      </div>
      <div class="footer_copy d-md-flex justify-content-between">
        <p class="mb-md-0 mb-3">806023 台灣高雄市新興區六角路123號</p>
        <p class="mb-0">© 享樂酒店 2023 All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  padding-top: 88px;
  padding-bottom: 120px;
  &.isHasFooterDecoration {
    padding-top: 276px;
    background-image: url("@/assets/footerDecoration.svg");
    background-repeat: no-repeat;
    background-size: contain;
    @include media-breakpoint-down(md) {
      padding-top: 172px;
      background-image: url("@/assets/footerDecorationMobile.svg");
    }
  }
  &_decoration {
    .img {
      object-fit: cover;
      object-position: center;
      height: auto;
      width: 100%;
    }
  }
  &_icon {
    width: 40px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-self: center;
    border: 1px solid $white !important;
    border-radius: 100%;
    letter-spacing: 0;
    margin-right: 1rem;
    padding: 0.6rem !important;
    svg {
      font-size: 21px;
    }
    &:hover {
      border: 1px solid $primary !important;
    }
  }
  &_rightSide {
    margin-top: 2px;
    .leftItem {
      margin-right: 80px;
    }
    @include media-breakpoint-down(md) {
      margin-top: 40px;
      .leftItem {
        margin-right: 0;
      }
    }
  }
  &_copy {
    margin-top: 80px;
  }
}
</style>
