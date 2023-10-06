<template>
  <div class="menus">
    <div class="operate-list">
      <n-button size="large" color="#409EFF" @click="addNewMenu()"
        >新增</n-button
      >
      <n-button size="large" color="#F56D6D" @click="delMenu">删除</n-button>
    </div>
    <div class="data-able">
      <DataTable :data="data" :columns="columns" @get-row-key="getRowKeyData" />
    </div>
    <div class="pageination">
      <div class="page-total">
        共<span class="total-number"> {{ total }} </span>条
      </div>
      <n-pagination
        v-model:page="pages"
        :page-count="pageCount"
        :on-update:page="getCurrentPage"
      >
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
            </n-radio-group>
          </div>
          <menuForm
            v-if="formType === 'menu'"
            @close-modal="closeModal"
          ></menuForm>
          <directoryForm
            v-if="formType === 'directory'"
            @close-modal="closeModal"
          ></directoryForm>
        </div>
      </template>
    </n-modal>

    <n-modal
      v-model:show="dirModal"
      title="目录编辑"
      class="custom-card"
      preset="card"
      :style="{ width: '600px' }"
      transform-origin="center"
    >
      <editDir :id="(dirId as string)" @close-modal="closeDirModal"></editDir>
    </n-modal>
  </div>
</template>
<script setup lang="ts">
import { DataTableColumns } from "naive-ui";
import { menuForm, directoryForm, editDir } from "../components";
import { MenusType } from "./types";
import { Menu } from "@/api";
import {
  MenuPageRequest,
  PagerRequest,
  DeleteBatchRequest,
  MenuType,
} from "@/protoJs";

const showModal = ref<boolean>(false);
const dirModal = ref<boolean>(false);
let dirId = ref<string>();

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
    type: "expand",
    renderExpand: (row) => {
      console.log(row.child);
      const list = row.child.map((item) => {
        return h(
          NTag,
          {
            onClick: () => editRowChild(item.value),
            style: { marginRight: "1.6rem" },
          },
          { default: () => item.label }
        );
      });
      return list;
    },
  },
  {
    title: "类型",
    key: "type",
    align: "center",
    render(row) {
      let result: string | undefined;
      if (row.type === MenuType.DIR) {
        result = "目录";
      }

      if (row.type === MenuType.MENU) {
        result = "菜单";
      }
      if (row.type === MenuType.BUTTON) {
        result = "按钮";
      }
      return h("div", {}, { default: () => result });
    },
  },
  { title: "菜单标题", key: "title", align: "center" },
  { title: "菜单图标", key: "icon", align: "center" },
  { title: "排序", key: "sort", align: "center" },
  { title: "权限标识", key: "key", align: "center" },
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
    render(row) {
      const list = [
        h(
          NButton,
          {
            onClick: () => editMenuItem(row),
            size: "small",
            color: "#1990FF",
            style: { marginRight: "0.8rem" },
          },
          { default: () => "编辑" }
        ),
        h(
          NButton,
          {
            onClick: () => delMenuItem(row.key),
            size: "small",
            color: "#FF4A4A",
          },
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
    key: "12313",
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
const ids = ref([]);
// 分页
const pages = ref<number>(1);
const pageCount = ref<number>(1);
const total = ref<number | undefined>(0);

function getCurrentPage(page: number) {
  pages.value = page;
}
// 数据处理
function closeModal() {
  showModal.value = false;
  getData();
}
function closeDirModal() {
  dirModal.value = false;
  getData();
}
function addNewMenu() {
  showModal.value = true;
}

function query(id: string) {
  return new Promise((resolve) => {
    let a: any;
    const page = new PagerRequest({ pageNumber: 0, pageSize: 20 });
    const req = new MenuPageRequest({ page: page, parentId: id });
    Menu.allMenu(req).then((res) => {
      a = res.toObject().raws?.map((item) => {
        return { label: item.label, value: item.id };
      });
      resolve(a);
    });
  });
}

async function getData() {
  const page = new PagerRequest({ pageNumber: 0, pageSize: 20 });
  const req = new MenuPageRequest({ page: page });
  const result = (await Menu.allMenu(req)).toObject();
  data.value = result.raws?.map((item) => {
    return {
      key: item.id,
      title: item.meta?.title,
      type: item.type,
      icon: item.meta?.icon,
      componentName: item.componentName,
      sort: item.sort,
      identity: item.identity,
      isFrame: item.isFrame,
      noCache: item.meta?.noCache,
      hidden: item.meta?.hidden,
      child: item.children,
    };
  }) as unknown as Array<Partial<MenusType>>;
  for (let i = 0; i < data.value?.length; i++) {
    if (data.value[i].child?.length) {
      query(data.value[i].key as string).then((res) => {
        data.value[i].child = res as unknown as Array<{
          label: string;
          value: string;
        }>;
      });
    }
  }
  total.value = result.page?.total;
}

function getRowKeyData(e: any) {
  ids.value = e;
}
async function delMenuItem(id: string) {
  const ids = [id];
  const del = new DeleteBatchRequest({ ids: ids });
  const result = await Menu.delMenu(del);
  if (result.toObject().value) {
    getData();
  }
}
async function delMenu() {
  const del = new DeleteBatchRequest({ ids: ids.value });
  const result = await Menu.delMenu(del);
  if (result.toObject().value) {
    getData();
  }
}
function editMenuItem(row) {
  dirId.value = row.key;
  dirModal.value = true;
}
function editRowChild(id: any) {
  console.log(id);
}
getData();
</script>
<style scoped lang="less">
.menus {
  height: 100%;
  display: flex;
  flex-direction: column;
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
    justify-content: center;
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
