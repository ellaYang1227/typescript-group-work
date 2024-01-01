<script setup lang="ts">
import { Form, Field } from "vee-validate";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";

interface EmailAndPassword {
  email: string;
  password: string;
}

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
);

async function emailAndPasswordSubmit(value: any) {
  const { confirm, ...rest } = value;
  emit("emailAndPasswordSubmit", rest as EmailAndPassword);
}
</script>

<template>
  <Form
    v-slot="{ meta }"
    :validation-schema="emailAndPasswordTypedSchema"
    @submit="emailAndPasswordSubmit"
    id="EmailAndPasswordForm"
  >
    <fieldset class="d-flex flex-column gap-3">
      <div class="d-flex flex-column gap-2">
        <label for="email" class="fw-bold">電子信箱</label>
        <Field name="email" v-slot="{ field, errors }">
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
      <div class="d-flex flex-column gap-2">
        <label for="confirm" class="fw-bold">確認密碼</label>
        <Field name="confirm" v-slot="{ field, errors }">
          <input
            class="form-control p-3"
            :class="{ 'is-invalid': errors.length }"
            type="password"
            placeholder="請再輸入一次密碼"
            v-bind="field"
            id="confirm"
          />
        </Field>
        <ErrorMessage name="confirm" class="invalid-feedback" />
      </div>
    </fieldset>
    <slot name="formMeta" :formMeta="meta"></slot>
  </Form>
</template>
