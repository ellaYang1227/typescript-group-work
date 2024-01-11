import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './routes';
import { beforeEach } from './routerGuard';

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

// 設定導航守衛
router.beforeEach(beforeEach);

export default router;
