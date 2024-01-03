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

Mock.mock("/draw/data", "get", {
  status: 200,
  data: [
    {
      data: "测试title",
      vnodeName: "title",
    },
    {
      keyVal: "name",
      label: "测试数据：",
      vnodeName: "labelKey",
      weight: "400",
      textcolor: "red",
      data: "测试lableKey",
    },
    {
      data: "测试分割线",
      vnodeName: "title",
    },
    {
      keyVal: "name",
      label: "测试数据：",
      vnodeName: "labelKey",
      weight: "400",
      textcolor: "red",
      data: "测试lableKey",
    },
    {
      data: "测试分割线2",
      vnodeName: "title",
    },
    {
      keyVal: "name",
      label: "测试数据：",
      vnodeName: "labelKey",
      weight: "400",
      textcolor: "red",
      data: "测试lableKey",
    },
    {
      data: "测试分割线2",
      vnodeName: "title",
    },
    {
      keyVal: "name",
      label: "测试数据：",
      vnodeName: "labelKey",
      weight: "400",
      textcolor: "red",
      data: "测试lableKey啊实打实大苏打实打实大苏打打实打实大苏打打实打实大苏打打实打实大苏打打实打实大苏打打实打实大苏打打实打实大苏打打实打实大苏打",
    },
  ],
});

Mock.mock("/async/data", "post", {
  status: 200,
  data: '正确结果'
});