import axios from "axios";
import router from "@/router/index";
import { useLoadingStore } from "@/stores";
import { getCookie } from "@/utilities/cookie";
import Swal from "sweetalert2";
const loadingStore = useLoadingStore();

const service = axios.create({
  baseURL: "https://typescript-hotel-api-vwlm.onrender.com/",
});
service.interceptors.request.use(
  (config) => {
    // 在這裡加入您的邏輯
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
    loadingStore.hideLoading();
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    // 在這裡加入您的邏輯
    loadingStore.hideLoading();
    return response;
  },
  (error) => {
    loadingStore.hideLoading();
    if (error.response) {
      const { data } = error.response;
      switch (error.response.status) {
        //可以在這裡針對不同 status code 做處理
        case 401:
        case 405:
        case 403:
          Swal.fire({
            icon: "error",
            title: "錯誤訊息",
            text: `${data.message || "權限不足，請重新登入"}`,
            confirmButtonText: "確定",
          }).then(() => {
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
          Swal.fire({
            icon: "error",
            title: "錯誤訊息",
            text: `${data.message || "頁面不存在"}`,
            confirmButtonText: "確定",
          }).then(() => {
            router.push({
              path: "/",
            });
          });
          console.log(data.message);
          break;
        case 500:
          Swal.fire({
            icon: "error",
            title: "錯誤訊息",
            text: `${data.message || "網路出了點問題，請重新連線後刷新頁面"}`,
            confirmButtonText: "確定",
          });
          console.log(data.message);
          break;
        default:
          Swal.fire({
            icon: "error",
            title: "錯誤訊息",
            text: `${data.message || "網路出了點問題，請重新連線後刷新頁面"}`,
            confirmButtonText: "確定",
          });
          console.log(data.message);
      }
    }
    if (!window.navigator.onLine) {
      Swal.fire({
        icon: "error",
        title: "錯誤訊息",
        text: "網路出了點問題，請重新連線後刷新頁面",
        confirmButtonText: "確定",
      });
      return;
    }
    return Promise.reject(error);
  },
);

export default service;
