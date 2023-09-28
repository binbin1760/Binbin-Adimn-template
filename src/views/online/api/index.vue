<template>
  <div class="logs-list">
    <div class="list-operate">
      <div class="input-list">
        <n-input
          class="n-input"
          v-model:value="filter"
          type="text"
          placeholder="输入你要搜索的内容"
        />
        <DatePickerRange></DatePickerRange>
        <NButton class="n-button" size="small" color="#1FC853">搜索</NButton>
        <NButton class="n-button" size="small" color="#FEAD09">重置</NButton>
      </div>
      <div class="button-list">
        <NButton
          class="n-button"
          size="small"
          color="#FB2F39"
          @click="clearData"
          >清空</NButton
        >
        <NButton
          class="n-button"
          size="small"
          color="#FD9093"
          @click="deleteCheckValue"
          >删除</NButton
        >
      </div>
    </div>
    <div class="data-table">
      <DataTable
        :data="data"
        :columns="columns"
        @get-row-key="getRowKeyArray"
      />
    </div>
    <div class="pageination">
      <div class="page-total">{{ total }}条</div>
      <n-pagination
        v-model:page="pages"
        :page-count="pageCount"
        show-size-picker
        show-quick-jumper
        :page-sizes="pageSizes"
        :on-update:page="getCurrentPage"
      >
        <template #goto> 前往 </template>
      </n-pagination>
    </div>
    <n-modal v-model:show="showModal" transform-origin="center">
      <n-card
        style="width: 600px"
        title="详情"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        {{ modalData?.detail }}
      </n-card>
    </n-modal>
  </div>
</template>
<script setup lang="ts">
import { DataTableColumns, NTag } from "naive-ui";
import { DatePickerRange } from "@/components";
import { rowType } from "./types";
import { log } from "@/api";
import { SysLogPageRequest, PagerRequest, DeleteBatchRequest } from "@/protoJs";
import { format } from "date-fns";
async function getLogData(page: number) {
  const pageRequest = new PagerRequest({ pageNumber: page, pageSize: 10 });
  const req = new SysLogPageRequest({ page: pageRequest });
  const result = await log.log(req);
  total.value = result.toObject().page?.total;
  pageCount.value = Math.ceil((result.toObject().page?.total as number) / 10);
  data.value = result.toObject().raws?.map((item, index) => {
    return {
      key: index,
      errType: item.type,
      id: item.id,
      username: item.username,
      url: item.uri,
      httpMethod: item.httpMethod,
      classMethod: item.classMethod,
      className: item.className,
      detail: item.detail,
      args: item.args,
      ip: item.ip,
      address: item.address,
      duration: item.duration,
      occurAt: format(Number(item.occurAt), "yyyy-MM-dd HH:mm:ss"),
      description: item.description,
    };
  });
}

const pages = ref<number>(0);
const pageSizes = [
  {
    label: "10 每页",
    value: 10,
  },
  {
    label: "20 每页",
    value: 20,
  },
  {
    label: "30 每页",
    value: 30,
  },
  {
    label: "40 每页",
    value: 40,
  },
];
const total = ref<number>();
const pageCount = ref<number>();
const filter = ref("");
const checkList = ref();
const showModal = ref<boolean>(false);
const modalData = ref<rowType>();
let data = ref<Array<Partial<rowType>>>();
const columnsCreate = (): DataTableColumns<rowType> => [
  {
    type: "selection",
  },
  {
    type: "expand",
    renderExpand: (row) => {
      return `${row.args} ${row.httpMethod}`;
    },
  },
  { title: "id", key: "id", align: "center" },
  {
    title: "类型",
    key: "type",
    align: "center",
    render(row) {
      let color = "";
      let bgcolor = "";
      let borderColor = "";
      let text = "";
      if (row.errType === 1) {
        color = "#409EFF";
        bgcolor = "#ECF5FF";
        borderColor = "#DAECFF";
        text = "DEBUG";
      }
      if (row.errType === 2) {
        color = "#68C23A";
        bgcolor = "#F0F9EB";
        borderColor = "#E1F3D8";
        text = "INFO";
      }
      if (row.errType === 3) {
        color = "#919399";
        bgcolor = "#F4F4F5";
        borderColor = "#E9E9EB";
        text = "WARN";
      }
      if (row.errType === 4) {
        color = "#E6A23C";
        bgcolor = "#FDF6EC";
        borderColor = "#FBECD8";
        text = "ERROR";
      }
      if (row.errType === 5) {
        color = "#F56C6C";
        bgcolor = "#FFEFF0";
        borderColor = "#FEE2E1";
        text = "DANGER";
      }
      return h(
        NTag,
        {
          color: { textColor: color, color: bgcolor, borderColor },
        },
        { default: () => `${text}` }
      );
    },
  },
  { title: "用户", key: "username", align: "center" },
  { title: "路径", key: "url", align: "center" },
  { title: "请求方法", key: "httpMethod", align: "center" },
  { title: "执行的类名", key: "className", align: "center" },
  { title: "执行的方法", key: "classMethod", align: "center" },
  { title: "参数", key: "args", align: "center" },
  { title: "请求IP", key: "ip", align: "center" },
  { title: "请求地址", key: "address", align: "center" },
  { title: "请求耗时(ms)", key: "duration", align: "center" },
  { title: "产生时间", key: "occurAt", align: "center" },
  { title: "描述", key: "description", align: "center" },
  {
    title: "详情",
    key: "detail",
    render(row) {
      return h(
        "div",
        {
          style: { color: "#165DFF", cursor: "pointer" },
          onClick: () => {
            modalData.value = row;
            showModal.value = !showModal.value;
          },
        },
        { default: () => "查看详情" }
      );
    },
    align: "center",
  },
];

const columns = columnsCreate();
function getRowKeyArray(e: any) {
  checkList.value = e;
}
async function clearData() {
  log.clearLogs();
  data.value = undefined;
}
async function deleteCheckValue() {
  const ids = checkList.value.map((item: number) => {
    data.value = data.value ? data.value : [];
    data.value.splice(item, 0);
    return data.value[item].id;
  });
  const deleteRequest = new DeleteBatchRequest(ids);
  const result = await log.deleteLogs(deleteRequest);
  console.log(result.toObject());
}
function getCurrentPage(page: number) {
  pages.value = page;
  getLogData(page - 1);
}
getLogData(pages.value);
</script>
<style scoped lang="less">
.logs-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .pageination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding-bottom: 5rem;
  }
  .list-operate {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    .input-list {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      .n-input {
        width: 19rem;
        height: 2.8rem;
        font-size: 12px;
      }
      .n-button {
        width: 7rem;
      }
    }
    .button-list {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      margin-bottom: 1rem;
    }
  }
  .data-table {
    flex: 1;
  }
}
</style>
