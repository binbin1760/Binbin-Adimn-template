<template>
  <div class="roles">
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
    <div class="data-table-box">
      <div class="table">
        <DataTable :data="data" :columns="columns" />
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
      <div class="list">
        <div class="menu-list">
          <div class="title">
            <span>菜单分配</span>
            <n-button :style="{ width: '5.5rem' }" size="tiny" color="#409EFF"
              >保存</n-button
            >
          </div>
          <div class="menus">
            <n-tree
              cascade
              block-line
              :data="treeData"
              checkable
              expand-on-click
              selectable
            />
          </div>
        </div>
        <div class="button-list">
          <div class="tilte">
            <span>按钮分配</span>
            <n-tooltip
              placement="bottom"
              trigger="click"
              :style="{ background: 'white', color: '#000000' }"
              :arrow-style="{ background: 'white' }"
            >
              <template #trigger>
                <NInput
                  class="input-box"
                  placeholder="请输入赛选条件"
                  type="text"
                />
              </template>
              <span>输入历史</span>
            </n-tooltip>
            <n-button :style="{ width: '5.5rem' }" size="tiny" color="#409EFF"
              >保存</n-button
            >
          </div>
          <div class="buttons">
            <div class="buttons-left">
              <n-checkbox-group>
                <div class="items">
                  <n-checkbox
                    class="checkbox"
                    value="Pushes Open"
                    label="是否存在用户"
                  />
                  <n-checkbox
                    class="checkbox"
                    value="The Window"
                    label="是否存在用户"
                  />
                  <n-checkbox
                    class="checkbox"
                    value="And Raises"
                    label="是否存在用户"
                  />
                  <n-checkbox
                    class="checkbox"
                    value="The Spyglass"
                    label="是否存在用户"
                  />
                </div>
              </n-checkbox-group>
            </div>
            <div class="buttons-right">
              <n-checkbox-group>
                <div class="items">
                  <n-checkbox
                    class="checkbox"
                    value="Pushes Open"
                    label="子菜单ID"
                  />
                  <n-checkbox
                    class="checkbox"
                    value="The Window"
                    label="子菜单ID"
                  />
                  <n-checkbox
                    class="checkbox"
                    value="And Raises"
                    label="子菜单ID"
                  />
                  <n-checkbox
                    class="checkbox"
                    value="The Spyglass"
                    label="子菜单ID"
                  />
                </div>
              </n-checkbox-group>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { DataTableColumns } from "naive-ui";
import { Operate } from "../components";
import { RoleType } from "./types";

const columnsCreate = (): DataTableColumns<RoleType> => [
  {
    type: "selection",
  },
  { title: "名称", key: "nickName", align: "center" },
  { title: "角色等级", key: "level", align: "center" },
  { title: "描述", key: "description", align: "center" },
  { title: "创建日期", key: "creatAt", align: "center" },
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
const data = ref<Array<Partial<RoleType>>>([
  {
    key: 0,
    nickName: "廖顺彬1",
    level: "2",
    description: "假数据1",
    creatAt: "2023-09-12 10:34:00",
  },
  {
    key: 1,
    nickName: "廖顺彬2",
    level: "1",
    description: "假数据2",
    creatAt: "2023-09-12 10:34:00",
  },
  {
    key: 2,
    nickName: "廖顺彬3",
    level: "3",
    description: "假数据3",
    creatAt: "2023-09-12 10:34:00",
  },
  {
    key: 3,
    nickName: "廖顺彬4",
    level: "4",
    description: "假数据4",
    creatAt: "2023-09-12 10:34:00",
  },
  {
    key: 4,
    nickName: "廖顺彬5",
    level: "5",
    description: "假数据5",
    creatAt: "2023-09-12 10:34:00",
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
function getCurrentPage(page: number) {
  pages.value = page;
}

const treeData = [
  { label: "系统菜单1", key: 1, children: [{ label: "子菜单1", key: 1.1 }] },
  { label: "系统菜单2", key: 2, children: [{ label: "子菜单1", key: 2.1 }] },
  { label: "系统菜单3", key: 3, children: [{ label: "子菜单1", key: 3.1 }] },
  {
    label: "系统菜单4",
    key: 4,
    children: [
      {
        label: "子菜单1",
        key: 4.1,
        children: [{ label: "子菜单2", key: 4.2 }],
      },
    ],
  },
];
</script>
<style scoped lang="less">
.roles {
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
  .data-table-box {
    width: 100%;
    display: flex;
    gap: 2rem;
    .table {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-radius: 5px;
      padding: 0 1.6rem;
      border: 1px solid rgb(233, 233, 233);
      height: 38rem;
      .pageination {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 1.6rem;
        margin-bottom: 1.6rem;
        color: #999999;
        .page-total {
          margin-left: 2rem;
          margin-right: 3.2rem;
        }
      }
    }
    .list {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      width: 47.5rem;
      .menu-list {
        display: flex;
        flex-direction: column;
        height: 23.3rem;
        border-radius: 5px;
        border: 1px solid rgb(233, 233, 233);
        font-family: "PingFangSC-Medium", "PingFang SC Medium", "PingFang SC",
          sans-serif;
        font-size: 14px;
        font-weight: 500;
        .title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgb(233, 233, 233);
          padding: 1.1rem 1.6rem;
        }
        .menus {
          flex: 1;
          padding: 1.6rem;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          overflow-y: scroll;
        }
      }
      .button-list {
        height: 25.3rem;
        font-family: "PingFangSC-Medium", "PingFang SC Medium", "PingFang SC",
          sans-serif;
        font-size: 14px;
        font-weight: 500;
        border-radius: 5px;
        border: 1px solid rgb(233, 233, 233);
        display: flex;
        flex-direction: column;
        .tilte {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgb(233, 233, 233);
          padding: 0 1.6rem;
          .input-box {
            width: 25rem;
            --n-height: 4rem !important;
            --n-border-hover: none !important;
            --n-border-focus: none !important;
            --n-box-shadow-focus: none !important;
            --n-border: none !important;
            border: none;
          }
        }
        .buttons {
          flex: 1;
          overflow-y: scroll;
          display: flex;
          padding: 1.6rem;
          .buttons-left {
            flex-grow: 1;
            flex-basis: 0;
            .items {
              display: flex;
              flex-direction: column;
              gap: 0.4rem;
              .checkbox {
                font-family: "PingFangSC-Medium", "PingFang SC Medium",
                  "PingFang SC", sans-serif;
                font-size: 14px;
                --n-text-color: rgba(
                  102,
                  102,
                  102,
                  0.996078431372549
                ) !important;
              }
            }
          }
          .buttons-right {
            flex-grow: 1;
            flex-basis: 0;
            .items {
              display: flex;
              flex-direction: column;
              gap: 0.4rem;
              .checkbox {
                font-family: "PingFangSC-Medium", "PingFang SC Medium",
                  "PingFang SC", sans-serif;
                font-size: 14px;
                --n-text-color: rgba(
                  102,
                  102,
                  102,
                  0.996078431372549
                ) !important;
              }
            }
          }
        }
      }
    }
  }
}
</style>
