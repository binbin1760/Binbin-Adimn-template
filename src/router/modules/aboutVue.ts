import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/aboutvue",
    meta: {
      name: "Vue相关",
      sort: 1,
    },
    redirect: "/aboutvue/cssmodules",
    component: () => import("@/components/layout/index.vue"),
    children: [
      {
        path: "/aboutvue/cssmodules",
        meta: {
          name: "单文件CSS Modules",
          isRoot: true,
          hidden: false,
          affix: false,
        },
        component: () => import("@/views/about-vue/css-modules/index.vue"),
      },
    ],
  },
];

export default routes;
