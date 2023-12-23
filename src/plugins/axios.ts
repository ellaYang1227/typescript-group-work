import axios from "axios";
import router from "@/router/index";

const service = axios.create({
  baseURL: "/",
});

service.interceptors.request.use(
  (config) => {
    // 在這裡加入您的邏輯
    return config;
  },
  (error) => {
    // 在這裡加入您的邏輯
    console.log("2");
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    // 在這裡加入您的邏輯
    return response;
  },
  (error) => {
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
