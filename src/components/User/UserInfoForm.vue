<script setup lang="ts">
import DatePickerSelect from "@/components/DatePickerSelect.vue";
import AddressSelect from "@/components/AddressSelect.vue";
import { z } from "zod";
import { Form, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { UserInfo } from "@/interfaces/auth";
import { ref, watch, computed } from "vue";
const props = defineProps({
  userInfoData: {
    type: Object as () => UserInfo,
    required: true,
  },
});
const { userInfoData } = props;
const defaultTypedSchema = z.object({
  name: z
    .string()
    .min(1, "請輸入姓名")
    .regex(
      new RegExp(/^[a-zA-Z\u4e00-\u9fa5\s]+$/),
      "請輸入您的中英文姓名，可包含空白，但不能包含特殊字元"
    )
    .default(userInfoData?.name || ""),
  phone: z
    .string()
    .min(1, "請輸入手機號碼")
    .regex(new RegExp(/^\d+$/), "請輸入數字")
    .startsWith("09", { message: "請輸入正確的手機號碼格式" })
    .length(10, { message: "請輸入正確的手機號碼格式" })
    .default(userInfoData?.phone || ""),
  zipcode: z.number().default(userInfoData?.address.zipcode || 800),
  addressDetail: z
    .string()
    .min(1, "請輸入詳細地址")
    .default(userInfoData?.address.detail || ""),
  birthday: z
    .string()
    .min(1, "請選擇生日")
    .default(userInfoData?.birthday || "1990/8/15"),
});
const { errors, defineField, setValues } = useForm({
  validationSchema: toTypedSchema(defaultTypedSchema),
});

const isEditing = ref(false);
const [name, nameAttrs] = defineField("name");
const [phone, phoneAttrs] = defineField("phone");
const [birthday, birthdayAttrs] = defineField("birthday");
const [zipcode, zipcodeAttrs] = defineField("zipcode");
const [addressDetail, addressDetailAttrs] = defineField("addressDetail");

watch(
  () => props.userInfoData,
  (newValue: UserInfo) => {
    if (newValue) {
      setValues(newValue);
    }
  },
  { immediate: true }
);
// 日期格式轉換
const formattedBirthday = computed(() => {
  const date = new Date(userInfoData.birthday);
  return date.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});
</script>
<template>
  <Form>
    <fieldset class="d-flex flex-column gap-3">
      <div class="d-flex flex-column gap-2">
        <label for="name" class="fw-bold">姓名</label>
        <p v-if="!isEditing" class="text-neutral fw-bold">{{ name }}</p>
        <input
          v-else
          id="name"
          class="form-control p-3"
          :class="{ 'is-invalid': errors.name }"
          type="text"
          placeholder="請輸入姓名"
          v-model.trim="name"
          v-bind="nameAttrs"
        />
        <div class="invalid-feedback d-block">{{ errors.name }}</div>
      </div>
      <div class="d-flex flex-column gap-2">
        <label for="name" class="fw-bold">手機號碼</label>
        <p v-if="!isEditing" class="text-neutral fw-bold">{{ phone }}</p>
        <input
          v-else
          id="phone"
          class="form-control p-3"
          :class="{ 'is-invalid': errors.phone }"
          type="text"
          placeholder="請輸入手機號碼"
          v-model.trim="phone"
          v-bind="phoneAttrs"
        />
        <div class="invalid-feedback d-block">{{ errors.phone }}</div>
      </div>
      <div class="d-flex flex-column gap-2">
        <label for="birthday" class="fw-bold">生日</label>
        <p v-if="!isEditing" class="text-neutral fw-bold">
          {{ formattedBirthday }}
        </p>
        <date-picker-select
          v-else
          :model-value="birthday as string"
          v-bind="birthdayAttrs"
          @update:model-value="(newBirthday) => (birthday = newBirthday)"
        />
      </div>
      <div class="d-flex flex-column gap-3">
        <label for="addressDetail" class="fw-bold">地址</label>
        <p v-if="!isEditing" class="text-neutral fw-bold">
          {{ addressDetail }}
        </p>
        <div v-else class="d-flex flex-column gap-3">
          <address-select
            :model-value="(zipcode)"
            @update:model-value="(newZipcode) => (zipcode = newZipcode)"
            v-bind="zipcodeAttrs"
          />
          <input
            id="addressDetail"
            class="form-control p-3"
            :class="{ 'is-invalid': errors.addressDetail }"
            type="text"
            placeholder="請輸入詳細地址"
            v-model="addressDetail"
            v-bind="addressDetailAttrs"
          />
        </div>
        <div class="invalid-feedback d-block">{{ errors.addressDetail }}</div>
      </div>
    </fieldset>
  </Form>
</template>
