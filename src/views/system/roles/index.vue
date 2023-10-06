<template>
  <div class="roles">
    <div class="operate-list">
      <n-button size="large" color="#409EFF" @click="showAddmodal"
        >新增</n-button
      >
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
            :on-update:page="getCurrentPage"
          >
          </n-pagination>
        </div>
      </div>
    </div>
    <n-modal
      v-model:show="addmodal"
      title="新增角色"
      preset="card"
      :style="{ width: '600px' }"
      transform-origin="center"
    >
      <roleAdd @addclose="closeAddmodal"></roleAdd>
    </n-modal>

    <n-modal
      v-model:show="editmodal"
      title="编辑角色"
      preset="card"
      :style="{ width: '600px' }"
      transform-origin="center"
    >
      <roleEdit :role="roleData" @close="closeEditmodal"></roleEdit>
    </n-modal>
  </div>
</template>
<script setup lang="ts">
import { DataTableColumns } from "naive-ui";
import { RoleType } from "./types";
import { Status } from "@/protoJs";
import { roleAdd, roleEdit } from "../components";
import { role } from "@/api";
const columnsCreate = (): DataTableColumns<RoleType> => [
  {
    type: "selection",
  },
  { title: "名称", key: "name", align: "center" },
  { title: "备注", key: "remark", align: "center" },
  {
    title: "拥有权限",
    key: "pIds",
    align: "center",
    render(row) {
      const tags = row.pIds.map((item) => {
        return h(
          NTag,
          {
            style: {
              marginRight: "0.6rem",
            },
            type: "info",
            bordered: false,
          },
          { default: () => item }
        );
      });
      return tags;
    },
  },
  { title: "状态", key: "status", align: "center" },
  {
    title: "操作",
    key: "",
    align: "center",
    render(row) {
      return h(
        "span",
        {
          onClick: () => showEditmodal(row),
          style: { color: "#165DFF", cursor: "pointer" },
        },
        { default: () => "编辑" }
      );
    },
  },
];
const columns = columnsCreate();
const data = ref<Array<Partial<RoleType>>>([
  {
    key: 0,
    name: "廖顺彬1",
    remark: "xxx",
    pIds: ["xxx", "xxxx", "xxxxxx"],
    status: Status.NORMAL,
  },
]);

const pages = ref<number>(1);
const pageCount = ref<number>(1);
const total = ref<number>(1);

const addmodal = ref<boolean>(false);
const editmodal = ref<boolean>(false);
const roleData = ref();
async function getData() {
  const result = (await role.queryAllRole()).toObject();
  console.log(result);
}
function showAddmodal() {
  addmodal.value = true;
}
function closeAddmodal() {
  addmodal.value = false;
}
function showEditmodal(row: RoleType) {
  roleData.value = row;
  editmodal.value = true;
}
function closeEditmodal() {
  editmodal.value = false;
}
function getCurrentPage(page: number) {
  pages.value = page;
}
getData();
</script>
<style scoped lang="less">
.roles {
  height: 100%;
  display: flex;
  flex-direction: column;
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
      border-radius: 24px 24px 0 0;
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
