<template>
  <div class="directory-form">
    <n-form
      ref="formRef"
      :label-width="80"
      :model="directoryForm"
      label-placement="left"
      require-mark-placement="left"
    >
      <n-form-item
        label="目录标题"
        path="meta.title"
        :rule="{
          required: true,
          message: '不能为空',
          trigger: ['input', 'blur'],
        }"
      >
        <n-input
          v-model:value="directoryForm.meta.title"
          placeholder="请输入目录标题"
        ></n-input>
      </n-form-item>
      <n-form-item
        label="目录路由名称"
        path="title"
        :rule="{
          required: true,
          message: '不能为空',
          trigger: ['input'],
        }"
      >
        <n-input
          v-model:value="directoryForm.title"
          placeholder="请输入路由名称"
        ></n-input>
      </n-form-item>
      <n-form-item
        label="路径"
        path="path"
        :rule="{
          required: true,
          message: '不能为空',
          trigger: ['input', 'blur'],
        }"
      >
        <n-input
          v-model:value="directoryForm.path"
          placeholder="请输入路由路径"
        ></n-input>
      </n-form-item>

      <n-form-item
        label="组件"
        path="component"
        :rule="{
          required: true,
          message: '不能为空',
          trigger: ['input', 'blur'],
        }"
      >
        <n-input
          v-model:value="directoryForm.component"
          placeholder="请输入组件相对路径"
        ></n-input>
      </n-form-item>

      <n-form-item
        label="组件名称"
        path="componentName"
        :rule="{
          required: true,
          message: '不能为空',
          trigger: ['input', 'blur'],
        }"
      >
        <n-input
          v-model:value="directoryForm.componentName"
          placeholder="请输入组件名称"
        ></n-input>
      </n-form-item>

      <n-form-item
        label="跳转地址"
        path="redirect"
        :rule="{
          required: true,
          message: '不能为空',
          trigger: ['input', 'blur'],
        }"
      >
        <n-input
          v-model:value="directoryForm.redirect"
          placeholder="请输入跳转地址"
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
          v-model:value="directoryForm.sort"
          placeholder="越小越靠前"
          :min="1"
        >
        </n-input-number>
      </n-form-item>

      <n-form-item :show-feedback="false">
        <n-form-item label="外链菜单">
          <n-radio-group v-model:value="directoryForm.isFrame" name="left-size">
            <n-radio-button :value="true">是</n-radio-button>
            <n-radio-button :value="false">否</n-radio-button>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="菜单可见">
          <n-radio-group
            v-model:value="directoryForm.meta.hidden"
            name="left-size"
          >
            <n-radio-button :value="true">是</n-radio-button>
            <n-radio-button :value="false">否</n-radio-button>
          </n-radio-group>
        </n-form-item>
      </n-form-item>

      <n-form-item :show-feedback="false">
        <n-form-item label="是否缓存">
          <n-radio-group
            v-model:value="directoryForm.meta.noCache"
            name="left-size"
          >
            <n-radio-button :value="true">是</n-radio-button>
            <n-radio-button :value="false">否</n-radio-button>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="是否固定">
          <n-radio-group
            v-model:value="directoryForm.meta.affix"
            name="left-size"
          >
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
type directoryFormType = {
  title: string | undefined;
  path: string | undefined;
  component: string | undefined;
  componentName: string | undefined;
  redirect: string | undefined;
  children: string | undefined;
  meta: {
    hidden: boolean;
    noCache: boolean;
    affix: boolean;
    title: string | undefined;
  };
  sort: number | undefined;
  isFrame: boolean;
};
const directoryForm = ref<directoryFormType>({
  title: undefined,
  path: undefined,
  component: undefined,
  componentName: undefined,
  redirect: undefined,
  children: undefined,
  meta: {
    hidden: true,
    noCache: true,
    affix: false,
    title: undefined,
  },
  sort: undefined,
  isFrame: false,
});
async function submit() {
  const metaReq = new Meta({
    title: directoryForm.value.meta.title,
    noCache: directoryForm.value.meta.noCache,
    affix: directoryForm.value.meta.affix,
    hidden: directoryForm.value.meta.hidden,
  });
  const req = new MenuViewModel({
    type: MenuType.DIR,
    title: directoryForm.value.title,
    meta: metaReq,
    path: directoryForm.value.path,
    component: directoryForm.value.component,
    componentName: directoryForm.value.componentName,
    redirect: directoryForm.value.redirect,
    sort: directoryForm.value.sort,
    isFrame: directoryForm.value.isFrame,
  });
  console.log(directoryForm.value);

  const result = (await Menu.addMenu(req)).toObject();
  console.log(result);
}
</script>
<style scoped lang="less">
.directory-form {
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
