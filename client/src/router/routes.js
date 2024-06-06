const isAuthenticated = (to, from, next) => {
  const me = users.me;
  if (!me) {
    alert("로그인한 사용자만 이용가능합니다.");
    return next("/");
  } else {
    return next();
  }
};

const routes = [
  {
    path: "/main",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexView.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
  {
    path: "/",
    component: () => import("src/layouts/DefaultLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/IndexPage.vue") },
      {
        path: "sign-up",
        component: () => import("src/pages/SignUp.vue"),
      },
      {
        path: "profile",
        component: () => import("src/pages/ProfilePage.vue"),
        beforeEnter: [isAuthenticated],
      },
      {
        path: "user/:id",
        component: () => import("src/pages/user/_id/index.vue"),
      },
      {
        path: "post/:id",
        component: () => import("src/pages/post/_id/index.vue"),
      },
    ],
  },
];

export default routes;
