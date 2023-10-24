<template>
  <div class="base-table">
    <div class="table">
      <DataTable :columns="columns" :data="Data"></DataTable>
    </div>
  </div>
</template>
<script setup lang="ts">
import { DataTableColumns } from "naive-ui";

interface testData {
  key: number;
  name: string;
  email: string;
  sort: number;
  address: string;
  money: string;
}
const columnsCreate = (): DataTableColumns<testData> => [
  { title: "昵称", key: "name", align: "center" },
  { title: "邮箱", key: "email", align: "center" },
  { title: "排序", key: "sort", align: "left" },
  { title: "地址", key: "address", align: "center" },
  { title: "费用", key: "money", align: "center" },
];
const columns = columnsCreate();
const Data = ref<Array<Partial<testData>>>([
  {
    key: 1,
    name: "a名称",
    email: "123456789@qq.com",
    sort: 1,
    address: "成都市武侯区金华镇陆坝村",
    money: "199",
  },
  {
    key: 2,
    name: "b名称",
    email: "123456789@qq.com",
    sort: 1,
    address: "成都市武侯区金华镇陆坝村",
    money: "299",
  },
  {
    key: 3,
    name: "c名称",
    email: "123456789@qq.com",
    sort: 1,
    address: "成都市武侯区金华镇陆坝村",
    money: "499",
  },
]);
</script>
<style scoped lang="less">
.base-table {
  height: 100%;
  border-radius: 0.8rem;
  background-color: white;
  padding: 1rem;
  box-sizing: border-box;
  font-size: 1.6rem;
  display: flex;
  flex-direction: column;
  .table {
    flex: 1;
  }
}
</style>
