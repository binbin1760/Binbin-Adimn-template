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
      ref="formRef"
      :label-width="80"
      :model="formValue"
      label-placement="left"
      v-if="formType === 'directory'"
      require-mark-placement="left"
    >
      <n-form-item label="菜单图标">
        <n-select v-model:value="iconValue" :options="iconOptions" />
      </n-form-item>
      <n-form-item :show-feedback="false">
        <n-form-item label="外链菜单">
          <n-radio-group v-model:value="outSide" name="left-size">
            <n-radio-button value="true">是</n-radio-button>
            <n-radio-button value="false">否</n-radio-button>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="菜单可见  ">
          <n-radio-group v-model:value="isshow" name="left-size">
            <n-radio-button value="true">是</n-radio-button>
            <n-radio-button value="false">否</n-radio-button>
          </n-radio-group>
        </n-form-item>
      </n-form-item>
      <n-form-item
        label="菜单标题"
        :rule="{
          required: true,
          message: '不能为空',
          trigger: ['input', 'blur'],
        }"
      >
        <n-input></n-input>
      </n-form-item>
      <n-form-item :show-feedback="false">
        <n-form-item label="外链菜单">
          <n-input v-model:value="urlValue"></n-input>
        </n-form-item>
        <n-form-item label="菜单可见  ">
          <n-input v-model:value="order"></n-input>
        </n-form-item>
      </n-form-item>
    </n-form>
    <n-form
      ref="formRef"
      :label-width="80"
      :model="formValue"
      label-placement="left"
      v-if="formType === 'menu'"
    >
      <n-form-item> 2 </n-form-item>
    </n-form>
    <n-form
      ref="formRef"
      :label-width="80"
      :model="formValue"
      label-placement="left"
      v-if="formType === 'button'"
    >
      <n-form-item> 3 </n-form-item>
    </n-form>
  </div>
</template>
<script setup lang="ts">
const formType = ref<string>("directory");
const formValue = ref({});
const iconValue = ref<string>();
const outSide = ref<string>("false");
const isshow = ref<string>("true");
const urlValue = ref<string>("");
const order = ref<string>();
const iconOptions = ref([
  { label: "icon1", value: "icon1" },
  { label: "icon2", value: "icon2" },
  { label: "icon3", value: "icon3" },
  { label: "icon4", value: "icon4" },
]);
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
}
</style>
