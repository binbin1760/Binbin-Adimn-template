<template>
  <div class="report-complaints">
    <div class="header">
      <div class="header-item">
        <div>举报来源：</div>
        <n-select
          v-model:value="channel"
          :options="channels"
          placeholder="请选择举报来源"
          :style="{ width: '189px' }"
        ></n-select>
      </div>
      <div class="header-item">
        <div>举报类型：</div>
        <n-select
          v-model:value="reportType"
          :options="reportTypes"
          placeholder="请选择举报类型"
          :style="{ width: '189px' }"
        ></n-select>
      </div>
      <div class="header-item">
        <div>提交时间：</div>
        <DatePickerRange></DatePickerRange>
      </div>
    </div>
    <div class="header1">
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
      <DataTable :columns="column" :data="data"></DataTable>
      <div class="pagination-box">
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
import { ReportComplaints } from "./types";
import { useRouter } from "vue-router";
const Router = useRouter();
const channel = ref<string>();
const channels = [
  { label: "笔记/视频", value: "笔记/视频" },
  { label: "用户主页", value: "用户主页" },
  { label: "消息聊天", value: "消息聊天" },
];

const reportType = ref<string>();
const reportTypes = [
  { label: "侮辱谩骂", value: "侮辱谩骂" },
  { label: "违法犯罪", value: "违法犯罪" },
  { label: "涉嫌欺诈", value: "涉嫌欺诈" },
];

// 表格+分页
const columnsCreate = (): DataTableColumns<ReportComplaints> => [
  {
    title: "举报来源",
    key: "channel",
    align: "center",
  },
  {
    title: "被举报人",
    key: "user",
    align: "center",
  },
  {
    title: "举报类型",
    key: "type",
    align: "center",
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
    title: "提交时间",
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
const data = ref<Array<Partial<ReportComplaints>>>([
  {
    key: 1,
    channel: "笔记/视频",
    user: "龟龟",
    type: "侮辱谩骂",
    detail: "测试数据也要标准",
    name: "阿斌",
    time: "2023-09-13 23:12:12",
  },
  {
    key: 2,
    channel: "用户主页",
    user: "龟龟",
    type: "违法犯罪",
    detail: "测试数据也要标准",
    name: "阿斌",
    time: "2023-09-13 23:12:12",
  },
  {
    key: 3,
    channel: "消息聊天",
    user: "龟龟",
    type: "涉嫌欺诈",
    detail: "测试数据也要标准",
    name: "阿斌",
    time: "2023-09-13 23:12:12",
  },
]);
const pages = ref<number>(0);
const pageCount = ref<number>();
function getCurrentPage(page: number) {
  pages.value = page;
}
function toDetailPage() {
  Router.push("/other-service/reportComplaints/detail");
}
</script>
<style scoped lang="less">
.report-complaints {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #ffffff;
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
    justify-content: end;
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
      justify-content: center;
      padding-right: 8.1rem;
      .page-total {
        flex: 1;
        text-align: center;
      }
    }
  }
}
</style>
