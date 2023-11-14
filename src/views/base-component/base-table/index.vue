<template>
  <div class="base-table">
    <n-card title="组件需求说明">
      <n-checkbox size="small" v-model:checked="checked" label="1.开启序号" />
      <n-checkbox size="small" v-model:checked="checked" label="2.斑马纹开关，斑马纹颜色动态调整" />
      <n-checkbox size="small" v-model:checked="checked" label="3.分割线开关" />
      <n-checkbox size="small" v-model:checked="checked" label="4.排序" />
      <n-checkbox size="small" v-model:checked="checked" label="5.点击Icon复制" />
      <n-checkbox size="small" label="6.可编辑，编辑后自动提交" />
    </n-card>
    <div class="table">
      <DataTable ref="tableRef" :columns="columns" :data="Data"></DataTable>
    </div>
    <div class="pagiNation">
      <NPagination v-model:page="page" :page-count="pageCount" @update-page="pageUpdate"></NPagination>
    </div>
  </div>
</template>
<script setup lang="ts">
import { DataTableColumns, useMessage } from "naive-ui";
import { getData } from "@/api";
import { ShowOrEdit } from "@/components"
import { CopyOutline } from "@vicons/ionicons5"
import { dbclickCopy } from "@/components"
const message = useMessage()
const tableRef = ref<any>()

interface testData {
  key: number;
  name: string;
  email: string;
  sort: number;
  address: string;
  money: string;
}
const columnsCreate = (): DataTableColumns<testData> => [
  {
    title: "昵称", key: "name", align: "center", render(row, index) {
      return h(ShowOrEdit, {
        value: row.name, onUpdateValue: (v) => {
          row.name = v
          message.success(`目前正在编辑第${index}行！`)
        }
      })
    }
  },
  {
    title: "邮箱",
    key: "email",
    align: "left",
    maxWidth: 200,
    ellipsis: {
      tooltip: true,
    },
    render(row) {
      const prop = { style: { cursor: 'pointer', marginTop: '2px' }, onClick: () => dbclickCopy(row.email, () => { message.success("复制成功") }, () => { message.error("复制成功") }) }
      const copy = h(NIcon, prop, { default: () => h(CopyOutline) })
      return h('div', { style: { display: 'flex', alignItems: 'center', gap: '0.8rem' } }, [row.email, copy])
    }
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
    render(row, index) {
      return h(ShowOrEdit, {
        value: row.address, onUpdateValue: (v) => {
          row.address = v
          message.success(`目前正在编辑第${index}行！`)
        }
      })
    }
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
  {
    title: '操作',
    key: '',
    align: 'left',
    render: () => {
      return h("span", { style: { cursor: 'pointer', color: 'blue' } }, { default: () => '编辑' })
    }
  }
];
const columns = ref(columnsCreate());
const Data = ref<Array<Partial<testData>>>();
const page = ref<number>(1);
const pageCount = ref<number>();
const checked = ref<boolean>(true)
async function getTableData() {
  const res = await getData();
  const result = JSON.parse(res as unknown as string);
  Data.value = result.data?.map((item, index) => {
    return { key: index + 1, ...item };
  });
  pageCount.value = result.pageCount;
}
// 表格数据处理
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
  gap: 1.6rem;

  .checkBox {
    display: flex;
    flex-direction: column;
  }

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
