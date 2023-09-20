import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/merchant-service",
    meta: {
      name: "商家管理",
      isRoot: false,
      sort: 1,
    },
    redirect: "/merchant-service/examine",
    component: () => import("@/components/layout/index.vue"),
    children: [
      {
        path: "/merchant-service/examine",
        meta: {
          isRoot: true,
          name: "商家入驻审核",
        },
        component: () => import("@/views/merchant/index.vue"),
      },
      {
        path: "/merchant-service/edit-info",
        meta: {
          isRoot: true,
          name: "信息修改审核",
        },
        component: () => import("@/views/merchant/editInfo/index.vue"),
      },
      {
        path: "/merchant-service/package",
        meta: {
          isRoot: true,
          name: "团购套餐审核",
        },
        component: () => import("@/views/merchant/package/index.vue"),
      },
      {
        path: "/merchant-service/finance",
        meta: {
          isRoot: true,
          name: "商家财务申请",
        },
        component: () => import("@/views/merchant/finance/index.vue"),
      },
      {
        path: "/merchant-service/merchant-info-detail",
        meta: {
          isRoot: true,
          name: "商家入住审核详情",
          hidden: false,
        },
        component: () =>
          import("@/views/merchant/detail-list/merchant-info.vue"),
      },
      {
        path: "/merchant-service/merchant-fixinfo-detial",
        meta: {
          isRoot: true,
          name: "商家资料修改详情",
          hidden: false,
        },
        component: () =>
          import("@/views/merchant/detail-list/merchant-fixinfo.vue"),
      },
      {
        path: "/merchant-service/package-detial",
        meta: {
          isRoot: true,
          name: "商家团购套餐审核详情",
          hidden: false,
        },
        component: () =>
          import("@/views/merchant/detail-list/package-detail.vue"),
      },
      {
        path: "/merchant-service/finance-detial",
        meta: {
          isRoot: true,
          name: "财务审核详情",
          hidden: false,
        },
        component: () =>
          import("@/views/merchant/detail-list/finance-list.vue"),
      },
    ],
  },
];

export default routes;
