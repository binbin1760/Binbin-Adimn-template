import Mock from "mockjs";

Mock.mock("/table/data", "get", {
  status: 200,
  pageCount: 5,
  "data|15": [
    {
      name: "@cname",
      email: "@email",
      "sort|1-50": 0,
      address: "@county(true) @ctitle(2, 3) @natural(1, 20) 号",
      "money|100-300": 0,
    },
  ],
});

Mock.mock("/apply/data", "get", {
  status: 200,
  data: {
    "a|1": true,
  },
});
