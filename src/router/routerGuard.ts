import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import { getCookie } from "@/utilities/cookie";

export function beforeEach(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const isHaveToken = getCookie("token");
  if (to.meta.title) document.title = to.meta.title as string;

  // 判斷是否為需要驗證權限的路由
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 判斷是否已經登入
    if (!isHaveToken) {
      // 未登入，轉到登入頁面
      next({
        name: "login",
        query: {
          redirectFrom: to.path as string,
        },
      });
    } else {
      // 已登入，繼續前往目標路由
      next();
    }
  } else {
    // 已登入，不可再進到login和signup頁面
    if (isHaveToken && (to.name === "login" || to.name === "signup")) {
      next("/");
      return;
    }
    // 如果不需要驗證權限，直接前往目標路由
    next();
  }
}
