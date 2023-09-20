<template>
  <div class="menu-form">
    <div class="menu-select">
      <span>菜单类型</span>
      <n-radio-group v-model:value="formType" name="left-size">
        <n-radio-button value="directory"> 目录 </n-radio-button>
        <n-radio-button value="menu"> 菜单 </n-radio-button>
        <n-radio-button value="button"> 按钮 </n-radio-button>
      </n-radio-group>
    </div>

    <n-form
      ref="directory"
      :label-width="80"
      :model="buttonForm"
      label-placement="left"
      v-if="formType === 'button'"
    >
      <n-form-item> 3 </n-form-item>
    </n-form>

    <n-form
      ref="formRef"
      :label-width="80"
      :model="menuForm"
      label-placement="left"
      v-if="formType === 'menu'"
      require-mark-placement="left"
    >
      <n-form-item
        label="菜单标题"
        :rule="{
          required: true,
          message: '不能为空',
          trigger: ['input', 'blur'],
        }"
      >
        <n-input
          v-model:value="menuForm.tilte"
          placeholder="请输入菜单标题"
        ></n-input>
      </n-form-item>

      <n-form-item
        label="路径"
        :rule="{
          required: true,
          message: '不能为空',
          trigger: ['input', 'blur'],
        }"
      >
        <n-input
          v-model:value="menuForm.path"
          placeholder="请输入路由路径"
        ></n-input>
      </n-form-item>

      <n-form-item
        label="组件"
        :rule="{
          required: true,
          message: '不能为空',
          trigger: ['input', 'blur'],
        }"
      >
        <n-input
          v-model:value="menuForm.component"
          placeholder="请输入组件相对路径"
        ></n-input>
      </n-form-item>

      <n-form-item
        label="组件名称"
        :rule="{
          required: true,
          message: '不能为空',
          trigger: ['input', 'blur'],
        }"
      >
        <n-input
          v-model:value="menuForm.componentName"
          placeholder="请输入组件名称"
        ></n-input>
      </n-form-item>

      <n-form-item
        label="跳转地址"
        :rule="{
          required: true,
          message: '不能为空',
          trigger: ['input', 'blur'],
        }"
      >
        <n-input
          v-model:value="menuForm.redirect"
          placeholder="请输入跳转地址"
        ></n-input>
      </n-form-item>

      <n-form-item
        label="排序"
        :rule="{
          required: true,
          message: '不能为空',
          trigger: ['input', 'blur'],
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

    <n-form
      ref="formRef"
      :label-width="80"
      :model="buttonForm"
      label-placement="left"
      v-if="formType === 'button'"
    >
      <n-form-item> 3 </n-form-item>
    </n-form>
    <div class="confirm">
      <n-button size="large" color="#1990FF">提交</n-button>
    </div>
  </div>
</template>
<script setup lang="ts">
const formType = ref<string>("menu");
const menuForm = ref({
  tilte: null,
  path: null,
  component: null,
  componentName: null,
  redirect: null,
  children: null,
  meta: {
    hidden: true,
    noCache: true,
    affix: false,
    title: null,
  },
  sort: null,
  isFrame: false,
});
const buttonForm = ref();
</script>
<style scoped lang="less">
.menu-form {
  .menu-select {
    display: flex;
    align-items: center;
    margin-left: 1.2rem;
    margin-bottom: 1.6rem;
    gap: 1.2rem;
  }
  .confirm {
    display: flex;
    justify-content: center;
  }
}
</style>
