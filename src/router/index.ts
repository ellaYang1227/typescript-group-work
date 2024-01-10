import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import { beforeEach } from './routerGuard';

const router = createRouter({
  history: createWebHistory(
    process.env.NODE_ENV === "production" ? "/typescript-group-work-test/" : "/"
  ),
  routes: routes,
});

// 設定導航守衛
router.beforeEach(beforeEach);

export default router;
