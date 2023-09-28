import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/dashboard",
    meta: {
      name: "主控板",
      isRoot: false,
      sort: 0,
    },
    redirect: "/dashboard/console",
    component: () => import("@/components/layout/index.vue"),
    children: [
      {
        path: "/dashboard/console",
        meta: {
          name: "系统主页",
          isRoot: true,
          hidden: true,
          affix: true,
        },
        component: () => import("@/views/dashboard/index.vue"),
      },
    ],
  },
];

export default routes;
