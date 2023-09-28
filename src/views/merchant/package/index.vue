<template>
  <div class="package">
    <div class="package-header">
      <div class="package-button">
        <div>条件搜索 :</div>
        <n-input
          v-model:value="name"
          placeholder="请输入商家名称或团购名称"
          :style="{ width: '250px' }"
        ></n-input>
      </div>
      <div class="package-button">
        <div>审核状态:</div>
        <n-select
          v-model:value="status"
          :options="statusOptions"
          placeholder="请选择"
          :style="{ width: '200px' }"
        />
      </div>
      <div class="package-button">
        <div>团购类型:</div>
        <n-select
          v-model:value="goodsType"
          :options="goodsOptions"
          multiple
          placeholder="请选择"
          :style="{ width: '250px' }"
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
import { merchant } from "@/api";
import {
  PagerRequest,
  TableCmsPurchasePackageFilterRequest,
  ApprovalStat,
  PurchasePackageCategory,
} from "@/protoJs";
import { format } from "date-fns";
const Router = useRouter();
// select
const statusOptions = [
  {
    label: "待审核",
    value: ApprovalStat._ApprovalStat_PENDING_APPROVAL,
  },
  {
    label: "已通过",
    value: ApprovalStat._ApprovalStat_APPROVED,
  },
  {
    label: "未通过",
    value: ApprovalStat._ApprovalStat_DISABLED,
  },
];
const goodsOptions = [
  {
    label: "洗澡",
    value: PurchasePackageCategory._PurchasePackageCategory_Bathing,
  },
  {
    label: "美容",
    value: PurchasePackageCategory._PurchasePackageCategory_Beauty,
  },
  {
    label: "寄养",
    value: PurchasePackageCategory._PurchasePackageCategory_Boarding,
  },
];
const name = ref<string>();
const status = ref<string>();
const goodsType = ref<Array<number>>([]);
// data table
const columnsCreate = (): DataTableColumns<PackageType> => [
  {
    title: "团购套餐名称",
    key: "name",
    align: "center",
  },
  {
    title: "商家名称",
    key: "merchant",
    align: "center",
  },
  {
    title: "团购分类",
    key: "categories",
    align: "center",
    render(row) {
      const hlist = row.categories.map((item) => {
        return h("span", {}, { default: () => item });
      });
      return h(
        "div",
        { style: { display: "flex", gap: "0.5rem", justifyContent: "center" } },
        { default: () => hlist }
      );
    },
  },
  {
    title: "状态",
    key: "stat",
    align: "center",
    render(row) {
      let textColor: string | null = null;
      let text: string | null = null;
      if (row.stat === ApprovalStat._ApprovalStat_PENDING_APPROVAL) {
        textColor = "#ED7B2F";
        text = "待审核";
      }
      if (row.stat === ApprovalStat._ApprovalStat_APPROVED) {
        textColor = "#00A870";
        text = "已通过";
      }
      if (row.stat === ApprovalStat._ApprovalStat_DISABLED) {
        textColor = "#E34D59 ";
        text = "未通过";
      }
      return h("div", { style: { color: textColor } }, { default: () => text });
    },
  },
  {
    title: "申请时间",
    key: "updateAt",
    align: "center",
    render(row) {
      const time = format(row.updateAt, "yyyy-MM-dd HH:mm:ss");
      return h("span", {}, { default: () => time });
    },
  },
  {
    title: "操作",
    key: "",
    align: "center",
    render(row) {
      let htemp;
      if (row.stat !== ApprovalStat._ApprovalStat_PENDING_APPROVAL) {
        htemp = h(
          "span",
          {
            style: {
              color: "#999999",
              marginRight: "1rem",
            },
          },
          { default: () => "已审核" }
        );
      } else {
        htemp = h(
          "span",
          {
            onClick: () => todetailPage(row.key),
            style: {
              color: "#266FE8",
              marginRight: "1rem",
              cursor: "pointer",
            },
          },
          { default: () => "审核" }
        );
      }
      const list = [
        htemp,
        h(
          "span",
          {
            onClick: () => todetailPage(row.key),
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
const data = ref<Array<Partial<PackageType>>>();
// 分页
const pages = ref<number>(0);
const pageCount = ref<number>();
const total = ref<number>();
async function getPacklist() {
  const page = new PagerRequest({ pageNumber: pages.value, pageSize: 20 });
  const req = new TableCmsPurchasePackageFilterRequest({ page });
  const result = await merchant.packageList(req);
  data.value = result.toObject().raws?.map((item) => {
    return { key: item.id, ...item };
  }) as unknown as Array<Partial<PackageType>>;
  total.value = result.toObject().page?.total;
  pageCount.value = Math.ceil((result.page?.total as unknown as number) / 20);
}

function todetailPage(id: string) {
  Router.push({ path: "/merchant-service/package-detial", query: { id } });
}

function getCurrentPage(page: number) {
  pages.value = page;
}
onBeforeMount(() => {
  getPacklist();
});
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
