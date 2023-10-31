<template>
  <div class="base-table">
    <div class="table">
      <DataTable :columns="columns" :data="Data"></DataTable>
    </div>
    <div class="pagiNation">
      <NPagination
        v-model:page="page"
        :page-count="pageCount"
        @update-page="pageUpdate"
      ></NPagination>
    </div>
  </div>
</template>
<script setup lang="ts">
import { DataTableColumns } from "naive-ui";
import { getData } from "@/api";
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
  {
    title: "邮箱",
    key: "email",
    align: "left",
    maxWidth: 200,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: "排序",
    key: "sort",
    align: "center",
    sorter(row1, row2) {
      return row1.sort - row2.sort;
    },
  },
  {
    title: "地址",
    key: "address",
    align: "left",
    maxWidth: 300,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: "费用",
    key: "money",
    align: "center",
    sorter(row1, row2) {
      return row1.sort - row2.sort;
    },
    render: (row) => {
      return h("span", {}, { default: () => `${row.money} 刀` });
    },
  },
];
const columns = ref(columnsCreate());
const Data = ref<Array<Partial<testData>>>();
const page = ref<number>(1);
const pageCount = ref<number>();
async function getTableData() {
  const res = await getData();
  const result = JSON.parse(res as unknown as string);
  Data.value = result.data?.map((item, index) => {
    return { key: index + 1, ...item };
  });
  pageCount.value = result.pageCount;
}
function pageUpdate() {
  getTableData();
}
getTableData();
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
  .pagiNation {
    display: flex;
    justify-content: center;
    padding: 1rem 0;
  }
}
</style>
