<template>
  <div class="user">
    <div class="serch">
      <n-tooltip
        placement="bottom"
        trigger="click"
        :style="{ background: 'white', color: '#000000' }"
        :arrow-style="{ background: 'white' }"
      >
        <template #trigger>
          <NInput
            class="serch-input"
            placeholder="请输入用户名或者邮箱搜索"
            type="text"
          />
        </template>
        <span>输入历史</span>
      </n-tooltip>
      <TimePickerRange height="4rem" type="daterange" />
      <n-popselect
        :show-checkmark="false"
        v-model:value="popselectValue"
        :options="options"
      >
        <n-button color="#409EFF" size="large" :style="{ width: '12rem' }">{{
          popselectValue || "状态"
        }}</n-button>
      </n-popselect>
      <n-button size="large" color="#19BE6B">搜索</n-button>
      <n-button size="large" color="#FF9B52">重置</n-button>
    </div>
    <div class="operate-list">
      <n-button size="large" color="#409EFF">新增</n-button>
      <n-button size="large" color="#19BE6B">编辑</n-button>
      <n-button size="large" color="#F56D6D">删除</n-button>
      <n-button size="large" color="#FF9900">导出</n-button>
    </div>
    <div class="data-able">
      <DataTable :data="data" :columns="columns" />
    </div>
    <div class="pageination">
      <div class="page-total">
        共<span class="total-number"> {{ total }} </span>条
      </div>
      <n-pagination
        v-model:page="pages"
        :page-count="pageCount"
        show-size-picker
        show-quick-jumper
        :page-sizes="pageSizes"
        :on-update:page="getCurrentPage"
      >
        <template #goto>跳至</template>
      </n-pagination>
    </div>
  </div>
</template>
<script setup lang="ts">
import { userTable } from "@/views/system/user/types";
import { DataTableColumns, NSwitch } from "naive-ui";

const columnsCreate = (): DataTableColumns<userTable> => [
  {
    type: "selection",
  },
  { title: "用户名", key: "userName", align: "center" },
  { title: "昵称", key: "nickName", align: "center" },
  {
    title: "性别",
    key: "sex",
    align: "center",
    render(row) {
      let sexValue: string = "";
      let sexbgcolor: string = "";
      if (row.sex === 0) {
        sexValue = "女";
        sexbgcolor = "#FF2D55";
      }
      if (row.sex === 1) {
        sexValue = "男";
        sexbgcolor = "#409EFF";
      }
      return h(
        "span",
        {
          style: {
            background: sexbgcolor,
            padding: "4px 2.8rem",
            borderRadius: "6rem",
            color: "white",
            fontSize: "12px",
            cursor: "pointer",
          },
          onclick: () => {
            if (row.sex === 0) {
              row.sex = 1;
            } else {
              row.sex = 0;
            }
          },
        },
        { default: () => sexValue }
      );
    },
  },
  { title: "就职公司", key: "company", align: "center" },
  { title: "手机", key: "phone", align: "center" },
  { title: "邮箱", key: "email", align: "center" },
  {
    title: "状态",
    key: "nickName",
    align: "center",
    render(row) {
      return h(NSwitch, {
        defaultValue: row.status,
        builtinThemeOverrides: { railColorActive: "#409EFF" },
      });
    },
  },
  {
    title: "操作",
    key: "operate",
    align: "center",
  },
];
const columns = columnsCreate();
const data = ref<Array<Partial<userTable>>>([
  {
    key: 0,
    userName: "廖顺彬",
    nickName: "廖顺彬",
    company: "成都薪火无限科技有限公司",
    phone: "17608288136",
    email: "569279172@qq.com",
    status: true,
    sex: 0,
  },
  {
    key: 1,
    userName: "廖顺彬2",
    nickName: "廖顺彬",
    company: "成都薪火无限科技有限公司",
    phone: "17608288136",
    email: "569279172@qq.com",
    status: false,
    sex: 1,
  },
  {
    key: 3,
    userName: "廖顺彬3",
    nickName: "廖顺彬",
    company: "成都薪火无限科技有限公司",
    phone: "17608288136",
    email: "569279172@qq.com",
    status: true,
    sex: 0,
  },
]);
const pages = ref<number>(1);
const pageCount = ref<number>(10);
const total = ref<number>(10);
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

const popselectValue = ref<string>();
const options = [
  { label: "激活", value: "激活" },
  { label: "锁定", value: "锁定" },
];

function getCurrentPage(page: number) {
  pages.value = page;
}
</script>
<style scoped lang="less">
.user {
  height: 100%;
  display: flex;
  flex-direction: column;
  .serch {
    display: flex;
    gap: 1.3rem;
    align-items: center;
    margin-bottom: 1.2rem;
    .serch-input {
      width: 25rem;
      --n-height: 4rem !important;
      --n-border-hover: 1px solid #409eff !important;
      --n-border-focus: 1px solid #409eff !important;
      --n-box-shadow-focus: "none" !important;
    }
  }
  .operate-list {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  .data-able {
    border-top: 1px solid #efeff5;
  }
  .pageination {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-top: 2rem;
    color: #999999;
    .page-total {
      padding-right: 4.5rem;
      .total-number {
        margin: 0 5px;
      }
    }
  }
}
</style>
