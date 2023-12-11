import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouterHistory,
  RouterOptions,
} from "vue-router";

import { createRouterGuards } from "@/router/guards";
import { App } from "vue";
/***
 *asyncRoutes 需要权限验证的路由
 *constantRouter 普通路由
 */
// 计算全部asyncRoutes
export interface IModuleType {
  default: Array<RouteRecordRaw> | RouteRecordRaw;
}
const modules = import.meta.glob<IModuleType>("./modules/**/*.ts", {
  eager: true,
});

const ModuleList: RouteRecordRaw[] = Object.keys(
  modules
) as unknown as RouteRecordRaw[];
const routesModuleList = ModuleList.reduce((list, key) => {
  const mod = modules[key as unknown as string].default ?? {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  return [...list, ...modList];
}, []);

function RoutesSort(a, b) {
  return (a.meta?.sort ?? 0) - (b.meta?.sort ?? 0);
}

routesModuleList.sort(RoutesSort);
interface CustomRouterOptions extends RouterOptions {
  constantRoute?: RouteRecordRaw[];
}
export const asyncRoutes = [...routesModuleList];
export const whiteList = ["/login", "/redirect", "/redirect/all", "/err/409"];
export const constantRoute: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    meta: {
      name: "登录",
    },
    component: () => import("@/views/common/login/index.vue"),
  },
  {
    path: "/redirect",
    name: "Redirect",
    meta: {
      name: "刷新",
    },
    component: () => import("@/components/layout/index.vue"),
    children: [
      {
        path: "/redirect/all",
        name: "toRedirect",
        meta: {
          name: "刷新页面",
        },
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },
  {
    path: "/err/409",
    name: "err490",
    component: () => import("@/views/err-page/404/index.vue"),
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

const routes = [...constantRoute, ...asyncRoutes];
const routerHistory: RouterHistory = createWebHistory();
const customRouterOptions: CustomRouterOptions = {
  history: routerHistory,
  routes: routes,
};
const router = createRouter(customRouterOptions);

export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}
export default router;
