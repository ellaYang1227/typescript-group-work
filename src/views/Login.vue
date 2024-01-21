<script setup lang="ts">
import { Form, Field, useForm } from "vee-validate";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import * as bootstrap from "bootstrap";
import { useAuthStore } from "@/stores/auth";
import { UserLogin } from "@/interfaces/auth";
import {
  apiGenerateEmailCode,
  apiVerifyEmail,
  apiForgotPwd,
} from "@/models/api";
import { ref } from "vue";
import { saveCookie, getCookie, removeCookie } from "@/utilities/cookie";
import { swalWithButtons } from "@/utilities/sweetAlert";
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

// ====== forgetPwd ======
const currentStep = ref<number>(1);
const forgetPwdSending = ref<boolean>(false);
const modalRef = ref<HTMLDivElement | null>(null);
const myModalRef = ref<bootstrap.Modal | null>(null);
const verifyEmailForm = ref<HTMLFormElement>();
const forgetPwdForm = ref<HTMLFormElement>();
const userForgetPwdTypedSchema = toTypedSchema(
  z.object({
    verifyEmail: z.string().email({ message: "請輸入信箱格式" }).default(""),
    newPassword: z
      .string()
      .min(1, "請輸入新密碼")
      .min(8, "密碼需至少 8 碼以上")
      .regex(
        new RegExp(/^(?=.*[a-zA-Z])(?=.*\d).+$/),
        "密碼需包含數字與英文字母"
      )
      .default(""),
    code: z.string().min(1, "請輸入驗證碼").default(""),
  })
);

const userVerifyEmailTypedSchema = toTypedSchema(
  z.object({
    verifyEmail: z
      .string()
      .min(1, "請輸入電子信箱")
      .email({ message: "請輸入信箱格式" })
      .default(""),
  })
);

async function handleVerifyEmailSubmit(value: any): Promise<void> {
  forgetPwdSending.value = true;
  await apiVerifyEmail(value.verifyEmail)
    .then(async (res) => {
      if (res.result.isEmailExists) {
        await handleCode(value.verifyEmail);
      } else {
        swalWithButtons.fire({
          icon: "error",
          title: "驗證失敗",
          text: "此 Email 尚未註冊過",
          customClass: {
            confirmButton: "baseButton isStyleSecondary",
          },
        });
      }
    })
    .catch(() => {
      forgetPwdSending.value = false;
    })
    .finally(() => {
      forgetPwdSending.value = false;
    });
}
async function handleCode(value: string): Promise<void> {
  await apiGenerateEmailCode(value)
    .then(() => {
      currentStep.value = 2;
      pwdVerifyEmail.value = value;
      swalWithButtons.fire({
        icon: "success",
        title: "驗證成功",
        text: "已寄送驗證碼至您的 Email",
      });
    })
    .catch(() => {
      forgetPwdSending.value = true;
    })
    .finally(() => {
      forgetPwdSending.value = false;
    });
}

async function handleForgetPwdSubmit(
  values: Record<string, any>
): Promise<void> {
  forgetPwdSending.value = true;
  const data = {
    email: values.verifyEmail,
    code: values.code,
    newPassword: values.newPassword,
  };
  await apiForgotPwd(data)
    .then(() => {
      swalWithButtons.fire({
        icon: "success",
        title: "修改成功",
        text: "密碼已修改，請使用新密碼完成登入",
      });
      resetForm();
      if (modalRef.value) {
        myModalRef.value = bootstrap.Modal.getOrCreateInstance(modalRef.value);
        myModalRef.value.hide();
      }
    })
    .catch(() => {
      forgetPwdSending.value = false;
    })
    .finally(() => {
      forgetPwdSending.value = false;
    });
}
const { resetForm: resetVerifyEmailForm, defineField: verifyEmailDefineField } =
  useForm({
    validationSchema: userVerifyEmailTypedSchema,
  });
const { resetForm: resetForgetPwdForm, defineField: forgetPwdDefineField } =
  useForm({
    validationSchema: userForgetPwdTypedSchema,
  });

const [verifyEmail] = verifyEmailDefineField("verifyEmail");
const [pwdVerifyEmail] = forgetPwdDefineField("verifyEmail");
const [code] = forgetPwdDefineField("code");
const [newPassword] = forgetPwdDefineField("newPassword");

function resetForm(): void {
  currentStep.value = 1;
  resetForgetPwdForm();
  resetVerifyEmailForm();
  if (verifyEmailForm.value) {
    verifyEmailForm.value.resetForm();
  }
  if (forgetPwdForm.value) {
    forgetPwdForm.value.resetForm();
  }
}
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
      class="position-relative z-1"
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
          <ErrorMessage name="email" class="invalid-feedback" />
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
          <ErrorMessage name="password" class="invalid-feedback" />
        </div>
        <div class="d-flex justify-content-between">
          <div class="form-check">
            <input
              v-model="remember"
              class="form-check-input"
              type="checkbox"
              id="remember"
            />
            <label class="form-check-label fw-bold" for="remember">
              記住帳號
            </label>
          </div>
          <div>
            <button
              type="button"
              class="baseButton isStyleText"
              data-bs-toggle="modal"
              data-bs-target="#forgetPwdModal"
            >
              忘記密碼？
            </button>
          </div>
        </div>
      </fieldset>
      <button
        class="rounded-2 py-3 w-100 baseButton isStylePrimary mt-6"
        form="LoginForm"
        :disabled="!meta.touched || !meta.valid || sending"
      >
        <span v-if="sending">
          <span class="spinner-border spinner-border-sm" role="status"></span>
          Loading...
        </span>
        <span v-else> 登入 </span>
      </button>
    </Form>
    <div class="d-flex align-items-baseline gap-2">
      <div>沒有會員嗎？</div>
      <router-link class="baseButton isStyleText p-0 fw-bold" to="/signup">
        前往註冊
      </router-link>
    </div>
  </section>
  <!-- Modal -->
  <div
    class="modal fade"
    id="forgetPwdModal"
    tabindex="-1"
    aria-labelledby="forgetPwdModalLabel"
    aria-hidden="true"
    ref="modalRef"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 text-neutral" id="forgetPwdModalLabel">
            忘記密碼
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="resetForm"
          ></button>
        </div>
        <template v-if="currentStep === 1">
          <Form
            v-slot="{ meta }"
            :validation-schema="userVerifyEmailTypedSchema"
            @submit="handleVerifyEmailSubmit"
            ref="verifyEmailForm"
            id="verifyEmailForm"
          >
            <div class="modal-body text-neutral">
              <fieldset class="d-flex flex-column gap-3">
                <div class="d-flex flex-column gap-2">
                  <label for="verifyEmail" class="fw-bold"
                    >輸入已註冊的電子信箱</label
                  >
                  <Field
                    v-model="verifyEmail"
                    name="verifyEmail"
                    v-slot="{ field, errors }"
                  >
                    <input
                      class="form-control p-3"
                      :class="{ 'is-invalid': errors.length }"
                      type="text"
                      placeholder="hello@exsample.com"
                      v-bind="field"
                      id="verifyEmail"
                    />
                  </Field>
                  <ErrorMessage name="verifyEmail" class="invalid-feedback" />
                </div>
              </fieldset>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="rounded-2 baseButton isStyleSecondary"
                @click="resetForm"
                data-bs-dismiss="modal"
              >
                關閉
              </button>
              <button
                class="rounded-2 baseButton isStylePrimary"
                form="verifyEmailForm"
                :disabled="!meta.touched || !meta.valid || forgetPwdSending"
              >
                <span v-if="forgetPwdSending">
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                  ></span>
                  Loading...
                </span>
                <span v-else> 驗證 </span>
              </button>
            </div>
          </Form>
        </template>
        <template v-if="currentStep === 2">
          <Form
            v-slot="{ meta }"
            :validation-schema="userForgetPwdTypedSchema"
            @submit="handleForgetPwdSubmit"
            id="forgetPwdForm"
            ref="forgetPwdForm"
          >
            <div class="modal-body text-neutral">
              <fieldset class="d-flex flex-column gap-3">
                <div class="d-flex flex-column gap-2">
                  <label for="verifyEmail" class="fw-bold">電子信箱</label>
                  <Field
                    v-model="pwdVerifyEmail"
                    name="verifyEmail"
                    v-slot="{ field, errors }"
                  >
                    <input
                      class="form-control p-3"
                      :class="{ 'is-invalid': errors.length }"
                      type="text"
                      placeholder="hello@exsample.com"
                      v-bind="field"
                      id="verifyEmail"
                      :disabled="!!pwdVerifyEmail?.length"
                    />
                  </Field>
                  <ErrorMessage name="verifyEmail" class="invalid-feedback" />
                </div>
                <div class="d-flex flex-column gap-2">
                  <label for="code" class="fw-bold">驗證碼</label>
                  <Field v-model="code" name="code" v-slot="{ field, errors }">
                    <input
                      class="form-control p-3"
                      :class="{ 'is-invalid': errors.length }"
                      type="text"
                      placeholder="請輸入驗證碼"
                      v-bind="field"
                      id="code"
                    />
                  </Field>
                  <ErrorMessage name="code" class="invalid-feedback" />
                </div>
                <div class="d-flex flex-column gap-2">
                  <label for="newPassword" class="fw-bold">新密碼</label>
                  <Field
                    v-model="newPassword"
                    name="newPassword"
                    v-slot="{ field, errors }"
                  >
                    <input
                      class="form-control p-3"
                      :class="{ 'is-invalid': errors.length }"
                      type="password"
                      placeholder="請輸入密碼"
                      v-bind="field"
                      id="newPassword"
                    />
                  </Field>
                  <ErrorMessage name="newPassword" class="invalid-feedback" />
                </div>
              </fieldset>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="rounded-2 baseButton isStyleSecondary"
                data-bs-dismiss="modal"
                @click="resetForm"
              >
                關閉
              </button>
              <button
                class="rounded-2 baseButton isStylePrimary"
                form="forgetPwdForm"
                :disabled="!meta.touched || !meta.valid || forgetPwdSending"
              >
                <span v-if="forgetPwdSending">
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                  ></span>
                  Loading...
                </span>
                <span v-else> 送出 </span>
              </button>
            </div>
          </Form>
        </template>
      </div>
    </div>
  </div>
</template>
