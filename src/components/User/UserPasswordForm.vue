<script setup lang="ts">
import DatePickerSelect from "@/components/DatePickerSelect.vue";
import AddressSelect from "@/components/AddressSelect.vue";
import { z } from "zod";
import { Form, useForm } from "vee-validate";
import { UserInfoData } from "@/interfaces/auth";
import { toTypedSchema } from "@vee-validate/zod";
import { ref, watch, computed } from "vue";
const emit = defineEmits(["updateUserInfo"]);
interface UpdateUserInfo {
  userId: string;
  name: string;
  phone: string;
  birthday: string;
  address: {
    zipcode: number;
    detail: string;
  };
  oldPassword: string;
  newPassword: string;
}
const props = defineProps({
  userInfoData: {
    type: Object as () => UserInfoData,
    required: true,
  },
});
const { userInfoData } = props;
const userInfoTypedSchema = z.object({
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
const passwordTypedSchema = z
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
    confirm: z.string().min(1, "請再輸入一次密碼").default(""),
  })
  .refine((data) => data.newPassword === data.confirm, {
    message: "與新密碼不符",
    path: ["confirm"],
  });
const {
  resetForm: resetUserForm,
  values: userValues,
  errors: userError,
  defineField: userDefineField,
  setValues: setUserValues,
} = useForm({
  validationSchema: toTypedSchema(userInfoTypedSchema),
});
const {
  resetForm: resetPwdForm,
  values: pwdValues,
  errors: pwdError,
  setValues: setPwdValues,
  defineField: pwdDefineField,
} = useForm({
  validationSchema: toTypedSchema(passwordTypedSchema),
});
const isEditing = ref(false);
const fullAddress = ref("");
const [name, nameAttrs] = userDefineField("name");
const [phone, phoneAttrs] = userDefineField("phone");
const [birthday, birthdayAttrs] = userDefineField("birthday");
const [zipcode, zipcodeAttrs] = userDefineField("zipcode");
const [addressDetail, addressDetailAttrs] = userDefineField("addressDetail");

const [oldPassword, oldPasswordAttrs] = pwdDefineField("oldPassword");
const [newPassword, newPasswordAttrs] = pwdDefineField("newPassword");
const [confirm, confirmAttrs] = pwdDefineField("confirm");

function resetForm() {
  resetUserForm();
  resetPwdForm();
  isEditing.value = !isEditing.value;
}

watch(
  () => props.userInfoData,
  (newValue) => {
    if (newValue) {
      resetPwdForm();
      setUserValues(newValue);
      setPwdValues({
        oldPassword: "",
        newPassword: "",
        confirm: "",
      });
    }
  },
  { immediate: true }
);
// 判斷資料欄位都有填寫且沒有錯誤
const allFieldsFilled = computed(() => {
  return (
    Object.values(userValues).every((value) => value !== "") &&
    Object.values(pwdValues).every((value) => value !== "") &&
    Object.keys(userError.value).length == 0 &&
    Object.keys(pwdError.value).length == 0
  );
});
// 日期格式轉換
const formattedBirthday = computed(() => {
  const date = new Date(userInfoData.birthday);
  return date.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});
// 更新完整地址
function handleFullAddress(newAddress: string) {
  fullAddress.value = `${newAddress}${addressDetail.value}`;
}
function handleSubmit(): void {
  let updateData: UpdateUserInfo = {
    userId: userInfoData.userId,
    name: String(name.value),
    phone: String(phone.value),
    birthday: String(birthday.value),
    address: {
      zipcode: Number(zipcode.value),
      detail: String(addressDetail.value),
    },
    oldPassword: String(oldPassword.value),
    newPassword: String(newPassword.value),
  };
  emit("updateUserInfo", updateData);
  resetForm();
}
</script>
<template>
  <Form
    class="row gap-4 gap-lg-6 d-flex flex-column flex-lg-row w-100 m-auto"
    @submit="handleSubmit"
  >
    <div class="card col-12 col-lg p-0 h-100">
      <div class="card-body p-3 p-lg-6">
        <h5 class="mb-4 mb-lg-6">修改帳號資料</h5>
        <div class="d-flex flex-column gap-2">
          <span>電子信箱</span>
          <p class="text-neutral fw-bold">{{ userInfoData.email }}</p>
        </div>
        <div v-if="!isEditing" class="d-flex flex-column gap-2">
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
        <div v-else class="d-flex flex-column gap-3">
          <div class="d-flex flex-column gap-2">
            <label for="oldPassword">舊密碼</label>
            <div>
              <input
                id="oldPassword"
                class="form-control p-3"
                :class="{ 'is-invalid': pwdError.oldPassword }"
                type="password"
                autocomplete="on"
                placeholder="請輸入舊密碼"
                v-model="oldPassword"
                v-bind="oldPasswordAttrs"
              />
              <div class="invalid-feedback d-block">
                {{ pwdError.oldPassword }}
              </div>
            </div>
          </div>
          <div class="d-flex flex-column gap-2">
            <label for="newPassword">新密碼</label>
            <div>
              <input
                id="newPassword"
                class="form-control p-3"
                :class="{ 'is-invalid': pwdError.newPassword }"
                type="password"
                autocomplete="on"
                placeholder="請輸入舊密碼"
                v-model="newPassword"
                v-bind="newPasswordAttrs"
              />
              <div class="invalid-feedback d-block">
                {{ pwdError.newPassword }}
              </div>
            </div>
          </div>
          <div class="d-flex flex-column gap-3">
            <label for="confirm">確認新密碼</label>
            <div>
              <input
                id="confirm"
                class="form-control p-3"
                :class="{ 'is-invalid': pwdError.confirm }"
                type="password"
                autocomplete="on"
                placeholder="請輸入舊密碼"
                v-model="confirm"
                v-bind="confirmAttrs"
              />
              <div class="invalid-feedback d-block">{{ pwdError.confirm }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card col-12 col-lg p-0 h-100">
      <div class="card-body p-3 p-lg-6">
        <h5 class="mb-4 mb-lg-6">基本資料</h5>
        <div class="d-flex flex-column gap-3">
          <div class="d-flex flex-column gap-2">
            <label for="name">姓名</label>
            <p v-if="!isEditing" class="text-neutral fw-bold">{{ name }}</p>
            <div v-else>
              <input
                id="name"
                class="form-control p-3"
                :class="{ 'is-invalid': userError.name }"
                type="text"
                placeholder="請輸入姓名"
                v-model.trim="name"
                v-bind="nameAttrs"
              />
              <div class="invalid-feedback d-block">{{ userError.name }}</div>
            </div>
          </div>
          <div class="d-flex flex-column gap-2">
            <label for="phone">手機號碼</label>
            <p v-if="!isEditing" class="text-neutral fw-bold">{{ phone }}</p>
            <div v-else>
              <input
                id="phone"
                class="form-control p-3"
                :class="{ 'is-invalid': userError.phone }"
                type="text"
                placeholder="請輸入手機號碼"
                v-model.trim="phone"
                v-bind="phoneAttrs"
              />
              <div class="invalid-feedback d-block">{{ userError.phone }}</div>
            </div>
          </div>
          <div class="d-flex flex-column gap-2">
            <label for="birthday">生日</label>
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
            <label for="addressDetail">地址</label>
            <p v-show="!isEditing" class="text-neutral fw-bold">
              {{ fullAddress }}
            </p>
            <div v-show="isEditing">
              <div v-show="isEditing" class="d-flex flex-column gap-3">
                <address-select
                  :model-value="zipcode as number"
                  @update:model-value="(newZipcode) => (zipcode = newZipcode)"
                  @update:address="handleFullAddress($event)"
                  v-bind="zipcodeAttrs"
                />
                <input
                  id="addressDetail"
                  class="form-control p-3"
                  :class="{ 'is-invalid': userError.addressDetail }"
                  type="text"
                  placeholder="請輸入詳細地址"
                  v-model="addressDetail"
                  v-bind="addressDetailAttrs"
                />
              </div>
              <div class="invalid-feedback d-block">
                {{ userError.addressDetail }}
              </div>
            </div>
          </div>
          <div class="d-flex">
            <button
              v-if="!isEditing"
              class="baseButton isStyleGrey"
              @click="isEditing = !isEditing"
            >
              編輯
            </button>
            <div v-else class="d-flex gap-3">
              <button
                type="button"
                class="baseButton isStyleGrey"
                @click="resetForm"
              >
                取消
              </button>
              <button
                type="submit"
                class="baseButton isStyleGrey"
                :disabled="!allFieldsFilled"
              >
                儲存設定
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Form>
</template>
