<script setup lang="ts">
import { z } from "zod";
import { Form, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { ref } from "vue";
const isEditing = ref(false);
const emit = defineEmits(["updatePassword"]);
const props = defineProps({
  email: {
    type: String,
    required: true,
  },
});
const { email } = props;
const defaultTypedSchema = z
  .object({
    oldPassword: z
      .string()
      .min(1, "請輸入舊密碼")
      .min(8, "密碼需至少 8 碼以上")
      .regex(
        new RegExp(/^(?=.*[a-zA-Z])(?=.*\d).+$/),
        "密碼需包含數字與英文字母"
      )
      .default(""),
    newPassword: z
      .string()
      .min(1, "請輸入新密碼")
      .min(8, "密碼需至少 8 碼以上")
      .regex(
        new RegExp(/^(?=.*[a-zA-Z])(?=.*\d).+$/),
        "密碼需包含數字與英文字母"
      )
      .default(""),
    confirm: z.string().min(1, "請再輸入一次新密碼").default(""),
  })
  .refine((data) => data.newPassword === data.confirm, {
    message: "與新密碼不符",
    path: ["confirm"],
  });
const { errors, defineField } = useForm({
  validationSchema: toTypedSchema(defaultTypedSchema),
});
const [oldPassword, oldPasswordAttrs] = defineField("oldPassword");
const [newPassword, newPasswordAttrs] = defineField("newPassword");
const [confirm, confirmAttrs] = defineField("confirm");

function handleSubmit(): void {
  emit("updatePassword", {
    oldPassword: oldPassword.value,
    newPassword: newPassword.value,
  });
}
</script>

<template>
  <div class="d-flex flex-column gap-2">
    <span>電子信箱</span>
    <p class="text-neutral fw-bold">{{ email }}</p>
  </div>
  <div v-if="!isEditing">
    <div class="d-flex flex-column gap-2">
      <span>密碼</span>
      <div class="d-flex justify-content-between">
        <span class="text-neutral" style="font-size: 12px">
          ● ● ● ● ● ● ● ● ● ●</span
        >
        <div class="baseButton isStyleText" @click="isEditing = !isEditing">
          重設
        </div>
      </div>
    </div>
  </div>
  <Form v-else @submit="handleSubmit">
    <fieldset class="d-flex flex-column gap-3">
      <div class="d-flex flex-column gap-2">
        <label for="oldPassword">舊密碼</label>
        <div>
          <input
            id="oldPassword"
            class="form-control p-3"
            :class="{ 'is-invalid': errors.oldPassword }"
            type="password"
            placeholder="請輸入舊密碼"
            v-model="oldPassword"
            v-bind="oldPasswordAttrs"
          />
          <div class="invalid-feedback d-block">{{ errors.oldPassword }}</div>
        </div>
      </div>
      <div class="d-flex flex-column gap-2">
        <label for="newPassword">新密碼</label>
        <div>
          <input
            id="newPassword"
            class="form-control p-3"
            :class="{ 'is-invalid': errors.newPassword }"
            type="password"
            placeholder="請輸入舊密碼"
            v-model="newPassword"
            v-bind="newPasswordAttrs"
          />
          <div class="invalid-feedback d-block">{{ errors.newPassword }}</div>
        </div>
      </div>
      <div class="d-flex flex-column gap-3">
        <label for="confirm">確認新密碼</label>
        <div>
          <input
            id="confirm"
            class="form-control p-3"
            :class="{ 'is-invalid': errors.confirm }"
            type="password"
            placeholder="請輸入舊密碼"
            v-model="confirm"
            v-bind="confirmAttrs"
          />
          <div class="invalid-feedback d-block">{{ errors.confirm }}</div>
        </div>
      </div>
      <div class="d-flex">
        <div
          v-if="isEditing"
          class="baseButton isStyleGrey"
          @click="isEditing = !isEditing"
        >
          儲存設定
        </div>
      </div>
    </fieldset>
  </Form>
</template>
