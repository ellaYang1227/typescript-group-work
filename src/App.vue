<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue 測試" />
  <!-- <div class="container py-4 px-3 mx-auto text-info-dark">
    AAA
      <h1 class="text-primary">Hello, Bootstrap and Vite!</h1>
      <button class="btn btn-primary">Primary button</button>
    </div>
   -->
</template>

<style lang="scss">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  // @include media-breakpoint-down(md){
  //   height: 30px;
  // }
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}


// @include media-breakpoint-down(md) {
//   a {
//     &:hover {
//       color: red;
//     }
//   }
// }
</style>
