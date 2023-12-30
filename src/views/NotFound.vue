<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
</script>

<template>
  <Layout>
    <section class="notFound">
      <div class="container h-100">
        <div
          class="row notFound_inner justify-content-center align-items-center align-content-center h-100"
        >
          <div class="col-md-6 col-12 text-center mb-lg-0 mb-5 mx-auto">
            <img src="@/assets/notFound.svg" alt="404" />
          </div>
          <div class="col-md-6 col-12 align-self-center text-center">
            <h3 class="notFound__title">無法找到您要的頁面</h3>
            <p class="text-gray-6 mt-md-5 mt-4 noFound__content">
              很抱歉，您參訪的頁面不存在
              <br />請點選以下按鈕返回首頁
            </p>
            <BaseButton class="isStylePrimary mt-4" to="/">
              前往首頁
            </BaseButton>
          </div>
        </div>
      </div>
    </section>
  </Layout>
</template>
<style lang="scss">
.notFound {
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  &__title {
    font-size: 2.5rem;

    @include media-breakpoint-down(md) {
      font-size: 1.8rem;
    }
  }
  &__content {
    line-height: 1.8;
  }
}
</style>
