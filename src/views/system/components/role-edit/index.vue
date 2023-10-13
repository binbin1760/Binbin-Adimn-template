<template>
  <div class="role-add">
    <n-form
      ref="formRef"
      :label-width="80"
      :model="props.roleData"
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
          v-model:value="props.roleData.name"
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
          v-model:value="props.roleData.remark"
          placeholder="角色备注"
        ></n-input>
      </n-form-item>

      <n-form-item
        label="排序"
        path="sort"
        :rule="{
          type: 'number',
          required: true,
          message: '不能为空',
          trigger: ['blur', 'change'],
        }"
      >
        <n-input-number
          v-model:value="props.roleData.sort"
          placeholder="大于0,排序越靠前"
          :min="1"
        >
        </n-input-number>
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
          v-model:value="props.roleData.level"
          placeholder="大于0,越小级别越高"
          :min="1"
        >
        </n-input-number>
      </n-form-item>

      <n-form-item label="状态">
        <n-select
          v-model:value="props.roleData.status"
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
import { RoleViewModel, Status } from "../../../../protoJs";
import { role } from "@/api";
import { useMessage } from "naive-ui";
const message = useMessage();
export interface RoleType {
  name: "";
  remark: "";
  pIds: [];
  level: 1;
  sort: 0;
  status: Status.NORMAL;
}

const props = defineProps<{
  roleData: Partial<RoleType>;
}>();
const emit = defineEmits(["close"]);

const statusOptions = [
  { label: "启用", value: Status.NORMAL },
  { label: "禁用", value: Status.BLOCKED },
  { label: "冻结", value: Status.FREEZE },
  { label: "已删除", value: Status.DELETED },
];
function closeModal() {
  emit("close");
}
async function submit() {
  const req = new RoleViewModel(props.roleData);
  const result = (await role.editRole(req)).toObject();
  if (result.value) {
    emit("close");
  } else {
    message.error("操作失败");
  }
}
</script>
<style scoped lang="less">
.confirm {
  display: flex;
  justify-content: center;
  gap: 2rem;
}
</style>
