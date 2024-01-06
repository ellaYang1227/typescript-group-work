<script setup lang="ts">
import { Form, useForm } from "vee-validate";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { watch } from "vue";

interface EmailAndPassword {
  email: string;
  password: string;
}

const props = defineProps({
  isEmailExistsEmail: { type: String, required: true },
});

const emit = defineEmits(["emailAndPasswordSubmit"]);

const emailAndPasswordTypedSchema = toTypedSchema(
  z
    .object({
      email: z
        .string()
        .min(1, "請輸入電子信箱")
        .email({ message: "請輸入信箱格式" })
        .default(""),
      password: z
        .string()
        .min(1, "請輸入密碼")
        .min(8, "密碼需至少 8 碼以上")
        .regex(
          new RegExp(/^(?=.*[a-zA-Z])(?=.*\d).+$/),
          "密碼需包含數字與英文字母"
        )
        .default(""),
      confirm: z.string().min(1, "請再輸入一次密碼").default(""),
    })
    .refine((data) => data.password === data.confirm, {
      message: "與密碼不符",
      path: ["confirm"],
    })
    .refine((data) => data.email !== props.isEmailExistsEmail, {
      message: "此信箱已被註冊",
      path: ["email"],
    })
);

const { values, errors, defineField, meta, validate } = useForm({
  validationSchema: emailAndPasswordTypedSchema,
});

const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");
const [confirm, confirmAttrs] = defineField("confirm");

function emailAndPasswordSubmit(): void {
  const { confirm, ...rest } = values;
  emit("emailAndPasswordSubmit", rest as EmailAndPassword);
}

watch(
  () => props.isEmailExistsEmail,
  async () => {
    await validate();
  }
);
</script>

<template>
  <Form id="EmailAndPasswordForm" @submit="emailAndPasswordSubmit">
    <fieldset class="d-flex flex-column gap-3">
      <div class="d-flex flex-column gap-2">
        <label for="email" class="fw-bold">電子信箱</label>
        <input
          v-model="email"
          class="form-control p-3"
          :class="{ 'is-invalid': errors.email }"
          type="text"
          placeholder="hello@exsample.com"
          v-bind="emailAttrs"
          id="email"
        />
        <div class="invalid-feedback d-block">{{ errors.email }}</div>
      </div>
      <div class="d-flex flex-column gap-2">
        <label for="password" class="fw-bold">密碼</label>
        <input
          v-model="password"
          class="form-control p-3"
          :class="{ 'is-invalid': errors.password }"
          type="password"
          placeholder="請輸入密碼"
          v-bind="passwordAttrs"
          id="password"
        />
        <div class="invalid-feedback d-block">{{ errors.password }}</div>
      </div>
      <div class="d-flex flex-column gap-2">
        <label for="confirm" class="fw-bold">確認密碼</label>
        <input
          v-model="confirm"
          class="form-control p-3"
          :class="{ 'is-invalid': errors.confirm }"
          type="password"
          placeholder="請再輸入一次密碼"
          v-bind="confirmAttrs"
          id="confirm"
        />
        <div class="invalid-feedback d-block">{{ errors.confirm }}</div>
      </div>
    </fieldset>
    <slot name="formMeta" :formMeta="meta"></slot>
  </Form>
</template>
