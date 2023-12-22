<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
</script>

<template>
  <div class="container-xxl py-5 guideline">
    <h2>顏色</h2>
    <div class="d-flex list">
      <div>
        <div class="block bg-primary-dark"></div>
        <p>$primary-dark</p>
      </div>
      <div>
        <div class="block bg-primary"></div>
        <p>$primary</p>
      </div>
      <div>
        <div class="block bg-primary-80"></div>
        <p>$primary-80</p>
      </div>
      <div>
        <div class="block bg-primary-40"></div>
        <p>$primary-40</p>
      </div>
      <div>
        <div class="block bg-primary-tint"></div>
        <p>$primary-tint</p>
      </div>
    </div>
    <div class="d-flex list">
      <div>
        <div class="block bg-success-dark"></div>
        <p>$success-dark</p>
      </div>
      <div>
        <div class="block bg-success"></div>
        <p>$success</p>
      </div>
      <div>
        <div class="block bg-success-20"></div>
        <p>$success-20</p>
      </div>
      <div>
        <div class="block bg-success-10"></div>
        <p>$success-10</p>
      </div>
    </div>
    <div class="d-flex list">
      <div>
        <div class="block bg-info-dark"></div>
        <p>$info-dark</p>
      </div>
      <div>
        <div class="block bg-info"></div>
        <p>$info</p>
      </div>
      <div>
        <div class="block bg-info-20"></div>
        <p>$info-20</p>
      </div>
      <div>
        <div class="block bg-info-10"></div>
        <p>$info-10</p>
      </div>
    </div>
    <div class="d-flex list">
      <div>
        <div class="block bg-danger-dark"></div>
        <p>$danger-dark</p>
      </div>
      <div>
        <div class="block bg-danger"></div>
        <p>$danger</p>
      </div>
      <div>
        <div class="block bg-danger-20"></div>
        <p>$danger-20</p>
      </div>
      <div>
        <div class="block bg-danger-10"></div>
        <p>$danger-10</p>
      </div>
    </div>
    <div class="d-flex list">
      <div>
        <div class="block bg-neutral-dark"></div>
        <p>$neutral-dark</p>
      </div>
      <div>
        <div class="block bg-neutral"></div>
        <p>$neutral</p>
      </div>
      <div>
        <div class="block bg-neutral-80"></div>
        <p>$neutral-80</p>
      </div>
      <div>
        <div class="block bg-neutral-60"></div>
        <p>$neutral-60</p>
      </div>
      <div>
        <div class="block bg-neutral-40"></div>
        <p>$neutral-40</p>
      </div>
      <div>
        <div class="block bg-neutral-10"></div>
        <p>$neutral-10</p>
      </div>
      <div>
        <div class="block bg-white"></div>
        <p>$white</p>
      </div>
    </div>
    <h2>文字: className 對應 h1 ~ h6 也是</h2>
    <h1>H1. Heading 48px B</h1>
    <h2>H2. Heading 40px B</h2>
    <h3>H3. Heading 32px B</h3>
    <h4>H4. Heading 28px B</h4>
    <h5>H5. Heading 24px B</h5>
    <h6>H6. Heading 20px B</h6>
    <h2 class="mt-4">BaseButton 按鈕: className 對應底下文字</h2>
    <div class="d-flex list">
      <div class="block">
        <BaseButton class="isStylePrimary">測試</BaseButton>
        <p>isStylePrimary</p>
      </div>
      <div class="block">
        <BaseButton class="isStyleSecondary">測試</BaseButton>
        <p>isStyleSecondary</p>
      </div>
      <div class="block">
        <BaseButton class="isStyleGhost">測試</BaseButton>
        <p>isStyleGhost</p>
      </div>
      <div class="block">
        <BaseButton class="isStyleText">測試</BaseButton>
        <p>isStyleText</p>
      </div>
      <div class="block">
        <BaseButton class="isStyleTextIcon"><i class="fa-regular fa-circle-user"></i></BaseButton>
        <p>isStyleTextIcon</p>
      </div>
    </div>
    <h2>頁面連結</h2>
    <div class="d-flex list">
      <div class="block">
        <RouterLink to="/">首頁</RouterLink>
        <p>/</p>
      </div>
      <div class="block">
        <RouterLink to="/rooms">訂房住宿</RouterLink>
        <p>/rooms</p>
      </div>
      <div class="block">
        <RouterLink to="/rooms/:id">住宿單一內容</RouterLink>
        <p>/rooms/:id</p>
      </div>
      <div class="block">
        <RouterLink to="/rooms/:id/reservation">預約訂房</RouterLink>
        <p>/rooms/:id/reservation</p>
      </div>
      <div class="block">
        <RouterLink to="/rooms/:id/success">預約成功</RouterLink>
        <p>/rooms/:id/success</p>
      </div>
      <div class="block">
        <RouterLink to="/login">登入</RouterLink>
        <p>/login</p>
      </div>
      <div class="block">
        <RouterLink to="/user">會員資訊</RouterLink>
        <p>/user</p>
      </div>
      <div class="block">
        <RouterLink to="/user/orders">會員訂單</RouterLink>
        <p>/user/orders</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.guideline {
  .list {
    .block {
      width: 180px;
      height:120px;
      border-radius: 8px;
      &:not(:last-child) {
        margin-right: 20px;
      }
    }
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
  
}

</style>