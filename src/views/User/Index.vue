<script setup lang="ts">
import Layout from "@/components/Layouts/Index.vue";
// import InformationForm from "@/components/User/InformationForm.vue";
import { UserInfo } from "@/interfaces/auth";
import UserInfoForm from "@/components/User/UserInfoForm.vue";
import { useAuthStore } from "@/stores";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
const { userInformation } = storeToRefs(useAuthStore());

const userInfoData = ref<UserInfo>();

watch(
  userInformation,
  () => {
    if (userInformation.value) {
      // 轉換日期格式 yyyy/mm/dd
      const date = new Date(userInformation.value.birthday);
      const formattedDate = date.toLocaleDateString("zh-TW", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      userInfoData.value = {
        name: userInformation.value.name,
        email: userInformation.value.email,
        phone: userInformation.value.phone,
        address: userInformation.value.address,
        birthday: formattedDate,
      };
      console.log(userInfoData.value);
    }
  },
  { immediate: true }
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
        <main
          class="row gap-4 gap-lg-6 d-flex flex-column flex-lg-row w-100 m-auto"
        >
          <div class="card col-12 col-lg-5 p-0 h-100">修改密碼</div>
          <div class="card col-12 col-lg p-0 h-100">
            <div class="card-body p-3 p-lg-6">
              <h5 class="mb-4 mb-lg-6">基本資料</h5>
              <UserInfoForm v-if="userInfoData" :userInfoData="userInfoData" />
              <!-- <InformationForm
                v-if="userInfoData"
                :userInformation="userInfoData"
              /> -->
            </div>
          </div>
        </main>
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
