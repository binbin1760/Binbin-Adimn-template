<template>
  <div class="info">
    <MerchantHeader :options="statusOptions"></MerchantHeader>
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
import { MerchantHeader } from "../components";
import { MerchantInfo } from "./types";
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
// 表格
const columnsCreate = (): DataTableColumns<MerchantInfo> => [
  {
    title: "商家名称",
    key: "name",
    align: "center",
  },
  {
    title: "修改类型",
    key: "fixType",
    align: "center",
    render(row) {
      const list = row.fixType.map((item) => {
        return h(
          "span",
          { bordered: false, color: { color: "white" } },
          { default: () => item }
        );
      });
      return h(
        "span",
        { style: { display: "flex", gap: "27px", justifyContent: "center" } },
        { default: () => list }
      );
    },
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
            onClick: () => toDetailPage(),
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
const data = [
  {
    key: 0,
    name: "彬彬",
    fixType: ["名称", "主图", "相册", "电话"],
    status: "1",
  },
  {
    key: 1,
    name: "彬彬",
    fixType: ["名称", "主图", "相册", "电话"],
    status: "2",
  },
  {
    key: 2,
    name: "彬彬",
    fixType: ["名称", "主图", "相册", "电话"],
    status: "3",
  },
];
function toDetailPage() {
  Router.push("/merchant-service/merchant-fixinfo-detial");
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
.info {
  height: 100%;
  background: #ffffff;
  border-radius: 2.4rem 2.4rem 0 2.4rem;
  display: flex;
  flex-direction: column;
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
