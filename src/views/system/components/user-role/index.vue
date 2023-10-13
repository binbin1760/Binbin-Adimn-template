<template>
  <div class="edit-user-role">
    <n-select
      v-model:value="userRole"
      :options="data"
      multiple
      placeholder="设置用户role（可多选）"
    />
    <div class="button">
      <NButton color="#409eff" @click="submit()">提交</NButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { role, userServe } from "@/api";
import { CmsUsrRoleRequest } from "@/protoJs";
import { useMessage } from "naive-ui";
const props = defineProps<{
  id?: string;
}>();
const emit = defineEmits(["close"]);
const data = ref<Array<Record<string, string>>>();
const userRole = ref<string[]>();
const message = useMessage();
async function getAllrole() {
  const result = (await role.queryAllRole()).toObject();
  data.value = result.raws?.map((item) => {
    return { label: item.name, value: item.id };
  }) as unknown as Array<Record<string, string>>;
}
async function submit() {
  const req = new CmsUsrRoleRequest({ uid: props.id, roleIds: userRole.value });
  const result = (await userServe.editUser(req)).toObject();
  if (result.value) {
    emit("close");
  } else {
    message.error("设置失败");
  }
}
getAllrole();
</script>
<style scoped lang="less">
.edit-user-role {
  .button {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
