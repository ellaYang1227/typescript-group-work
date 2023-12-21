<script setup lang="ts">
// import { computed, ref } from 'vue';
// import { useRoute } from 'vue-router';
import BaseButton from '@/components/BaseButton.vue';
// const route = useRoute();
const props = defineProps({
  type: {
    type:  String,
    default: 'styleBgNormal',
    validator(value:string) {
      return ['styleBgTransparent', 'styleDisabled', 'styleBgNormal'].includes(value)
    },
  },
})  
// const myModal = new bootstrap.Modal(document.getElementById('myModal'), Option)
</script>

<template>
  <header class="header" :class="props.type">
    <div class="header_inner d-flex align-items-center justify-content-between">
      <div class="header_leftSide mr-3">
        <router-link to="/">
          <img src="@/assets/logoWhite.svg" alt="">
        </router-link>
      </div>
      <nav class="header_rightSide">
        <ul class="list-unstyled d-flex mb-0">
          <li>
            <BaseButton class="isStyleGhost" to="/rooms">客房旅宿</BaseButton>
          </li>
          <li>
            <BaseButton class="isStyleGhost" to="/login">會員登入</BaseButton>
          </li>
          <li>
            <BaseButton class="isStylePrimary" to="/rooms">立即訂房</BaseButton>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style lang="scss">
  .header {
    height: 120px;
    background: $neutral;
    &.styleBgTransparent {
      background: transparent;
      height: auto;
    }
    &.styleBgNormal {
      background: $neutral;
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
    }
  }
</style>