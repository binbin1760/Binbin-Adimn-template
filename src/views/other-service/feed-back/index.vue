<template>
  <div class="feed-back">
    <div class="header">
      <div class="header-item">
        <div>反馈平台：</div>
        <n-select
          v-model:value="feedplatform"
          :options="feedplatforms"
          placeholder="请选择反馈类型"
          :style="{ width: '189px' }"
        ></n-select>
      </div>
      <div class="header-item">
        <div>反馈渠道：</div>
        <n-select
          v-model:value="channel"
          :options="channels"
          placeholder="请选择反馈类型"
          :style="{ width: '189px' }"
        ></n-select>
      </div>
      <div class="header-item">
        <div>反馈类型：</div>
        <n-select
          v-model:value="feedBackType"
          :options="feedBackTypes"
          placeholder="请选择反馈类型"
          :style="{ width: '189px' }"
        ></n-select>
      </div>
    </div>
    <div class="header1">
      <div class="header-item">
        <div>反馈时间：</div>
        <DatePickerRange></DatePickerRange>
      </div>
      <div class="bottons">
        <n-button :style="{ height: '32px', width: '8.8rem' }" color="#266FE8"
          >查询</n-button
        >
        <n-button
          :style="{ height: '32px', width: '8.8rem' }"
          color="#E7E7E7"
          text-color="#191919"
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
import { DataTableColumns } from "naive-ui";
import { FeedBack } from "./types";
import { useRouter } from "vue-router";
const Router = useRouter();
const feedBackType = ref<number>();
const feedBackTypes = [
  { label: "功能异常", value: 1 },
  { label: "产品优化", value: 2 },
];

const feedplatform = ref<number>();
const feedplatforms = [
  { label: "IOS", value: 1 },
  { label: "安卓", value: 2 },
];

const channel = ref<string>();
const channels = [
  { label: "渠道1", value: "渠道1" },
  { label: "渠道2", value: "渠道2" },
  { label: "渠道3", value: "渠道3" },
  { label: "渠道4", value: "渠道4" },
];
// 表格+分页
const columnsCreate = (): DataTableColumns<FeedBack> => [
  {
    title: "平台",
    key: "platform",
    align: "center",
    render(row) {
      if (row.platform === 1) {
        return h("span", {}, { default: () => "IOS" });
      }
      if (row.platform === 2) {
        return h("span", {}, { default: () => "安卓" });
      }
    },
  },
  {
    title: "渠道",
    key: "channel",
    align: "center",
  },
  {
    title: "反馈类型",
    key: "feedBackType",
    align: "center",
    render(row) {
      if (row.type === 1) {
        return h("span", {}, { default: () => "功能异常" });
      }
      if (row.type === 2) {
        return h("span", {}, { default: () => "产品优化" });
      }
    },
  },
  {
    title: "详情",
    key: "detail",
    align: "left",
    titleAlign: "center",
    minWidth: "200px",
    ellipsis: true,
  },
  {
    title: "用户名",
    key: "name",
    align: "center",
  },
  {
    title: "联系方式",
    key: "name",
    align: "center",
  },
  {
    title: "反馈时间",
    key: "time",
    align: "center",
  },
  {
    title: "操作",
    key: "",
    align: "center",
    render() {
      return h(
        "span",
        {
          onClick: () => toDetailPage(),
          style: { color: "#266FE8", cursor: "pointer" },
        },
        { default: () => "查看详情" }
      );
    },
  },
];
const column = columnsCreate();
const data = ref<Array<Partial<FeedBack>>>([
  {
    key: 1,
    platform: 1,
    channel: "渠道1",
    type: 1,
    detail: "随俗四速啊实打实的",
    name: "阿斌",
    call: "17608288462",
    time: "2023-09-13 23:12:12",
  },
  {
    key: 2,
    platform: 2,
    channel: "渠道2",
    type: 2,
    detail: "随俗四速啊实打实的",
    name: "阿斌",
    call: "17608288462",
    time: "2023-09-13 23:12:12",
  },
  {
    key: 2,
    platform: 2,
    channel: "渠道3",
    type: 2,
    detail: "随俗四速啊asdasdasdasdasdasdasdasd实打实的",
    name: "阿斌",
    call: "17608288462",
    time: "2023-09-13 23:12:12",
  },
]);
const pages = ref<number>(0);
const pageCount = ref<number>();
const total = ref<number>(10);
function getCurrentPage(page: number) {
  pages.value = page;
}
function toDetailPage() {
  Router.push("/other-service/feedback/detail");
}
</script>
<style scoped lang="less">
.feed-back {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #ffffff;
  border-radius: 2.4rem 2.4rem 0 2.4rem;
  .header {
    padding: 0 1.6rem;
    margin-top: 3.7rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5rem;
    flex-wrap: wrap;
    .header-item {
      display: flex;
      align-items: center;
    }
  }
  .header1 {
    padding: 0 1.6rem;
    margin-top: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5rem;
    flex-wrap: wrap;
    .header-item {
      display: flex;
      align-items: center;
    }
    .bottons {
      display: flex;
      align-items: center;
      gap: 4rem;
      font-family: PingFangSC-Medium;
      font-size: 14px;
    }
  }
  .data-table-box {
    margin-top: 3rem;
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
