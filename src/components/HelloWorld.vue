<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

// const count = ref(0)
// const myModal = new bootstrap.Modal(document.getElementById('myModal'), Option)
</script>

<template>
  <h1 class="test">{{ msg }}</h1>

</template>

<style lang="scss">
.test {
  color: $orange;
  @include media-breakpoint-down(md){
    color: $success-20;
    font-size: 100px;
  }
}
</style>
