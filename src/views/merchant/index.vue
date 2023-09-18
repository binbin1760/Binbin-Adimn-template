<template>
  <div class="merchant">
    <div class="button-list">
      <div class="merchant-button">
        <div>商家名称:</div>
        <n-input placeholder="请输入" :style="{ width: '200px' }"></n-input>
      </div>
      <div class="merchant-button">
        <div>审核状态:</div>
        <n-select
          v-model:value="status"
          :options="statusOptions"
          placeholder="请选择"
          :style="{ width: '189px' }"
        />
      </div>
      <div class="merchant-button">
        <div>联系电话:</div>
        <n-input placeholder="请选择" :style="{ width: '200px' }"></n-input>
      </div>
      <div class="button">
        <n-button color="#266FE8">查询</n-button>
        <n-button color="#E7E7E7" text-color="#191919">重置</n-button>
      </div>
    </div>
    <div class="data-table-box">
      <div class="data-table">
        <DataTable :columns="column" :data="data"></DataTable>
      </div>
      <div class="pagination-box">
        <div class="page-total">共 {{ total }} 项数据</div>
        <n-pagination
          v-model:page="pages"
          :page-count="pageCount"
          :on-update:page="getCurrentPage"
        >
        </n-pagination>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { DataTableColumns } from "naive-ui";
import { Merchant } from "./types";

//  select
const status = ref<string>();
const statusOptions = [
  {
    label: "待审核",
    value: "1",
  },
  {
    label: "已通过",
    value: "2",
  },
  {
    label: "未通过",
    value: "3",
  },
];
// 表格
const columnsCreate = (): DataTableColumns<Merchant> => [
  {
    type: "selection",
  },
  {
    title: "商家名称",
    key: "name",
    align: "center",
  },
  {
    title: "商家地址",
    key: "address",
    align: "center",
  },
  {
    title: "联系电话",
    key: "call",
    align: "center",
  },
  {
    title: "状态",
    key: "status",
    align: "center",
    render(row) {
      let textColor = null;
      let text: string | null = null;
      if (row.status === "1") {
        textColor = "#ED7B2F";
        text = "待审核";
      }
      if (row.status === "2") {
        textColor = "#00A870";
        text = "已通过";
      }
      if (row.status === "3") {
        textColor = "#E34D59 ";
        text = "未通过";
      }
      return h("div", { style: { color: textColor } }, { default: () => text });
    },
  },
  {
    title: "操作",
    key: "",
    align: "center",
    render(row) {
      let text: string | null = null;
      let color: string | null = null;
      if (row.status !== "1") {
        text = "已审核";
        color = "#266FE8";
      } else {
        text = "审核";
        color = "#999999";
      }
      const list = [
        h(
          "div",
          {
            style: {
              color: color,
              marginRight: "1rem",
              width: "4.8rem",
              display: "inline-block",
              cursor: "pointer",
            },
          },
          { default: () => text }
        ),
        h(
          "span",
          { style: { color: "#266FE8", cursor: "pointer" } },
          { default: () => "查看详情" }
        ),
      ];
      return list;
    },
  },
];
const data = ref<Array<Partial<Merchant>>>([
  {
    key: 0,
    name: "廖顺彬的猫猫店",
    address: "西部智谷A区",
    call: "1234567890",
    status: "1",
  },
  {
    key: 1,
    name: "廖顺彬的猫猫店",
    address: "西部智谷A区",
    call: "1234567890",
    status: "2",
  },
  {
    key: 2,
    name: "廖顺彬的猫猫店",
    address: "西部智谷A区",
    call: "1234567890",
    status: "3",
  },
]);
const column = columnsCreate();
// 分页
const pages = ref<number>(1);
const pageCount = ref<number>();
const total = ref<number>(3);
function getCurrentPage(page: number) {
  pages.value = page;
}
</script>
<style scoped lang="less">
.merchant {
  height: 100%;
  background: #ffffff;
  border-radius: 2.4rem 2.4rem 0 2.4rem;
  display: flex;
  flex-direction: column;
  .button-list {
    padding-top: 3.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10.5rem;
    flex-wrap: wrap;
    .merchant-button {
      display: flex;
      align-items: center;
      white-space: nowrap;
      gap: 0.8rem;
    }
    .button {
      display: flex;
      align-items: center;
      gap: 4rem;
      font-family: PingFangSC-Medium;
      font-size: 14px;
    }
  }
  .data-table-box {
    width: 100%;
    margin-top: 7rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .pagination-box {
      height: 6.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 8.1rem;
      .page-total {
        flex: 1;
        text-align: center;
      }
    }
  }
}
</style>
