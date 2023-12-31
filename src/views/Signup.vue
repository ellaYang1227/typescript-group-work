<template>
  <section class="d-flex flex-column gap-6">
    <div class="d-flex flex-column gap-2">
      <div class="fw-bold text-primary">享樂酒店，誠摯歡迎</div>
      <h1 class="m-0">立即註冊</h1>
      <section class="d-flex text-neutral-60 fw-bold py-3 gap-2">
        <template v-for="step in 2" :key="`step_${step}`">
          <div
            class="d-flex flex-column align-items-center gap-1"
            :class="{ 'text-white': !(currentStep === 1 && step === 2) }"
          >
            <div
              class="step-circle border d-flex align-items-center justify-content-center"
              :class="[
                `${
                  !(currentStep === 1 && step === 2)
                    ? 'border-primary'
                    : 'border-neutral-60'
                }`,
                { 'bg-primary': !(currentStep === 1 && step === 2) },
              ]"
            >
              <font-awesome-icon
                v-if="step === 1 && currentStep === 2"
                icon="fa-solid fa-check"
                size="lg"
                class="fa"
              />
              <span v-else>{{ step }}</span>
            </div>
            <div>{{ step === 1 ? "輸入信箱及密碼" : "填寫基本資料" }}</div>
          </div>
          <hr
            v-if="step === 1"
            class="flex-grow-1 border-2 border-neutral-60 my-auto rounded-3 opacity-100"
            :class="{ 'border-white': currentStep === 2 }"
          />
        </template>
      </section>
    </div>
    <section>
      <keep-alive>
        <component
          :is="currentStep === 1 ? EmailAndPasswordForm : InformationForm"
          @emailAndPasswordSubmit="handleSubmit"
          @handleSubmit="handleSubmit"
        />
      </keep-alive>
      <div v-if="currentStep === 2" class="form-check mt-3">
        <input
          v-model="agreeCheck"
          class="form-check-input"
          type="checkbox"
          id="AgreeCheck"
        />
        <label class="form-check-label" for="AgreeCheck">
          我已閱讀並同意本網站個資使用規範
        </label>
      </div>
    </section>
    <section class="d-flex flex-column gap-3">
      <button
        class="rounded-2 py-3 w-100 baseButton isStylePrimary"
        :form="currentStep === 1 ? 'EmailAndPasswordForm' : 'UserInfoForm'"
        :disabled="(currentStep === 2 && !agreeCheck) || sending"
      >
        <span v-if="sending">Loading</span>
        <span v-else>
          {{ currentStep === 1 ? "下一步" : "完成註冊" }}
        </span>
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
import InformationForm from "@/components/User/InformationForm.vue";
import { UserInformation } from "@/interfaces/auth";
import { apiSignup } from "@/models/api";
import router from "@/router";

interface UserInformationWithPassword extends UserInformation {
  password: string;
}

const currentStep = ref<number>(1);
const sending = ref<boolean>(false);
const agreeCheck = ref<boolean>(false);
const submitForm = ref<UserInformationWithPassword | null>(null);

async function handleSubmit(values: any) {
  submitForm.value = { ...submitForm.value, ...values };
  if (currentStep.value === 1) currentStep.value = 2;
  else {
    sending.value = true;
    try {
      const data = await apiSignup(
        submitForm.value as UserInformationWithPassword
      );
      if (data.status) {
        await router.push("/login");
      }
    } catch (error) {
      console.log("error", error);
    }
    sending.value = false;
  }
}
</script>

<style lang="scss" scoped>
.step-circle {
  border-radius: 80px;
  width: 32px;
  height: 32px;
}
</style>