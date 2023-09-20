<template>
  <div class="package">
    <div class="package-header">
      <div class="package-button">
        <div>商家名称:</div>
        <n-input
          v-model:value="name"
          placeholder="请输入"
          :style="{ width: '200px' }"
        ></n-input>
      </div>
      <div class="package-button">
        <div>审核状态:</div>
        <n-select
          v-model:value="status"
          :options="statusOptions"
          placeholder="请选择"
          :style="{ width: '189px' }"
        />
      </div>
      <div class="package-button">
        <div>联系电话:</div>
        <n-input
          v-model:value="phone"
          placeholder="请选择"
          :style="{ width: '200px' }"
        ></n-input>
      </div>
      <div class="package-button">
        <div>团购类型:</div>
        <n-select
          v-model:value="goodsType"
          :options="goodsOptions"
          placeholder="请选择"
          :style="{ width: '189px' }"
        />
      </div>
    </div>
    <div class="button-box">
      <div class="button">
        <n-button color="#266FE8" :style="{ height: '32px', width: '8.8rem' }"
          >查询</n-button
        >
        <n-button
          color="#E7E7E7"
          text-color="#191919"
          :style="{ height: '32px', width: '8.8rem' }"
          >重置</n-button
        >
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
import { h, ref } from "vue";
import { DataTableColumns } from "naive-ui";
import type { PackageType } from "./types";
const Router = useRouter();
// select
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
const goodsOptions = [
  { label: "洗澡", value: "1" },
  { label: "美容", value: "2" },
  { label: "寄养", value: "3" },
];
const name = ref<string>();
const status = ref<string>();
const phone = ref<string>();
const goodsType = ref<string>();
// data table
const columnsCreate = (): DataTableColumns<PackageType> => [
  {
    title: "团购套餐名称",
    key: "packageName",
    align: "center",
  },
  {
    title: "商家名称",
    key: "name",
    align: "center",
  },
  {
    title: "团购分类",
    key: "packageType",
    align: "center",
  },
  {
    title: "状态",
    key: "status",
    align: "center",
    render(row) {
      let textColor: string | null = null;
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
        color = "#999999";
      } else {
        text = "审核";
        color = "#266FE8";
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
          {
            onClick: () => todetailPage(),
            style: { color: "#266FE8", cursor: "pointer" },
          },
          { default: () => "查看详情" }
        ),
      ];
      return list;
    },
  },
];
const column = columnsCreate();
const data = ref<Array<Partial<PackageType>>>([
  {
    key: 0,
    packageName: "猫咪洗护套餐",
    name: "binbin",
    packageType: "洗澡",
    status: "1",
  },
  {
    key: 1,
    packageName: "猫咪洗护套餐",
    name: "binbin",
    packageType: "洗澡",
    status: "2",
  },
  {
    key: 2,
    packageName: "猫咪洗护套餐",
    name: "binbin",
    packageType: "洗澡",
    status: "3",
  },
]);
function todetailPage() {
  Router.push("/merchant-service/package-detial");
}
// 分页
const pages = ref<number>(1);
const pageCount = ref<number>();
const total = ref<number>(3);
function getCurrentPage(page: number) {
  pages.value = page;
}
</script>
<style scoped lang="less">
.package {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  gap: 2rem;
  border-radius: 2.4rem 2.4rem 0 2.4rem;
  height: 100%;
  .package-header {
    padding-top: 3.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10.4rem;
    flex-wrap: wrap;
    .package-button {
      display: flex;
      align-items: center;
      white-space: nowrap;
      gap: 0.8rem;
    }
  }
  .button-box {
    display: flex;
    align-items: center;
    justify-content: end;
    .button {
      display: flex;
      align-items: center;
      gap: 4rem;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      margin-right: 0.8rem;
    }
  }
  .data-table-box {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
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
