<script setup lang="ts">
import { Form, useForm } from "vee-validate";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import DatePickerSelect from "@/components/DatePickerSelect.vue";
import AddressSelect from "@/components/AddressSelect.vue";
import { useRoute } from "vue-router";
import { watch } from "vue";

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

const props = defineProps<{
  userInformation?: UserInformation;
}>();
const { userInformation } = props;
const emit = defineEmits(["handleSubmit"]);

const route = useRoute();
const routeName = (route.name as string) || "";

const defaultTypedSchema = z.object({
  name: z
    .string()
    .min(1, "請輸入姓名")
    .regex(
      new RegExp(/^[a-zA-Z\u4e00-\u9fa5\s]+$/),
      "請輸入您的中英文姓名，可包含空白，但不能包含特殊字元"
    )
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

const { values, errors, defineField, meta, setValues } = useForm({
  validationSchema: userInfoFormSchema,
});

function handleSubmit() {
  const { zipcode, addressDetail, ...rest } = values;
  const transformedValue = {
    ...rest,
    address: { zipcode, detail: addressDetail },
  };
  emit("handleSubmit", transformedValue as UserInformation);
}

const [name, nameAttrs] = defineField("name");
const [phone, phoneAttrs] = defineField("phone");
const [email, emailAttrs] = defineField("email");
const [birthday, birthdayAttrs] = defineField("birthday");
const [zipcode, zipcodeAttrs] = defineField("zipcode");
const [addressDetail, addressDetailAttrs] = defineField("addressDetail");

// 監聽父元件更新的 userInformation 值
watch<any, any>(
  () => props.userInformation,
  (newVal: UserInformation) => {
    // 更新 UserInfoForm
    if (newVal) {
      const { zipcode, detail } = newVal.address;
      setValues({
        zipcode,
        addressDetail: detail,
        ...newVal,
      });
    }
  },
  { immediate: true, deep: true }
);

defineExpose({ meta });
</script>

<template>
  <Form @submit="handleSubmit" id="UserInfoForm">
    <fieldset class="d-flex flex-column gap-3">
      <div class="d-flex flex-column gap-2">
        <label for="name" class="fw-bold">姓名</label>
        <input
          v-model.trim="name"
          class="form-control p-3"
          :class="{ 'is-invalid': errors.name }"
          type="text"
          placeholder="請輸入姓名"
          v-bind="nameAttrs"
          id="name"
        />
        <div class="invalid-feedback d-block">{{ errors.name }}</div>
      </div>
      <div class="d-flex flex-column gap-2">
        <label for="phone" class="fw-bold">手機號碼</label>
        <input
          v-model="phone"
          class="form-control p-3"
          :class="{ 'is-invalid': errors.phone }"
          type="text"
          placeholder="請輸入手機號碼"
          v-bind="phoneAttrs"
          id="phone"
        />
        <div class="invalid-feedback d-block">{{ errors.phone }}</div>
      </div>
      <div
        v-if="routeName === 'rooms-reservation'"
        class="d-flex flex-column gap-2"
      >
        <label for="email" class="fw-bold">電子信箱</label>
        <input
          v-model="email"
          class="form-control p-3"
          :class="{ 'is-invalid': errors.email }"
          type="text"
          placeholder="請輸入電子信箱"
          v-bind="emailAttrs"
          id="email"
        />
        <div class="invalid-feedback d-block">{{ errors.email }}</div>
      </div>
      <div v-else class="d-flex flex-column gap-2">
        <label for="birthday" class="fw-bold">生日</label>
        <date-picker-select
          :model-value="birthday as string"
          @update:model-value="(newBirthday) => (birthday = newBirthday)"
          v-bind="birthdayAttrs"
        />
      </div>
      <div class="d-flex flex-column gap-3">
        <label for="addressDetail" class="fw-bold">地址</label>
        <address-select
          :model-value="zipcode as number"
          @update:model-value="(newZipcode) => (zipcode = newZipcode)"
          v-bind="zipcodeAttrs"
        />
        <input
          v-model="addressDetail"
          class="form-control p-3"
          :class="{ 'is-invalid': errors.addressDetail }"
          type="text"
          placeholder="請輸入詳細地址"
          v-bind="addressDetailAttrs"
          id="addressDetail"
        />
        <div class="invalid-feedback d-block">{{ errors.addressDetail }}</div>
      </div>
    </fieldset>
    <slot name="formMeta" :formMeta="meta"></slot>
  </Form>
</template>
