<script setup lang="ts">
import { Form, Field } from "vee-validate";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useAuthStore } from "@/stores/auth";
import { UserLogin } from "@/interfaces/auth";
import { ref } from "vue";

const sending = ref<boolean>(false);
const userStore = useAuthStore();

const userLoginTypedSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .min(1, "請輸入電子信箱")
      .email({ message: "請輸入信箱格式" })
      .default(""),
    password: z.string().min(1, "請輸入密碼").default(""),
  })
);

// 套件GenericObject缺失：https://github.com/logaretm/vee-validate/issues/4588
async function handleSubmit(value: any) {
  sending.value = true;
  await userStore.login(value as UserLogin);
  sending.value = false;
}
</script>

<template>
  <section class="d-flex flex-column">
    <div class="d-flex flex-column gap-2">
      <div class="primary-dark-color">享樂酒店，誠摯歡迎</div>
      <h1 class="m-0">立即開始旅程</h1>
    </div>
    <Form
      :validation-schema="userLoginTypedSchema"
      @submit="handleSubmit"
      id="LoginForm"
    >
      <fieldset class="d-flex flex-column gap-3">
        <div class="d-flex flex-column gap-2">
          電子信箱
          <Field name="email" v-slot="{ field, errors }">
            <input
              class="form-control p-3"
              :class="{ 'is-danger': errors.length }"
              type="text"
              placeholder="hello@exsample.com"
              v-bind="field"
            />
          </Field>
          <ErrorMessage name="email" class="warning-message" />
        </div>
        <div class="d-flex flex-column gap-2">
          密碼
          <Field name="password" v-slot="{ field, errors }">
            <input
              class="form-control p-3"
              :class="{ 'is-danger': errors.length }"
              type="password"
              placeholder="請輸入密碼"
              v-bind="field"
            />
          </Field>
          <ErrorMessage name="password" class="warning-message" />
        </div>
      </fieldset>
    </Form>
    <button
      class="rounded-2 py-3 w-100 baseButton isStylePrimary"
      form="LoginForm"
      :disabled="sending"
    >
      會員登入
    </button>
    <div class="d-flex align-items-baseline gap-2">
      <div>沒有會員嗎？</div>
      <div class="baseButton isStyleText p-0">前往註冊</div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  gap: 40px;
  .primary-dark-color {
    color: $primary;
  }
  .warning-message {
    color: $primary;
  }
}
</style>
