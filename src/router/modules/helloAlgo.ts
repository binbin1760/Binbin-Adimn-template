import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/hello-algo",
    meta: {
      name: "算法试验场",
      sort: 0,
    },
    redirect: "/hello-algo/index",
    component: () => import("@/components/layout/index.vue"),
    children: [
      {
        path: "/hello-algo/index",
        meta: {
          name: "哈喽算法",
          isRoot: true,
          hidden: true,
          affix: false,
        },
        component: () => import("@/views/hello-algo/index.vue"),
      },
    ],
  },
];

export default routes;
