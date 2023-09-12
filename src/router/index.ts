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
  // {
  //   path: "/Errpage",
  //   component: () => import("@/views/common/page-err/index.vue"),
  //   meta: {
  //     name: "错误页面",
  //     isRoot: true,
  //   },
  // },
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
      {
        path: "/system/roles",
        meta: {
          isRoot: true,
          name: "角色管理",
        },
        component: () => import("@/views/system/roles/index.vue"),
      },
      {
        path: "/system/menus",
        meta: {
          isRoot: true,
          name: "菜单管理",
        },
        component: () => import("@/views/system/menus/index.vue"),
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
