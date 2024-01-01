<script setup lang="ts">
import { Form, Field } from "vee-validate";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import DatePickerSelect from "@/components/DatePickerSelect.vue";
import AddressSelect from "@/components/AddressSelect.vue";
import { useRoute } from "vue-router";

interface UserInformation {
  name: string;
  email?: string;
  phone: string;
  birthday?: string;
  address: {
    zipcode: number;
    detail: string;
  };
}

const { userInformation } = defineProps<{
  userInformation?: UserInformation;
}>();
const emit = defineEmits(["handleSubmit"]);

const route = useRoute();
const routeName = (route.name as string) || "";

const defaultTypedSchema = z.object({
  name: z
    .string()
    .min(1, "請輸入姓名")
    .regex(new RegExp(/^[a-zA-Z\u4e00-\u9fa5\s]+$/), "請輸入正確的名字")
    .default(userInformation?.name || ""),
  phone: z
    .string()
    .min(1, "請輸入手機號碼")
    .regex(new RegExp(/^\d+$/), "請輸入數字")
    .startsWith("09", { message: "請輸入正確的手機號碼格式" })
    .length(10, { message: "請輸入正確的手機號碼格式" })
    .default(userInformation?.phone || ""),
  zipcode: z.number().default(userInformation?.address.zipcode || 800),
  addressDetail: z
    .string()
    .min(1, "請輸入詳細地址")
    .default(userInformation?.address.detail || ""),
});

const emailTypedSchema = z.object({
  email: z
    .string()
    .min(1, "請輸入電子信箱")
    .email({ message: "請輸入信箱格式" })
    .default(userInformation?.email || ""),
});

const birthdayTypedSchema = z.object({
  birthday: z
    .string()
    .min(1, "請選擇生日")
    .default(userInformation?.birthday || "1990/8/15"),
});

const userInfoFormSchema = toTypedSchema(
  defaultTypedSchema.merge(
    routeName === "rooms-reservation" ? emailTypedSchema : birthdayTypedSchema
  )
);

function handleSubmit(value: any) {
  const { zipcode, addressDetail, ...rest } = value;
  const transformedValue = {
    ...rest,
    address: { zipcode, detail: addressDetail },
  };
  emit("handleSubmit", transformedValue as UserInformation);
}
</script>

<template>
  <Form
    v-slot="{ meta }"
    :validation-schema="userInfoFormSchema"
    @submit="handleSubmit"
    id="UserInfoForm"
  >
    <fieldset class="d-flex flex-column gap-3">
      <div class="d-flex flex-column gap-2">
        <label for="name" class="fw-bold">姓名</label>
        <Field name="name" v-slot="{ field, errors }">
          <input
            class="form-control p-3"
            :class="{ 'is-invalid': errors.length }"
            type="text"
            placeholder="請輸入姓名"
            v-bind="field"
            id="name"
          />
        </Field>
        <ErrorMessage name="name" class="invalid-feedback" />
      </div>
      <div class="d-flex flex-column gap-2">
        <label for="phone" class="fw-bold">手機號碼</label>
        <Field name="phone" v-slot="{ field, errors }">
          <input
            class="form-control p-3"
            :class="{ 'is-invalid': errors.length }"
            type="text"
            placeholder="請輸入手機號碼"
            v-bind="field"
            id="phone"
          />
        </Field>
        <ErrorMessage name="phone" class="invalid-feedback" />
      </div>
      <div
        v-if="routeName === 'rooms-reservation'"
        class="d-flex flex-column gap-2"
      >
        <label for="email" class="fw-bold">電子信箱</label>
        <Field name="email" v-slot="{ field, errors }">
          <input
            class="form-control p-3"
            :class="{ 'is-invalid': errors.length }"
            type="text"
            placeholder="請輸入電子信箱"
            v-bind="field"
            id="email"
          />
        </Field>
        <ErrorMessage name="email" class="invalid-feedback" />
      </div>
      <div v-else class="d-flex flex-column gap-2">
        <label for="birthday" class="fw-bold">生日</label>
        <Field name="birthday" v-slot="{ field, handleChange }">
          <date-picker-select
            :model-value="field.value"
            @update:model-value="handleChange"
          />
        </Field>
        <ErrorMessage name="birthday" class="invalid-feedback" />
      </div>
      <div class="d-flex flex-column gap-3">
        <label for="addressDetail" class="fw-bold">地址</label>
        <Field name="zipcode" v-slot="{ field, handleChange }">
          <address-select
            :model-value="field.value"
            @update:model-value="handleChange"
          />
        </Field>
        <Field name="addressDetail" v-slot="{ field, errors }">
          <input
            class="form-control p-3"
            :class="{ 'is-invalid': errors.length }"
            type="text"
            placeholder="請輸入詳細地址"
            v-bind="field"
            id="addressDetail"
          />
        </Field>
        <ErrorMessage class="invalid-feedback" name="addressDetail" />
      </div>
    </fieldset>
    <slot name="formMeta" :formMeta="meta"></slot>
  </Form>
</template>
