import mock from "mockjs";

const asyncRoutes = [
  {
    path: "/online",
    children: [
      {
        path: "/online/api",
        component: "Api",
      },
    ],
  },
];

mock.mock("/login", "post", () => {
  return asyncRoutes;
});
