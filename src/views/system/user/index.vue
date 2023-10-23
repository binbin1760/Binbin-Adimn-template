<template>
  <div class="user">
    <div class="serch">
      <NInput
        class="serch-input"
        placeholder="请输入用户名或者邮箱搜索"
        type="text"
      />
      <n-button color="#409EFF" @click="confirmSerch">搜索</n-button>
      <n-button type="default">重置</n-button>
    </div>
    <div class="data-able" v-permission="'admin-usr:add:filter'">
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

    <n-modal
      v-model:show="userRole"
      title="设置用户权限"
      preset="card"
      :style="{ width: '600px' }"
      transform-origin="center"
    >
      <editUser :id="userId" @close="closeModal()"></editUser>
    </n-modal>
  </div>
</template>
<script setup lang="ts">
import { userTable } from "@/views/system/user/types";
import { DataTableColumns, useMessage } from "naive-ui";
import { editUser } from "../components";
import {
  Gender,
  PagerRequest,
  Status,
  TableCmsUsrFilterRequest,
} from "@/protoJs";
import { userServe } from "@/api";
import { withDirectives } from "vue";
import { permission } from "@/directives/permission";

const message = useMessage();
const columnsCreate = (): DataTableColumns<userTable> => [
  { title: "昵称", key: "nickName", align: "center" },
  {
    title: "性别",
    key: "gender",
    align: "center",
  },
  { title: "手机", key: "phone", align: "center" },
  {
    title: "拥有角色",
    key: "roles",
    align: "center",
    render(row) {
      const list = row.roles?.map((item) => {
        return h(
          NTag,
          { bordered: false, type: "info", style: { marginRight: "0.8rem" } },
          { default: () => item }
        );
      });
      return list;
    },
  },
  {
    title: "状态",
    key: "status",
    align: "center",
  },
  {
    title: "操作",
    key: "action",
    align: "center",
    render(row) {
      return withDirectives(
        h(
          NButton,
          {
            onClick: () => editUserRoles(row.key),
            size: "small",
            color: "#1990FF",
          },
          { default: () => "修改角色" }
        ),
        [[permission, "admin-usr:edit:role"]]
      );
    },
  },
];
const columns = columnsCreate();
const data = ref<Array<Partial<userTable>>>([
  {
    key: "请求失败",
    nickName: "请求失败",
    phone: "请求失败",
    status: Status.BLOCKED,
    gender: Gender.Man,
    roles: ["请求失败"],
  },
]);
const pages = ref<number>(1);
const pageCount = ref<number>(1);
const total = ref<number>(1);

const userRole = ref<boolean>(false);
const userId = ref<string>();
function confirmSerch() {
  message.info("123");
}
function closeModal() {
  userRole.value = false;
  getData();
}
function getCurrentPage(page: number) {
  pages.value = page;
}
function editUserRoles(id: string) {
  userId.value = id;
  userRole.value = true;
}
async function getData() {
  const page = new PagerRequest({ pageNumber: pages.value - 1, pageSize: 20 });
  const req = new TableCmsUsrFilterRequest({ page });
  const result = (await userServe.getUserData(req)).toObject();
  data.value = result.raws?.map((item) => {
    return { key: item.id, ...item };
  }) as unknown as Array<userTable>;
}
getData();
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
    background-color: white;
    padding: 1rem 0.5rem;
    .serch-input {
      width: 25rem;
      --n-border-hover: 1px solid #409eff !important;
      --n-border-focus: 1px solid #409eff !important;
      --n-box-shadow-focus: "none" !important;
    }
  }
  .data-able {
    border-top: 1px solid #efeff5;
    background-color: white;
    padding: 1rem 0.5rem;
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
}
</style>
