<template>
  <div class="role-menu">
    <n-tree
      block-line
      :data="data"
      checkable
      selectable
      :default-expand-all="true"
      :default-checked-keys="props.roleData?.pIds"
      @update-checked-keys="getSelectValue"
    />
    <div class="button-list">
      <NButton @click="submit" color="#409EFF">提交</NButton>
      <NButton @click="closeModal">取消</NButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Menu, role } from "@/api";
import { MenuPageRequest, PagerRequest, RoleViewModel } from "@/protoJs";
import { TreeOption, useMessage } from "naive-ui";
import { RoleType } from "../../roles/types";
const message = useMessage();
const props = defineProps<{
  roleData?: RoleType;
}>();
const emit = defineEmits(["close"]);
const data = ref<Array<TreeOption>>();
const selectData = ref<Array<string>>();
function getSelectValue(e) {
  selectData.value = e;
}
function closeModal() {
  emit("close");
}
async function submit() {
  const req = new RoleViewModel({
    id: props.roleData?.key,
    name: props.roleData?.name,
    remark: props.roleData?.remark,
    pIds: selectData.value,
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
async function filterMenu(pid: string) {
  const page = new PagerRequest({ pageNumber: 0, pageSize: 50 });
  const req = new MenuPageRequest({ page, parentId: pid });
  const result = (await Menu.allMenu(req)).toObject();
  return result;
}
async function getAllsideDir() {
  const page = new PagerRequest({ pageNumber: 0, pageSize: 50 });
  const req = new MenuPageRequest({ page });
  const result = (await Menu.allMenu(req)).toObject();
  data.value = result.raws?.map((item) => {
    if (item.children?.length) {
      return { label: item.label, key: item.id, children: item.children };
    }
    return { label: item.label, key: item.id };
  }) as unknown as Array<TreeOption>;
  for (let i = 0; i < data.value.length; i++) {
    const res = await filterMenu(data.value[i].key as string);
    data.value[i].children = res.raws?.map((it) => {
      return { label: it.label, key: it.id };
    });
  }
}

getAllsideDir();
</script>
<style scoped lang="less">
.role-menu {
  .button-list {
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
}
</style>
