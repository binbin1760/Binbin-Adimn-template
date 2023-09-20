import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/online",
    meta: {
      name: "在线开发",
      isRoot: false,
      sort: 3,
    },
    redirect: "/online/api",
    component: () => import("@/components/layout/index.vue"),
    children: [
      {
        path: "/online/api",
        meta: {
          name: "开发日志",
          isRoot: true,
        },
        component: () => import("@/views/online/api/index.vue"),
      },
    ],
  },
];

export default routes;
