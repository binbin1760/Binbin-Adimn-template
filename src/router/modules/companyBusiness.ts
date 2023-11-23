import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/company-business",
    meta: {
      name: "奇奇怪怪的业务",
      sort: 3,
    },
    redirect: "/company-business/index",
    component: () => import("@/components/layout/index.vue"),
    children: [
      {
        path: "/company-business/index",
        meta: {
          name: "蛇皮业务组件",
          isRoot: true,
          hidden: true,
          affix: false,
        },
        component: () => import("@/views/company-business/index.vue"),
      },
    ],
  },
];

export default routes;
