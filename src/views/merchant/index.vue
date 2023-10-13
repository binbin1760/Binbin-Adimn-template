<template>
  <div class="merchant">
    <MerchantHeader
      :options="statusOptions"
      @querydata="getQueryData"
      @re-set="getResetData"
    ></MerchantHeader>
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
import { MerchantHeader } from "./components";
import { merchant } from "@/api";
import {
  TableCmsMerchantFilterRequest,
  PagerRequest,
  ApprovalStat,
} from "@/protoJs";
import { format } from "date-fns";
const Router = useRouter();
//  select
type Options = {
  label: string;
  value: ApprovalStat;
};
const statusOptions: Array<Options> = [
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
// 表格 + 分页
const columnsCreate = (): DataTableColumns<Merchant> => [
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
    key: "phoneNumber",
    align: "center",
    render(row) {
      const list = row.phoneNumber.map((item, index) => {
        return h("div", {}, { default: () => `联系电话${index + 1}：${item}` });
      });
      return list;
    },
  },
  {
    title: "申请时间",
    key: "updateAt",
    align: "center",
    render(row) {
      const time = format(parseInt(row.updateAt), "yyyy-MM-dd HH:mm:ss");
      return h("span", {}, { default: () => time });
    },
  },
  {
    title: "状态",
    key: "status",
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
    title: "操作",
    key: "",
    align: "center",
    render(row) {
      let htemp: any;
      if (
        row.stat !== ApprovalStat._ApprovalStat_PENDING_APPROVAL &&
        row.stat !== ApprovalStat._ApprovalStat_PENDING_EDIT_APPROVAL
      ) {
        htemp = h(
          "div",
          {
            style: {
              color: "#999999",
              marginRight: "1rem",
              width: "4.8rem",
              display: "inline-block",
              cursor: "pointer",
            },
          },
          { default: () => "已审核" }
        );
      } else {
        htemp = h(
          "div",
          {
            onClick: () => toDetailPage(row.key, true),
            style: {
              color: "#266FE8",
              marginRight: "1rem",
              width: "4.8rem",
              display: "inline-block",
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
            onClick: () => toDetailPage(row.key, false),
            style: { color: "#266FE8", cursor: "pointer" },
          },
          { default: () => "查看详情" }
        ),
      ];
      return list;
    },
  },
];
const data = ref<Array<Partial<Merchant>>>();
const pages = ref<number>(0);
const pageCount = ref<number>();
const total = ref<number | undefined>();
const column = columnsCreate();
function toDetailPage(id: string | number, isEdit: boolean) {
  const info = JSON.stringify({ id, isEdit });
  Router.push({
    path: "/merchant-service/merchant-info-detail",
    query: { info },
  });
}
async function getMerchantTable() {
  const page = new PagerRequest({ pageNumber: pages.value, pageSize: 5 });
  const req = new TableCmsMerchantFilterRequest({ page });
  const result = (await merchant.merchantList(req)).toObject();
  data.value = result.raws?.map((item) => {
    const address =
      (item.address?.country as unknown as string) + item.address?.street;
    return {
      key: item.id,
      name: item.name,
      address: address,
      updateAt: item.updateAt,
      phoneNumber: item.phoneNumber,
      stat: item.stat,
    };
  }) as unknown as Array<Partial<Merchant>>;
  total.value = result.page?.total;
  pageCount.value = Math.ceil((result.page?.total as unknown as number) / 5);
}
getMerchantTable();
function getCurrentPage(page: number) {
  pages.value = page;
}
//数据处理
function getQueryData(e: Array<Partial<Merchant>>) {
  data.value = e;
}
function getResetData() {
  getMerchantTable();
}
</script>
<style scoped lang="less">
.merchant {
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
