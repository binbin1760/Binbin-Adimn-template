import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/base",
    meta: {
      name: "基础组件",
      sort: 1,
    },
    redirect: "/base/dataTable",
    component: () => import("@/components/layout/index.vue"),
    children: [
      {
        path: "/base/dataTable",
        meta: {
          name: "基础表格",
          isRoot: true,
          hidden: false,
          affix: false,
        },
        component: () => import("@/views/base-component/base-table/index.vue"),
      },
      {
        path: "/base/base-form",
        meta: {
          name: "基础表单",
          isRoot: true,
          hidden: false,
          affix: false,
        },
        component: () => import("@/views/base-component/base-form/index.vue"),
      },
      {
        path: "/base/custom-popup-components",
        meta: {
          name: "自定义弹窗",
          isRoot: true,
          hidden: false,
          affix: false,
        },
        component: () => import("@/views/base-component/base-pop/index.vue"),
      },
      {
        path: "/base/custom-component/draw",
        meta: {
          name: "数据驱动抽屉",
          isRoot: true,
          hidden: false,
          affix: false,
        },
        component: () => import("@/views/base-component/base-draw/index.vue"),
      },
    ],
  },
];

export default routes;
