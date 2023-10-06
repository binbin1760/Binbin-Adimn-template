<template>
  <div class="role-add">
    <n-form
      :label-width="80"
      :model="roleData"
      label-placement="left"
      require-mark-placement="left"
    >
      <n-form-item
        label="名称"
        path="name"
        :rule="{
          required: true,
          message: '不能为空',
          trigger: ['input', 'blur'],
        }"
      >
        <n-input
          v-model:value="roleData.name"
          placeholder="请输入角色名称"
        ></n-input>
      </n-form-item>

      <n-form-item
        label="备注"
        path="remark"
        :rule="{
          required: true,
          message: '不能为空',
          trigger: ['input', 'blur'],
        }"
      >
        <n-input
          v-model:value="roleData.remark"
          placeholder="角色备注"
        ></n-input>
      </n-form-item>

      <n-form-item label="拥有权限">
        <n-select
          v-model:value="roleData.pIds"
          multiple
          :options="pidsOptions"
          placeholder="权限选择"
        />
      </n-form-item>

      <n-form-item
        label="角色等级"
        path="level"
        :rule="{
          type: 'number',
          required: true,
          message: '不能为空',
          trigger: ['blur', 'change'],
        }"
      >
        <n-input-number
          v-model:value="roleData.level"
          placeholder="大于0,越小级别越高"
          :min="1"
        >
        </n-input-number>
      </n-form-item>

      <n-form-item label="状态">
        <n-select
          v-model:value="roleData.status"
          :options="statusOptions"
          placeholder="角色状态"
        />
      </n-form-item>
    </n-form>
    <div class="confirm">
      <n-button size="large" color="#1990FF" @click="submit">提交</n-button>
      <n-button size="large" @click="closeModal">取消</n-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  Status,
  MenuPageRequest,
  PagerRequest,
  RoleViewModel,
} from "../../../../protoJs";
import { Menu, role } from "@/api";
const emit = defineEmits(["addclose"]);
const roleData = ref({
  name: "",
  remark: "",
  pIds: [],
  level: 1,
  status: Status.NORMAL,
});
type pidsOptionsType = {
  label: string;
  value: string;
};
let pidsOptions = ref<Array<pidsOptionsType>>([
  {
    label: "数据获取失败",
    value: "erro",
  },
]);
const statusOptions = [
  { label: "启用", value: Status.NORMAL },
  { label: "禁用", value: Status.BLOCKED },
  { label: "冻结", value: Status.FREEZE },
  { label: "已删除", value: Status.DELETED },
];
function closeModal() {
  emit("addclose");
}
async function getDirList() {
  const page = new PagerRequest({ pageNumber: 0, pageSize: 30 });
  const req = new MenuPageRequest({ page });
  const result = (await Menu.allMenu(req)).toObject();
  pidsOptions.value = result.raws?.map((item) => {
    return { label: item.label, value: item.id };
  }) as unknown as Array<pidsOptionsType>;
}
async function submit() {
  const req = new RoleViewModel(roleData.value);
  const result = (await role.addRole(req)).toObject();
  console.log(result.value);
  if (result.value) {
    emit("addclose");
  }
}
getDirList();
</script>
<style scoped lang="less">
.confirm {
  display: flex;
  justify-content: center;
  gap: 2rem;
}
</style>
