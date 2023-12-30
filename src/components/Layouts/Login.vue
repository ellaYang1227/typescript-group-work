<script setup lang="ts">
import Layout from "@/components/Layouts/Index.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <Layout isHiddenFooter type="styleDisabled">
    <section class="row m-0 login-layout">
      <div class="col-md-6 image-bg d-none d-sm-block"></div>
      <div
        class="col-md-6 d-flex justify-content-center align-items-center p-3"
      >
        <RouterView class="form-area w-100" />
      </div>
    </section>
  </Layout>
</template>

<style scoped lang="scss">
.login-layout {
  background-color: $neutral-dark;
  color: white;
  min-height: calc(100vh - 120px); //減去header
  .image-bg {
    background-image: url("https://images.unsplash.com/photo-1630587148265-761cbd139043?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
    background-size: cover;
    background-position: center;
  }
  .form-area {
    max-width: 416px;
  }
}
</style>
