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
      <n-button size="large" color="#409EFF" @click="addNewMenu()"
        >新增</n-button
      >
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

    <n-modal
      v-model:show="showModal"
      title="新增"
      class="custom-card"
      preset="card"
      :style="{ width: '600px' }"
      transform-origin="center"
    >
      <template #default>
        <div class="modal-form">
          <div class="menu-select">
            <span>菜单类型</span>
            <n-radio-group v-model:value="formType" name="left-size">
              <n-radio-button value="directory"> 目录 </n-radio-button>
              <n-radio-button value="menu"> 菜单 </n-radio-button>
              <n-radio-button value="button"> 按钮 </n-radio-button>
            </n-radio-group>
          </div>
          <menuForm v-if="formType === 'menu'"></menuForm>
          <directoryForm v-if="formType === 'directory'"></directoryForm>
        </div>
      </template>
    </n-modal>
  </div>
</template>
<script setup lang="ts">
import { DataTableColumns } from "naive-ui";
import { menuForm, directoryForm } from "../components";
import { MenusType } from "./types";
import { Menu } from "@/api";
import { MenuPageRequest, PagerRequest } from "@/protoJs";
const showModal = ref<boolean>(false);
// 表单
const formType = ref<string>("directory");
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
  {
    title: "类型",
    key: "type",
    align: "center",
    render(row) {
      let result: string | undefined;
      if (row.type === 1) {
        result = "目录";
      }

      if (row.type === 2) {
        result = "菜单";
      }
      if (row.type === 3) {
        result = "按钮";
      }
      return h("div", {}, { default: () => result });
    },
  },
  { title: "菜单标题", key: "title", align: "center" },
  { title: "菜单图标", key: "icon", align: "center" },
  { title: "排序", key: "sort", align: "center" },
  { title: "权限表示", key: "identity", align: "center" },
  { title: "组件", key: "componentName", align: "center" },
  {
    title: "外链",
    key: "isFrame",
    align: "center",
    render(row) {
      const tag = getFiled(row.isFrame);
      return h("span", {}, { default: () => tag?.value });
    },
  },
  {
    title: "缓存",
    key: "noCache",
    align: "center",
    render(row) {
      const tag = getFiled(row.noCache);
      return h(NTag, { color: tag?.color }, { default: () => tag?.value });
    },
  },
  {
    title: "可见",
    key: "hidden",
    align: "center",
    render(row) {
      const tag = getFiled(row.hidden);
      return h(NTag, { color: tag?.color }, { default: () => tag?.value });
    },
  },
  {
    title: "操作",
    key: "operate",
    align: "center",
    render() {
      const list = [
        h(
          NButton,
          { size: "small", color: "#1990FF", style: { marginRight: "0.8rem" } },
          { default: () => "编辑" }
        ),
        h(
          NButton,
          { size: "small", color: "#FF4A4A" },
          { default: () => "删除" }
        ),
      ];
      return list;
    },
  },
];
const columns = columnsCreate();
const data = ref<Array<Partial<MenusType>>>([
  {
    key: 0,
    title: "系统管理",
    type: 1,
    icon: "管理",
    componentName: "layout",
    sort: 1,
    identity: "01020",
    isFrame: false,
    noCache: true,
    hidden: false,
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
// 数据处理
function addNewMenu() {
  showModal.value = true;
}
async function getData() {
  const page = new PagerRequest({ pageNumber: 1, pageSize: 5 });
  const req = new MenuPageRequest({ page: page });
  const result = (await Menu.allMenu(req)).toObject();
  console.log(result);
  // data.value = result.raws?.map((item, index) => {
  //   item.key = index;
  // })
}
getData();
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

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  .menu-select {
    display: flex;
    gap: 1.1rem;
    margin-left: 2.5rem;
  }
}
</style>
