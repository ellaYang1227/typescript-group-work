const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: {
      title: "首頁", //添加這部分
    },
  },
  {
    path: "/rooms",
    name: "rooms",
    component: () => import("@/views/Rooms/Index.vue"),
    meta: {
      title: "客房資訊",
    },
  },
  {
    path: "/rooms/:id",
    name: "rooms-item",
    component: () => import("@/views/Rooms/Item.vue"),
    meta: {
      title: "客房資訊",
    },
  },
  {
    path: "/rooms/:id/reservation",
    name: "rooms-reservation",
    component: () => import("@/views/Rooms/Reservation.vue"),
    meta: {
      title: "客房預約",
      requiresAuth: true,
    },
  },
  {
    path: "/rooms/:id/success",
    name: "rooms-success",
    component: () => import("@/views/Rooms/ReservationSuccess.vue"),
    meta: {
      title: "客房預約成功",
      requiresAuth: true,
    },
  },
  {
    path: "/",
    component: () => import("@/components/Layouts/Login.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@/views/Login.vue"),
        meta: {
          title: "會員登入",
        },
      },
      {
        path: "signup",
        name: "signup",
        component: () => import("@/views/Signup.vue"),
        meta: {
          title: "會員註冊",
        },
      },
    ],
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/User/Index.vue"),
    meta: {
      title: "會員資訊",
      requiresAuth: true,
    },
  },
  {
    path: "/user/orders",
    name: "user-orders",
    component: () => import("@/views/User/Orders.vue"),
    meta: {
      title: "會員訂單",
      requiresAuth: true,
    },
  },
  {
    path: "/guideline",
    name: "guideline",
    component: () => import("@/views/Guideline.vue"),
    meta: {
      title: "Guildline",
    },
  },
  {
    path: "/:pathMath(.*)*",
    name: "404",
    component: import("@/views/NotFound.vue"),
    meta: {
      title: "404",
    },
  },
];

export default routes;
