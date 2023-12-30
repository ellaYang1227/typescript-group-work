<template>
  <section class="d-flex flex-column gap-6">
    <div class="d-flex flex-column gap-2">
      <div class="fw-bold text-primary">享樂酒店，誠摯歡迎</div>
      <h1 class="m-0">立即註冊</h1>
      <section class="d-flex text-neutral-60 fw-bold py-3 gap-2">
        <template v-for="step in 2" :key="`step_${step}`">
          <div
            class="d-flex flex-column align-items-center gap-1"
            :class="{ 'text-white': currentStep === step }"
          >
            <div
              class="step-circle border d-flex align-items-center justify-content-center"
              :class="[
                `${
                  currentStep === step ? 'border-primary' : 'border-neutral-60'
                }`,
                { 'bg-primary': currentStep === step },
              ]"
            >
              {{ step }}
            </div>
            <div>{{ step === 1 ? "輸入信箱及密碼" : "填寫基本資料" }}</div>
          </div>
          <hr
            v-if="step === 1"
            class="flex-grow-1 border-2 border-neutral-60 my-auto rounded-3 opacity-100"
          />
        </template>
      </section>
    </div>
    <keep-alive>
      <component
        :is="currentStep === 1 ? EmailAndPasswordForm : ''"
        @emailAndPasswordSubmit="handleSubmit"
      />
    </keep-alive>
    <section class="d-flex flex-column gap-3">
      <button
        v-if="currentStep === 1"
        class="rounded-2 py-3 w-100 baseButton isStylePrimary"
        form="EmailAndPasswordForm"
      >
        下一步
      </button>
      <div class="d-flex align-items-baseline gap-1">
        <div>已經有會員了嗎？</div>
        <router-link class="baseButton isStyleText p-0 fw-bold" to="/login">
          立即登入
        </router-link>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import EmailAndPasswordForm from "@/components/User/EmailAndPasswordForm.vue";
import { UserInformation } from "@/interfaces/auth";

interface UserInformationWithPassword extends UserInformation {
  password: string;
}

const currentStep = ref<number>(1);
const submitForm = ref<UserInformationWithPassword | null>(null);

async function handleSubmit(values: any) {
  submitForm.value = { ...submitForm.value, ...values };
}
</script>

<style lang="scss" scoped>
.step-circle {
  border-radius: 80px;
  width: 32px;
  height: 32px;
}
</style>
