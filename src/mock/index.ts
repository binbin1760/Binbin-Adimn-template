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
// 测试动态Draw组件
// keyVal: string,
// label: string,
// vnodeName: 'divider' | 'imgBox' | 'labelKey' | 'title',
// weight: '400' | '500',
// textcolor?:string
Mock.mock("/draw/data", "get", {
  status: 200,
  data: [
    {
      keyVal: "title",
      label: "测试title",
      vnodeName: "title",
      weight: "400",
      data: "测试lableKey",
    },
    {
      keyVal: "name",
      label: "测试数据：",
      vnodeName: "labelKey",
      weight: "400",
      textcolor: "red",
      data: "测试lableKey",
    },
  ],
});
