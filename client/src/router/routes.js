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
      { path: "sign-up", component: () => import("src/pages/SignUp.vue") },
      {
        path: "profile",
        component: () => import("src/pages/ProfilePage.vue"),
      },
    ],
  },
];

export default routes;
