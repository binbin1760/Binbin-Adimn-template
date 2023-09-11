import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouterHistory,
  RouterOptions,
} from "vue-router";

// 主页

/***
 *asyncRoutes 需要权限验证的路由
 *constantRouter 普通路由
 */
interface CustomRouterOptions extends RouterOptions {
  constantRoute?: RouteRecordRaw[];
}
export const constantRoute: Array<RouteRecordRaw> = [
  {
    path: "/login",
    meta: {
      name: "登录",
      isRoot: true,
    },
    component: () => import("@/views/common/login/index.vue"),
  },
  {
    path: "/Errpage",
    component: () => import("@/views/common/page-err/index.vue"),
    meta: {
      name: "错误页面",
      isRoot: true,
    },
  },
  {
    path: "/component-list",
    meta: {
      name: "组件展示",
      isRoot: false,
    },
    redirect: "/component-list/form",
    component: () => import("@/components/layout/index.vue"),
    children: [
      {
        path: "/component-list/form",
        meta: {
          isRoot: true,
          name: "表单",
        },
        component: () => import("@/views/component-list/form/index.vue"),
      },
    ],
  },
  {
    path: "/system",
    meta: {
      name: "系统管理",
      isRoot: false,
    },
    redirect: "/system/user",
    component: () => import("@/components/layout/index.vue"),
    children: [
      {
        path: "/system/user",
        meta: {
          isRoot: true,
          name: "用户管理",
        },
        component: () => import("@/views/system/user/index.vue"),
      },
    ],
  },
  {
    path: "/online",
    meta: {
      name: "在线开发",
      isRoot: false,
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
  {
    path: "/",
    meta: {
      name: "重定向login",
      isRoot: true,
    },
    redirect: "/login",
  },
];
const routerHistory: RouterHistory = createWebHistory();
const customRouterOptions: CustomRouterOptions = {
  history: routerHistory,
  routes: constantRoute,
};
const router = createRouter(customRouterOptions);
export default router;
