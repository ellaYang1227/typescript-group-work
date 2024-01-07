import { defineStore } from "pinia";
import { apiLogin, apiGetUser } from "@/models/api";
import { UserLogin, UserInformation } from "@/interfaces/auth";
import { saveCookie } from "@/utilities/cookie";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export const useAuthStore = defineStore("useAuthStore", () => {
  const userInformation = ref<UserInformation | null>(null);

  const route = useRoute();
  const router = useRouter();

  const login = async (value: UserLogin) => {
    try {
      const data = await apiLogin(value);
      if (data.status) {
        // 設置token
        saveCookie("token", data.token);
        // 更新登入者資訊
        userInformation.value = data.result;
        // 導向
        await router.push((route?.query?.redirectFrom as string) || "/");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const fetchUser = async (): Promise<void> => {
    try {
      const data = await apiGetUser();
      userInformation.value = data;
    } catch (error) {
      console.log("error", error);
    }
  };

  return {
    userInformation,
    login,
    fetchUser,
  };
});
