<template>
  <div class="role-add">
    <n-form
      ref="formRef"
      :label-width="80"
      :model="role"
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
          v-model:value="props.role.name"
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
          v-model:value="props.role.remark"
          placeholder="角色备注"
        ></n-input>
      </n-form-item>

      <n-form-item label="拥有权限">
        <n-select
          v-model:value="props.role.pIds"
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
          v-model:value="props.role.level"
          placeholder="大于0,越小级别越高"
          :min="1"
        >
        </n-input-number>
      </n-form-item>

      <n-form-item label="状态">
        <n-select
          v-model:value="props.role.status"
          :options="statusOptions"
          placeholder="角色状态"
        />
      </n-form-item>
    </n-form>
    <div class="confirm">
      <n-button size="large" color="#1990FF">提交</n-button>
      <n-button size="large" @click="closeModal">取消</n-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Status } from "../../../../protoJs";
export interface RoleType {
  key: number;
  name: string;
  remark: string;
  pIds: Array<string>;
  status: Status;
  level: number;
}
const props = defineProps<{
  role: Partial<RoleType>;
}>();
const emit = defineEmits(["close"]);
const pidsOptions = [
  { label: "菜单1", value: "1" },
  { label: "菜单2", value: "2" },
  { label: "菜单3", value: "3" },
  { label: "菜单4", value: "4" },
];
const statusOptions = [
  { label: "启用", value: Status.NORMAL },
  { label: "禁用", value: Status.BLOCKED },
  { label: "冻结", value: Status.FREEZE },
  { label: "已删除", value: Status.DELETED },
];
function closeModal() {
  emit("close");
}
</script>
<style scoped lang="less">
.confirm {
  display: flex;
  justify-content: center;
  gap: 2rem;
}
</style>
