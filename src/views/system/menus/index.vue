<template>
  <div class="menus">
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
      <n-button size="large" color="#19BE6B">搜索</n-button>
      <n-button size="large" color="#FF9B52">重置</n-button>
    </div>
    <div class="operate-list">
      <n-button size="large" color="#409EFF">新增</n-button>
      <n-button size="large" color="#F56D6D">删除</n-button>
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
import { DataTableColumns } from "naive-ui";
import { Operate } from "../components";
import { MenusType } from "./types";
// 表单
function getFiled(value: boolean) {
  if (value) {
    const color = {
      color: "#E7FAFO",
      textColor: "#13CE66",
      borderColor: "#D0F5E0",
    };
    return { color, value: "是" };
  } else {
    const color = {
      color: "#FFF8E6",
      textColor: "#FFBA00",
      borderColor: "#FFF1CC",
    };
    return { color, value: "否" };
  }
}
const columnsCreate = (): DataTableColumns<MenusType> => [
  {
    type: "selection",
  },
  { title: "菜单标题", key: "menuTitle", align: "center" },
  { title: "菜单图标", key: "icon", align: "center" },
  { title: "排序", key: "order", align: "center" },
  { title: "权限表示", key: "mark", align: "center" },
  { title: "组件路径", key: "url", align: "center" },
  {
    title: "外链",
    key: "outSide",
    align: "center",
    render(row) {
      const tag = getFiled(row.outSide);
      return h("span", {}, { default: () => tag?.value });
    },
  },
  {
    title: "缓存",
    key: "isbuffer",
    align: "center",
    render(row) {
      const tag = getFiled(row.isbuffer);
      return h(NTag, { color: tag?.color }, { default: () => tag?.value });
    },
  },
  {
    title: "可见",
    key: "isshow",
    align: "center",
    render(row) {
      const tag = getFiled(row.isshow);
      return h(NTag, { color: tag?.color }, { default: () => tag?.value });
    },
  },
  {
    title: "操作",
    key: "operate",
    align: "center",
    render() {
      return h(Operate, {});
    },
  },
];
const columns = columnsCreate();
const data = ref<Array<Partial<MenusType>>>([
  {
    key: 0,
    menuTitle: "系统管理",
    icon: "管理",
    order: 1,
    mark: "01020",
    url: "/xxx/xxx/xx",
    outSide: false,
    isbuffer: true,
    isshow: false,
  },
  {
    key: 1,
    menuTitle: "系统工具",
    icon: "工具",
    order: 2,
    mark: "01020",
    url: "/xxx/xxx/xx",
    outSide: false,
    isbuffer: true,
    isshow: false,
  },
  {
    key: 2,
    menuTitle: "系统监控",
    icon: "健康",
    order: 3,
    mark: "01020",
    url: "/xxx/xxx/xx",
    outSide: false,
    isbuffer: true,
    isshow: false,
  },
]);
// 分页
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
function getCurrentPage(page: number) {
  pages.value = page;
}
</script>
<style scoped lang="less">
.menus {
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
