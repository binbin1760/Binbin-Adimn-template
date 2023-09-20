import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/pet-service",
    meta: {
      name: "宠物服务",
      isRoot: false,
      sort: 2,
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
];

export default routes;
