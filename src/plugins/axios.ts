import axios from "axios";
import router from "@/router/index";
import { useLoadingStore } from "@/stores/loading";
const store = useLoadingStore();

const service = axios.create({
  baseURL: "https://typescript-hotel-api-vwlm.onrender.com/",
});
service.interceptors.request.use(
  (config) => {
    // 在這裡加入您的邏輯
    const token = window.localStorage.token;
    if (token) {
      config.headers.Authorization = `token ${token}`;
    }
    if (!config.headers.noShowLoading) {
      store.showLoading();
    }
    console.log(config);
    return config;
  },
  (error) => {
    store.hideLoading();
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    // 在這裡加入您的邏輯
    store.hideLoading();
    return response;
  },
  (error) => {
    store.hideLoading();
    if (error.response) {
      switch (error.response.status) {
        //可以在這裡針對不同 status code 做處理
        case 401:
          alert("token 無效");
          router.push("/login");
          console.log(error.message);
          break;
        case 404:
          alert("頁面不存在");
          router.push("/");
          console.log(error.message);
          break;
        case 500:
          alert("程式發生問題");
          console.log(error.message);
          break;
        default:
          alert("程式發生問題");
          console.log(error.message);
      }
    }
    if (!window.navigator.onLine) {
      alert("請重新連線後重整網頁");
      return;
    }
    return Promise.reject(error);
  },
);

export default service;

function storeToRefs(store: Store<"loading", _UnwrapAll<Pick<{
isShowLoading: Ref<boolean>; showLoading: () => void; // 在這裡加入您的邏輯
// 在這裡加入您的邏輯
// spinning start to show
hideLoading: () => void; // spinning start to show
}, "isShowLoading">>, Pick<{
isShowLoading: Ref<boolean>; showLoading: () => void; // 在這裡加入您的邏輯
// 在這裡加入您的邏輯
// spinning start to show
hideLoading: () => void; // spinning start to show
}, never>, Pick<{
isShowLoading: Ref<boolean>; showLoading: () => void; // 在這裡加入您的邏輯
// 在這裡加入您的邏輯
// spinning start to show
hideLoading: () => void; // spinning start to show
}, "showLoading" | "hideLoading">>): { isShowLoading: any; } {
throw new Error("Function not implemented.");
}
