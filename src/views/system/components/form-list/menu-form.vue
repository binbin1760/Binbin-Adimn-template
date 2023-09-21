<template>
  <div class="menu-form">
    <n-form
      ref="formRef"
      :label-width="80"
      :model="menuForm"
      label-placement="left"
      require-mark-placement="left"
    >
      <n-form-item
        label="路由名称"
        path="title"
        :rule="{
          required: true,
          message: '不能为空',
          trigger: ['input'],
        }"
      >
        <n-input
          v-model:value="menuForm.title"
          placeholder="请输入路由名称"
        ></n-input>
      </n-form-item>

      <n-form-item
        label="菜单标题"
        path="meta.title"
        :rule="{
          required: true,
          message: '不能为空',
          trigger: ['input'],
        }"
      >
        <n-input
          v-model:value="menuForm.meta.title"
          placeholder="请输入菜单标题"
        ></n-input>
      </n-form-item>

      <n-form-item
        label="路径"
        path="path"
        :rule="{
          required: true,
          message: '不能为空',
          trigger: ['input'],
        }"
      >
        <n-input
          v-model:value="menuForm.path"
          placeholder="请输入路由路径"
        ></n-input>
      </n-form-item>

      <n-form-item
        label="组件"
        path="component"
        :rule="{
          required: true,
          message: '不能为空',
          trigger: ['input'],
        }"
      >
        <n-input
          v-model:value="menuForm.component"
          placeholder="请输入组件相对路径"
        ></n-input>
      </n-form-item>

      <n-form-item
        label="组件名称"
        path="componentName"
        :rule="{
          required: true,
          message: '不能为空',
          trigger: ['input'],
        }"
      >
        <n-input
          v-model:value="menuForm.componentName"
          placeholder="请输入组件名称"
        ></n-input>
      </n-form-item>

      <n-form-item
        label="跳转地址"
        path="redirect"
        :rule="{
          required: true,
          message: '不能为空',
          trigger: ['input'],
        }"
      >
        <n-input
          v-model:value="menuForm.redirect"
          placeholder="请输入跳转地址"
        ></n-input>
      </n-form-item>

      <n-form-item
        label="所属目录"
        path="pid"
        :rule="{
          required: true,
          message: '不能为空',
          trigger: ['input'],
        }"
      >
        <n-select
          placeholder="请选择菜单所属目录"
          v-model:value="menuForm.pid"
          :options="directoryList"
        />
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
          v-model:value="menuForm.sort"
          placeholder="越小越靠前"
          :min="1"
        >
        </n-input-number>
      </n-form-item>

      <n-form-item :show-feedback="false">
        <n-form-item label="外链菜单">
          <n-radio-group v-model:value="menuForm.isFrame" name="left-size">
            <n-radio-button :value="true">是</n-radio-button>
            <n-radio-button :value="false">否</n-radio-button>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="菜单可见">
          <n-radio-group v-model:value="menuForm.meta.hidden" name="left-size">
            <n-radio-button :value="true">是</n-radio-button>
            <n-radio-button :value="false">否</n-radio-button>
          </n-radio-group>
        </n-form-item>
      </n-form-item>

      <n-form-item :show-feedback="false">
        <n-form-item label="是否缓存">
          <n-radio-group v-model:value="menuForm.meta.noCache" name="left-size">
            <n-radio-button :value="true">是</n-radio-button>
            <n-radio-button :value="false">否</n-radio-button>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="是否固定">
          <n-radio-group v-model:value="menuForm.meta.affix" name="left-size">
            <n-radio-button :value="true">是</n-radio-button>
            <n-radio-button :value="false">否</n-radio-button>
          </n-radio-group>
        </n-form-item>
      </n-form-item>
    </n-form>
    <div class="confirm">
      <n-button size="large" color="#1990FF" @click="submit()">提交</n-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Menu } from "@/api";
import { MenuViewModel, Meta, MenuType } from "@/protoJs";
const menuForm = ref({
  title: undefined,
  path: undefined,
  component: undefined,
  componentName: undefined,
  redirect: undefined,
  pid: undefined,
  meta: {
    hidden: true,
    noCache: true,
    affix: false,
    title: undefined,
  },
  sort: undefined,
  isFrame: false,
});
const directoryList = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
];
async function submit() {
  const metaReq = new Meta({
    title: menuForm.value.meta.title,
    noCache: menuForm.value.meta.noCache,
    affix: menuForm.value.meta.affix,
    hidden: menuForm.value.meta.hidden,
  });
  const req = new MenuViewModel({
    type: MenuType.MENU,
    title: menuForm.value.title,
    meta: metaReq,
    path: menuForm.value.path,
    component: menuForm.value.component,
    componentName: menuForm.value.componentName,
    redirect: menuForm.value.redirect,
    sort: menuForm.value.sort,
    isFrame: menuForm.value.isFrame,
    pid: menuForm.value.pid,
  });
  const result = (await Menu.addMenu(req)).toObject();
  console.log(result);
}
</script>
<style scoped lang="less">
.menu-form {
  display: flex;
  flex-direction: column;
  margin-left: 1.2rem;
  margin-bottom: 1.6rem;
  gap: 1.2rem;
  .confirm {
    display: flex;
    justify-content: center;
  }
}
</style>
