<template>
  <div class="roles">
    <div class="operate-list">
      <n-button
        color="#409EFF"
        v-permission="'admin-role:add'"
        @click="showAddmodal"
        >新增</n-button
      >
      <n-button
        v-permission="'admin-role:del'"
        color="#F56D6D"
        @click="deleteBatchRole"
        >删除</n-button
      >
    </div>
    <div class="table" v-permission="'admin-role:add:all'">
      <DataTable :data="data" :columns="columns" @get-row-key="getRowKeys" />
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
      <roleEdit :roleData="roleData" @close="closeEditmodal"></roleEdit>
    </n-modal>

    <n-modal
      v-model:show="roleModal"
      title="角色菜单"
      preset="card"
      :style="{ width: '600px' }"
      transform-origin="center"
    >
      <roleMenu :role-data="editRoleData" @close="closeEditRoleMenu"></roleMenu>
    </n-modal>

    <n-modal
      v-model:show="editBtnModal"
      title="角色按钮"
      preset="card"
      :style="{ width: '600px' }"
      transform-origin="center"
    >
      <editBtn :role-data="editRoleData" @close="closeBtnmodal"></editBtn>
    </n-modal>
  </div>
</template>
<script setup lang="ts">
import { DataTableColumns, useMessage } from "naive-ui";
import { RoleType } from "./types";
import { Status, DeleteBatchRequest } from "@/protoJs";
import { roleAdd, roleEdit, roleMenu, editBtn } from "../components";
import { role } from "@/api";
import { permission } from "@/directives/permission";
import { withDirectives } from "vue";

import { useMyDialog } from "@/hooks";
const { showDialog } = useMyDialog({
  title: "确认删除",
  text: "确认需要进行删除操作",
});

const message = useMessage();
const columnsCreate = (): DataTableColumns<RoleType> => [
  {
    type: "selection",
  },
  { title: "名称", key: "name", align: "center" },
  { title: "备注", key: "remark", align: "center" },
  { title: "排序", key: "sort", align: "center" },
  { title: "权限等级", key: "level", align: "center" },
  {
    title: "状态",
    key: "status",
    align: "center",
    render(row) {
      return h(
        NTag,
        { type: statusFilter(row.status)?.type as any },
        { default: () => statusFilter(row.status)?.text }
      );
    },
  },
  {
    title: "操作",
    key: "",
    align: "center",
    render(row) {
      const editVnode = withDirectives(
        h(
          "span",
          {
            onClick: () => showEditmodal(row),
            style: {
              color: "#165DFF",
              cursor: "pointer",
            },
          },
          { default: () => "编辑" }
        ),
        [[permission, "admin-role:edit"]]
      );
      const list = [
        h(
          "span",
          {
            onClick: () => showRoleData(row),
            style: {
              color: "#165DFF",
              cursor: "pointer",
              marginRight: "1.6rem",
            },
          },
          { default: () => "菜单权限" }
        ),
        h(
          "span",
          {
            onClick: () => showBtnData(row),
            style: {
              color: "#165DFF",
              cursor: "pointer",
              marginRight: "1.6rem",
            },
          },
          { default: () => "按钮权限" }
        ),
        h(
          "span",
          {
            onClick: () => showEditmodal(row),
            style: {
              color: "#165DFF",
              cursor: "pointer",
            },
          },
          { default: () => "编辑" }
        ),
        editVnode,
      ];
      return list;
    },
  },
];
const columns = columnsCreate();
const data = ref<Array<Partial<RoleType>>>([
  {
    key: "123",
    name: "数据请求",
    level: 0,
    sort: 0,
    remark: "数据请求失败",
    pIds: ["xxx", "xxxx", "xxxxxx"],
    status: Status.NORMAL,
  },
]);

const addmodal = ref<boolean>(false);
const editmodal = ref<boolean>(false);
const editBtnModal = ref<boolean>(false);
const roleModal = ref<boolean>(false);
const editRoleData = ref<RoleType>();
const roleData = ref();
const delList = ref<string[]>();
async function getData() {
  const result = (await role.queryAllRole()).toObject();
  data.value = result.raws?.map((item) => {
    return { key: item.id, ...item };
  }) as unknown as Array<Partial<RoleType>>;
}
function showAddmodal() {
  addmodal.value = true;
}
function closeAddmodal() {
  addmodal.value = false;
  getData();
}
function closeBtnmodal() {
  editBtnModal.value = false;
  getData();
}
function showEditmodal(row: RoleType) {
  roleData.value = row;
  editmodal.value = true;
}
function closeEditmodal() {
  editmodal.value = false;
}
function closeEditRoleMenu() {
  roleModal.value = false;
  getData();
}
function showRoleData(row) {
  editRoleData.value = row;
  roleModal.value = true;
}
function showBtnData(row) {
  editBtnModal.value = true;
  editRoleData.value = row;
}
function statusFilter(status: Number) {
  switch (status) {
    case Status.NORMAL:
      return { type: "success", text: "启用" };
    case Status.BLOCKED:
      return { type: "warning", text: "禁用" };
    case Status.FREEZE:
      return { type: "error", text: "冻结" };
    case Status.DELETED:
      return { type: "default", text: "已删除" };
  }
}
function getRowKeys(e: string[]) {
  delList.value = e;
}
async function deleteBatchRole() {
  showDialog("危险操作", "请确认是否需要删除选中的角色", async () => {
    const req = new DeleteBatchRequest({ ids: delList.value });
    const result = (await role.batchDelRole(req)).toObject();
    if (result.value) {
      getData();
    } else {
      message.error("操作失败");
    }
  });
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
    background-color: #ffff;
    padding: 1rem 0.5rem;
  }
  .table {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem 0.5rem;
    background-color: white;
  }
}
</style>
