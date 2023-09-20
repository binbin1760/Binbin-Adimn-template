import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouterHistory,
  RouterOptions,
} from "vue-router";

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
    path: "/merchant-service",
    meta: {
      name: "商家管理",
      isRoot: false,
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
  {
    path: "/pet-service",
    meta: {
      name: "宠物服务",
      isRoot: false,
    },
    redirect: "/pet-service/petbreed",
    component: () => import("@/components/layout/index.vue"),
    children: [
      {
        path: "/pet-service/petbreed",
        meta: {
          isRoot: true,
          name: "品种管理",
        },
        component: () => import("@/views/pet-service/petbreed/index.vue"),
      },
      {
        path: "/pet-service/petbreed/detail",
        name: "pet_detial",
        meta: {
          isRoot: true,
          name: "品种详情",
          hidden: false,
        },
        component: () =>
          import("@/views/pet-service/petbreed/pet-detail/index.vue"),
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
