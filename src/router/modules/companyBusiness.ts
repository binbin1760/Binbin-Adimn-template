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
      {
        path: "/company-business/Editor",
        meta: {
          name: "富文本编辑器",
          isRoot: true,
          hidden: true,
          affix: false,
        },
        component: () => import("@/views/company-business/Editor/index.vue"),
      },
      {
        path: "/company-business/canvas",
        meta: {
          name: "canvas预演",
          isRoot: true,
          hidden: true,
          affix: false,
        },
        component: () => import("@/views/company-business/canvas/index.vue"),
      },
      {
        path: "/company-business/async",
        meta: {
          name: "异步相关",
          isRoot: true,
          hidden: true,
          affix: false,
        },
        component: () => import("@/views/company-business/async/index.vue"),
      },
      {
        path: "/company-business/skualgo",
        meta: {
          name: "SKU库存",
          isRoot: true,
          hidden: true,
          affix: false,
        },
        component: () => import("@/views/company-business/sku-algo/index.vue"),
      },
    ],
  },
];

export default routes;
