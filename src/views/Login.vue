<script setup lang="ts">
import { Form, Field } from "vee-validate";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useAuthStore } from "@/stores/auth";
import { UserLogin } from "@/interfaces/auth";
import { ref } from "vue";
import { saveCookie, getCookie, removeCookie } from "@/utilities/cookie";

const sending = ref<boolean>(false);
const remember = ref<boolean>(false);
const emailInput = ref<string>("");
const userStore = useAuthStore();

const userLoginTypedSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .min(1, "請輸入電子信箱")
      .email({ message: "請輸入信箱格式" })
      .default(emailInput.value),
    password: z.string().min(1, "請輸入密碼").default(""),
  })
);

// 套件GenericObject缺失：https://github.com/logaretm/vee-validate/issues/4588
async function handleSubmit(value: any) {
  sending.value = true;
  await userStore.login(value as UserLogin);
  sending.value = false;
  useRememberCheckBox(remember.value);
}

function useRememberCheckBox(status: boolean): void {
  if (status) saveCookie("email", emailInput.value);
  else removeCookie("email");
}

function initSetEmail(): void {
  emailInput.value = getCookie("email") || "";
  if (emailInput.value) remember.value = true;
}
initSetEmail();
</script>

<template>
  <section class="d-flex flex-column gap-6">
    <div class="d-flex flex-column gap-2">
      <div class="text-primary fw-bold">享樂酒店，誠摯歡迎</div>
      <h1 class="m-0">立即開始旅程</h1>
    </div>
    <Form
      v-slot="{ meta }"
      :validation-schema="userLoginTypedSchema"
      @submit="handleSubmit"
      id="LoginForm"
    >
      <fieldset class="d-flex flex-column gap-3">
        <div class="d-flex flex-column gap-2">
          <label for="email" class="fw-bold">電子信箱</label>
          <Field v-model="emailInput" name="email" v-slot="{ field, errors }">
            <input
              class="form-control p-3"
              :class="{ 'is-invalid': errors.length }"
              type="text"
              placeholder="hello@exsample.com"
              v-bind="field"
              id="email"
            />
          </Field>
          <ErrorMessage name="email" class="errorMessage" />
        </div>
        <div class="d-flex flex-column gap-2">
          <label for="password" class="fw-bold">密碼</label>
          <Field name="password" v-slot="{ field, errors }">
            <input
              class="form-control p-3"
              :class="{ 'is-invalid': errors.length }"
              type="password"
              placeholder="請輸入密碼"
              v-bind="field"
              id="password"
            />
          </Field>
          <ErrorMessage name="password" class="errorMessage" />
        </div>
        <div class="form-check">
          <input
            v-model="remember"
            class="form-check-input"
            type="checkbox"
            id="remember"
          />
          <label class="form-check-label" for="remember"> 記住帳號 </label>
        </div>
      </fieldset>
      <button
        class="rounded-2 py-3 w-100 baseButton isStylePrimary mt-6"
        form="LoginForm"
        :disabled="!meta.touched || !meta.valid || sending"
      >
        {{ sending ? "Loading" : "會員登入" }}
      </button>
    </Form>
    <div class="d-flex align-items-baseline gap-2">
      <div>沒有會員嗎？</div>
      <router-link class="baseButton isStyleText p-0 fw-bold" to="/signup">
        前往註冊
      </router-link>
    </div>
  </section>
</template>
