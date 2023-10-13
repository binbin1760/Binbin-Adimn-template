<template>
  <div class="edit-btn">
    <div class="checkList">
      <n-checkbox-group v-model:value="data" :default-value="defaultData">
        <n-space item-style="display: flex;">
          <n-checkbox
            v-for="(item, index) in checkdata"
            :key="index"
            :value="item.value"
            :label="item.label"
          />
        </n-space>
      </n-checkbox-group>
    </div>
    <div class="btn">
      <NButton color="#409EFF" @click="submit">提交</NButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RoleViewModel } from "@/protoJs";
import { RoleType } from "../../roles/types";
import { Menu, role } from "@/api";
import { useMessage } from "naive-ui";
const message = useMessage();
const props = defineProps<{
  roleData?: RoleType;
}>();
const emit = defineEmits(["close"]);
const data = ref();
const checkdata = ref<Array<Record<string, string>>>();
async function submit() {
  const req = new RoleViewModel({
    id: props.roleData?.key,
    name: props.roleData?.name,
    remark: props.roleData?.remark,
    pIds: data.value,
    sort: props.roleData?.sort,
    status: props.roleData?.status,
    level: props.roleData?.level,
  });
  const result = (await role.editRole(req)).toObject();
  if (result.value) {
    emit("close");
  } else {
    message.error("操作失败");
  }
}
async function getButtons() {
  const result = (await Menu.buttonWithIdentities()).toObject();
  checkdata.value = result.btns?.map((item) => {
    return { label: item.name, value: item.id };
  }) as unknown as Array<Record<string, string>>;
}
getButtons();
const defaultData = computed(() => {
  return props.roleData?.pIds;
});
</script>
<style scoped lang="less">
.edit-btn {
  height: 60rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  .checkList {
    flex: 1;
    overflow-y: auto;
  }
  .btn {
    display: flex;
    justify-content: center;
  }
}
</style>
