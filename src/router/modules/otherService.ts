import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/other-service",
    meta: {
      name: "其他服务",
      isRoot: false,
      sort: 5,
    },
    redirect: "/other-service/feedback",
    component: () => import("@/components/layout/index.vue"),
    children: [
      {
        path: "/other-service/feedback",
        meta: {
          isRoot: true,
          name: "意见反馈",
          hidden: true,
        },
        component: () => import("@/views/other-service/feed-back/index.vue"),
      },
      {
        path: "/other-service/reportComplaints",
        meta: {
          isRoot: true,
          name: "投诉举报",
          hidden: true,
        },
        component: () =>
          import("@/views/other-service/report-complaints/index.vue"),
      },
      {
        path: "/other-service/feedback/detail",
        meta: {
          isRoot: true,
          name: "意见反馈详情",
          hidden: false,
        },
        component: () =>
          import("@/views/other-service/detail-list/feedback-detail.vue"),
      },
      {
        path: "/other-service/reportComplaints/detail",
        meta: {
          isRoot: true,
          name: "投诉举报详情",
          hidden: false,
        },
        component: () =>
          import("@/views/other-service/detail-list/report-detail.vue"),
      },
    ],
  },
];

export default routes;
