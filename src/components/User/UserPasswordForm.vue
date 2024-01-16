<script setup lang="ts">
import DatePickerSelect from "@/components/DatePickerSelect.vue";
import AddressSelect from "@/components/AddressSelect.vue";
import ZipCodeMap from "@/utilities/zipcodes.ts";
import { z } from "zod";
import { useAuthStore } from "@/stores";
import { Form, useForm } from "vee-validate";
import { UserInfoData } from "@/interfaces/auth";
import { toTypedSchema } from "@vee-validate/zod";
import { apiUpdateUserInfo } from "@/models/auth";
import { swalWithButtons } from "@/utilities/sweetAlert";
import { ref, watch, computed, toRefs } from "vue";
interface UpdatePwdData {
  userId: string;
  oldPassword: string;
  newPassword: string;
}
interface UpdateUserData {
  userId: string;
  name: string;
  phone: string;
  birthday: string;
  address: {
    zipcode: number;
    detail: string;
  };
}
const props = defineProps({
  userInfoData: {
    type: Object as () => UserInfoData,
    required: true,
  },
});
const { userInfoData } = toRefs(props);
const store = useAuthStore();
const userInfoTypedSchema = z.object({
  name: z
    .string()
    .min(1, "請輸入姓名")
    .regex(
      new RegExp(/^[a-zA-Z\u4e00-\u9fa5\s]+$/),
      "請輸入您的中英文姓名，可包含空白，但不能包含特殊字元"
    )
    .default(userInfoData.value.name || ""),
  phone: z
    .string()
    .min(1, "請輸入手機號碼")
    .regex(new RegExp(/^\d+$/), "請輸入數字")
    .startsWith("09", { message: "請輸入正確的手機號碼格式" })
    .length(10, { message: "請輸入正確的手機號碼格式" })
    .default(userInfoData.value.phone || ""),
  zipcode: z.number().default(userInfoData.value.address.zipcode || 800),
  addressDetail: z
    .string()
    .min(1, "請輸入詳細地址")
    .default(userInfoData.value.address.detail || ""),
  birthday: z
    .string()
    .min(1, "請選擇生日")
    .default(userInfoData.value.birthday || "1990/8/15"),
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
  setValues: setUserValues,
  defineField: userDefineField,
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
const isEditingUser = ref(false);
const isEditingPwd = ref(false);
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
  isEditingPwd.value = false;
  isEditingUser.value = false;
}

watch(
  () => userInfoData.value,
  (newValue) => {
    if (newValue) {
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
// 判斷密碼欄位
const pwdFieldsFilled = computed(() => {
  return (
    Object.values(pwdValues).every((value) => value !== "") &&
    Object.keys(pwdError.value).length == 0
  );
});
// 判斷使用者欄位
const userFieldsFilled = computed(() => {
  return (
    Object.values(userValues).every((value) => value !== "") &&
    Object.keys(userError.value).length == 0
  );
});
// 日期格式轉換
const formattedBirthday = computed(() => {
  const date = new Date(userInfoData.value.birthday);
  return date.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});
// 取得完整地址
const fullAddress = computed(() => {
  const item = ZipCodeMap.find(
    (item) => item.zipcode === userInfoData.value.address.zipcode
  );
  return `${item?.county}${item?.city}${userInfoData.value.address.detail}`;
});
// 修改密碼
function handlePwdSubmit(): void {
  let updatePwdData: UpdatePwdData = {
    userId: userInfoData.value.userId,
    oldPassword: String(oldPassword.value),
    newPassword: String(newPassword.value),
  };
  apiUpdateUserInfo(updatePwdData).then(() => {
    swalWithButtons
      .fire({
        icon: "success",
        title: "修改帳號資料成功",
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: "確定",
      })
      .then(() => {
        store.fetchUser();
        resetForm();
      });
  });
}
// 修改使用者資料
function handleUserSubmit(): void {
  let updateUserData: UpdateUserData = {
    userId: userInfoData.value.userId,
    name: String(name.value),
    phone: String(phone.value),
    birthday: String(birthday.value),
    address: {
      zipcode: Number(zipcode.value),
      detail: String(addressDetail.value),
    },
  };
  apiUpdateUserInfo(updateUserData).then(() => {
    swalWithButtons
      .fire({
        icon: "success",
        title: "修改基本資料成功",
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: "確定",
      })
      .then(() => {
        store.fetchUser();
        resetForm();
      });
  });
}
</script>
<template>
  <Form class="row gap-4 gap-lg-6 d-flex flex-column flex-lg-row w-100 m-auto">
    <div class="col-12 col-lg p-0 h-100">
      <div class="card rounded-3 border-0">
        <div class="card-body p-4 p-lg-6">
          <h5 class="mb-4 mb-lg-6 text-neutral">修改帳號資料</h5>
          <div class="d-flex flex-column gap-2 mb-3 mb-md-4">
            <span>電子信箱</span>
            <span class="text-neutral fw-bold">
              {{ userInfoData.email }}
            </span>
          </div>
          <div
            v-if="!isEditingPwd"
            class="d-flex align-items-center justify-content-between"
          >
            <div class="d-flex flex-column gap-2">
              <span>密碼</span>
              <span class="text-neutral" style="font-size: 12px">
                ● ● ● ● ● ● ● ● ● ●
              </span>
            </div>
            <div
              class="baseButton isStyleText"
              @click="isEditingPwd = !isEditingPwd"
            >
              重設
            </div>
          </div>
          <div v-else class="d-flex flex-column">
            <div class="d-flex flex-column gap-3 gap-md-4">
              <div class="d-flex flex-column gap-2">
                <label
                  for="oldPassword"
                  :class="{ 'edit-label': isEditingPwd }"
                >
                  舊密碼
                </label>
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
                  <div
                    v-if="pwdError.oldPassword"
                    class="invalid-feedback d-block"
                  >
                    {{ pwdError.oldPassword }}
                  </div>
                </div>
              </div>
              <div class="d-flex flex-column gap-2">
                <label
                  for="newPassword"
                  :class="{ 'edit-label': isEditingPwd }"
                >
                  新密碼
                </label>
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
                  <div
                    v-if="pwdError.newPassword"
                    class="invalid-feedback d-block"
                  >
                    {{ pwdError.newPassword }}
                  </div>
                </div>
              </div>
              <div class="d-flex flex-column gap-2">
                <label for="confirm" :class="{ 'edit-label': isEditingPwd }">
                  確認新密碼
                </label>
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
                  <div v-if="pwdError.confirm" class="invalid-feedback d-block">
                    {{ pwdError.confirm }}
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex pt-3 pt-lg-6">
              <button
                type="button"
                class="baseButton isStylePrimary"
                :disabled="!pwdFieldsFilled"
                @click="handlePwdSubmit"
              >
                儲存設定
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-lg p-0 h-100">
      <div class="card rounded-3 border-0">
        <div class="card-body p-4 p-lg-6">
          <h5 class="mb-4 mb-lg-6 text-neutral">基本資料</h5>
          <div class="d-flex flex-column gap-3 gap-md-4">
            <div class="d-flex flex-column gap-2">
              <label for="name" :class="{ 'edit-label': isEditingUser }">
                姓名
              </label>
              <div v-if="!isEditingUser" class="text-neutral fw-bold">
                {{ userInfoData.name }}
              </div>
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
                <div v-if="userError.name" class="invalid-feedback d-block">
                  {{ userError.name }}
                </div>
              </div>
            </div>
            <div class="d-flex flex-column gap-2">
              <label for="phone" :class="{ 'edit-label': isEditingUser }">
                手機號碼
              </label>
              <div v-if="!isEditingUser" class="text-neutral fw-bold">
                {{ userInfoData.phone }}
              </div>
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
                <div v-if="userError.phone" class="invalid-feedback d-block">
                  {{ userError.phone }}
                </div>
              </div>
            </div>
            <div class="d-flex flex-column gap-2">
              <label for="birthday" :class="{ 'edit-label': isEditingUser }">
                生日
              </label>
              <div v-if="!isEditingUser" class="text-neutral fw-bold">
                {{ formattedBirthday }}
              </div>
              <date-picker-select
                v-else
                :model-value="birthday as string"
                v-bind="birthdayAttrs"
                @update:model-value="(newBirthday) => (birthday = newBirthday)"
              />
            </div>
            <div class="d-flex flex-column gap-3">
              <label
                for="addressDetail"
                :class="{ 'edit-label': isEditingUser }"
              >
                地址
              </label>
              <div v-show="!isEditingUser" class="text-neutral fw-bold">
                {{ fullAddress }}
              </div>
              <div v-show="isEditingUser">
                <div v-show="isEditingUser" class="d-flex flex-column gap-3">
                  <address-select
                    :model-value="zipcode as number"
                    @update:model-value="(newZipcode) => (zipcode = newZipcode)"
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
                <div
                  v-if="userError.addressDetail"
                  class="invalid-feedback d-block"
                >
                  {{ userError.addressDetail }}
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex pt-3 pt-lg-6">
            <button
              v-if="!isEditingUser"
              class="baseButton isStyleSecondary"
              @click="isEditingUser = !isEditingUser"
            >
              編輯
            </button>
            <button
              v-else
              type="button"
              class="baseButton isStylePrimary"
              :disabled="!userFieldsFilled"
              @click="handleUserSubmit"
            >
              儲存設定
            </button>
          </div>
        </div>
      </div>
    </div>
  </Form>
</template>
<style lang="scss">
.edit-label {
  font-weight: bold;
  color: $neutral;
}
</style>
