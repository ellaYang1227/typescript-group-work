import router from "@/router/index";
import { useLoadingStore, useAuthStore } from "@/stores";
import { getCookie } from "@/utilities/cookie";
import { swalWithButtons } from "@/utilities/sweetAlert";
import axios from "axios";
const errorSweetAlert = (text: string, callback?: () => void) => {
  swalWithButtons
    .fire({
      icon: "error",
      title: "錯誤訊息",
      text: text,
      customClass: {
        confirmButton: "baseButton isStyleSecondary",
      },
    })
    .then(() => {
      if (callback) {
        callback();
      }
    });
};
const service = axios.create({
  baseURL: "https://typescript-hotel-api-vwlm.onrender.com/",
});
service.interceptors.request.use(
  (config) => {
    // 在這裡加入您的邏輯
    const loadingStore = useLoadingStore();
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    if (!config.headers.noShowLoading) {
      loadingStore.showLoading();
    }
    return config;
  },
  (error) => {
    const loadingStore = useLoadingStore();
    loadingStore.hideLoading();
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    // 在這裡加入您的邏輯
    const loadingStore = useLoadingStore();
    loadingStore.hideLoading();
    return response.data;
  },
  (error) => {
    const loadingStore = useLoadingStore();
    const authStore = useAuthStore();
    loadingStore.hideLoading();
    if (error.response) {
      const { data } = error.response;
      switch (error.response.status) {
        case 400:
          const { name } = router.currentRoute.value;
          errorSweetAlert(
            `${name !== "login" && name !== "signup" && name !== "user"
              ? "找不到該筆資料"
              : data.message
            }`,
            () => {
              if (name !== "login" && name !== "signup" && name !== "user") {
                // 除了登入、註冊失敗需停留在原頁 其他返回首頁
                router.push({
                  path: "/",
                });
              }
            }
          );
          break;
        //可以在這裡針對不同 status code 做處理
        case 401:
        case 405:
        case 403:
          errorSweetAlert(`${data.message || "權限不足，請重新登入"}`, () => {
            authStore.logOut(false);
            router.push({
              path: "/login",
              query: {
                redirectFrom: location.pathname,
              },
            });
          });
          console.log(data.message);
          break;
        case 404:
          errorSweetAlert(`${data.message || "頁面不存在"}`, () => {
            if (data.message !== "此使用者不存在")
              // 登入失敗需停留在登入頁
              router.push({
                path: "/",
              });
          });
          console.log(data.message);
          break;
        case 500:
          errorSweetAlert(
            `${data.message || "網路出了點問題，請重新連線後刷新頁面"}`
          );
          console.log(data.message);
          break;
        default:
          errorSweetAlert(
            `${data.message || "網路出了點問題，請重新連線後刷新頁面"}`
          );
          console.log(data.message);
      }
    }
    if (!window.navigator.onLine) {
      swalWithButtons.fire({
        icon: "error",
        title: "錯誤訊息",
        text: "網路出了點問題，請重新連線後刷新頁面",
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: "確定",
      });
      return;
    }
    return Promise.reject(error);
  }
);

export default service;
