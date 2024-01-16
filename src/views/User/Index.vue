<script setup lang="ts">
import Layout from "@/components/Layouts/Index.vue";
import UserPasswordForm from "@/components/User/UserPasswordForm.vue";
import { UserInfoData } from "@/interfaces/auth";
import { useAuthStore } from "@/stores";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";

const store = useAuthStore();
const { userInformation } = storeToRefs(store);
const userInfoData = ref<UserInfoData>();

watch(
  () => userInformation.value,
  (newValue) => {
    if (newValue) {
      // 轉換日期格式 yyyy/mm/dd
      const date = new Date(newValue.birthday);
      const formattedDate = date.toLocaleDateString("zh-TW", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      userInfoData.value = {
        userId: newValue._id,
        name: newValue.name,
        email: newValue.email,
        phone: newValue.phone,
        address: newValue.address,
        birthday: formattedDate,
      };
    }
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <Layout is-has-footer-decoration>
    <section class="bg-neutral-dark user">
      <div class="banner">
        <img
          class="banner__bg w-100 d-none d-lg-block"
          src="@/assets/userBanner.png"
          alt="userBanner"
        />
        <img
          class="banner__bg w-100 d-block d-lg-none"
          src="@/assets/userBannerMobile.jpg"
          alt="userBanner"
        />
        <div class="banner__container container">
          <div
            class="banner__head d-flex flex-column flex-lg-row align-items-lg-center gap-3 gap-lg-4"
          >
            <img src="@/assets/headSticker.png" alt="headSticker" />
            <h1 v-if="userInformation" class="text-white fw-bold m-0">
              Hello，{{ userInformation.name }}
            </h1>
          </div>
        </div>
      </div>
      <div class="container-lg pb-6 pb-lg-11">
        <nav class="py-6 py-lg-10">
          <router-link
            to="/user"
            class="baseButton isStyleGhost px-4 py-3"
            active-class="active"
          >
            個人資料
          </router-link>
          <router-link
            to="/user/orders"
            class="baseButton isStyleGhost px-4 py-3"
            active-class="active"
          >
            我的訂單
          </router-link>
        </nav>
        <UserPasswordForm v-if="userInfoData" :userInfoData="userInfoData" />
      </div>
    </section>
  </Layout>
</template>

<style lang="scss">
.user {
  .container {
    padding: 0 0.75rem;
  }
  .banner {
    position: relative;
    &__bg {
      object-fit: cover;
      height: 12.875rem;
      @include media-breakpoint-up(lg) {
        height: 24rem;
      }
    }
    &__container {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
    &__head {
      img {
        width: 4.5rem;
        @include media-breakpoint-up(lg) {
          width: 9rem;
        }
      }
      p {
        font-size: 2rem;
        @include media-breakpoint-up(lg) {
          font-size: 3rem;
        }
      }
    }
  }
  .active {
    color: $primary;
    position: relative;
    &::after {
      content: "";
      display: block;
      width: 2rem;
      height: 0.25rem;
      border-radius: 0.625rem;
      background: $primary;
      position: absolute;
      right: 2.5rem;
      bottom: 0.25rem;
    }
  }
}
</style>
