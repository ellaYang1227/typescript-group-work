import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
 
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
 
router.beforeEach((_to, _from, next) => {
  next();
});
 
router.beforeEach((to, _from, next) => {
  if (to.meta.title) {
      document.title = to.meta.title  as string;
  }
  next();
})
 
export default router;