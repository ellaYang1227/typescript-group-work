<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
</script>

<template>
  <div class="container-xxl py-5 guideline">
    <h2>顏色</h2>
    <div class="d-flex list">
      <div>
        <div class="block bg-primary-dark text-white">#7B6651</div>
        <p>$primary-dark</p>
      </div>
      <div>
        <div class="block bg-primary">#997E64</div>
        <p>$primary</p>
      </div>
      <div>
        <div class="block bg-primary-80">#AE9984</div>
        <p>$primary-80</p>
      </div>
      <div>
        <div class="block bg-primary-60">#E1D1C2</div>
        <p>$primary-60</p>
      </div>
      <div>
        <div class="block bg-primary-40">#F1EAE4</div>
        <p>$primary-40</p>
      </div>
      <div>
        <div class="block bg-primary-tint">#F7F2EE</div>
        <p>$primary-tint</p>
      </div>
    </div>
    <div class="d-flex list">
      <div>
        <div class="block bg-success-dark text-white">#299F65</div>
        <p>$success-dark</p>
      </div>
      <div>
        <div class="block bg-success">#52DD7E</div>
        <p>$success</p>
      </div>
      <div>
        <div class="block bg-success-20">#BCFBBD</div>
        <p>$success-20</p>
      </div>
      <div>
        <div class="block bg-success-10">#E8FEE7</div>
        <p>$success-10</p>
      </div>
    </div>
    <div class="d-flex list">
      <div>
        <div class="block bg-info-dark text-white">#1D66AC</div>
        <p>$info-dark</p>
      </div>
      <div>
        <div class="block bg-info">#3BADEF</div>
        <p>$info</p>
      </div>
      <div>
        <div class="block bg-info-20">#B1EFFD</div>
        <p>$info-20</p>
      </div>
      <div>
        <div class="block bg-info-10">#E6FBFE</div>
        <p>$info-10</p>
      </div>
    </div>
    <div class="d-flex list">
      <div>
        <div class="block bg-danger-dark text-white">#C22538</div>
        <p>$danger-dark</p>
      </div>
      <div>
        <div class="block bg-danger">#DA3E51</div>
        <p>$danger</p>
      </div>
      <div>
        <div class="block bg-danger-20">#F5CCD1</div>
        <p>$danger-20</p>
      </div>
      <div>
        <div class="block bg-danger-10">#FDECEF</div>
        <p>$danger-10</p>
      </div>
    </div>
    <div class="d-flex list">
      <div>
        <div class="block bg-neutral-dark text-white">#140F0A</div>
        <p>$neutral-dark</p>
      </div>
      <div>
        <div class="block bg-neutral text-white">#000000</div>
        <p>$neutral</p>
      </div>
      <div>
        <div class="block bg-neutral-80 text-white">#4B4B4B</div>
        <p>$neutral-80</p>
      </div>
      <div>
        <div class="block bg-neutral-60 text-white">#909090</div>
        <p>$neutral-60</p>
      </div>
      <div>
        <div class="block bg-neutral-40">#ECECEC</div>
        <p>$neutral-40</p>
      </div>
      <div>
        <div class="block bg-neutral-10">#F9F9F9</div>
        <p>$neutral-10</p>
      </div>
      <div>
        <div class="block bg-white">#FFFFFF</div>
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
        <BaseButton class="isStyleWhite">測試</BaseButton>
        <p>isStyleWhite</p>
      </div>
      <div class="block">
        <BaseButton class="isStyleGhost">測試</BaseButton>
        <p>isStyleGhost</p>
      </div>
      <div class="block">
        <BaseButton class="isStyleText">測試</BaseButton>
        <p>isStyleText</p>
      </div>
      <div class="block bg-black">
        <BaseButton class="isStyleTextIcon">
          <font-awesome-icon icon="fa-brands fa-instagram" />
        </BaseButton>
        <p class="text-white">isStyleTextIcon</p>
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
    <h2>自訂垂直分隔線</h2>
    <ul class="list-inline">
      <li class="list-inline-item me-5">
        <div class="d-flex align-items-center">
          <div class="customize-vr"></div>
          customize-vr
        </div>
        <span>用於：房型基本資訊、房間格局、入住、房間設備、備品提供...等</span>
      </li>
      <li class="list-inline-item">
        <div class="d-flex align-items-center">
          <div class="customize-vr bg-neutral-60"></div>
          customize-vr bg-neutral-60
        </div>
        <span>用於：退房</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.guideline {
  .list {
    .block {
      width: 180px;
      height: 120px;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
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
