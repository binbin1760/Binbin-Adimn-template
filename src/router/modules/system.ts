import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/system",
    meta: {
      name: "系统管理",
      isRoot: false,
      sort: 4,
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
];

export default routes;
