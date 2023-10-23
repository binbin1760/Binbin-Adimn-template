import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/err-page",
    meta: {
      name: "错误页面",
      sort: 2,
    },
    redirect: "/err-page/404",
    component: () => import("@/components/layout/index.vue"),
    children: [
      {
        path: "/err-page/404",
        meta: {
          name: "404页面",
          isRoot: true,
          hidden: true,
          affix: false,
        },
        component: () => import("@/views/err-page/404/index.vue"),
      },
      {
        path: "/err-page/500",
        meta: {
          name: "500页面",
          isRoot: true,
          hidden: true,
          affix: false,
        },
        component: () => import("@/views/err-page/500/index.vue"),
      },
    ],
  },
];

export default routes;
